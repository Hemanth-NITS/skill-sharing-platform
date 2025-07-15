// // components/navbar-components/Header.jsx
// "use client"; // This component needs to be a Client Component due to interactivity

// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//   Sheet,
//   SheetContent,
//   SheetDescription,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// // Removed Supabase client import

// import { UserCircle, MessageCircle, Bell, Search, Menu, LayoutDashboard, Settings, LogOut } from 'lucide-react';

// export default function Header({ user }) { // Receive user prop from layout
//   const router = useRouter();

//   const handleLogout = async () => {
//     // --- SIMULATED LOGOUT ---
//     console.log("Simulating logout. In a real app, this would clear user session.");
//     alert("You have been logged out (Simulated).");
//     // For simulation, we can refresh to force layout to re-render with null user
//     // or simply redirect. Since layout is server component, refreshing is best.
//     router.refresh(); // Forces a re-render of the layout, which will then get null user
//     router.push('/signin'); // Redirect to login page
//   };

//   // Helper for desktop navigation items (excluding user/auth section)
//   const DesktopNavItems = () => (
//     <>
//       {/* Search Users */}
//       <Link href="/search">
//         <Button variant="ghost" size="icon" className="text-fuchsia-50 hover:bg-fuchsia-800/20">
//           <Search className="h-5 w-5" />
//           <span className="sr-only">Search Users</span>
//         </Button>
//       </Link>

//       {/* Message Icon */}
//       <Link href="/chat/session-id-123"> {/* Example chat session ID */}
//         <Button variant="ghost" size="icon" className="text-fuchsia-50 hover:bg-fuchsia-800/20">
//           <MessageCircle className="h-5 w-5" />
//           <span className="sr-only">Messages</span>
//         </Button>
//       </Link>

//       {/* Notifications (Showpiece for now) */}
//       <Button variant="ghost" size="icon" className="text-fuchsia-50 hover:bg-fuchsia-800/20">
//         <Bell className="h-5 w-5" />
//         <span className="sr-only">Notifications</span>
//       </Button>
//     </>
//   );

//   // Helper for mobile navigation items (inside the Sheet)
//   const MobileNavItems = () => (
//     <nav className="flex flex-col space-y-4 mt-6">
//       <Link href="/search" className="text-lg font-medium hover:text-fuchsia-300 transition-colors">
//         <Button variant="ghost" className="w-full justify-start text-fuchsia-50 hover:bg-slate-700">
//           <Search className="h-5 w-5 mr-2" /> Search Users
//         </Button>
//       </Link>
//       <Link href="/chat/session-id-123" className="text-lg font-medium hover:text-fuchsia-300 transition-colors">
//         <Button variant="ghost" className="w-full justify-start text-fuchsia-50 hover:bg-slate-700">
//           <MessageCircle className="h-5 w-5 mr-2" /> Messages
//         </Button>
//       </Link>
//       <Button variant="ghost" className="w-full justify-start text-fuchsia-50 hover:bg-slate-700">
//         <Bell className="h-5 w-5 mr-2" /> Notifications
//       </Button>
//       <div className="pt-4 mt-4 border-t border-slate-700">
//         {user ? (
//           <>
//             <Link href="/dashboard" className="text-lg font-medium hover:text-fuchsia-300 transition-colors">
//               <Button variant="ghost" className="w-full justify-start text-fuchsia-50 hover:bg-slate-700">
//                 <LayoutDashboard className="h-5 w-5 mr-2" /> Dashboard
//               </Button>
//             </Link>
//             <Link href="/profile/edit" className="text-lg font-medium hover:text-fuchsia-300 transition-colors">
//               <Button variant="ghost" className="w-full justify-start text-fuchsia-50 hover:bg-slate-700">
//                 <UserCircle className="h-5 w-5 mr-2" /> My Profile
//               </Button>
//             </Link>
//             <Button onClick={handleLogout} className="w-full justify-start text-fuchsia-50 hover:bg-slate-700 mt-2">
//               <LogOut className="h-5 w-5 mr-2" /> Log out
//             </Button>
//           </>
//         ) : (
//           <>
//             <Link href="/signin" className="w-full">
//               <Button variant="outline" className="w-full text-fuchsia-50 border-fuchsia-50 hover:bg-slate-700">Log In</Button>
//             </Link>
//             <Link href="/signup" className="w-full mt-2">
//               <Button className="w-full bg-fuchsia-600 hover:bg-fuchsia-700">Sign Up</Button>
//             </Link>
//           </>
//         )}
//       </div>
//     </nav>
//   );

