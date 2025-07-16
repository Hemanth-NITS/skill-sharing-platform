// components/little/SubmitButton.jsx
"use client"; // This is a Client Component

import { useFormStatus } from "react-dom"; // Hook for form status
import { Button } from "@/components/ui/button"; // Your Shadcn Button
import { SearchIcon, Loader2 } from 'lucide-react'; // Icons

export function SubmitButton({ children }) {
  const { pending } = useFormStatus(); // Get the pending state of the form

  return (
    <Button type="submit" aria-disabled={pending} disabled={pending}
      className="w-full md:w-auto bg-fuchsia-600 hover:bg-fuchsia-700 text-white"
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Searching...
        </>
      ) : (
        <>
          <SearchIcon className="h-5 w-5 mr-2" /> {children}
        </>
      )}
    </Button>
  );
}