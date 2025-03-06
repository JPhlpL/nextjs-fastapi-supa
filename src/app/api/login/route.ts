import { NextResponse } from 'next/server'
import { db } from '@/db'
import { users } from '@/db/schema'
import { eq, or } from 'drizzle-orm'
import bcrypt from 'bcrypt'
import * as jose from 'jose'

const JWT_SECRET = process.env.JWT_SECRET

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not set in environment variables')
}

export async function POST(request: Request) {
  const { username } = await request.json()

  const user = await db.select().from(users)
               .where(or(eq(users.email, username)))
               .limit(1);

  if (user.length === 0) {
    return NextResponse.json({ error: 'User Not Found' }, { status: 404 })
  }

  const secret = new TextEncoder().encode(JWT_SECRET)
  const token = await new jose.SignJWT({ 
    id: user[0].id, 
    email: user[0].email
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('1h')
    .sign(secret)

  const response = NextResponse.json({ 
    message: 'Login successful',
    user: {
      id: user[0].id,
      email: user[0].email
    }
  }, { status: 200 })
  
  response.cookies.set('token', token, { 
    httpOnly: true, 
    secure: process.env.NODE_ENV === 'development',
    sameSite: 'strict',
    maxAge: 3600 // 1 hour in seconds
  })

  return response
}