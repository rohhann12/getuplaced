"use client";

import { SessionProvider } from "next-auth/react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <SidebarProvider defaultOpen>
        <div className="flex bg-black text-white">
          
          {/* <AppSidebar /> */}
          <main className="w-screen overflow-hidden">{children}</main>
        </div>
      </SidebarProvider>
    </SessionProvider>
  );
}
