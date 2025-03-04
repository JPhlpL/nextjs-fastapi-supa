"use client";

import { Button } from "@/components/ui/button";
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function TopNav() {
  const router = useRouter();

  const handleLogout = async () => {
    const response = await fetch('/api/logout', {
      method: 'POST',
    });

    if (response.ok) {
      router.push('/login');
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