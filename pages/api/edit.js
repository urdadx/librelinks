import { db } from '@/lib/db';
import serverAuth from '@/lib/serverAuth';

const HANDLE_REGEX = /^[a-z0-9._-]+$/;

function normalizeHandle(handle) {
  if (typeof handle !== 'string') {
    return undefined;
  }

  return handle.trim().toLowerCase();
}

async function deleteUserData(userId) {
  const links = await db.link.findMany({
    where: { userId },
    select: { id: true },
  });

  const linkIds = links.map((link) => link.id);

  if (linkIds.length > 0) {
    await db.linkClick.deleteMany({
      where: {
        linkId: { in: linkIds },
      },
    });
  }

  await db.account.deleteMany({
    where: { userId },
  });

  await db.session.deleteMany({
    where: { userId },
  });

  await db.pageVisit.deleteMany({
    where: { userId },
  });

  await db.link.deleteMany({
    where: { userId },
  });

  await db.user.delete({
    where: { id: userId },
  });
}

export default async function handler(req, res) {
  if (req.method !== 'PATCH' && req.method !== 'DELETE') {
    return res.status(405).end();
  }

  try {
    const { currentUser } = await serverAuth(req, res);

    const { username, bio, image, handle } = req.body;
    const normalizedHandle = normalizeHandle(handle);

    if (req.method === 'PATCH') {
      try {
        if (typeof handle === 'string') {
          if (!normalizedHandle) {
            return res.status(400).json({ error: 'Handle cannot be empty.' });
          }

          if (!HANDLE_REGEX.test(normalizedHandle)) {
            return res.status(400).json({
              error:
                'Handle can only contain lowercase letters, numbers, dots, underscores, and hyphens.',
            });
          }
        }

        // Check if the handle already exists in the user table
        const existingUser = normalizedHandle
          ? await db.user.findUnique({
              where: {
                handle: normalizedHandle,
              },
            })
          : null;

        // If the handle exists and belongs to a different user, return an error
        if (existingUser && existingUser.id !== currentUser.id) {
          return res.status(409).json({ error: 'Handle is already taken.' });
        }

        const updatedUser = await db.user.update({
          where: {
            id: currentUser.id,
          },
          data: {
            name: username,
            bio: bio,
            image: image,
            handle: normalizedHandle,
          },
        });

        return res.status(200).json(updatedUser);
      } catch (error) {
        return new Response(`Could not update handle at this time. ${error}`, {
          status: 500,
        });
      }
    } else if (req.method === 'DELETE') {
      await deleteUserData(currentUser.id);
      return res.status(204).end();
    }
  } catch {
    return res.status(400).end();
  }
}
