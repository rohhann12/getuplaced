"use client";

import { SessionProvider } from "next-auth/react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar/sidebar";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <SessionProvider>
      <SidebarProvider defaultOpen>
        <div className="flex min-h-screen bg-black text-white w-full">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-black/80 backdrop-blur-sm text-white border border-gray-700 md:hidden hover:bg-gray-800 transition-all duration-300"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          {/* Sidebar - Hidden on mobile by default, shown when menu is opened */}
          <div
            className={`fixed inset-y-0 left-0 transform ${
              isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            } md:relative md:translate-x-0 transition-transform duration-300 ease-in-out z-30`}
          >
            <AppSidebar />
          </div>

          {/* Overlay for mobile */}
          {isMobileMenuOpen && (
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-20 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
          )}

          {/* Main Content */}
          <main className="flex-1 w-full overflow-hidden transition-all duration-300 ease-in-out bg-black">
            <div className="container mx-auto px-4 py-6 md:px-6 lg:px-8 mt-12 md:mt-0 h-full">
              {children}
            </div>
          </main>
        </div>
      </SidebarProvider>
    </SessionProvider>
  );
}
