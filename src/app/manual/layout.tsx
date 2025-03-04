import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Sidebar from "@/app/components/sidebar/sidebar";
import PageHeader from "@/app/components/page-header/page-header";
import TopNav from "@/app/components/top-nav/top-nav";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Perks | Manual",
  description: "Created with Next.js, Tailwind CSS, and shadcn/ui",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen bg-gray-100">
          <Sidebar />
          <div className="flex flex-col flex-1 overflow-hidden">
            <TopNav />
            <PageHeader />
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
              <div className="container mx-auto px-6 py-8">{children}</div>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
