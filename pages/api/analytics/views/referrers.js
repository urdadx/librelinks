import { countByKey, getAnalyticsRange, listPageVisits } from '@/lib/analytics';
import { db } from '@/lib/db';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  try {
    const { handle, filter } = req.query;

    if (!handle || typeof handle !== 'string') {
      return res.status(404).end();
    }

    const user = await db.user.findUnique({
      where: { handle },
      select: { id: true },
    });

    if (!user) {
      return res.status(200).json([]);
    }

    const range = getAnalyticsRange(filter);
    const startDate = new Date(
      Date.now() - range.bucketSizeMs * (range.bucketCount - 1)
    );

    const visits = await listPageVisits(db, {
      userId: user.id,
      startDate,
      select: {
        referrer: true,
      },
    });

    return res.status(200).json(countByKey(visits, 'referrer'));
  } catch {
    return res.status(500).end();
  }
}
