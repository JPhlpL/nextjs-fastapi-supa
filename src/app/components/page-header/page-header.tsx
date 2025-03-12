"use client"

import { usePathname, useRouter } from "next/navigation"
import { Home, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

const pathToTitle: { [key: string]: string } = {
  "/": "Home",
  "/home": "Home",
  "/users": "Users",
  "/roles": "User Roles",
  "/about": "About",
}

export default function PageHeader() {
  const router = useRouter()
  const pathname = usePathname()
  const title = pathToTitle[pathname] || "Page Not Found"

  return (
    <div className="container mx-auto px-4 sm:px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600 overflow-x-auto">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="hover:bg-gray-100">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <span className="hidden xs:inline">/</span>
          <Button variant="ghost" size="icon" onClick={() => router.push("/home")} className="hover:bg-gray-100">
            <Home className="h-5 w-5" />
          </Button>
          <span className="hidden xs:inline">/</span>
          <span className="truncate max-w-[100px] sm:max-w-none">{title}</span>
        </div>
      </div>
    </div>
  )
}

