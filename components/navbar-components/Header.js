import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SearchOn from "@/components/little/SearchOn";
import Profiling from "@/components/navbar-components/Profiling";

export default function Header() {
  const user=1;
  return (
    <header className="bg-white shadow h-16 flex items-center justify-between px-5">
      <div >
        <Link href="/" className="flex items-center space-x-2">
          <img src={null} alt="Logo" className="h-8 w-auto" />
          <div className="text">Way2c</div>
        </Link>
      </div>
      <div>
        <nav className="flex justify-between items-center space-x-4 pr-2">
          <SearchOn/>
          <Link href="/" className="text-gray-700 hover:text-gray-900 ">Home</Link>
          <Link href="/about" className="text-gray-700 hover:text-gray-900 ">About</Link>
          <Profiling user={user} />       
        </nav>
      </div>
    </header>
  );
}
