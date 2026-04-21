import { db } from '@/lib/db';
import {
  createPageVisit,
  getTrackedDevice,
  getTrackedLocation,
  getTrackedReferrer,
} from '@/lib/analytics';
import { enforceRateLimit, getRequestIp } from '@/lib/rate-limit';

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).end();
  }

  try {
    const { handle } = req.query;

    if (!handle || typeof handle !== 'string') {
      throw new Error('Invalid Handle');
    }

    const normalizedHandle = handle.trim().toLowerCase();

    let existingUser = await db.user.findUnique({
      where: {
        handle: normalizedHandle,
      },
      include: {
        links: req.method === 'GET',
      },
    });

    if (!existingUser) {
      const escapedHandle = escapeRegex(normalizedHandle);
      const matchingUsers = await db.user.aggregateRaw({
        pipeline: [
          {
            $match: {
              handle: {
                $regex: `^\\s*${escapedHandle}\\s*$`,
                $options: 'i',
              },
            },
          },
          {
            $project: {
              _id: 1,
            },
          },
          {
            $limit: 1,
          },
        ],
      });

      const matchedUserId =
        typeof matchingUsers[0]?._id === 'string'
          ? matchingUsers[0]._id
          : matchingUsers[0]?._id?.$oid;

      if (typeof matchedUserId === 'string') {
        existingUser = await db.user.findUnique({
          where: {
            id: matchedUserId,
          },
          include: {
            links: req.method === 'GET',
          },
        });
      }
    }

    if (!existingUser) {
      return res.status(404).end();
    }

    if (req.method === 'POST') {
      const rateLimitKey = `profile-view:${normalizedHandle}:${getRequestIp(req)}`;

      if (
        !enforceRateLimit({ key: rateLimitKey, limit: 30, windowMs: 60 * 1000 })
      ) {
        return res.status(429).json({ error: 'Too many requests.' });
      }

      const browserLocation = req.body?.browserLocation || {};
      const device = getTrackedDevice(req, req.body?.browserDevice);
      const { location, city } = getTrackedLocation(req, browserLocation);
      const referrer = getTrackedReferrer(
        req,
        req.body?.browserReferrer,
        normalizedHandle
      );

      await createPageVisit(db, {
        userId: existingUser.id,
        location,
        city,
        device,
        referrer,
      });

      await db.user.update({
        where: { id: existingUser.id },
        data: {
          totalViews: {
            increment: 1,
          },
        },
      });

      return res.status(201).json({ ok: true });
    }

    return res.status(200).json({ ...existingUser });
  } catch (error) {
    return res.status(400).end();
  }
}
