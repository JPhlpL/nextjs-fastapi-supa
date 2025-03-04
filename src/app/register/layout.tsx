import '../globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import React from 'react'; // Import React

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Benefits Portal | Authentication',
  description: 'Login or register for your benefits portal account',
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  )
}