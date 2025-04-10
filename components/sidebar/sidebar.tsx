"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Calendar, Home, Inbox, Users, Settings, LogOut, Mails} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
  {
    title: "Home",
    url: "/user/dashboard",
    icon: Home,
  },
  {
    title: "Remaning Hits",
    url: "/user/hits",
    icon: Inbox,
  },
  // {
  //   title: "Sent Emails",
  //   url: "/user/emails/sent",
  //   icon: Calendar,
  // },
  {
    title: "Mail Templates",
    url: "/user/templates",
    icon: Mails,
  },
  {
    title: "Refer a friend",
    url: "/user/referal",
    icon: Users,
  },
  {
    title: "Logout",
    callback: () => signOut({ callbackUrl: "/" }),
    icon: LogOut,
  },
];

export default function AppSidebar() {
  const { data: session } = useSession();

  return (
    <div className="flex min-h-screen text-white">
      <div className="h-full z-50 gap-4 border-r border-gray-800">
        <Sidebar className="bg-black text-white">
          <SidebarContent className="bg-black text-white">
            <SidebarGroup>
              <SidebarGroupLabel className="text-xl text-white font-bold p-4">
                {session?.user?.name ? `Sup ${session.user.name.split(" ")[0]}` : null}
              </SidebarGroupLabel>
              <SidebarGroupContent className="bg-black text-white">
                <SidebarMenu className="gap-2 mt-4 ml-2 text-lg font-medium text-white">
                  {items.map((item) => (
                    <SidebarMenuItem key={item.title} className="mb-2">
                      <SidebarMenuButton asChild>
                        {item.callback ? (
                          <button
                            onClick={item.callback}
                            className="flex items-center gap-3 p-3 rounded-lg w-full transition-all duration-300 hover:bg-gray-800 hover:text-green-400"
                          >
                            <item.icon className="h-5 w-5" />
                            <span>{item.title}</span>
                          </button>
                        ) : (
                          <Link
                            href={item.url}
                            className="flex items-center gap-3 p-3 rounded-lg w-full transition-all duration-300 hover:bg-gray-800 hover:text-green-400"
                          >
                            <item.icon className="h-5 w-5" />
                            <span>{item.title}</span>
                          </Link>
                        )}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      </div>
    </div>
  );
}
