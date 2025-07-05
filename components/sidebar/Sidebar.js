// components/common/Sidebar.jsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  BookOpen,
  MessageSquare,
  Award,
  Settings,
  HelpCircle,
  Users,
  Search,
  LayoutGrid,
  Star,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Sidebar() {
  const pathname = usePathname();

  const topNavItems = [
    { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/my-sessions", icon: BookOpen, label: "My Sessions" },
    { href: "/my-requests", icon: MessageSquare, label: "My Requests" },
  ];

  const exploreNavItems = [
    { href: "/search", icon: Search, label: "Find Peers" },
    { href: "/categories", icon: LayoutGrid, label: "Browse Categories" },
    { href: "/popular-teachers", icon: Star, label: "Popular Teachers" },
    { href: "/leaderboard", icon: Award, label: "Leaderboard" },
  ];

  const bottomNavItems = [
    { href: "/profile/edit", icon: Users, label: "My Profile" },
    { href: "/settings", icon: Settings, label: "Settings" },
    { href: "/help", icon: HelpCircle, label: "Help & Support" },
  ];

  const NavSection = ({ title, items }) => (
    <div className="mb-6">
      {title && (
        <h3 className="text-sm font-semibold text-fuchsia-200 mb-2">{title}</h3>
      )}
      <nav className="flex flex-col space-y-1">
        {items.map((item) => (
          <Link key={item.href} href={item.href}>
            <Button
              variant="ghost"
              className={`w-full justify-start text-left px-3 py-2 rounded-md transition-colors duration-200
                ${
                  pathname === item.href
                    ? "bg-slate-700 text-fuchsia-50 font-semibold"
                    : "text-slate-200 hover:bg-slate-700 hover:text-fuchsia-50"
                }`}
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.label}
            </Button>
          </Link>
        ))}
      </nav>
    </div>
  );

  return (
    <ScrollArea className="h-full pr-4">
      <div className="flex flex-col h-96 justify-between py-2 ">
        <div>
          <NavSection title="Main" items={topNavItems} />
          <NavSection title="Discover" items={exploreNavItems} />
        </div>

        <div className="mt-auto pt-4 border-t border-slate-700">
          <NavSection items={bottomNavItems} />
        </div>
      </div>
    </ScrollArea>
  );
}
