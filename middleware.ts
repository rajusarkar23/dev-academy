import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = request.cookies.has("session");
  const a_session = request.cookies.has("a_session");

  // Check for admin routes
  if (pathname.startsWith('/admin')) {
    if (!a_session) {
      return NextResponse.redirect(new URL("/admin/auth/signin", request.url));
    }
  } else {
    // Check for regular routes
    if (!session) {
      return NextResponse.redirect(new URL("/auth/signin", request.url));
    }
  }

  // Allow request to continue if checks pass
  return NextResponse.next();
}

export const config = {
  matcher: ['/order-details/:path', '/admin/:path', '/admin/dashboard/:path'],
};
