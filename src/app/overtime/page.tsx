'use client'

import { useAuth } from '@/hooks/useAuth'
import OvertimeComputationForm from "@/app/components/forms/OvertimeComputationForm"

export default function Users() {
  const { user } = useAuth()

  if (!user) {
    return null // The useAuth hook will handle redirection
  }

  return (
    <div className="flex gap-6">
      <OvertimeComputationForm />
    </div>
  )
}