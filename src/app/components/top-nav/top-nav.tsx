"use client";

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button";
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client'

export default function TopNav() {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false)
  const supabase = createClient()

  const handleLogout = async () => {
    setLoggingOut(true)
    try {
      await supabase.auth.signOut()
      router.push('/login')
    } catch (error) {
      console.error('Error signing out:', error)
    } finally {
      setLoggingOut(false)
    }
  };

  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-end h-14">
          {/* <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button> */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}