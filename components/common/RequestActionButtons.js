// // components/common/RequestActionButtons.jsx
// "use client"; // <-- IMPORTANT: This is a Client Component

// import { Button } from "@/components/ui/button";
// import { CheckCircle, XCircle, MessageSquare } from 'lucide-react';
// import Link from 'next/link';

// export function RequestActionButtons({ requestId, status, sessionId }) {
//   // These functions are now defined directly within the Client Component
//   const handleAccept = () => {
//     alert(`Simulating accepting request ${requestId}`);
//     // In a real app, you would call a Server Action here:
//     // await acceptRequestServerAction(requestId);
//   };

//   const handleDecline = () => {
//     alert(`Simulating declining request ${requestId}`);
//     // In a real app, you would call a Server Action here:
//     // await declineRequestServerAction(requestId);
//   };

//   if (status === 'pending') {
//     return (
//       <div className="flex gap-2 mt-4">
//         <Button variant="outline" onClick={handleAccept}>
//           <CheckCircle className="h-4 w-4 mr-2" /> Accept
//         </Button>
//         <Button variant="destructive" onClick={handleDecline}>
//           <XCircle className="h-4 w-4 mr-2" /> Decline
//         </Button>
//       </div>
//     );
//   } else if (status === 'accepted' && sessionId) {
//     return (
//       <Link href={`/chat/${sessionId}`}>
//         <Button className="mt-4">
//           <MessageSquare className="h-4 w-4 mr-2" /> Go to Chat
//         </Button>
//       </Link>
//     );
//   }
//   return null;
// }



// components/common/RequestActionButtons.jsx
"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle, XCircle, MessageSquare } from 'lucide-react';
import { useToast } from "@/hooks/use-toast"
import { acceptPeerRequest, declinePeerRequest } from '@/serverActions/requests/actions'; // Import new actions
import Link from 'next/link';

export function RequestActionButtons({ requestId, status, sessionId }) {
  const [loading, setLoading] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(status); // Local state for immediate UI update
  const { toast } = useToast();

  const handleAccept = async () => {
    setLoading(true);
    const { success, error } = await acceptPeerRequest(requestId);
    setLoading(false);

    if (success) {
      setCurrentStatus('accepted');
      toast({
        title: "Request Accepted!",
        description: "You are now connected.",
        variant: "default",
      });
    } else {
      toast({
        title: "Failed to Accept Request",
        description: error || "An unexpected error occurred.",
        variant: "destructive",
      });
      console.error("Failed to accept request:", error);
    }
  };

  const handleDecline = async () => {
    setLoading(true);
    const { success, error } = await declinePeerRequest(requestId);
    setLoading(false);

    if (success) {
      setCurrentStatus('declined');
      toast({
        title: "Request Declined",
        description: "The peer request has been declined.",
        variant: "default",
      });
    } else {
      toast({
        title: "Failed to Decline Request",
        description: error || "An unexpected error occurred.",
        variant: "destructive",
      });
      console.error("Failed to decline request:", error);
    }
  };

  if (currentStatus === 'pending') {
    return (
      <div className="flex gap-2 mt-4">
        <Button
          onClick={handleAccept}
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 text-white flex-1"
        >
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <CheckCircle className="h-4 w-4 mr-2" />
          )}
          Accept
        </Button>
        <Button
          onClick={handleDecline}
          disabled={loading}
          variant="destructive"
          className="flex-1"
        >
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <XCircle className="h-4 w-4 mr-2" />
          )}
          Decline
        </Button>
      </div>
    );
  } else if (currentStatus === 'accepted') {
    return (
      <Link href={`/chat/${sessionId || 'new'}`} className="w-full"> {/* Placeholder for chat link */}
        <Button size="sm" className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white">
          <MessageSquare className="h-4 w-4 mr-2" /> Go to Chat
        </Button>
      </Link>
    );
  } else if (currentStatus === 'declined') {
    return (
      <Button disabled className="mt-4 w-full" variant="outline">
        <XCircle className="h-4 w-4 mr-2" /> Declined
      </Button>
    );
  }

  return null; // Should not happen
}