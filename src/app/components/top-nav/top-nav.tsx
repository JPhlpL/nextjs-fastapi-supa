"use client"

import { Button } from "@/components/ui/button"
import { LogOut, Menu } from "lucide-react"
import { useRouter } from "next/navigation"
import { createClient } from "@/utils/supabase/client"
import { useSidebar } from "@/contexts/sidebar-context"

export default function TopNav() {
  const router = useRouter()
  const supabase = createClient()
  const { toggle } = useSidebar()

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut()
      router.push("/login")
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  return (
    <header className="bg-white border-b sticky top-0 z-30">
      <div className="container mx-auto px-6">
        <div className="flex items-center h-14 relative">
          {/* Left side - Burger menu */}
          <div className="absolute left-0">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggle}
              className="md:hidden text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>


          {/* Right side - Logout button */}
          <div className="absolute right-0">
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
      </div>
    </header>
  )
}

