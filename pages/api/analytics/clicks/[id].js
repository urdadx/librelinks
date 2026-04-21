import { db } from '@/lib/db';
import { createLinkClick } from '@/lib/analytics';
import { enforceRateLimit, getRequestIp } from '@/lib/rate-limit';

export default async function handler(req, res) {
  if (req.method !== 'PATCH') {
    return res.status(405).end();
  }

  try {
    const { id } = req.query;

    if (!id || typeof id !== 'string') {
      throw new Error('Invalid ID');
    }

    const rateLimitKey = `link-click:${id}:${getRequestIp(req)}`;

    if (
      !enforceRateLimit({ key: rateLimitKey, limit: 60, windowMs: 60 * 1000 })
    ) {
      return res.status(429).json({ error: 'Too many requests.' });
    }

    const updatedLink = await db.link.update({
      where: {
        id: id,
      },
      data: {
        clicks: {
          increment: 1,
        },
      },
    });

    await createLinkClick(db, { linkId: id });

    return res.status(200).json(updatedLink);
  } catch {
    return res.status(400).end();
  }
}
