"use client"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
  } from "@/components/ui/sidebar"
  import { signOut, useSession } from "next-auth/react";
  import Link from "next/link";
  import { Home, Inbox, Mails, Users, LogOut, Menu, Settings, User, Video } from "lucide-react";
  import { usePathname } from "next/navigation";
  import { useState, useEffect } from "react";
  
  const menuItems = [
    {
      title: "Home",
      icon: Home,
      href: "/user/dashboard"
    },
    {
      title: "Mail Templates",
      icon: Mails,
      href: "/user/templates"
    },
    {
      title: "Profile",
      icon: User,
      href: "/user/profile"
    },{
      title: "Demo",
      icon: Video,
      href: "/user/demo"
    }
  ];
  
  export function AppSidebar() {
    const { data: session } = useSession();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    // Close sidebar when route changes on mobile
    useEffect(() => {
      setIsOpen(false);
    }, [pathname]);

    // Close sidebar when clicking outside on mobile
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        const sidebar = document.getElementById('mobile-sidebar');
        const toggleButton = document.getElementById('sidebar-toggle');
        if (sidebar && toggleButton && 
            !sidebar.contains(event.target as Node) && 
            !toggleButton.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
  
    return (
      <>
        {/* Overlay for mobile */}
        {isOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-[40] md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div 
          id="mobile-sidebar"
          className={`fixed md:static w-64 min-h-screen border-r border-gray-800 bg-black transition-transform duration-300 ease-in-out
            ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            z-[50]`}
        >
          <Sidebar className="h-full">
            <SidebarHeader className="p-4 border-b bg-black border-gray-800">
              <div className="text-xl font-bold text-white">
                {session?.user?.name ? `wagmi, ${session.user.name.split(" ")[0]}!` : "Welcome, User!"}
              </div>
            </SidebarHeader>
            
            <SidebarContent className="px-2 bg-black py-4">
              <SidebarGroup>
                <nav className="space-y-1">
                  {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center px-4 py-3 rounded-lg transition-all duration-300 group ${
                          isActive 
                            ? 'bg-gray-600/20 font-bold text-white border-l-2 border-white' 
                            : 'text-gray-300 hover:bg-gray-800/20 hover:border-white hover:text-white'
                        }`}
                      >
                        <item.icon className={`h-5 w-5 mr-3 transition-colors duration-300 ${
                          isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'
                        }`} />
                        <span className="text-sm font-medium">{item.title}</span>
                      </Link>
                    );
                  })}
                </nav>
              </SidebarGroup>
            </SidebarContent>
      
            <SidebarFooter className="p-4 border-t bg-black border-gray-800">
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="flex items-center w-full px-4 py-3 text-gray-300 rounded-lg hover:bg-gray-800/50 hover:text-white transition-all duration-300 group"
              >
                <LogOut className="h-5 w-5 mr-3 text-gray-400 group-hover:text-red-400 transition-colors duration-300" />
                <span className="text-sm font-medium">Logout</span>
              </button>
            </SidebarFooter>
          </Sidebar>
        </div>

        {/* Mobile Toggle Button */}
        <button
          id="sidebar-toggle"
          onClick={() => setIsOpen(!isOpen)}
          className="fixed top-4 left-4 z-[60] p-2 rounded-lg bg-gray-800 text-white md:hidden"
        >
          <Menu className="h-6 w-6" />
        </button>
      </>
    )
  }
  