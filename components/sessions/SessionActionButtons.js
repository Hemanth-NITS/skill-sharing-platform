// // components/sessions/SessionActionButtons.jsx
// "use client";

// import { useState } from 'react';
// import { Button } from "@/components/ui/button";
// import { Loader2, CheckCircle, Clock, XCircle, CalendarPlus, MessageSquare } from 'lucide-react';
// import { useToast } from "@/hooks/use-toast";

// import { acceptSession, proposeReschedule, cancelSession } from '@/serverActions/sessions/actions'; // Import new actions
// import Link from 'next/link';

// // You'll need a date picker component. For now, we'll use a simple prompt for reschedule.
// // Later, you might integrate a library like react-day-picker or react-datepicker.

// export function SessionActionButtons({ sessionId, sessionStatus, currentUserId, proposerId, attendeeId }) {
//   const [loading, setLoading] = useState(false);
//   const [status, setStatus] = useState(sessionStatus); // Local state for immediate UI update
//   const { toast } = useToast();

//   const isProposer = currentUserId === proposerId;
//   const isAttendee = currentUserId === attendeeId;

//   const handleAccept = async () => {
//     setLoading(true);
//     const { success, error } = await acceptSession(sessionId);
//     setLoading(false);

//     if (success) {
//       setStatus('accepted');
//       toast({
//         title: "Session Accepted!",
//         description: "The session has been confirmed.",
//         variant: "default",
//       });
//     } else {
//       toast({
//         title: "Failed to Accept Session",
//         description: error || "An unexpected error occurred.",
//         variant: "destructive",
//       });
//       console.error("Failed to accept session:", error);
//     }
//   };

//   const handleProposeReschedule = async () => {
//     // For now, a simple prompt. Replace with a proper modal/date picker later.
//     const newDateTimeString = prompt("Enter new proposed date and time (e.g., YYYY-MM-DDTHH:MM:SSZ for ISO format):");
//     if (!newDateTimeString) return;

//     const newDuration = parseInt(prompt("Enter new duration in minutes (e.g., 60):"), 10);
//     if (isNaN(newDuration) || newDuration <= 0) {
//       toast({ title: "Invalid Duration", description: "Please enter a valid number for duration.", variant: "destructive" });
//       return;
//     }

//     const newMeetingLink = prompt("Enter new meeting link (optional, leave blank if none):");

//     setLoading(true);
//     const { success, error } = await proposeReschedule(sessionId, newDateTimeString, newDuration, newMeetingLink || null);
//     setLoading(false);

//     if (success) {
//       setStatus('rescheduled_pending'); // Assuming proposer sets this
//       toast({
//         title: "Reschedule Proposed!",
//         description: "A new time has been proposed for the session.",
//         variant: "default",
//       });
//     } else {
//       toast({
//         title: "Failed to Propose Reschedule",
//         description: error || "An unexpected error occurred.",
//         variant: "destructive",
//       });
//       console.error("Failed to propose reschedule:", error);
//     }
//   };

//   const handleCancel = async () => {
//     if (!confirm("Are you sure you want to cancel this session?")) return; // Using confirm for now

//     setLoading(true);
//     const { success, error } = await cancelSession(sessionId);
//     setLoading(false);

//     if (success) {
//       setStatus('cancelled');
//       toast({
//         title: "Session Cancelled",
//         description: "The session has been cancelled.",
//         variant: "default",
//       });
//     } else {
//       toast({
//         title: "Failed to Cancel Session",
//         description: error || "An unexpected error occurred.",
//         variant: "destructive",
//       });
//       console.error("Failed to cancel session:", error);
//     }
//   };

//   // Render logic based on status and user role
//   if (status === 'proposed') {
//     if (isAttendee) {
//       return (
//         <div className="flex gap-2 mt-4">
//           <Button
//             onClick={handleAccept}
//             disabled={loading}
//             className="bg-green-600 hover:bg-green-700 text-white flex-1"
//           >
//             {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CheckCircle className="h-4 w-4 mr-2" />}
//             Accept
//           </Button>
//           <Button
//             onClick={handleProposeReschedule}
//             disabled={loading}
//             variant="outline"
//             className="flex-1"
//           >
//             {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CalendarPlus className="h-4 w-4 mr-2" />}
//             Reschedule
//           </Button>
//           <Button
//             onClick={handleCancel}
//             disabled={loading}
//             variant="destructive"
//             className="flex-1"
//           >
//             {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <XCircle className="h-4 w-4 mr-2" />}
//             Cancel
//           </Button>
//         </div>
//       );
//     } else if (isProposer) {
//       return (
//         <div className="flex gap-2 mt-4">
//           <Button disabled className="flex-1" variant="outline">
//             <Clock className="h-4 w-4 mr-2" /> Waiting for Acceptance
//           </Button>
//           <Button
//             onClick={handleCancel}
//             disabled={loading}
//             variant="destructive"
//             className="flex-1"
//           >
//             {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <XCircle className="h-4 w-4 mr-2" />}
//             Cancel
//           </Button>
//         </div>
//       );
//     }
//   } else if (status === 'accepted') {
//     // Both proposer and attendee can go to chat or cancel
//     return (
//       <div className="flex gap-2 mt-4">
//         <Link href={`/chat/${sessionId}`} className="flex-1">
//           <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
//             <MessageSquare className="h-4 w-4 mr-2" /> Go to Chat
//           </Button>
//         </Link>
//         <Button
//           onClick={handleCancel}
//           disabled={loading}
//           variant="destructive"
//           className="flex-1"
//         >
//           {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <XCircle className="h-4 w-4 mr-2" />}
//           Cancel
//         </Button>
//       </div>
//     );
//   } else if (status === 'rescheduled_pending') {
//     if (isAttendee) { // Attendee needs to accept/decline reschedule
//       return (
//         <div className="flex gap-2 mt-4">
//           <Button
//             onClick={handleAccept} // Re-use acceptSession for accepting reschedule
//             disabled={loading}
//             className="bg-green-600 hover:bg-green-700 text-white flex-1"
//           >
//             {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CheckCircle className="h-4 w-4 mr-2" />}
//             Accept Reschedule
//           </Button>
//           <Button
//             onClick={handleCancel} // Can also cancel the whole session
//             disabled={loading}
//             variant="destructive"
//             className="flex-1"
//           >
//             {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <XCircle className="h-4 w-4 mr-2" />}
//             Decline Reschedule / Cancel
//           </Button>
//         </div>
//       );
//     } else if (isProposer) { // Proposer waits for attendee
//       return (
//         <div className="flex gap-2 mt-4">
//           <Button disabled className="flex-1" variant="outline">
//             <Clock className="h-4 w-4 mr-2" /> Reschedule Pending
//           </Button>
//           <Button
//             onClick={handleCancel}
//             disabled={loading}
//             variant="destructive"
//             className="flex-1"
//           >
//             {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <XCircle className="h-4 w-4 mr-2" />}
//             Cancel
//           </Button>
//         </div>
//       );
//     }
//   } else if (status === 'rescheduled_accepted') {
//     return (
//       <div className="flex gap-2 mt-4">
//         <Link href={`/chat/${sessionId}`} className="flex-1">
//           <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
//             <MessageSquare className="h-4 w-4 mr-2" /> Go to Chat
//           </Button>
//         </Link>
//         <Button
//           onClick={handleCancel}
//           disabled={loading}
//           variant="destructive"
//           className="flex-1"
//         >
//           {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <XCircle className="h-4 w-4 mr-2" />}
//           Cancel
//         </Button>
//       </div>
//     );
//   } else if (status === 'cancelled') {
//     return (
//       <Button disabled className="mt-4 w-full" variant="destructive">
//         <XCircle className="h-4 w-4 mr-2" /> Session Cancelled
//       </Button>
//     );
//   } else if (status === 'completed') {
//     return (
//       <Button disabled className="mt-4 w-full" variant="secondary">
//         <CheckCircle className="h-4 w-4 mr-2" /> Session Completed
//       </Button>
//     );
//   }

