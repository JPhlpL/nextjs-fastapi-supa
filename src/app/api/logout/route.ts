import { NextResponse } from 'next/server';

export async function POST() {
  // Clear the authentication cookies or tokens
  const response = NextResponse.json({ message: 'Logged out successfully' });
  response.cookies.set('token', '', { maxAge: 0, path: '/', httpOnly: true, sameSite: 'strict' });

  return response;
}
