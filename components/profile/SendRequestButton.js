// components/profile/SendRequestButton.jsx
"use client"; // This component is a Client Component

import { Button } from "@/components/ui/button";
import { MessageSquare } from 'lucide-react';

export function SendRequestButton({ userFullName }) {
  const handleSendRequest = () => {
    alert(`Simulating sending a teaching request to ${userFullName}!`);
    // In a real app, this would trigger an API call to create a teaching request
  };

  return (
    <Button className="mt-4" onClick={handleSendRequest}>
      <MessageSquare className="h-5 w-5 mr-2" /> Send Teaching Request
    </Button>
  );
}