//   return null; // Fallback
// }








// // components/sessions/SessionActionButtons.jsx
// "use client";

// import { useState } from 'react';
// import { Button } from "@/components/ui/button";
// import { Loader2, CheckCircle, Clock, XCircle, CalendarPlus, MessageSquare } from 'lucide-react';
// import { useToast } from "@/hooks/use-toast";
// import { acceptSession, proposeReschedule, cancelSession } from '@/serverActions/sessions/actions';
// import Link from 'next/link';

// export function SessionActionButtons({ sessionId, sessionStatus, currentUserId, proposerId, attendeeId }) {
//   const [loading, setLoading] = useState(false);
//   const [status, setStatus] = useState(sessionStatus); // Local state for immediate UI update
//   const { toast } = useToast();

//   const isProposer = currentUserId === proposerId;
//   const isAttendee = currentUserId === attendeeId;

//   const handleAccept = async () => {
//     setLoading(true);
//     const { success, error } = await acceptSession(sessionId);
//     setLoading(false);

//     if (success) {
//       // Logic for new status based on what was accepted
//       // If current status was 'proposed', new is 'accepted'
//       // If current status was 'rescheduled_pending', new is 'rescheduled_accepted'
//       if (status === 'proposed') {
//         setStatus('accepted');
//         toast({
//           title: "Session Accepted!",
//           description: "The session has been confirmed.",
//           variant: "default",
//         });
//       } else if (status === 'rescheduled_pending') {
//         setStatus('rescheduled_accepted');
//         toast({
//           title: "Reschedule Accepted!",
//           description: "The new session time has been confirmed.",
//           variant: "default",
//         });
//       }
//     } else {
//       toast({
//         title: "Failed to Accept Session",
//         description: error || "An unexpected error occurred.",
//         variant: "destructive",
//       });
//       console.error("Failed to accept session:", error);
//     }
//   };

//   const handleProposeReschedule = async () => {
//     // For now, a simple prompt. Replace with a proper modal/date picker later.
//     const newDateTimeString = prompt("Enter new proposed date and time (e.g., YYYY-MM-DDTHH:MM:SSZ):");
//     if (!newDateTimeString) return;

//     const newDuration = parseInt(prompt("Enter new duration in minutes (e.g., 60):"), 10);
//     if (isNaN(newDuration) || newDuration <= 0) {
//       toast({ title: "Invalid Duration", description: "Please enter a valid number for duration.", variant: "destructive" });
//       return;
//     }

//     const newMeetingLink = prompt("Enter new meeting link (optional, leave blank if none):");

//     setLoading(true);
//     const { success, error } = await proposeReschedule(sessionId, newDateTimeString, newDuration, newMeetingLink || null);
//     setLoading(false);

//     if (success) {
//       setStatus('rescheduled_pending'); // Status for both users after a reschedule is proposed
//       toast({
//         title: "Reschedule Proposed!",
//         description: "A new time has been proposed for the session.",
//         variant: "default",
//       });
//     } else {
//       toast({
//         title: "Failed to Propose Reschedule",
//         description: error || "An unexpected error occurred.",
//         variant: "destructive",
//       });
//       console.error("Failed to propose reschedule:", error);
//     }
//   };

//   const handleCancel = async () => {
//     if (!confirm("Are you sure you want to cancel this session?")) return;

//     setLoading(true);
//     const { success, error } = await cancelSession(sessionId);
//     setLoading(false);

//     if (success) {
//       setStatus('cancelled');
//       toast({
//         title: "Session Cancelled",
//         description: "The session has been cancelled.",
//         variant: "default",
//       });
//     } else {
//       toast({
//         title: "Failed to Cancel Session",
//         description: error || "An unexpected error occurred.",
//         variant: "destructive",
//       });
//       console.error("Failed to cancel session:", error);
//     }
//   };

