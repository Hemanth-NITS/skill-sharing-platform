import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SearchOn from "@/components/little/SearchOn";
import { UserCircleIcon, LogOut } from "lucide-react";

export default function Profiling({ user }) {
  if (!user) {
    return (
      <div className="flex items-center space-x-2">
        <Link href="/auth/signin">
          <Button variant="outline" className="h-6 p-4">
            Log In
          </Button>
        </Link>
        <Link href="/auth/signup">
          <Button className="h-6 p-4">Sign Up</Button>
        </Link>
      </div>
    );
  }
  return (
    <div className="flex items-center space-x-2 h-10 mt-1">
      {/* <UserCircleIcon className="h-5 w-6 text-gray-500" />
        <span className="text-gray-700">User</span> */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center space-x-2 cursor-pointer border-slate-700 border-2 px-2 rounded-full py-1">
            <UserCircleIcon className="h-6 w-5 text-gray-500" />
            <span className="text-gray-700">User</span>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-20" algin="end" >
          <DropdownMenuLabel>Hi, User</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            Profile
            <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Leaderboard
            <DropdownMenuShortcut>⌘L</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span>Log Out</span>
            <LogOut className="mt-1 text-red-700 h-4 w-4" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
