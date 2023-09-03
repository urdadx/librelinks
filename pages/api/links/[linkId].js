import { db } from '@/lib/db';

export default async function handler(req, res) {
  // if (req.method !== "PATCH" && req.method !== "DELETE") {
  //   return res.status(405).end();
  // }

  try {
    const { linkId } = req.query;

    if (!linkId || typeof linkId !== 'string') {
      throw new Error('Invalid ID');
    }

    if (req.method === 'PATCH') {
      const { newTitle, newUrl, archived } = req.body;

      const updatedLink = await db.link.update({
        where: {
          id: linkId,
        },
        data: {
          title: newTitle,
          url: newUrl,
          archived: archived,
        },
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
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
