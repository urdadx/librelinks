import { notFound, permanentRedirect } from 'next/navigation';
import { db } from '@/lib/db';
import Profile from '@/views/profile';

async function getUser(handle) {
  return db.user.findUnique({
    where: { handle },
    select: { name: true, bio: true, image: true, handle: true },
  });
}

export async function generateMetadata({ params }) {
  const { handle } = await params;
  const user = await getUser(handle.trim().toLowerCase());

  if (!user) {
    return { title: 'Page Not Found' };
  }

  return {
    title: user.name || `@${user.handle}`,
    description: user.bio || `View ${user.handle}'s links on Librelinks.`,
    openGraph: user.image ? { images: [user.image] } : undefined,
  };
}

export default async function Page({ params }) {
  const { handle } = await params;
  const canonicalHandle = handle.trim().toLowerCase();

  if (!canonicalHandle) {
    notFound();
  }

  if (handle !== canonicalHandle) {
    permanentRedirect(`/${canonicalHandle}`);
  }

  if (!(await getUser(canonicalHandle))) {
    notFound();
  }

  return <Profile handle={canonicalHandle} />;
}
