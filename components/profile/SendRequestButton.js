// // components/profile/SendRequestButton.jsx
// "use client"; // This component is a Client Component

// import { Button } from "@/components/ui/button";
// import { MessageSquare } from 'lucide-react';

// export function SendRequestButton({ userFullName }) {
//   const handleSendRequest = () => {
//     alert(`Simulating sending a teaching request to ${userFullName}!`);
//     // In a real app, this would trigger an API call to create a teaching request
//   };

//   return (
//     <Button className="mt-4" onClick={handleSendRequest}>
//       <MessageSquare className="h-5 w-5 mr-2" /> Send Teaching Request
//     </Button>
//   );
// }





// components/profile/SendRequestButton.jsx
"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Loader2, UserPlus } from 'lucide-react'; // Icon for sending request
import { sendPeerRequest } from '@/serverActions/requests/actions'; // Import the Server Action
import { useToast } from "@/hooks/use-toast"


export function SendRequestButton({ recipientId, currentUserId, isConnected, requestStatus }) {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false); // Track if request was just sent
  const { toast } = useToast(); // Initialize toast

  // Determine button text and disabled state based on connection status
  let buttonText = "Send Peer Request";
  let isDisabled = loading;

  if (currentUserId === recipientId) {
    buttonText = "This is Your Profile";
    isDisabled = true;
  } else if (isConnected) {
    buttonText = "Connected";
    isDisabled = true;
  } else if (requestStatus === 'pending') {
    buttonText = "Request Pending";
    isDisabled = true;
  } else if (sent) { // If successfully sent in this session
    buttonText = "Request Sent!";
    isDisabled = true;
  }

  const handleSendRequest = async () => {
    setLoading(true);
    const { success, error } = await sendPeerRequest(recipientId);
    setLoading(false);

    if (success) {
      setSent(true); // Mark as sent
      toast({
        title: "Request Sent!",
        description: "Your peer request has been sent successfully.",
        variant: "default",
      });
    } else {
      toast({
        title: "Failed to Send Request",
        description: error || "An unexpected error occurred.",
        variant: "destructive",
      });
      console.error("Failed to send request:", error);
    }
  };

  return (
    <Button
      onClick={handleSendRequest}
      disabled={isDisabled}
      className="w-full md:w-auto bg-fuchsia-600 hover:bg-fuchsia-700 text-white"
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
        </>
      ) : (
        <>
          <UserPlus className="h-5 w-5 mr-2" /> {buttonText}
        </>
      )}
    </Button>
  );
}