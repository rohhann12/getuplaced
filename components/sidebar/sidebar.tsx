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
  {
    title: "Sent Emails",
    url: "/user/emails/sent",
    icon: Calendar,
  },
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
    <div className="flex min-h-screen  text-white">
      <div className="h-full z-50 gap-4 border-r border-gray-800">
        <Sidebar className="bg-black text-white">
          <SidebarContent className="bg-black text-white">
            <SidebarGroup>
              <SidebarGroupLabel className="text-xl text-white">
                {session?.user?.name ? `Sup ${session.user.name.split(" ")[0]}` : null}
              </SidebarGroupLabel>
              <SidebarGroupContent className="bg-black text-white">
                <SidebarMenu className="gap-6 mt-4 ml-2 text-5xl font-extrabold text-white">
                  {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        {item.callback ? (
                          <button
                            onClick={item.callback}
                            className="flex items-center gap-2 hover:text-gray-300"
                          >
                            <item.icon />
                            <span>{item.title}</span>
                          </button>
                        ) : (
                          <Link
                            href={item.url}
                            className="flex items-center gap-2 hover:text-gray-300"
                          >
                            <item.icon />
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
