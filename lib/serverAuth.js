import { auth } from '@/lib/auth';
import { db } from './db';

const getRequestHeaders = (req) => {
  const headers = new Headers();

  Object.entries(req.headers).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      headers.set(key, value.join(', '));
      return;
    }

    if (typeof value === 'string') {
      headers.set(key, value);
    }
  });

  return headers;
};

const serverAuth = async (req, res) => {
  const session = await auth.api.getSession({
    headers: getRequestHeaders(req),
  });

  if (!session?.user?.id) {
    throw new Error('Not signed in');
  }

  const currentUser = await db.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      id: true,
      name: true,
      handle: true,
      bio: true,
      image: true,
      email: true,
      emailVerified: true,
      betterAuthEmailVerified: true,
      totalViews: true,
      createdAt: true,
      updatedAt: true,
      linksLocation: true,
      themePalette: true,
      buttonStyle: true,
    },
  });

  if (!currentUser) {
    throw new Error('Not signed in');
  }

  return { currentUser };
};

export default serverAuth;
