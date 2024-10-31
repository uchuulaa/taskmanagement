import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Remove the middleware for now as it's causing issues with Firebase auth
export function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};