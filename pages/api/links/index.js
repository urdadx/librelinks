import serverAuth from '@/lib/serverAuth';
import { db } from '@/lib/db';

export default async function handler(req, res) {
  if (req.method !== 'POST' && req.method !== 'GET' && req.method !== 'PUT') {
    return res.status(405).end();
  }

  try {
    if (req.method === 'POST') {
      const { currentUser } = await serverAuth(req, res);
      const { title, url, order, isSocial } = req.body;

      const link = await db.link.create({
        data: {
          title,
          url,
          order,
          userId: currentUser.id,
          isSocial,
        },
      });

      return res.status(200).json(link);
    }

    if (req.method === 'GET') {
      const { userId } = req.query;

      let links;

      if (userId && typeof userId === 'string') {
        links = await db.link.findMany({
          where: {
            userId,
          },
          orderBy: {
            order: 'asc',
          },
        });
      }

      return res.status(200).json(links);
    }

    if (req.method === 'PUT') {
      const { currentUser } = await serverAuth(req, res);
      const { links } = req.body;

      if (!Array.isArray(links)) {
        return res.status(400).json({ error: 'Invalid links payload.' });
      }

      const requestedLinkIds = links
        .map((link) => link?.id)
        .filter((id) => typeof id === 'string');

      const ownedLinks = await db.link.findMany({
        where: {
          id: { in: requestedLinkIds },
          userId: currentUser.id,
        },
        select: { id: true },
      });

      if (ownedLinks.length !== requestedLinkIds.length) {
        return res
          .status(403)
          .json({ error: 'You can only reorder your own links.' });
      }

      await Promise.all(
        links.map(({ id }, index) =>
          db.link.update({
            where: {
              id,
            },
            data: {
              order: index,
            },
          })
        )
      );
      res.status(200).json({ msg: 'link order updated' });
    }
  } catch {
    return res.status(500).end();
  }
}
