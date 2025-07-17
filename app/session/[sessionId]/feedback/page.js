// // app/session/[sessionId]/feedback/page.jsx
// "use client"; // This page is a Client Component for form interactivity

// import { useState } from 'react';
// import { useRouter, useParams } from 'next/navigation';
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Star, Loader2 } from 'lucide-react'; // Star for rating, Loader2 for loading state

// export default function FeedbackPage() {
//   const router = useRouter();
//   const params = useParams();
//   const { sessionId } = params; // Get the session ID from the URL

//   const [rating, setRating] = useState(0); // 0-5 star rating
//   const [testimonial, setTestimonial] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [submitted, setSubmitted] = useState(false);
//   const [error, setError] = useState('');

//   // Dummy data for the session participant (who you are rating)
//   const dummySessionInfo = {
//     'session-id-123': {
//       otherParticipantName: 'Alice Johnson',
//       otherParticipantRole: 'Teacher',
//       profilePic: 'https://api.dicebear.com/7.x/lorelei/svg?seed=Alice',
//     },
//     'session-id-456': {
//       otherParticipantName: 'Bob Smith',
//       otherParticipantRole: 'Teacher',
//       profilePic: 'https://api.dicebear.com/7.x/lorelei/svg?seed=Bob',
//     },
//   };

//   const sessionDetails = dummySessionInfo[sessionId];

