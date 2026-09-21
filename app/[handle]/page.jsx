import { notFound, permanentRedirect } from 'next/navigation';
import { db } from '@/lib/db';
import Profile from '@/views/profile';

async function getUser(handle) {
  try {
    return await db.user.findUnique({
      where: { handle },
      select: { name: true, bio: true, image: true, handle: true },
    });
  } catch {
    return undefined;
  }
}

export async function generateMetadata({ params }) {
  const { handle } = await params;
  const user = await getUser(handle.trim().toLowerCase());

  if (user === null) {
    return { title: 'Page Not Found' };
  }

  if (!user) {
    return {};
  }

  return {
    title: user.name || `@${user.handle}`,
    description: user.bio || `View ${user.handle}'s links on Librelinks.`,
    openGraph: user.image ? { images: [user.image] } : undefined,
  };
}

export default async function Page({ params, searchParams }) {
  const { handle } = await params;
  const query = await searchParams;
  const canonicalHandle = handle.trim().toLowerCase();

  if (!canonicalHandle) {
    notFound();
  }

  if (handle !== canonicalHandle) {
    const queryString = new URLSearchParams(query).toString();
    permanentRedirect(
      `/${canonicalHandle}${queryString ? `?${queryString}` : ''}`
    );
  }

  if ((await getUser(canonicalHandle)) === null) {
    notFound();
  }

  return (
    <Profile handle={canonicalHandle} isIframe={query.isIframe === 'true'} />
  );
}
