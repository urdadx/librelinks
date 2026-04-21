import {
  buildTopLinks,
  getAnalyticsRange,
  listLinkClicks,
} from '@/lib/analytics';
import { db } from '@/lib/db';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  try {
    const { userId, filter } = req.query;

    if (!userId || typeof userId !== 'string') {
      return res.status(404).end();
    }

    const range = getAnalyticsRange(filter);
    const startDate = new Date(
      Date.now() - range.bucketSizeMs * (range.bucketCount - 1)
    );

    const links = await db.link.findMany({
      where: {
        userId,
        archived: false,
        isSocial: false,
      },
      select: {
        id: true,
        title: true,
        url: true,
        clicks: true,
      },
    });

    const linkClicks = await listLinkClicks(db, {
      linkIds: links.map((link) => link.id),
      startDate,
    });

    return res.status(200).json(buildTopLinks(links, linkClicks));
  } catch {
    return res.status(500).end();
  }
}