//   // --- Render Logic ---
//   if (status === 'proposed') {
//     if (isAttendee) {
//       return (
//         <div className="flex gap-2 mt-4">
//           <Button
//             onClick={handleAccept}
//             disabled={loading}
//             className="bg-green-600 hover:bg-green-700 text-white flex-1"
//           >
//             {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CheckCircle className="h-4 w-4 mr-2" />}
//             Accept
//           </Button>
//           <Button
//             onClick={handleProposeReschedule}
//             disabled={loading}
//             variant="outline"
//             className="flex-1"
//           >
//             {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CalendarPlus className="h-4 w-4 mr-2" />}
//             Reschedule
//           </Button>
//           <Button
//             onClick={handleCancel}
//             disabled={loading}
//             variant="destructive"
//             className="flex-1"
//           >
//             {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <XCircle className="h-4 w-4 mr-2" />}
//             Cancel
//           </Button>
//         </div>
//       );
//     } else if (isProposer) { // Proposer of the original session
//       return (
//         <div className="flex gap-2 mt-4">
//           <Button disabled className="flex-1" variant="outline">
//             <Clock className="h-4 w-4 mr-2" /> Waiting for Acceptance
//           </Button>
//           {/* Proposer can also propose a reschedule */}
//           <Button
//             onClick={handleProposeReschedule}
//             disabled={loading}
//             variant="outline"
//             className="flex-1"
//           >
//             {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CalendarPlus className="h-4 w-4 mr-2" />}
//             Propose Reschedule
//           </Button>
//           <Button
//             onClick={handleCancel}
//             disabled={loading}
//             variant="destructive"
//             className="flex-1"
//           >
//             {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <XCircle className="h-4 w-4 mr-2" />}
//             Cancel
//           </Button>
//         </div>
//       );
//     }
//   } else if (status === 'accepted') {
//     // Both proposer and attendee can go to chat or cancel
//     return (
//       <div className="flex gap-2 mt-4">
//         <Link href={`/chat/${sessionId}`} className="flex-1">
//           <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
//             <MessageSquare className="h-4 w-4 mr-2" /> Go to Chat
//           </Button>
//         </Link>
//         {/* Either party can propose reschedule or cancel accepted session */}
//         <Button
//           onClick={handleProposeReschedule}
//           disabled={loading}
//           variant="outline"
//           className="flex-1"
//         >
//           {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CalendarPlus className="h-4 w-4 mr-2" />}
//           Reschedule
//         </Button>
//         <Button
//           onClick={handleCancel}
//           disabled={loading}
//           variant="destructive"
//           className="flex-1"
//         >
//           {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <XCircle className="h-4 w-4 mr-2" />}
//           Cancel
//         </Button>
//       </div>
//     );
//   } else if (status === 'rescheduled_pending') {
//     // This is the key logic update for reschedule pending
//     if ((isProposer && currentUserId === proposerId) || (isAttendee && currentUserId === attendeeId)) {
//         // If current user proposed the reschedule, or is the original proposer
//         // they should wait for the other party's response.
//         if (sessionStatus === 'rescheduled_pending' && currentUserId === proposerId) {
//             // Proposer of the original session, after they or attendee proposed reschedule
//             return (
//                 <div className="flex gap-2 mt-4">
//                     <Button disabled className="flex-1" variant="outline">
//                         <Clock className="h-4 w-4 mr-2" /> Reschedule Pending
//                     </Button>
//                     <Button
//                         onClick={handleCancel}
//                         disabled={loading}
//                         variant="destructive"
//                         className="flex-1"
//                     >
//                         {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <XCircle className="h-4 w-4 mr-2" />}
//                         Cancel
//                     </Button>
//                 </div>
//             );
//         } else if (sessionStatus === 'rescheduled_pending' && currentUserId === attendeeId) {
//             // Attendee of the original session, after proposer proposed reschedule
//             return (
//                 <div className="flex gap-2 mt-4">
//                     <Button
//                         onClick={handleAccept} // Re-use acceptSession for accepting reschedule
//                         disabled={loading}
//                         className="bg-green-600 hover:bg-green-700 text-white flex-1"
//                     >
//                         {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CheckCircle className="h-4 w-4 mr-2" />}
//                         Accept Reschedule
//                     </Button>
//                     <Button
//                         onClick={handleCancel} // Can also cancel the whole session
//                         disabled={loading}
//                         variant="destructive"
//                         className="flex-1"
//                     >
//                         {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <XCircle className="h-4 w-4 mr-2" />}
//                         Decline / Cancel
//                     </Button>
//                 </div>
//             );
//         }
//     }
//   } else if (status === 'rescheduled_accepted') {
//     return (
//       <div className="flex gap-2 mt-4">
//         <Link href={`/chat/${sessionId}`} className="flex-1">
//           <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
//             <MessageSquare className="h-4 w-4 mr-2" /> Go to Chat
//           </Button>
//         </Link>
//         <Button
//           onClick={handleProposeReschedule}
//           disabled={loading}
//           variant="outline"
//           className="flex-1"
//         >
//           {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CalendarPlus className="h-4 w-4 mr-2" />}
//           Reschedule
//         </Button>
//         <Button
//           onClick={handleCancel}
//           disabled={loading}
//           variant="destructive"
//           className="flex-1"
//         >
//           {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <XCircle className="h-4 w-4 mr-2" />}
//           Cancel
//         </Button>
//       </div>
//     );
//   } else if (status === 'cancelled') {
//     return (
//       <Button disabled className="mt-4 w-full" variant="destructive">
//         <XCircle className="h-4 w-4 mr-2" /> Session Cancelled
//       </Button>
//     );
//   } else if (status === 'completed') {
//     return (
//       <Button disabled className="mt-4 w-full" variant="secondary">
//         <CheckCircle className="h-4 w-4 mr-2" /> Session Completed
//       </Button>
//     );
//   }

//   return null; // Fallback for unexpected states
// }








// // components/sessions/SessionActionButtons.jsx
// "use client";

// import { useState } from 'react';
// import { Button } from "@/components/ui/button";
// import { Loader2, CheckCircle, Clock, XCircle, CalendarPlus, MessageSquare } from 'lucide-react';
// import { useToast } from "@/hooks/use-toast";
// import { acceptSession, proposeReschedule, cancelSession } from '@/serverActions/sessions/actions';
// import Link from 'next/link';

// export function SessionActionButtons({ sessionId, sessionStatus, currentUserId, proposerId, attendeeId }) {
//   const [loading, setLoading] = useState(false);
//   const [status, setStatus] = useState(sessionStatus); // Local state for immediate UI update
//   const { toast } = useToast();

//   const isProposer = currentUserId === proposerId;
//   const isAttendee = currentUserId === attendeeId;

//   const handleAccept = async () => {
//     setLoading(true);
//     const { success, error } = await acceptSession(sessionId);
//     setLoading(false);

//     if (success) {
//       // Logic for new status based on what was accepted
//       // If current status was 'proposed', new is 'accepted'
//       // If current status was 'rescheduled_pending', new is 'rescheduled_accepted'
//       if (status === 'proposed') {
//         setStatus('accepted');
//         toast({
//           title: "Session Accepted!",
//           description: "The session has been confirmed.",
//           variant: "default",
//         });
//       } else if (status === 'rescheduled_pending') {
//         setStatus('rescheduled_accepted');
//         toast({
//           title: "Reschedule Accepted!",
//           description: "The new session time has been confirmed.",
//           variant: "default",
//         });
//       }
//     } else {
//       toast({
//         title: "Failed to Accept Session",
//         description: error || "An unexpected error occurred.",
//         variant: "destructive",
//       });
//       console.error("Failed to accept session:", error);
//     }
//   };

//   const handleProposeReschedule = async () => {
//     const newDateTimeString = prompt("Enter new proposed date and time (e.g., YYYY-MM-DDTHH:MM:SSZ):");
//     if (!newDateTimeString) return;