//   return (
//     <header className="flex justify-between items-center p-4 bg-gradient-to-r from-slate-800 to-fuchsia-900 text-fuchsia-50 shadow-lg">
//       {/* Left Section: Logo & Name */}
//       <div className="flex items-center space-x-2">
//         <Link href="/" className="flex items-center space-x-2">
//           <img src="https://placehold.co/32x32/881337/ffffff?text=SS" alt="SkillShare Logo" className="h-8 w-auto rounded-full" />
//           <span className="text-2xl font-extrabold text-fuchsia-50 tracking-wide">SkillShare</span>
//         </Link>
//       </div>

//       {/* Right Section: Desktop Navigation & User/Auth */}
//       <nav className="hidden md:flex items-center space-x-4">
//         <DesktopNavItems />

//         {user ? (
//           // Logged In State: User Profile Dropdown
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button
//                 variant="ghost"
//                 className="relative h-9 rounded-full flex items-center justify-center px-2 text-fuchsia-50 hover:bg-fuchsia-800/20"
//               >
//                 <Avatar className="h-7 w-7 border border-fuchsia-300">
//                   {/* Use a placeholder image if user.profilePic is not available */}
//                   <AvatarImage src={user.profilePic || "https://api.dicebear.com/7.x/lorelei/svg?seed=User"} alt={`${user.fullName || 'User'}'s profile`} />
//                   <AvatarFallback className="bg-fuchsia-700 text-fuchsia-50 text-sm">
//                     {user.fullName?.charAt(0) || user.email?.charAt(0) || 'U'}
//                   </AvatarFallback>
//                 </Avatar>
//                 <span className="ml-2 text-sm font-medium hidden lg:inline">
//                   Hi, {user.fullName?.split(' ')[0] || user.email?.split('@')[0] || 'User'}
//                 </span>
//                 <span className="ml-2 text-sm font-medium inline lg:hidden">
//                   Hi, {user.fullName?.charAt(0) || user.email?.charAt(0) || 'U'}
//                 </span>
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent className="w-56 bg-slate-800 text-fuchsia-50 border-fuchsia-700" align="end" forceMount>
//               <DropdownMenuLabel className="font-normal text-fuchsia-200">
//                 <div className="flex flex-col space-y-1">
//                   <p className="text-sm font-medium leading-none">{user.fullName || user.email}</p>
//                   <p className="text-xs leading-none text-muted-foreground">
//                     {user.email}
//                   </p>
//                 </div>
//               </DropdownMenuLabel>
//               <DropdownMenuSeparator className="bg-fuchsia-700" />
//               <DropdownMenuItem className="focus:bg-fuchsia-800/50 focus:text-fuchsia-50" onClick={() => router.push('/dashboard')}>
//                 <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
//               </DropdownMenuItem>
//               <DropdownMenuItem className="focus:bg-fuchsia-800/50 focus:text-fuchsia-50" onClick={() => router.push('/profile/setup')}>
//                 <UserCircle className="mr-2 h-4 w-4" /> My Profile
//               </DropdownMenuItem>
//               <DropdownMenuItem className="focus:bg-fuchsia-800/50 focus:text-fuchsia-50" onClick={() => router.push('/settings')}>
//                 <Settings className="mr-2 h-4 w-4" /> Settings
//               </DropdownMenuItem>
//               <DropdownMenuSeparator className="bg-fuchsia-700" />
//               <DropdownMenuItem className="focus:bg-fuchsia-800/50 focus:text-fuchsia-50" onClick={handleLogout}>
//                 <LogOut className="mr-2 h-4 w-4" /> Log out
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         ) : (
//           // Not Logged In State: Login/Signup Buttons
//           <div className="flex items-center space-x-2">
//             <Link href="/signin">
//               <Button variant="outline" className="text-fuchsia-50 border-fuchsia-50 hover:bg-fuchsia-800/20 hover:text-fuchsia-50">Log In</Button>
//             </Link>
//             <Link href="/signup">
//               <Button className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white">Sign Up</Button>
//             </Link>
//           </div>
//         )}
//       </nav>

//       {/* Mobile Navigation (Hamburger Menu) */}
//       <div className="md:hidden">
//         <Sheet>
//           <SheetTrigger asChild>
//             <Button variant="ghost" size="icon" className="text-fuchsia-50 hover:bg-fuchsia-800/20">
//               <Menu className="h-6 w-6" />
//               <span className="sr-only">Open menu</span>
//             </Button>
//           </SheetTrigger>
//           <SheetContent side="right" className="w-[250px] sm:w-[300px] bg-slate-800/95 text-fuchsia-50 p-4 border-l border-fuchsia-700">
//             <SheetHeader>
//               <SheetTitle className="text-fuchsia-50">Navigation</SheetTitle>
//               <SheetDescription className="text-fuchsia-200">
//                 Explore the platform
//               </SheetDescription>
//             </SheetHeader>
//             <MobileNavItems />
//           </SheetContent>
//         </Sheet>
//       </div>
//     </header>
//   );
// }
// components/navbar-components/Header.jsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// NEW: Import the client-side Supabase client creator
import { createClient } from "@/lib/supabase/client";

import {
  UserCircle,
  MessageCircle,
  Bell,
  Search,
  Menu,
  LayoutDashboard,
  Settings,
  LogOut,
} from "lucide-react";

export default function Header({ user }) {
  // Receive user prop from layout
  const router = useRouter();
  const supabase = createClient(); // Initialize client-side Supabase instance

  const handleLogout = async () => {
    // --- REAL SUPABASE LOGOUT ---
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error logging out:", error.message);
      alert("Error logging out. Please try again.");
    } else {
      console.log("Successfully logged out.");
      router.refresh(); // Refresh the page to force layout to re-fetch session (will be null)
      setTimeout(() => {
        router.push("/signin"); // Redirect to login page
      }, 500);
    }
  };

  // Helper for desktop navigation items (excluding user/auth section)
  const DesktopNavItems = () => (
    <>
      {/* Search Users */}
      <Link href="/search">
        <Button
          variant="ghost"
          size="icon"
          className="text-fuchsia-50 hover:bg-fuchsia-800/20"
        >
          <Search className="h-5 w-5" />
          <span className="sr-only">Search Users</span>
        </Button>
      </Link>

      {/* Message Icon */}
      <Link href="/chat/session-id-123">
        {" "}
        {/* Example chat session ID */}
        <Button
          variant="ghost"
          size="icon"
          className="text-fuchsia-50 hover:bg-fuchsia-800/20"
        >
          <MessageCircle className="h-5 w-5" />
          <span className="sr-only">Messages</span>
        </Button>
      </Link>

      {/* Notifications (Showpiece for now) */}
      <Button
        variant="ghost"
        size="icon"
        className="text-fuchsia-50 hover:bg-fuchsia-800/20"
      >
        <Bell className="h-5 w-5" />
        <span className="sr-only">Notifications</span>
      </Button>
    </>
  );

  // Helper for mobile navigation items (inside the Sheet)
  const MobileNavItems = () => (
    <nav className="flex flex-col space-y-4 mt-6">
      <Link
        href="/search"
        className="text-lg font-medium hover:text-fuchsia-300 transition-colors"
      >
        <Button
          variant="ghost"
          className="w-full justify-start text-fuchsia-50 hover:bg-slate-700"
        >
          <Search className="h-5 w-5 mr-2" /> Search Users
        </Button>
      </Link>
      <Link
        href="/chat/session-id-123"
        className="text-lg font-medium hover:text-fuchsia-300 transition-colors"
      >
        <Button
          variant="ghost"
          className="w-full justify-start text-fuchsia-50 hover:bg-slate-700"
        >
          <MessageCircle className="h-5 w-5 mr-2" /> Messages
        </Button>
      </Link>
      <Button
        variant="ghost"
        className="w-full justify-start text-fuchsia-50 hover:bg-slate-700"
      >
        <Bell className="h-5 w-5 mr-2" /> Notifications
      </Button>
      <div className="pt-4 mt-4 border-t border-slate-700">
        {user ? (
          <>
            <Link
              href="/dashboard"
              className="text-lg font-medium hover:text-fuchsia-300 transition-colors"
            >
              <Button
                variant="ghost"
                className="w-full justify-start text-fuchsia-50 hover:bg-slate-700"
              >
                <LayoutDashboard className="h-5 w-5 mr-2" /> Dashboard
              </Button>
            </Link>
            <Link
              href="/profile/setup"
              className="text-lg font-medium hover:text-fuchsia-300 transition-colors"
            >
              <Button
                variant="ghost"
                className="w-full justify-start text-fuchsia-50 hover:bg-slate-700"
              >
                <UserCircle className="h-5 w-5 mr-2" /> My Profile
              </Button>
            </Link>
            <Button
              onClick={handleLogout}
              className="w-full justify-start text-fuchsia-50 hover:bg-slate-700 mt-2"
            >
              <LogOut className="h-5 w-5 mr-2" /> Log out
            </Button>
          </>
        ) : (
          <>
            <Link href="/signin" className="w-full">
              <Button
                variant="outline"
                className="w-full text-fuchsia-50 border-fuchsia-50 hover:bg-slate-700"
              >
                Log In
              </Button>
            </Link>
            <Link href="/signup" className="w-full mt-2">
              <Button className="w-full bg-fuchsia-600 hover:bg-fuchsia-700">
                Sign Up
              </Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );

  return (
    <header className="flex justify-between items-center p-4 bg-gradient-to-r from-slate-800 to-fuchsia-900 text-fuchsia-50 shadow-lg">
      {/* Left Section: Logo & Name */}
      <div className="flex items-center space-x-2">
        <Link href="/" className="flex items-center space-x-2">
          <img
            src="https://placehold.co/32x32/881337/ffffff?text=SS"
            alt="SkillShare Logo"
            className="h-8 w-auto rounded-full"
          />
          <span className="text-2xl font-extrabold text-fuchsia-50 tracking-wide">
            SkillShare
          </span>
        </Link>
      </div>

      {/* Right Section: Desktop Navigation & User/Auth */}
      <nav className="hidden md:flex items-center space-x-4">
        <DesktopNavItems />

        {user ? (
          // Logged In State: User Profile Dropdown
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-9 rounded-full flex items-center justify-center px-2 text-fuchsia-50 hover:bg-fuchsia-800/20"
              >
                <Avatar className="h-7 w-7 border border-fuchsia-300">
                  {/* Use user.user_metadata?.avatar_url for Supabase profile pictures */}
                  <AvatarImage
                    src={
                      user.user_metadata?.avatar_url ||
                      "https://api.dicebear.com/7.x/lorelei/svg?seed=User"
                    }
                    alt={`${user.user_metadata?.full_name || "User"}'s profile`}
                  />
                  <AvatarFallback className="bg-fuchsia-700 text-fuchsia-50 text-sm">
                    {user.user_metadata?.full_name?.charAt(0) ||
                      user.email?.charAt(0) ||
                      "U"}
                  </AvatarFallback>
                </Avatar>
                <span className="ml-2 text-sm font-medium hidden lg:inline">
                  Hi,{" "}
                  {user.user_metadata?.full_name?.split(" ")[0] ||
                    user.email?.split("@")[0] ||
                    "User"}
                </span>
                <span className="ml-2 text-sm font-medium inline lg:hidden">
                  Hi,{" "}
                  {user.user_metadata?.full_name?.charAt(0) ||
                    user.email?.charAt(0) ||
                    "U"}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-56 bg-slate-800 text-fuchsia-50 border-fuchsia-700"
              align="end"
              forceMount
            >
              <DropdownMenuLabel className="font-normal text-fuchsia-200">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user.user_metadata?.full_name || user.email}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-fuchsia-700" />
              <DropdownMenuItem
                className="focus:bg-fuchsia-800/50 focus:text-fuchsia-50"
                onClick={() => router.push("/dashboard")}
              >
                <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
              </DropdownMenuItem>
              <DropdownMenuItem
                className="focus:bg-fuchsia-800/50 focus:text-fuchsia-50"
                onClick={() => router.push("/profile/setup")}
              >
                <UserCircle className="mr-2 h-4 w-4" /> My Profile
              </DropdownMenuItem>
              <DropdownMenuItem
                className="focus:bg-fuchsia-800/50 focus:text-fuchsia-50"
                onClick={() => router.push("/settings")}
              >
                <Settings className="mr-2 h-4 w-4" /> Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-fuchsia-700" />
              <DropdownMenuItem
                className="focus:bg-fuchsia-800/50 focus:text-fuchsia-50"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" /> Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          // Not Logged In State: Login/Signup Buttons
          <div className="flex items-center space-x-2">
            <Link href="/signin">
              <Button
                variant="outline"
                className="text-fuchsia-50 border-fuchsia-50 hover:bg-fuchsia-800/20 hover:text-fuchsia-50"
              >
                Log In
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white">
                Sign Up
              </Button>
            </Link>
          </div>
        )}
      </nav>

      {/* Mobile Navigation (Hamburger Menu) */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-fuchsia-50 hover:bg-fuchsia-800/20"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[250px] sm:w-[300px] bg-slate-800/95 text-fuchsia-50 p-4 border-l border-fuchsia-700"
          >
            <SheetHeader>
              <SheetTitle className="text-fuchsia-50">Navigation</SheetTitle>
              <SheetDescription className="text-fuchsia-200">
                Explore the platform
              </SheetDescription>
            </SheetHeader>
            <MobileNavItems />
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
