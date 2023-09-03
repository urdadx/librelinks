import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export default async function middleware(req) {
  // Get the pathname of the request (e.g. /, /admin)
  const path = req.nextUrl.pathname;

  // A list of all protected pages
  const protectedPaths = [
    '/admin',
    '/admin/customize',
    '/admin/analytics',
    '/admin/settings',
    '/onboarding',
  ];

  // If it's the root path, just render it
  if (path === '/') {
    return NextResponse.next();
  }

  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!session && protectedPaths.includes(path)) {
    return NextResponse.redirect(new URL('/login', req.url));
  } else if (session && (path === '/login' || path === '/register')) {
    return NextResponse.redirect(new URL('/admin', req.url));
  }
  return NextResponse.next();
}