//     const newDuration = parseInt(prompt("Enter new duration in minutes (e.g., 60):"), 10);
//     if (isNaN(newDuration) || newDuration <= 0) {
//       toast({ title: "Invalid Duration", description: "Please enter a valid number for duration.", variant: "destructive" });
//       return;
//     }

//     const newMeetingLink = prompt("Enter new meeting link (optional, leave blank if none):");

//     setLoading(true);
//     const { success, error } = await proposeReschedule(sessionId, newDateTimeString, newDuration, newMeetingLink || null);
//     setLoading(false);

//     if (success) {
//       setStatus('rescheduled_pending'); // Status for both users after a reschedule is proposed
//       toast({
//         title: "Reschedule Proposed!",
//         description: "A new time has been proposed for the session.",
//         variant: "default",
//       });
//     } else {
//       toast({
//         title: "Failed to Propose Reschedule",
//         description: error || "An unexpected error occurred.",
//         variant: "destructive",
//       });
//       console.error("Failed to propose reschedule:", error);
//     }
//   };

//   const handleCancel = async () => {
//     if (!confirm("Are you sure you want to cancel this session?")) return;

//     setLoading(true);
//     const { success, error } = await cancelSession(sessionId);
//     setLoading(false);

//     if (success) {
//       setStatus('cancelled');
//       toast({
//         title: "Session Cancelled",
//         description: "The session has been cancelled.",
//         variant: "default",
//       });
//     } else {
//       toast({
//         title: "Failed to Cancel Session",
//         description: error || "An unexpected error occurred.",
//         variant: "destructive",
//       });
//       console.error("Failed to cancel session:", error);
//     }
//   };

//   // --- Render Logic ---
//   if (status === 'proposed') {
//     if (isAttendee) {
//       return (
//         <div className="flex gap-2 mt-4">
//           <Button
//             onClick={handleAccept}
//             disabled={loading}
//             className="bg-green-600 hover:bg-green-700 text-white flex-1"
//           >
//             {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CheckCircle className="h-4 w-4 mr-2" />}
//             Accept
//           </Button>
//           <Button
//             onClick={handleProposeReschedule}
//             disabled={loading}
//             variant="outline"
//             className="flex-1"
//           >
//             {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CalendarPlus className="h-4 w-4 mr-2" />}
//             Reschedule
//           </Button>
//           <Button
//             onClick={handleCancel}
//             disabled={loading}
//             variant="destructive"
//             className="flex-1"
//           >
//             {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <XCircle className="h-4 w-4 mr-2" />}
//             Cancel
//           </Button>
//         </div>
//       );
//     } else if (isProposer) {
//       return (
//         <div className="flex gap-2 mt-4">
//           <Button disabled className="flex-1" variant="outline">
//             <Clock className="h-4 w-4 mr-2" /> Waiting for Acceptance
//           </Button>
//           <Button
//             onClick={handleProposeReschedule}
//             disabled={loading}
//             variant="outline"
//             className="flex-1"
//           >
//             {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CalendarPlus className="h-4 w-4 mr-2" />}
//             Propose Reschedule
//           </Button>
//           <Button
//             onClick={handleCancel}
//             disabled={loading}
//             variant="destructive"
//             className="flex-1"
//           >
//             {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <XCircle className="h-4 w-4 mr-2" />}
//             Cancel
//           </Button>
//         </div>
//       );
//     }
//   } else if (status === 'accepted') {
//     return (
//       <div className="flex gap-2 mt-4">
//         <Link href={`/chat/${sessionId}`} className="flex-1">
//           <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
//             <MessageSquare className="h-4 w-4 mr-2" /> Go to Chat
//           </Button>
//         </Link>
//         <Button
//           onClick={handleProposeReschedule}
//           disabled={loading}
//           variant="outline"
//           className="flex-1"
//         >
//           {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CalendarPlus className="h-4 w-4 mr-2" />}
//           Reschedule
//         </Button>
//         <Button
//           onClick={handleCancel}
//           disabled={loading}
//           variant="destructive"
//           className="flex-1"
//         >
//           {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <XCircle className="h-4 w-4 mr-2" />}
//           Cancel
//         </Button>
//       </div>
//     );
//   } else if (status === 'rescheduled_pending') {
//     // This is the logic you observed that was confusing for reschedule_pending
//     // It shows Accept/Reschedule/Cancel to the attendee, and Waiting/Cancel to proposer
//     // regardless of who initiated the reschedule. This will be fixed in the NEXT step.
//     if (isAttendee) {
//       return (
//         <div className="flex gap-2 mt-4">
//           <Button
//             onClick={handleAccept} // Re-use acceptSession for accepting reschedule
//             disabled={loading}
//             className="bg-green-600 hover:bg-green-700 text-white flex-1"
//           >
//             {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CheckCircle className="h-4 w-4 mr-2" />}
//             Accept Reschedule
//           </Button>
//           <Button
//             onClick={handleProposeReschedule} // Attendee can propose another reschedule
//             disabled={loading}
//             variant="outline"
//             className="flex-1"
//           >
//             {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CalendarPlus className="h-4 w-4 mr-2" />}
//             Reschedule
//           </Button>
//           <Button
//             onClick={handleCancel}
//             disabled={loading}
//             variant="destructive"
//             className="flex-1"
//           >
//             {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <XCircle className="h-4 w-4 mr-2" />}
//             Cancel
//           </Button>
//         </div>
//       );
//     } else if (isProposer) {
//       return (
//         <div className="flex gap-2 mt-4">
//           <Button disabled className="flex-1" variant="outline">
//             <Clock className="h-4 w-4 mr-2" /> Reschedule Pending
//           </Button>
//           <Button
//             onClick={handleProposeReschedule} // Proposer can propose another reschedule
//             disabled={loading}
//             variant="outline"
//             className="flex-1"
//           >
//             {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CalendarPlus className="h-4 w-4 mr-2" />}
//             Reschedule
//           </Button>
//           <Button
//             onClick={handleCancel}
//             disabled={loading}
//             variant="destructive"
//             className="flex-1"
//           >
//             {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <XCircle className="h-4 w-4 mr-2" />}
//             Cancel
//           </Button>
//         </div>
//       );
//     }
//   } else if (status === 'rescheduled_accepted') {
//     return (
//       <div className="flex gap-2 mt-4">
//         <Link href={`/chat/${sessionId}`} className="flex-1">
//           <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
//             <MessageSquare className="h-4 w-4 mr-2" /> Go to Chat
//           </Button>
//         </Link>
//         <Button
//           onClick={handleProposeReschedule}
//           disabled={loading}
//           variant="outline"
//           className="flex-1"
//         >
//           {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CalendarPlus className="h-4 w-4 mr-2" />}
//           Reschedule
//         </Button>
//         <Button
//           onClick={handleCancel}
//           disabled={loading}
//           variant="destructive"
//           className="flex-1"
//         >
//           {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <XCircle className="h-4 w-4 mr-2" />}
//           Cancel
//         </Button>
//       </div>
//     );
//   } else if (status === 'cancelled') {
//     return (
//       <Button disabled className="mt-4 w-full" variant="destructive">
//         <XCircle className="h-4 w-4 mr-2" /> Session Cancelled
//       </Button>
//     );
//   } else if (status === 'completed') {
//     return (
//       <Button disabled className="mt-4 w-full" variant="secondary">
//         <CheckCircle className="h-4 w-4 mr-2" /> Session Completed
//       </Button>
//     );
//   }

