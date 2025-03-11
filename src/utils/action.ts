'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export async function login(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { data: authData, error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    console.error('Login error:', error.message)
    return { error: error.message }
  }

  // Make sure we have a session
  if (!authData.session) {
    return { error: 'No session created' }
  }

  // Force revalidation of all cached data
  revalidatePath('/', 'layout')
  
  // Redirect to account page
  redirect('/home')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  // Get form data
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const displayName = formData.get('displayName') as string

  // Sign up with Supabase
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        // Store display name in user metadata
        full_name: displayName || email.split('@')[0], // Use email username as fallback
        name: displayName || email.split('@')[0],
      },
      emailRedirectTo: process.env.NEXT_PUBLIC_SITE_URL+'/auth/callback',
    },
  })

  if (error) {
    console.error('Signup error:', error.message)
    return { error: error.message }
  }

  // If auto-confirm is enabled, you might want to log the user in right away
  // Otherwise, return a success message
  return { success: 'Check your email to confirm your account' }
}

export async function logout() {
  const supabase = await createClient()
  
  // Sign out from Supabase
  const { error } = await supabase.auth.signOut()
  
  if (error) {
    console.error('Logout error:', error.message)
    return { error: error.message }
  }
  
  // Clear all cookies to ensure complete logout
  const cookieStore = cookies()
  cookieStore.getAll().forEach(cookie => {
    cookieStore.delete(cookie.name)
  })
  
  // Force revalidation
  revalidatePath('/', 'layout')
  
  // Redirect to login page
  redirect('/login')
}