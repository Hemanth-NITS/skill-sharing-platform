import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";

export default function SearchOn({ searchOn }) {
  return (
    <div>
      <form className="relative">
        <div>
          {" "}
          <Input
            type="text"
            placeholder="Search tags..."
            className="w-64 rounded-full p-4 pr-10"
          />
          <Button type="submit" className="p-1 h-6 w-6 absolute right-2 rounded-full top-1/2 -translate-y-1/2">
            <Search className="h-1 w-5" />
          </Button>
        </div>
      </form>
    </div>
  );
}