//   return null;
// }








// // components/sessions/SessionActionButtons.jsx
// "use client";

// import { useState } from 'react';
// import { Button } from "@/components/ui/button";
// import { Loader2, CheckCircle, Clock, XCircle, CalendarPlus, MessageSquare } from 'lucide-react';
// import { useToast } from "@/hooks/use-toast";
// import { acceptSession, proposeReschedule, cancelSession } from '@/serverActions/sessions/actions';
// import Link from 'next/link';

// export function SessionActionButtons({ sessionId, sessionStatus, currentUserId, proposerId, attendeeId, lastRescheduleInitiatorId }) { // NEW prop
//   const [loading, setLoading] = useState(false);
//   const [status, setStatus] = useState(sessionStatus);
//   const { toast } = useToast();

//   const isProposer = currentUserId === proposerId;
//   const isAttendee = currentUserId === attendeeId;

//   const handleAccept = async () => {
//     setLoading(true);
//     const { success, error } = await acceptSession(sessionId);
//     setLoading(false);

//     if (success) {
//       if (status === 'proposed') {
//         setStatus('accepted');
//         toast({
//           title: "Session Accepted!",
//           description: "The session has been confirmed.",
//           variant: "default",
//         });
//       } else if (status === 'rescheduled_pending') {
//         setStatus('rescheduled_accepted');
//         toast({
//           title: "Reschedule Accepted!",
//           description: "The new session time has been confirmed.",
//           variant: "default",
//         });
//       }
//     } else {
//       toast({
//         title: "Failed to Accept Session",
//         description: error || "An unexpected error occurred.",
//         variant: "destructive",
//       });
//       console.error("Failed to accept session:", error);
//     }
//   };

//   const handleProposeReschedule = async () => {
//     const newDateTimeString = prompt("Enter new proposed date and time (e.g., YYYY-MM-DDTHH:MM:SSZ):");
//     if (!newDateTimeString) return;

//     const newDuration = parseInt(prompt("Enter new duration in minutes (e.g., 60):"), 10);
//     if (isNaN(newDuration) || newDuration <= 0) {
//       toast({ title: "Invalid Duration", description: "Please enter a valid number for duration.", variant: "destructive" });
//       return;
//     }

//     const newMeetingLink = prompt("Enter new meeting link (optional, leave blank if none):");

//     setLoading(true);
//     const { success, error } = await proposeReschedule(sessionId, newDateTimeString, newDuration, newMeetingLink || null);
//     setLoading(false);

//     if (success) {
//       setStatus('rescheduled_pending');
//       toast({
//         title: "Reschedule Proposed!",
//         description: "A new time has been proposed for the session.",
//         variant: "default",
//       });
//     } else {
//       toast({
//         title: "Failed to Propose Reschedule",
//         description: error || "An unexpected error occurred.",
//         variant: "destructive",
//       });
//       console.error("Failed to propose reschedule:", error);
//     }
//   };

//   const handleCancel = async () => {
//     if (!confirm("Are you sure you want to cancel this session?")) return;

//     setLoading(true);
//     const { success, error } = await cancelSession(sessionId);
//     setLoading(false);

//     if (success) {
//       setStatus('cancelled');
//       toast({
//         title: "Session Cancelled",
//         description: "The session has been cancelled.",
//         variant: "default",
//       });
//     } else {
//       toast({
//         title: "Failed to Cancel Session",
//         description: error || "An unexpected error occurred.",
//         variant: "destructive",
//       });
//       console.error("Failed to cancel session:", error);
//     }
//   };