//   if (!sessionDetails) {
//     return (
//       <div className="container mx-auto py-8 text-center">
//         <h1 className="text-3xl font-bold text-gray-900 mb-4">Session Not Found</h1>
//         <p className="text-gray-600">The session you are trying to give feedback for does not exist.</p>
//       </div>
//     );
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     if (rating === 0) {
//       setError("Please provide a star rating.");
//       setLoading(false);
//       return;
//     }

//     // --- Simulate Feedback Submission ---
//     console.log(`Submitting feedback for session ${sessionId}:`, {
//       rating,
//       testimonial,
//       ratedUser: sessionDetails.otherParticipantName,
//     });
//     await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API call

//     setLoading(false);
//     setSubmitted(true);
//     // In a real app, you might show a success message then redirect after a delay
//     // For now, we'll show a success message and then redirect to dashboard
//     setTimeout(() => {
//       router.push('/dashboard');
//     }, 1500);
//   };

//   return (
//     <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-gray-100 p-4">
//       <Card className="w-full max-w-md p-6">
//         <CardHeader className="text-center">
//           <CardTitle className="text-3xl font-bold text-gray-900 mb-2">Session Feedback</CardTitle>
//           <CardDescription className="text-gray-600">
//             Please rate your session with{" "}
//             <span className="font-semibold text-gray-800">{sessionDetails.otherParticipantName}</span> and leave a testimonial.
//           </CardDescription>
//           <div className="mt-4 flex justify-center">
//             <img src={sessionDetails.profilePic} alt={sessionDetails.otherParticipantName} className="h-20 w-20 rounded-full border-2 border-blue-500" />
//           </div>
//         </CardHeader>
//         <CardContent>
//           {submitted ? (
//             <div className="text-center text-green-600 font-semibold text-lg">
//               Thank you for your feedback! Redirecting to Dashboard...
//             </div>
//           ) : (
//             <form onSubmit={handleSubmit} className="space-y-6">
//               {/* Star Rating */}
//               <div className="space-y-2 text-center">
//                 <Label htmlFor="rating" className="text-lg font-semibold">Your Rating</Label>
//                 <div className="flex justify-center space-x-1 mt-2">
//                   {[1, 2, 3, 4, 5].map((starValue) => (
//                     <Star
//                       key={starValue}
//                       className={`h-8 w-8 cursor-pointer transition-colors duration-200 ${
//                         starValue <= rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
//                       }`}
//                       onClick={() => setRating(starValue)}
//                     />
//                   ))}
//                 </div>
//                 {rating === 0 && <p className="text-sm text-gray-500">Click a star to rate</p>}
//               </div>

//               {/* Testimonial */}
//               <div className="space-y-2">
//                 <Label htmlFor="testimonial">Testimonial (Optional)</Label>
//                 <Textarea
//                   id="testimonial"
//                   placeholder="Share your experience..."
//                   value={testimonial}
//                   onChange={(e) => setTestimonial(e.target.value)}
//                   rows={4}
//                 />
//               </div>

//               {error && <p className="text-red-500 text-sm text-center">{error}</p>}

//               <Button type="submit" className="w-full" disabled={loading}>
//                 {loading ? (
//                   <>
//                     <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
//                   </>
//                 ) : (
//                   "Submit Feedback"
//                 )}
//               </Button>
//             </form>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }








// app/session/[sessionId]/feedback/page.jsx
// This is a Server Component (no "use client")

// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Button } from "@/components/ui/button";
// import { Star, Loader2 } from 'lucide-react';
// import Link from 'next/link'; // Import Link

// import { createServerSupabaseClient } from '@/lib/supabase/server';
// import { submitFeedback } from '@/serverActions/sessions/actions'; // Import the Server Action

// // Client Component for the feedback form (handles state and submission)
// "use client"; // This MUST be the very first line of this component definition

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { useToast } from "@/components/ui/use-toast";

// function FeedbackForm({ sessionId, otherParticipantProfile }) {
//   const router = useRouter();
//   const { toast } = useToast();

//   const [rating, setRating] = useState(0);
//   const [testimonial, setTestimonial] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [submitted, setSubmitted] = useState(false);
//   const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSubmitted(false);
//     setLoading(true);

//     if (rating === 0) {
//       setError("Please provide a star rating.");
//       setLoading(false);
//       return;
//     }

//     // Call the Server Action to submit feedback
//     const { success, error: submitError } = await submitFeedback(
//       sessionId,
//       otherParticipantProfile.id, // The user who is being rated
//       rating,
//       testimonial
//     );

//     setLoading(false);

//     if (submitError) {
//       console.error("Error submitting feedback:", submitError);
//       setError(submitError);
//       toast({
//         title: "Failed to Submit Feedback",
//         description: submitError,
//         variant: "destructive",
//       });
//     } else if (success) {
//       setSubmitted(true);
//       toast({
//         title: "Feedback Submitted!",
//         description: "Thank you for your valuable feedback.",
//         variant: "default",
//       });
//       // Redirect to dashboard after success
//       setTimeout(() => {
//         router.push('/dashboard');
//       }, 1500);
//     } else {
//       setError("An unexpected error occurred.");
//     }
//   };

//   return (
//     <CardContent>
//       {submitted ? (
//         <div className="text-center text-green-600 font-semibold text-lg">
//           Thank you for your feedback! Redirecting to Dashboard...
//         </div>
//       ) : (
//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Star Rating */}
//           <div className="space-y-2 text-center">
//             <Label htmlFor="rating" className="text-lg font-semibold">Your Rating</Label>
//             <div className="flex justify-center space-x-1 mt-2">
//               {[1, 2, 3, 4, 5].map((starValue) => (
//                 <Star
//                   key={starValue}
//                   className={`h-8 w-8 cursor-pointer transition-colors duration-200 ${
//                     starValue <= rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
//                   }`}
//                   onClick={() => setRating(starValue)}
//                 />
//               ))}
//             </div>
//             {rating === 0 && <p className="text-sm text-gray-500">Click a star to rate</p>}
//           </div>

//           {/* Testimonial */}
//           <div className="space-y-2">
//             <Label htmlFor="testimonial">Testimonial (Optional)</Label>
//             <Textarea
//               id="testimonial"
//               placeholder="Share your experience..."
//               value={testimonial}
//               onChange={(e) => setTestimonial(e.target.value)}
//               rows={4}
//             />
//           </div>

//           {error && <p className="text-red-500 text-sm text-center">{error}</p>}

//           <Button type="submit" className="w-full" disabled={loading}>
//             {loading ? (
//               <>
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
//               </>
//             ) : (
//               "Submit Feedback"
//             )}
//           </Button>
//         </form>
//       )}
//     </CardContent>
//   );
// }

// // Main Server Component for the Feedback Page
// export default async function FeedbackPage({ params }) {
//   const { sessionId } = params;
//   const supabase = await createServerSupabaseClient();

//   const { data: { user } } = await supabase.auth.getUser();
//   if (!user) {
//     return (
//       <div className="container mx-auto py-8 text-center">
//         <h1 className="text-3xl font-bold text-gray-900 mb-4">Access Denied</h1>
//         <p className="text-gray-600">Please log in to submit feedback.</p>
//       </div>
//     );
//   }

//   // Fetch session details to determine who the other participant is
//   const { data: session, error: sessionError } = await supabase
//     .from('sessions')
//     .select('proposer_id, attendee_id, status')
//     .eq('id', sessionId)
//     .single();

//   if (sessionError || !session) {
//     console.error("Error fetching session for feedback:", sessionError);
//     return (
//       <div className="container mx-auto py-8 text-center">
//         <h1 className="text-3xl font-bold text-gray-900 mb-4">Session Not Found</h1>
//         <p className="text-gray-600">The session you are trying to give feedback for does not exist or is not accessible.</p>
//       </div>
//     );
//   }

//   // Ensure the session is completed and user is a participant
//   if (session.status !== 'completed') {
//     return (
//       <div className="container mx-auto py-8 text-center">
//         <h1 className="text-3xl font-bold text-gray-900 mb-4">Session Not Completed</h1>
//         <p className="text-gray-600">You can only give feedback for completed sessions.</p>
//         <Link href="/my-sessions" className="text-blue-600 hover:underline mt-4 block">Go to My Sessions</Link>
//       </div>
//     );
//   }

//   const isProposer = session.proposer_id === user.id;
//   const isAttendee = session.attendee_id === user.id;

//   if (!isProposer && !isAttendee) {
//     return (
//       <div className="container mx-auto py-8 text-center">
//         <h1 className="text-3xl font-bold text-gray-900 mb-4">Unauthorized Access</h1>
//         <p className="text-gray-600">You are not a participant of this session.</p>
//       </div>
//     );
//   }

//   // Determine who the "other participant" is (the one being rated)
//   const ratedUserId = isProposer ? session.attendee_id : session.proposer_id;

//   // Fetch the profile of the user being rated
//   const { data: otherParticipantProfile, error: profileError } = await supabase
//     .from('profiles')
//     .select('id, full_name, username, profile_picture_url')
//     .eq('id', ratedUserId)
//     .single();

//   if (profileError || !otherParticipantProfile) {
//     console.error("Error fetching other participant profile:", profileError);
//     return (
//       <div className="container mx-auto py-8 text-center">
//         <h1 className="text-3xl font-bold text-red-600 mb-4">Error</h1>
//         <p className="text-gray-600">Could not load participant details for feedback.</p>
//       </div>
//     );
//   }

//   // Check if this user has already rated this session
//   const { data: existingRating, error: ratingCheckError } = await supabase
//     .from('ratings')
//     .select('id')
//     .eq('session_id', sessionId)
//     .eq('rater_id', user.id)
//     .single();

//   if (ratingCheckError && ratingCheckError.code !== 'PGRST116') { // PGRST116 means no rows found
//     console.error("Error checking for existing rating:", ratingCheckError);
//     return (
//       <div className="container mx-auto py-8 text-center">
//         <h1 className="text-3xl font-bold text-red-600 mb-4">Error</h1>
//         <p className="text-gray-600">Could not check for existing feedback.</p>
//       </div>
//     );
//   }

//   if (existingRating) {
//     return (
//       <div className="container mx-auto py-8 text-center">
//         <h1 className="text-3xl font-bold text-gray-900 mb-4">Feedback Already Submitted</h1>
//         <p className="text-gray-600">You have already provided feedback for this session.</p>
//         <Link href="/my-sessions" className="text-blue-600 hover:underline mt-4 block">Go to My Sessions</Link>
//       </div>
//     );
//   }


//   return (
//     <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-gray-100 p-4">
//       <Card className="w-full max-w-md p-6">
//         <CardHeader className="text-center">
//           <CardTitle className="text-3xl font-bold text-gray-900 mb-2">Session Feedback</CardTitle>
//           <CardDescription className="text-gray-600">
//             Please rate your session with{" "}
//             <span className="font-semibold text-gray-800">{otherParticipantProfile.full_name || otherParticipantProfile.username}</span> and leave a testimonial.
//           </CardDescription>
//           <div className="mt-4 flex justify-center">
//             <img src={otherParticipantProfile.profile_picture_url || `https://api.dicebear.com/7.x/lorelei/svg?seed=${otherParticipantProfile.username}`} alt={otherParticipantProfile.full_name} className="h-20 w-20 rounded-full border-2 border-blue-500" />
//           </div>
//         </CardHeader>
//         {/* Render the client-side FeedbackForm component */}
//         <FeedbackForm
//           sessionId={sessionId}
//           otherParticipantProfile={otherParticipantProfile}
//         />
//       </Card>
//     </div>
//   );
// }









// // app/session/[sessionId]/feedback/page.jsx
// // This is a Server Component (no "use client")

// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Button } from "@/components/ui/button";
// import { Star, Loader2 } from 'lucide-react';
// import Link from 'next/link'; // Import Link

// import { createServerSupabaseClient } from '@/lib/supabase/server';
// import { submitFeedback } from '@/serverActions/sessions/actions'; // Import the Server Action

// // Client Component for the feedback form (handles state and submission)
// "use client"; // This MUST be the very first line of this component definition

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { useToast } from "@/components/ui/use-toast";

// function FeedbackForm({ sessionId, otherParticipantProfile }) {
//   const router = useRouter();
//   const { toast } = useToast();

//   const [rating, setRating] = useState(0);
//   const [testimonial, setTestimonial] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [submitted, setSubmitted] = useState(false);
//   const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSubmitted(false);
//     setLoading(true);

//     if (rating === 0) {
//       setError("Please provide a star rating.");
//       setLoading(false);
//       return;
//     }

//     // Call the Server Action to submit feedback
//     const { success, error: submitError } = await submitFeedback(
//       sessionId,
//       otherParticipantProfile.id, // The user who is being rated
//       rating,
//       testimonial
//     );

//     setLoading(false);

//     if (submitError) {
//       console.error("Error submitting feedback:", submitError);
//       setError(submitError);
//       toast({
//         title: "Failed to Submit Feedback",
//         description: submitError,
//         variant: "destructive",
//       });
//     } else if (success) {
//       setSubmitted(true);
//       toast({
//         title: "Feedback Submitted!",
//         description: "Thank you for your valuable feedback.",
//         variant: "default",
//       });
//       // Redirect to dashboard after success
//       setTimeout(() => {
//         router.push('/dashboard');
//       }, 1500);
//     } else {
//       setError("An unexpected error occurred.");
//     }
//   };

//   return (
//     <CardContent>
//       {submitted ? (
//         <div className="text-center text-green-600 font-semibold text-lg">
//           Thank you for your feedback! Redirecting to Dashboard...
//         </div>
//       ) : (
//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Star Rating */}
//           <div className="space-y-2 text-center">
//             <Label htmlFor="rating" className="text-lg font-semibold">Your Rating</Label>
//             <div className="flex justify-center space-x-1 mt-2">
//               {[1, 2, 3, 4, 5].map((starValue) => (
//                 <Star
//                   key={starValue}
//                   className={`h-8 w-8 cursor-pointer transition-colors duration-200 ${
//                     starValue <= rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
//                   }`}
//                   onClick={() => setRating(starValue)}
//                 />
//               ))}
//             </div>
//             {rating === 0 && <p className="text-sm text-gray-500">Click a star to rate</p>}
//           </div>

//           {/* Testimonial */}
//           <div className="space-y-2">
//             <Label htmlFor="testimonial">Testimonial (Optional)</Label>
//             <Textarea
//               id="testimonial"
//               placeholder="Share your experience..."
//               value={testimonial}
//               onChange={(e) => setTestimonial(e.target.value)}
//               rows={4}
//             />
//           </div>

//           {error && <p className="text-red-500 text-sm text-center">{error}</p>}

//           <Button type="submit" className="w-full" disabled={loading}>
//             {loading ? (
//               <>
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
//               </>
//             ) : (
//               "Submit Feedback"
//             )}
//           </Button>
//         </form>
//       )}
//     </CardContent>
//   );
// }

// // Main Server Component for the Feedback Page
// export default async function FeedbackPage({ params }) {
//   const { sessionId } = params;
//   const supabase = await createServerSupabaseClient();

//   const { data: { user } } = await supabase.auth.getUser();
//   if (!user) {
//     return (
//       <div className="container mx-auto py-8 text-center">
//         <h1 className="text-3xl font-bold text-gray-900 mb-4">Access Denied</h1>
//         <p className="text-gray-600">Please log in to submit feedback.</p>
//       </div>
//     );
//   }

//   // Fetch session details to determine who the other participant is
//   const { data: session, error: sessionError } = await supabase
//     .from('sessions')
//     .select('proposer_id, attendee_id, status')
//     .eq('id', sessionId)
//     .single();

//   if (sessionError || !session) {
//     console.error("Error fetching session for feedback:", sessionError);
//     return (
//       <div className="container mx-auto py-8 text-center">
//         <h1 className="text-3xl font-bold text-gray-900 mb-4">Session Not Found</h1>
//         <p className="text-gray-600">The session you are trying to give feedback for does not exist or is not accessible.</p>
//       </div>
//     );
//   }

//   // Ensure the session is completed and user is a participant
//   if (session.status !== 'completed') {
//     return (
//       <div className="container mx-auto py-8 text-center">
//         <h1 className="text-3xl font-bold text-gray-900 mb-4">Session Not Completed</h1>
//         <p className="text-gray-600">You can only give feedback for completed sessions.</p>
//         <Link href="/my-sessions" className="text-blue-600 hover:underline mt-4 block">Go to My Sessions</Link>
//       </div>
//     );
//   }

//   const isProposer = session.proposer_id === user.id;
//   const isAttendee = session.attendee_id === user.id;

//   if (!isProposer && !isAttendee) {
//     return (
//       <div className="container mx-auto py-8 text-center">
//         <h1 className="text-3xl font-bold text-gray-900 mb-4">Unauthorized Access</h1>
//         <p className="text-gray-600">You are not a participant of this session.</p>
//       </div>
//     );
//   }

//   // Determine who the "other participant" is (the one being rated)
//   const ratedUserId = isProposer ? session.attendee_id : session.proposer_id;

//   // Fetch the profile of the user being rated
//   const { data: otherParticipantProfile, error: profileError } = await supabase
//     .from('profiles')
//     .select('id, full_name, username, profile_picture_url')
//     .eq('id', ratedUserId)
//     .single();

//   if (profileError || !otherParticipantProfile) {
//     console.error("Error fetching other participant profile:", profileError);
//     return (
//       <div className="container mx-auto py-8 text-center">
//         <h1 className="text-3xl font-bold text-red-600 mb-4">Error</h1>
//         <p className="text-gray-600">Could not load participant details for feedback.</p>
//       </div>
//     );
//   }

//   // Check if this user has already rated this session
//   const { data: existingRating, error: ratingCheckError } = await supabase
//     .from('ratings')
//     .select('id')
//     .eq('session_id', sessionId)
//     .eq('rater_id', user.id)
//     .single();

//   if (ratingCheckError && ratingCheckError.code !== 'PGRST116') { // PGRST116 means no rows found
//     console.error("Error checking for existing rating:", ratingCheckError);
//     return (
//       <div className="container mx-auto py-8 text-center">
//         <h1 className="text-3xl font-bold text-red-600 mb-4">Error</h1>
//         <p className="text-gray-600">Could not check for existing feedback.</p>
//       </div>
//     );
//   }

//   if (existingRating) {
//     return (
//       <div className="container mx-auto py-8 text-center">
//         <h1 className="text-3xl font-bold text-gray-900 mb-4">Feedback Already Submitted</h1>
//         <p className="text-gray-600">You have already provided feedback for this session.</p>
//         <Link href="/my-sessions" className="text-blue-600 hover:underline mt-4 block">Go to My Sessions</Link>
//       </div>
//     );
//   }


//   return (
//     <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-gray-100 p-4">
//       <Card className="w-full max-w-md p-6">
//         <CardHeader className="text-center">
//           <CardTitle className="text-3xl font-bold text-gray-900 mb-2">Session Feedback</CardTitle>
//           <CardDescription className="text-gray-600">
//             Please rate your session with{" "}
//             <span className="font-semibold text-gray-800">{otherParticipantProfile.full_name || otherParticipantProfile.username}</span> and leave a testimonial.
//           </CardDescription>
//           <div className="mt-4 flex justify-center">
//             <img src={otherParticipantProfile.profile_picture_url || `https://api.dicebear.com/7.x/lorelei/svg?seed=${otherParticipantProfile.username}`} alt={otherParticipantProfile.full_name} className="h-20 w-20 rounded-full border-2 border-blue-500" />
//           </div>
//         </CardHeader>
//         {/* Render the client-side FeedbackForm component */}
//         <FeedbackForm
//           sessionId={sessionId}
//           otherParticipantProfile={otherParticipantProfile}
//         />
//       </Card>
//     </div>
//   );
// }








// app/session/[sessionId]/feedback/page.jsx
// This is a Server Component (no "use client")

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from 'lucide-react'; // Keep Star here for display
import Link from 'next/link'; // Import Link

import { createServerSupabaseClient } from '@/lib/supabase/server';
// REMOVED: submitFeedback import from here (it's now in FeedbackForm.jsx)
// REMOVED: Label, Textarea, Button, Loader2 imports from here (they are in FeedbackForm.jsx)

// NEW: Import the client-side FeedbackForm component
import { FeedbackForm } from '@/components/feedback/FeedbackForm';


// Main Server Component for the Feedback Page
export default async function FeedbackPage({ params }) {
  const { sessionId } = await params;
  const supabase = await createServerSupabaseClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return (
      <div className="container mx-auto py-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Access Denied</h1>
        <p className="text-gray-600">Please log in to submit feedback.</p>
      </div>
    );
  }

  // Fetch session details to determine who the other participant is
  const { data: session, error: sessionError } = await supabase
    .from('sessions')
    .select('proposer_id, attendee_id, status')
    .eq('id', sessionId)
    .single();

  if (sessionError || !session) {
    console.error("Error fetching session for feedback:", sessionError);
    return (
      <div className="container mx-auto py-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Session Not Found</h1>
        <p className="text-gray-600">The session you are trying to give feedback for does not exist or is not accessible.</p>
      </div>
    );
  }

  // Ensure the session is completed and user is a participant
  if (session.status !== 'completed') {
    return (
      <div className="container mx-auto py-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Session Not Completed</h1>
        <p className="text-gray-600">You can only give feedback for completed sessions.</p>
        <Link href="/my-sessions" className="text-blue-600 hover:underline mt-4 block">Go to My Sessions</Link>
      </div>
    );
  }

  const isProposer = session.proposer_id === user.id;
  const isAttendee = session.attendee_id === user.id;

  if (!isProposer && !isAttendee) {
    return (
      <div className="container mx-auto py-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Unauthorized Access</h1>
        <p className="text-gray-600">You are not a participant of this session.</p>
      </div>
    );
  }

  // Determine who the "other participant" is (the one being rated)
  const ratedUserId = isProposer ? session.attendee_id : session.proposer_id;

  // Fetch the profile of the user being rated
  const { data: otherParticipantProfile, error: profileError } = await supabase
    .from('profiles')
    .select('id, full_name, username, profile_picture_url')
    .eq('id', ratedUserId)
    .single();

  if (profileError || !otherParticipantProfile) {
    console.error("Error fetching other participant profile:", profileError);
    return (
      <div className="container mx-auto py-8 text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Error</h1>
        <p className="text-gray-600">Could not load participant details for feedback.</p>
      </div>
    );
  }

  // Check if this user has already rated this session
  const { data: existingRating, error: ratingCheckError } = await supabase
    .from('ratings')
    .select('id')
    .eq('session_id', sessionId)
    .eq('rater_id', user.id)
    .single();

  if (ratingCheckError && ratingCheckError.code !== 'PGRST116') { // PGRST116 means no rows found
    console.error("Error checking for existing rating:", ratingCheckError);
    return (
      <div className="container mx-auto py-8 text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Error</h1>
        <p className="text-gray-600">Could not check for existing feedback.</p>
      </div>
    );
  }

  if (existingRating) {
    return (
      <div className="container mx-auto py-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Feedback Already Submitted</h1>
        <p className="text-gray-600">You have already provided feedback for this session.</p>
        <Link href="/my-sessions" className="text-blue-600 hover:underline mt-4 block">Go to My Sessions</Link>
      </div>
    );
  }


  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-gray-100 p-4">
      <Card className="w-full max-w-md p-6">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-gray-900 mb-2">Session Feedback</CardTitle>
          <CardDescription className="text-gray-600">
            Please rate your session with{" "}
            <span className="font-semibold text-gray-800">{otherParticipantProfile.full_name || otherParticipantProfile.username}</span> and leave a testimonial.
          </CardDescription>
          <div className="mt-4 flex justify-center">
            <img src={otherParticipantProfile.profile_picture_url || `https://api.dicebear.com/7.x/lorelei/svg?seed=${otherParticipantProfile.username}`} alt={otherParticipantProfile.full_name} className="h-20 w-20 rounded-full border-2 border-blue-500" />
          </div>
        </CardHeader>
        {/* Render the client-side FeedbackForm component */}
        <FeedbackForm
          sessionId={sessionId}
          otherParticipantProfile={otherParticipantProfile}
        />
      </Card>
    </div>
  );
}
