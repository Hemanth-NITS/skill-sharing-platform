// components/common/SubmitButton.jsx
"use client"; // <-- IMPORTANT: Marks this as a client component

import { useFormStatus } from 'react-dom'; // Next.js exports this from 'react-dom'
import { Button } from "@/components/ui/button"; // Shadcn UI Button

export function SubmitButton({ children, ...props }) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" aria-disabled={pending} disabled={pending} {...props}>
      {pending ? 'Searching...' : children}
    </Button>
  );
}