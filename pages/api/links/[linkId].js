import { db } from '@/lib/db';
import serverAuth from '@/lib/serverAuth';

export default async function handler(req, res) {
  if (req.method !== 'PATCH' && req.method !== 'DELETE') {
    return res.status(405).end();
  }

  try {
    const { currentUser } = await serverAuth(req, res);
    const { linkId } = req.query;

    if (!linkId || typeof linkId !== 'string') {
      throw new Error('Invalid ID');
    }

    const existingLink = await db.link.findUnique({
      where: {
        id: linkId,
      },
      select: {
        id: true,
        userId: true,
      },
    });

    if (!existingLink) {
      return res.status(404).end();
    }

    if (existingLink.userId !== currentUser.id) {
      return res
        .status(403)
        .json({ error: 'You can only modify your own links.' });
    }

    if (req.method === 'PATCH') {
      const { newTitle, newUrl, archived } = req.body;
      const data = {};

      if (typeof newTitle !== 'undefined') {
        data.title = newTitle;
      }

      if (typeof newUrl !== 'undefined') {
        data.url = newUrl;
      }

      if (typeof archived !== 'undefined') {
        data.archived = archived;
      }

      const updatedLink = await db.link.update({
        where: {
          id: linkId,
        },
        data,
      });

      return res.status(200).json(updatedLink);
    } else if (req.method === 'DELETE') {
      await db.link.delete({
        where: {
          id: linkId,
        },
      });

      return res.status(204).end();
    }
  } catch {
    return res.status(400).end();
  }
}
