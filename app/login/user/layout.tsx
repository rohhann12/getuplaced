"use client";

import { SessionProvider } from "next-auth/react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar/sidebar";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <SidebarProvider defaultOpen>
        <div className="flex min-h-screen bg-black text-white w-full">
          <div className="relative">
            <AppSidebar />
          </div>

          <main className="flex-1 w-full overflow-hidden transition-all duration-300 ease-in-out bg-black">
            <div className="container mx-auto px-6 py-6 h-full">
              {children}
            </div>
          </main>
        </div>
      </SidebarProvider>
    </SessionProvider>
  );
} 