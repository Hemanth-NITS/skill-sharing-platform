// components/common/RequestActionButtons.jsx
"use client"; // <-- IMPORTANT: This is a Client Component

import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, MessageSquare } from 'lucide-react';
import Link from 'next/link';

export function RequestActionButtons({ requestId, status, sessionId }) {
  // These functions are now defined directly within the Client Component
  const handleAccept = () => {
    alert(`Simulating accepting request ${requestId}`);
    // In a real app, you would call a Server Action here:
    // await acceptRequestServerAction(requestId);
  };

  const handleDecline = () => {
    alert(`Simulating declining request ${requestId}`);
    // In a real app, you would call a Server Action here:
    // await declineRequestServerAction(requestId);
  };

  if (status === 'pending') {
    return (
      <div className="flex gap-2 mt-4">
        <Button variant="outline" onClick={handleAccept}>
          <CheckCircle className="h-4 w-4 mr-2" /> Accept
        </Button>
        <Button variant="destructive" onClick={handleDecline}>
          <XCircle className="h-4 w-4 mr-2" /> Decline
        </Button>
      </div>
    );
  } else if (status === 'accepted' && sessionId) {
    return (
      <Link href={`/chat/${sessionId}`}>
        <Button className="mt-4">
          <MessageSquare className="h-4 w-4 mr-2" /> Go to Chat
        </Button>
      </Link>
    );
  }
  return null;
}