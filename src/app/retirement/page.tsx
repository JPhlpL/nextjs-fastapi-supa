'use client'

import { useAuth } from '@/hooks/useAuth'
import RetirementComputationForm from "@/app/components/forms/RetirementComputationForm"

export default function Users() {
  const { user } = useAuth()

  if (!user) {
    return null // The useAuth hook will handle redirection
  }

  return (
    <div className="flex gap-6">
      <RetirementComputationForm />
    </div>
  )
}