import { NextResponse } from 'next/server';

const SESSION_COOKIE_NAMES = [
  'better-auth.session_token',
  '__Secure-better-auth.session_token',
  '__Host-better-auth.session_token',
];

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

  const session = SESSION_COOKIE_NAMES.find(
    (cookieName) => req.cookies.get(cookieName)?.value
  );

  if (!session && protectedPaths.includes(path)) {
    return NextResponse.redirect(new URL('/login', req.url));
  } else if (session && (path === '/login' || path === '/register')) {
    return NextResponse.redirect(new URL('/admin', req.url));
  }
  return NextResponse.next();
}
