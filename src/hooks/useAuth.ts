'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getData } from '@/utils/helpers'

interface UserData {
  id: string
  email: string
  username: string
  firstname: string
  lastname: string
}

interface Role {
  id: string
  title: string
}

export function useAuth() {
  const [user, setUser] = useState<UserData | null>(null)
  const [roles, setRoles] = useState<Role[]>([])
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function loadUserFromToken() {
      try {
        const response = await fetch('/api/auth/', {
          credentials: 'include'
        })
        if (response.ok) {
          const userData = await response.json()
          setUser(userData)
          await fetchRoles(userData.id)
        } else {
          setUser(null)
          router.push('/login')
        }
      } catch (error) {
        console.error('Error fetching user data:', error)
        setUser(null)
        router.push('/login')
      } finally {
        setLoading(false)
      }
    }

    loadUserFromToken()
  }, [router])

  const fetchRoles = async (userId: string) => {
    try {
      const response = await getData<Role[]>({
        url: `${process.env.NEXT_PUBLIC_API_URL}/role/get-roles-by-user/${userId}`,
      });
      setRoles(response);
      setIsAdmin(response.some(role => role.title.toLowerCase() === 'admin'));
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  }

  return { user, roles, isAdmin, loading }
}