"use client"

import type React from "react"

import { Home, InfoIcon, User2, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"
import { getData } from "@/utils/helpers"
import { useState, useEffect, useCallback } from "react"
import { cn } from "@/lib/utils"
import type { User } from "@/types/index"
import { useSidebar } from "@/contexts/sidebar-context"
import { Button } from "@/components/ui/button"

export default function Sidebar() {
  const [isAdmin, setIsAdmin] = useState<boolean>(false)
  const { user } = useAuth()
  const user_id = user?.id
  const pathname = usePathname()
  const { isOpen, close } = useSidebar()

  const fetchCurrentUser = useCallback(async () => {
    if (!user_id) return

    try {
      const response = await getData<User>({
        url: `${process.env.NEXT_PUBLIC_API_URL}/user/get/${user_id}`,
      })
      // Check if the user's role is 'admin' (case insensitive)
      setIsAdmin(response.role.toLowerCase() === "admin")
    } catch (error) {
      console.error("Error fetching user:", error)
    }
  }, [user_id])

  useEffect(() => {
    fetchCurrentUser()
  }, [fetchCurrentUser])

  const NavLink = ({
    href,
    icon: Icon,
    children,
  }: { href: string; icon: React.ElementType; children: React.ReactNode }) => {
    const isActive = pathname === href
    return (
      <Link
        href={href}
        className={cn(
          "block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white",
          isActive && "bg-gray-700 text-white",
        )}
        onClick={() => {
          // Close sidebar on mobile after navigation
          if (window.innerWidth < 768) {
            close()
          }
        }}
      >
        <Icon className="inline-block mr-2" size={20} />
        {children}
      </Link>
    )
  }

  return (
    <div
      className={cn(
        "bg-gray-800 text-white w-64 space-y-6 py-7 px-2 fixed inset-y-0 left-0 z-50 transform transition-transform duration-200 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full",
        "md:relative md:translate-x-0", // Always show on medium screens and up
      )}
    >
      <div className="flex justify-between items-center px-4 mb-6">
        <h2 className="text-xl font-bold">Greetings!</h2>
        <Button variant="ghost" size="icon" className="md:hidden" onClick={close}>
          <X className="h-5 w-5" />
        </Button>
      </div>
      <nav>
        <NavLink href="/home" icon={Home}>
          Home
        </NavLink>
        <NavLink href="/about" icon={InfoIcon}>
          About
        </NavLink>
        {isAdmin && (
          <NavLink href="/users" icon={User2}>
            Users
          </NavLink>
        )}
      </nav>
    </div>
  )
}

