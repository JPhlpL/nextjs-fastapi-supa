'use client'

import { createContext, useContext, ReactNode } from 'react'
import { useAuth as useAuthHook } from '@/hooks/useAuth'
import { User } from '@supabase/supabase-js'

interface Role {
  id: string
  title: string
}

interface AuthContextType {
  user: User | null
  roles: Role[]
  isAdmin: boolean
  loading: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuthHook()
  
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}