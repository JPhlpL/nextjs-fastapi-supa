'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getData } from '@/utils/helpers'
import { createClient } from '@/utils/supabase/client'
import { User as SupabaseUser } from '@supabase/supabase-js'
import { User } from '@/types/index'

export function useAuth() {
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [role, setRole] = useState<string | null>(null)
  const [isAdmin, setIsAdmin] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          if (session?.user) {
            setUser(session.user)
            await fetchUserDetails(session.user.id)
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null)
          setRole(null)
          setIsAdmin(false)
          router.push('/login')
        }
      }
    )

    // Initial fetch of user data
    const fetchUserData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          setUser(user)
          await fetchUserDetails(user.id)
        } else {
          setUser(null)
          const path = window.location.pathname
          if (path !== '/login' && path !== '/register' && !path.startsWith('/auth')) {
            router.push('/login')
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()

    return () => {
      subscription.unsubscribe()
    }
  }, [router, supabase])

  const fetchUserDetails = async (userId: string) => {
    try {
      const response = await getData<User>({
        url: `${process.env.NEXT_PUBLIC_API_URL}/user/get/${userId}`,
      })
      setRole(response.role)
      setIsAdmin(response.role.toLowerCase() === 'admin')
    } catch (error) {
      console.error('Error fetching user details:', error)
      setRole(null)
      setIsAdmin(false)
    }
  }

  const signOut = async () => {
    try {
      await supabase.auth.signOut()
      setUser(null)
      setRole(null)
      setIsAdmin(false)
      router.push('/login')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return { user, role, isAdmin, loading, signOut }
}
