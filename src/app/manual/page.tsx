'use client'

import { useAuth } from '@/hooks/useAuth'
import ComingSoon from '@/app/components/pages/ComingSoon' // Adjust the path as necessary

export default function Users() {
  const { user } = useAuth()

  if (!user) {
    return null // The useAuth hook will handle redirection
  }

  return (
    <div className="flex gap-6">
      <ComingSoon />
    </div>
  )
}