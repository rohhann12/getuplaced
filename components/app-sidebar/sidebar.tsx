import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
  } from "@/components/ui/sidebar"
  import { signOut, useSession } from "next-auth/react";
  import Link from "next/link";
  import { Home, Inbox, Mails, Users, LogOut } from "lucide-react";
  import { usePathname } from "next/navigation";
  
  const menuItems = [
    {
      title: "Home",
      icon: Home,
      href: "/user/dashboard"
    },
    {
      title: "Remaining Hits",
      icon: Inbox,
      href: "/user/hits"
    },
    {
      title: "Mail Templates",
      icon: Mails,
      href: "/user/templates"
    },
    {
      title: "Refer a Friend",
      icon: Users,
      href: "/user/referal"
    },
    {
      title: "Settings",
      icon: Users,
      href: "/user/settingss"
    }
  ];
  
  export function AppSidebar() {
    const { data: session } = useSession();
    const pathname = usePathname();
  
    return (
      <Sidebar className="w-64 min-h-screen border-r border-gray-800 bg-black">
        <SidebarHeader className="p-4 border-b bg-black border-gray-800">
          <div className="text-xl font-bold text-white">
            {session?.user?.name ? `Welcome, ${session.user.name.split(" ")[0]}!` : "Aryan!"}
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
                        : 'text-gray-300 hover:bg-gray-800/20 hover:border-l-2 hover:border-white hover:text-white'
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
    )
  }
  