// middleware.ts
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl;

  const allowedPath = '/designs/design-1';

  if (url.pathname !== allowedPath) {
    url.pathname = allowedPath;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/designs/:path*', '/home', '/'],
};
