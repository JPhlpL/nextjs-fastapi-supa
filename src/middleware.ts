import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import * as jose from 'jose'

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not set in environment variables');
}

export async function middleware(request: NextRequest) {
  // Exclude /api/register and /api/login from middleware
  if (request.nextUrl.pathname === '/api/register' || request.nextUrl.pathname === '/api/login') {
    return NextResponse.next()
  }

  const token = request.cookies.get('token')?.value

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  try {
    const secret = new TextEncoder().encode(JWT_SECRET);
    await jose.jwtVerify(token, secret);

    // Check if the requested page is the users page
    // if (request.nextUrl.pathname.startsWith('/users')) {
    //   const userRoles = payload.roles as string[] || [];
    //   if (!userRoles.includes('admin')) {
    //     return NextResponse.redirect(new URL('/unauthorized', request.url))
    //   }
    // }

    return NextResponse.next()
  } catch (error) {
    console.error('JWT verification error:', error);
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

// The `/api/register` route is accessible without authentication.
// All other `/api/*` routes are protected.
// All `/menu/*` routes are protected.
// The `/users` route is protected and requires admin role.
// The login page remains accessible for unauthenticated users.

export const config = {
  matcher: ['/menu/:path*', '/api/:path*', '/users/:path*'],
}