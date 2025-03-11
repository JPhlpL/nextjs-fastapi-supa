import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = await createClient()
  
  // Sign out from Supabase
  await supabase.auth.signOut()
  
  // Clear all cookies to ensure complete logout
  const cookieStore = cookies()
  cookieStore.getAll().forEach(cookie => {
    cookieStore.delete(cookie.name)
  })
  
  // Redirect to login page
  return NextResponse.redirect(new URL('/login', process.env.NEXT_PUBLIC_SITE_URL || 'https://nextjs-fastapi-supa.vercel.app' || 'http://localhost:3000'))
}