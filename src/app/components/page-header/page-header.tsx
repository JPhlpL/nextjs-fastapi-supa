"use client";

import { usePathname, useRouter } from "next/navigation";
import { Home, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const pathToTitle: { [key: string]: string } = {
  "/": "Home",
  "/home": "Home",
  "/users": "Users",
  "/roles": "Roles",
  "/retirement": "Retirement Computation",
  "/overtime": "Overtime Computation",
  "/contact": "Contact",
  "/manual": "Manual",
  "/calendar": "Calendar",
  "/support": "Ask Support",
  "/about": "About",
  "/admin": "Admin",
};

export default function PageHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const title = pathToTitle[pathname] || "Page Not Found";

  return (
    // <div className="bg-white border-b">
    <div className="container mx-auto px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="hover:bg-gray-100"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <span>/</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/home")}
            className="hover:bg-gray-100"
          >
            <Home className="h-5 w-5" />
          </Button>
          <span>/</span>
          <span>{title}</span>
        </div>
      </div>
    </div>
    // </div>
  );
}
