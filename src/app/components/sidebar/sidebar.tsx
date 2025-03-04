"use client"

import { Home, Contact, Book, Calendar, PhoneCall, InfoIcon, User, FileSliders, Calculator, BookUser } from 'lucide-react';
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth'
import { getData } from "@/utils/helpers";
import { Role } from "@/types/index"
import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

export default function Sidebar() {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const { user } = useAuth()
  const user_id = user?.id
  const pathname = usePathname();

  const fetchCurrentRole = useCallback(async () => {
    if (!user_id) return;

    try {
      const response = await getData<Role[]>({
        url: `${process.env.NEXT_PUBLIC_API_URL}/role/get-roles-by-user/${user_id}`,
      });

      const adminRole = response.some(role => role.title.toLowerCase() === 'admin');
      setIsAdmin(adminRole);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  }, [user_id]);

  useEffect(() => {
    fetchCurrentRole();
  }, [fetchCurrentRole]);

  const NavLink = ({ href, icon: Icon, children }: { href: string; icon: React.ElementType; children: React.ReactNode }) => {
    const isActive = pathname === href;
    return (
      <Link
        href={href}
        className={cn(
          "block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white",
          isActive && "bg-gray-700 text-white"
        )}
      >
        <Icon className="inline-block mr-2" size={20} />
        {children}
      </Link>
    );
  };

  return (
    <div className="bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      <nav>
        <NavLink href="/home" icon={Home}>Home</NavLink>
       
        <NavLink href="/retirement" icon={Calculator}>Retirement Computation</NavLink>
        <NavLink href="/overtime" icon={Calculator}>Overtime Computation</NavLink>
        <NavLink href="/contact" icon={Contact}>Contact</NavLink>
        <NavLink href="/manual" icon={Book}>Manual</NavLink>
        <NavLink href="/calendar" icon={Calendar}>Calendar</NavLink>
        <NavLink href="/support" icon={PhoneCall}>Ask Support</NavLink>
        <NavLink href="/about" icon={InfoIcon}>About</NavLink>
        {isAdmin && 
          <>
            <NavLink href="/admin" icon={FileSliders}>Admin</NavLink>
            <NavLink href="/users" icon={User}>Users</NavLink>
            <NavLink href="/roles" icon={BookUser}>Roles</NavLink>
          </>
        }
      </nav>
    </div>
  );
}