//   // --- Render Logic ---
//   if (status === 'proposed') {
//     if (isAttendee) { // Attendee needs to accept/reschedule/cancel
//       return (
//         <div className="flex gap-2 mt-4">
//           <Button
//             onClick={handleAccept}
//             disabled={loading}
//             className="bg-green-600 hover:bg-green-700 text-white flex-1"
//           >
//             {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CheckCircle className="h-4 w-4 mr-2" />}
//             Accept
//           </Button>
//           <Button
//             onClick={handleProposeReschedule}
//             disabled={loading}
//             variant="outline"
//             className="flex-1"
//           >
//             {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CalendarPlus className="h-4 w-4 mr-2" />}
//             Reschedule
//           </Button>
//           <Button
//             onClick={handleCancel}
//             disabled={loading}
//             variant="destructive"
//             className="flex-1"
//           >
//             {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <XCircle className="h-4 w-4 mr-2" />}
//             Cancel
//           </Button>
//         </div>
//       );
//     } else if (isProposer) { // Proposer of the original session
//       return (
//         <div className="flex gap-2 mt-4">
//           <Button disabled className="flex-1" variant="outline">
//             <Clock className="h-4 w-4 mr-2" /> Waiting for Acceptance
//           </Button>
//           <Button
//             onClick={handleProposeReschedule}
//             disabled={loading}
//             variant="outline"
//             className="flex-1"
//           >
//             {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CalendarPlus className="h-4 w-4 mr-2" />}
//             Propose Reschedule
//           </Button>
//           <Button
//             onClick={handleCancel}
//             disabled={loading}
//             variant="destructive"
//             className="flex-1"
//           >
//             {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <XCircle className="h-4 w-4 mr-2" />}
//             Cancel
//           </Button>
//         </div>
//       );
//     }
//   } else if (status === 'accepted') {
//     return (
//       <div className="flex gap-2 mt-4">
//         <Link href={`/chat/${sessionId}`} className="flex-1">
//           <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
//             <MessageSquare className="h-4 w-4 mr-2" /> Go to Chat
//           </Button>
//         </Link>
//         <Button
//           onClick={handleProposeReschedule}
//           disabled={loading}
//           variant="outline"
//           className="flex-1"
//         >
//           {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CalendarPlus className="h-4 w-4 mr-2" />}
//           Reschedule
//         </Button>
//         <Button
//           onClick={handleCancel}
//           disabled={loading}
//           variant="destructive"
//           className="flex-1"
//         >
//           {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <XCircle className="h-4 w-4 mr-2" />}
//           Cancel
//         </Button>
//       </div>
//     );
//   } else if (status === 'rescheduled_pending') {
//     // This is the key logic update for reschedule pending
//     // If current user is the one who INITIATED the reschedule, they wait.
//     // Otherwise, they are the one who needs to ACCEPT/DECLINE.
//     if (currentUserId === lastRescheduleInitiatorId) {
//       return (
//         <div className="flex gap-2 mt-4">
//           <Button disabled className="flex-1" variant="outline">
//             <Clock className="h-4 w-4 mr-2" /> Reschedule Pending
//           </Button>
//           <Button
//             onClick={handleCancel}
//             disabled={loading}
//             variant="destructive"
//             className="flex-1"
//           >
//             {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <XCircle className="h-4 w-4 mr-2" />}
//             Cancel
//           </Button>
//         </div>
//       );
//     } else { // The other party needs to respond to the reschedule
//       return (
//         <div className="flex gap-2 mt-4">
//           <Button
//             onClick={handleAccept} // Re-use acceptSession for accepting reschedule
//             disabled={loading}
//             className="bg-green-600 hover:bg-green-700 text-white flex-1"
//           >
//             {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CheckCircle className="h-4 w-4 mr-2" />}
//             Accept Reschedule
//           </Button>
//           <Button
//             onClick={handleCancel} // Can also cancel the whole session (declining reschedule is a form of cancellation)
//             disabled={loading}
//             variant="destructive"
//             className="flex-1"
//           >
//             {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <XCircle className="h-4 w-4 mr-2" />}
//             Decline / Cancel
//           </Button>
//         </div>
//       );
//     }
//   } else if (status === 'rescheduled_accepted') {
//     return (
//       <div className="flex gap-2 mt-4">
//         <Link href={`/chat/${sessionId}`} className="flex-1">
//           <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
//             <MessageSquare className="h-4 w-4 mr-2" /> Go to Chat
//           </Button>
//         </Link>
//         <Button
//           onClick={handleProposeReschedule}
//           disabled={loading}
//           variant="outline"
//           className="flex-1"
//         >
//           {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CalendarPlus className="h-4 w-4 mr-2" />}
//           Reschedule
//         </Button>
//         <Button
//           onClick={handleCancel}
//           disabled={loading}
//           variant="destructive"
//           className="flex-1"
//         >
//           {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <XCircle className="h-4 w-4 mr-2" />}
//           Cancel
//         </Button>
//       </div>
//     );
//   } else if (status === 'cancelled') {
//     return (
//       <Button disabled className="mt-4 w-full" variant="destructive">
//         <XCircle className="h-4 w-4 mr-2" /> Session Cancelled
//       </Button>
//     );
//   } else if (status === 'completed') {
//     return (
//       <Button disabled className="mt-4 w-full" variant="secondary">
//         <CheckCircle className="h-4 w-4 mr-2" /> Session Completed
//       </Button>
//     );
//   }

//   return null;
// }










// // components/sessions/SessionActionButtons.jsx
// "use client";

// import { useState } from 'react';
// import { Button } from "@/components/ui/button";
// import { Loader2, CheckCircle, Clock, XCircle, CalendarPlus, MessageSquare } from 'lucide-react';
// import { useToast } from "@/hooks/use-toast";
// import { acceptSession, proposeReschedule, cancelSession } from '@/serverActions/sessions/actions';
// import Link from 'next/link';

// export function SessionActionButtons({ sessionId, sessionStatus, currentUserId, proposerId, attendeeId, lastRescheduleInitiatorId }) {
//   const [loading, setLoading] = useState(false);
//   const [status, setStatus] = useState(sessionStatus);
//   const { toast } = useToast();

//   const isProposer = currentUserId === proposerId;
//   const isAttendee = currentUserId === attendeeId;

//   const handleAccept = async () => {
//     setLoading(true);
//     const { success, error } = await acceptSession(sessionId);
//     setLoading(false);

//     if (success) {
//       if (status === 'proposed') {
//         setStatus('accepted');
//         toast({
//           title: "Session Accepted!",
//           description: "The session has been confirmed.",
//           variant: "default",
//         });
//       } else if (status === 'rescheduled_pending') {
//         setStatus('rescheduled_accepted');
//         toast({
//           title: "Reschedule Accepted!",
//           description: "The new session time has been confirmed.",
//           variant: "default",
//         });
//       }
//     } else {
//       toast({
//         title: "Failed to Accept Session",
//         description: error || "An unexpected error occurred.",
//         variant: "destructive",
//       });
//       console.error("Failed to accept session:", error);
//     }
//   };

//   const handleProposeReschedule = async () => {
//     const newDateTimeString = prompt("Enter new proposed date and time (e.g., YYYY-MM-DDTHH:MM:SSZ):");
//     if (!newDateTimeString) return;

//     const newDuration = parseInt(prompt("Enter new duration in minutes (e.g., 60):"), 10);
//     if (isNaN(newDuration) || newDuration <= 0) {
//       toast({ title: "Invalid Duration", description: "Please enter a valid number for duration.", variant: "destructive" });
//       return;
//     }

//     const newMeetingLink = prompt("Enter new meeting link (optional, leave blank if none):");

//     setLoading(true);
//     const { success, error } = await proposeReschedule(sessionId, newDateTimeString, newDuration, newMeetingLink || null);
//     setLoading(false);

//     if (success) {
//       setStatus('rescheduled_pending');
//       toast({
//         title: "Reschedule Proposed!",
//         description: "A new time has been proposed for the session.",
//         variant: "default",
//       });
//     } else {
//       toast({
//         title: "Failed to Propose Reschedule",
//         description: error || "An unexpected error occurred.",
//         variant: "destructive",
//       });
//       console.error("Failed to propose reschedule:", error);
//     }
//   };

//   const handleCancel = async () => {
//     if (!confirm("Are you sure you want to cancel this session?")) return;

//     setLoading(true);
//     const { success, error } = await cancelSession(sessionId);
//     setLoading(false);

//     if (success) {
//       setStatus('cancelled');
//       toast({
//         title: "Session Cancelled",
//         description: "The session has been cancelled.",
//         variant: "default",
//       });
//     } else {
//       toast({
//         title: "Failed to Cancel Session",
//         description: error || "An unexpected error occurred.",
//         variant: "destructive",
//       });
//       console.error("Failed to cancel session:", error);
//     }
//   };

