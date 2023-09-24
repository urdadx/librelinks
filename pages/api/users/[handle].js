import { db } from '@/lib/db';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  try {
    const { handle } = req.query;

    if (!handle || typeof handle !== 'string') {
      throw new Error('Invalid Handle');
    }

    const existingUser = await db.user.findUnique({
      where: {
        handle: handle,
      },
      include: {
        links: true,
      },
    });

    return res.status(200).json({ ...existingUser });
  } catch (error) {
    return res.status(400).end();
  }
}
