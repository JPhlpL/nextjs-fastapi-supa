"use client"

import { useSidebar } from "@/contexts/sidebar-context"
import { cn } from "@/lib/utils"

export function SidebarBackdrop() {
  const { isOpen, close } = useSidebar()

  return (
    <div
      className={cn(
        "fixed inset-0 bg-black/50 z-40 transition-opacity md:hidden",
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
      )}
      onClick={close}
      aria-hidden="true"
    />
  )
}