//   // --- Render Logic ---
//   if (status === 'proposed') {
//     if (isAttendee) { // Attendee sees Accept/Reschedule/Cancel
//       return (
//         <div className="flex gap-2 mt-4">
//           <Button
//             onClick={handleAccept}
//             disabled={loading}
//             className="bg-green-600 hover:bg-green-700 text-white flex-1"
//           >
//             {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CheckCircle className="h-4 w-4 mr-2" />}
//             Accept
//           </Button>
//           <Button
//             onClick={handleProposeReschedule}
//             disabled={loading}
//             variant="outline"
//             className="flex-1"
//           >
//             {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CalendarPlus className="h-4 w-4 mr-2" />}
//             Reschedule
//           </Button>
//           <Button
//             onClick={handleCancel}
//             disabled={loading}
//             variant="destructive"
//             className="flex-1"
//           >
//             {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <XCircle className="h-4 w-4 mr-2" />}
//             Cancel
//           </Button>
//         </div>
//       );
//     } else if (isProposer) { // Proposer sees Waiting for Acceptance/Propose Reschedule/Cancel
//       return (
//         <div className="flex gap-2 mt-4">
//           <Button disabled className="flex-1" variant="outline">
//             <Clock className="h-4 w-4 mr-2" /> Waiting for Acceptance
//           </Button>
//           <Button
//             onClick={handleProposeReschedule}
//             disabled={loading}
//             variant="outline"
//             className="flex-1"
//           >
//             {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CalendarPlus className="h-4 w-4 mr-2" />}
//             Propose Reschedule
//           </Button>
//           <Button
//             onClick={handleCancel}
//             disabled={loading}
//             variant="destructive"
//             className="flex-1"
//           >
//             {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <XCircle className="h-4 w-4 mr-2" />}
//             Cancel
//           </Button>
//         </div>
//       );
//     }
//   } else if (status === 'accepted') {
//     return (
//       <div className="flex gap-2 mt-4">
//         <Link href={`/chat/${sessionId}`} className="flex-1">
//           <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
//             <MessageSquare className="h-4 w-4 mr-2" /> Go to Chat
//           </Button>
//         </Link>
//         <Button
//           onClick={handleProposeReschedule}
//           disabled={loading}
//           variant="outline"
//           className="flex-1"
//         >
//           {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CalendarPlus className="h-4 w-4 mr-2" />}
//           Reschedule
//         </Button>
//         <Button
//           onClick={handleCancel}
//           disabled={loading}
//           variant="destructive"
//           className="flex-1"
//         >
//           {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <XCircle className="h-4 w-4 mr-2" />}
//           Cancel
//         </Button>
//       </div>
//     );
//   } else if (status === 'rescheduled_pending') {
//     // This is the key logic for rescheduled_pending:
//     // If current user is the one who INITIATED the reschedule, they wait.
//     // Otherwise, they are the one who needs to ACCEPT/DECLINE.
//     if (currentUserId === lastRescheduleInitiatorId) {
//       return (
//         <div className="flex gap-2 mt-4">
//           <Button disabled className="flex-1" variant="outline">
//             <Clock className="h-4 w-4 mr-2" /> Reschedule Pending
//           </Button>
//           <Button
//             onClick={handleCancel}
//             disabled={loading}
//             variant="destructive"
//             className="flex-1"
//           >
//             {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <XCircle className="h-4 w-4 mr-2" />}
//             Cancel
//           </Button>
//         </div>
//       );
//     } else { // The other party needs to respond to the reschedule
//       return (
//         <div className="flex gap-2 mt-4">
//           <Button
//             onClick={handleAccept} // Re-use acceptSession for accepting reschedule
//             disabled={loading}
//             className="bg-green-600 hover:bg-green-700 text-white flex-1"
//           >
//             {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CheckCircle className="h-4 w-4 mr-2" />}
//             Accept Reschedule
//           </Button>
//           <Button
//             onClick={handleCancel} // Can also cancel the whole session (declining reschedule is a form of cancellation)
//             disabled={loading}
//             variant="destructive"
//             className="flex-1"
//           >
//             {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <XCircle className="h-4 w-4 mr-2" />}
//             Decline / Cancel
//           </Button>
//         </div>
//       );
//     }
//   } else if (status === 'rescheduled_accepted') {
//     return (
//       <div className="flex gap-2 mt-4">
//         <Link href={`/chat/${sessionId}`} className="flex-1">
//           <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
//             <MessageSquare className="h-4 w-4 mr-2" /> Go to Chat
//           </Button>
//         </Link>
//         <Button
//           onClick={handleProposeReschedule}
//           disabled={loading}
//           variant="outline"
//           className="flex-1"
//         >
//           {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CalendarPlus className="h-4 w-4 mr-2" />}
//           Reschedule
//         </Button>
//         <Button
//           onClick={handleCancel}
//           disabled={loading}
//           variant="destructive"
//           className="flex-1"
//         >
//           {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <XCircle className="h-4 w-4 mr-2" />}
//           Cancel
//         </Button>
//       </div>
//     );
//   } else if (status === 'cancelled') {
//     return (
//       <Button disabled className="mt-4 w-full" variant="destructive">
//         <XCircle className="h-4 w-4 mr-2" /> Session Cancelled
//       </Button>
//     );
//   } else if (status === 'completed') {
//     return (
//       <Button disabled className="mt-4 w-full" variant="secondary">
//         <CheckCircle className="h-4 w-4 mr-2" /> Session Completed
//       </Button>
//     );
//   }

//   return null;
// }




// components/sessions/SessionActionButtons.jsx
"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle, Clock, XCircle, CalendarPlus, MessageSquare, CheckSquare } from 'lucide-react'; // Added CheckSquare
import { useToast } from "@/hooks/use-toast";
import { acceptSession, proposeReschedule, cancelSession, completeSession } from '@/serverActions/sessions/actions'; // Import completeSession
import Link from 'next/link';

