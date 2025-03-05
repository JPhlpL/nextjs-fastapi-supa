'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getData } from '@/utils/helpers'
import { createClient } from '@/utils/supabase/client'
import { User } from '@supabase/supabase-js'

interface Role {
  id: string
  title: string
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [roles, setRoles] = useState<Role[]>([])
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    // Set up the auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          if (session?.user) {
            setUser(session.user)
            await fetchRoles(session.user.id)
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null)
          setRoles([])
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
          await fetchRoles(user.id)
        } else {
          setUser(null)
          // Only redirect if not already on login or register page
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

    // Clean up the subscription
    return () => {
      subscription.unsubscribe()
    }
  }, [router, supabase])

  const fetchRoles = async (userId: string) => {
    try {
      const response = await getData<Role[]>({
        url: `${process.env.NEXT_PUBLIC_API_URL}/role/get-roles-by-user/${userId}`,
      });
      setRoles(response);
      setIsAdmin(response.some(role => role.title.toLowerCase() === 'admin'));
    } catch (error) {
      console.error("Error fetching roles:", error);
      setRoles([]);
      setIsAdmin(false);
    }
  }

  const signOut = async () => {
    try {
      await supabase.auth.signOut()
      setUser(null)
      setRoles([])
      setIsAdmin(false)
      router.push('/login')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return { user, roles, isAdmin, loading, signOut }
}