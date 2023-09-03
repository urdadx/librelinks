import { db } from '@/lib/db';

export default async function handler(req, res) {
  if (req.method !== 'PATCH') {
    return res.status(405).end();
  }

  try {
    const { id } = req.query;

    if (!id || typeof id !== 'string') {
      throw new Error('Invalid ID');
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

    return res.status(200).json(updatedLink);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