export function SessionActionButtons({ sessionId, sessionStatus, currentUserId, proposerId, attendeeId, lastRescheduleInitiatorId }) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(sessionStatus);
  const { toast } = useToast();

  const isProposer = currentUserId === proposerId;
  const isAttendee = currentUserId === attendeeId;

  const handleAccept = async () => {
    setLoading(true);
    const { success, error } = await acceptSession(sessionId);
    setLoading(false);

    if (success) {
      if (status === 'proposed') {
        setStatus('accepted');
        toast({
          title: "Session Accepted!",
          description: "The session has been confirmed.",
          variant: "default",
        });
      } else if (status === 'rescheduled_pending') {
        setStatus('rescheduled_accepted');
        toast({
          title: "Reschedule Accepted!",
          description: "The new session time has been confirmed.",
          variant: "default",
        });
      }
    } else {
      toast({
        title: "Failed to Accept Session",
        description: error || "An unexpected error occurred.",
        variant: "destructive",
      });
      console.error("Failed to accept session:", error);
    }
  };

  const handleProposeReschedule = async () => {
    const newDateTimeString = prompt("Enter new proposed date and time (e.g., YYYY-MM-DDTHH:MM:SSZ):");
    if (!newDateTimeString) return;

    const newDuration = parseInt(prompt("Enter new duration in minutes (e.g., 60):"), 10);
    if (isNaN(newDuration) || newDuration <= 0) {
      toast({ title: "Invalid Duration", description: "Please enter a valid number for duration.", variant: "destructive" });
      return;
    }

    const newMeetingLink = prompt("Enter new meeting link (optional, leave blank if none):");

    setLoading(true);
    const { success, error } = await proposeReschedule(sessionId, newDateTimeString, newDuration, newMeetingLink || null);
    setLoading(false);

    if (success) {
      setStatus('rescheduled_pending');
      toast({
        title: "Reschedule Proposed!",
        description: "A new time has been proposed for the session.",
        variant: "default",
      });
    } else {
      toast({
        title: "Failed to Propose Reschedule",
        description: error || "An unexpected error occurred.",
        variant: "destructive",
      });
      console.error("Failed to propose reschedule:", error);
    }
  };

  const handleCancel = async () => {
    if (!confirm("Are you sure you want to cancel this session?")) return;

    setLoading(true);
    const { success, error } = await cancelSession(sessionId);
    setLoading(false);

    if (success) {
      setStatus('cancelled');
      toast({
        title: "Session Cancelled",
        description: "The session has been cancelled.",
        variant: "default",
      });
    } else {
      toast({
        title: "Failed to Cancel Session",
        description: error || "An unexpected error occurred.",
        variant: "destructive",
      });
      console.error("Failed to cancel session:", error);
    }
  };

  const handleComplete = async () => { // NEW: Handle complete action
    if (!confirm("Are you sure you want to mark this session as completed?")) return;

    setLoading(true);
    const { success, error } = await completeSession(sessionId);
    setLoading(false);

    if (success) {
      setStatus('completed');
      toast({
        title: "Session Completed!",
        description: "The session has been marked as completed.",
        variant: "default",
      });
    } else {
      toast({
        title: "Failed to Complete Session",
        description: error || "An unexpected error occurred.",
        variant: "destructive",
      });
      console.error("Failed to complete session:", error);
    }
  };

  // --- Render Logic ---
  if (status === 'proposed') {
    if (isAttendee) {
      return (
        <div className="flex gap-2 mt-4">
          <Button
            onClick={handleAccept}
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 text-white flex-1"
          >
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CheckCircle className="h-4 w-4 mr-2" />}
            Accept
          </Button>
          <Button
            onClick={handleProposeReschedule}
            disabled={loading}
            variant="outline"
            className="flex-1"
          >
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CalendarPlus className="h-4 w-4 mr-2" />}
            Reschedule
          </Button>
          <Button
            onClick={handleCancel}
            disabled={loading}
            variant="destructive"
            className="flex-1"
          >
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <XCircle className="h-4 w-4 mr-2" />}
            Cancel
          </Button>
        </div>
      );
    } else if (isProposer) {
      return (
        <div className="flex gap-2 mt-4">
          <Button disabled className="flex-1" variant="outline">
            <Clock className="h-4 w-4 mr-2" /> Waiting for Acceptance
          </Button>
          <Button
            onClick={handleProposeReschedule}
            disabled={loading}
            variant="outline"
            className="flex-1"
          >
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CalendarPlus className="h-4 w-4 mr-2" />}
            Propose Reschedule
          </Button>
          <Button
            onClick={handleCancel}
            disabled={loading}
            variant="destructive"
            className="flex-1"
          >
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <XCircle className="h-4 w-4 mr-2" />}
            Cancel
          </Button>
        </div>
      );
    }
  } else if (status === 'accepted' || status === 'rescheduled_accepted') { // Show for accepted or rescheduled_accepted
    return (
      <div className="flex flex-wrap gap-2 mt-4"> {/* Use flex-wrap for better layout on small screens */}
        <Link href={`/chat/${sessionId}`} className="flex-1 min-w-[120px]"> {/* min-width to prevent squishing */}
          <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            <MessageSquare className="h-4 w-4 mr-2" /> Go to Chat
          </Button>
        </Link>
        <Button
          onClick={handleProposeReschedule}
          disabled={loading}
          variant="outline"
          className="flex-1 min-w-[120px]"
        >
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CalendarPlus className="h-4 w-4 mr-2" />}
          Reschedule
        </Button>
        <Button
          onClick={handleComplete} // NEW: Mark as Completed button
          disabled={loading}
          variant="secondary"
          className="flex-1 min-w-[120px] bg-purple-600 hover:bg-purple-700 text-white"
        >
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CheckSquare className="h-4 w-4 mr-2" />}
          Completed
        </Button>
        <Button
          onClick={handleCancel}
          disabled={loading}
          variant="destructive"
          className="flex-1 min-w-[120px]"
        >
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <XCircle className="h-4 w-4 mr-2" />}
          Cancel
        </Button>
      </div>
    );
  } else if (status === 'rescheduled_pending') {
    if (currentUserId === lastRescheduleInitiatorId) {
      return (
        <div className="flex gap-2 mt-4">
          <Button disabled className="flex-1" variant="outline">
            <Clock className="h-4 w-4 mr-2" /> Reschedule Pending
          </Button>
          <Button
            onClick={handleCancel}
            disabled={loading}
            variant="destructive"
            className="flex-1"
          >
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <XCircle className="h-4 w-4 mr-2" />}
            Cancel
          </Button>
        </div>
      );
    } else {
      return (
        <div className="flex gap-2 mt-4">
          <Button
            onClick={handleAccept}
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 text-white flex-1"
          >
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CheckCircle className="h-4 w-4 mr-2" />}
            Accept Reschedule
          </Button>
          <Button
            onClick={handleCancel}
            disabled={loading}
            variant="destructive"
            className="flex-1"
          >
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <XCircle className="h-4 w-4 mr-2" />}
            Decline / Cancel
          </Button>
        </div>
      );
    }
  } else if (status === 'cancelled') {
    return (
      <Button disabled className="mt-4 w-full" variant="destructive">
        <XCircle className="h-4 w-4 mr-2" /> Session Cancelled
      </Button>
    );
  } else if (status === 'completed') {
    return (
      <Button disabled className="mt-4 w-full" variant="secondary">
        <CheckCircle className="h-4 w-4 mr-2" /> Session Completed
      </Button>
    );
  }

  return null;
}