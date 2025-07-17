// // app/my-sessions/page.jsx
// // No "use client"; directive here, making this a Server Component by default

// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Shadcn UI Tabs
// import { Calendar, Clock, MessageSquare, CheckCircle, XCircle } from 'lucide-react'; // Icons

// import Link from 'next/link';

// // --- Dummy Data for User Sessions ---
// const dummySessions = [
//   // Active/Upcoming Sessions
//   {
//     id: 's1',
//     type: 'learning', // 'learning' or 'teaching'
//     status: 'active', // 'active', 'upcoming', 'completed', 'cancelled'
//     participant: {
//       id: 'user-b',
//       username: 'alice-johnson',
//       fullName: 'Alice Johnson',
//       profilePic: 'https://api.dicebear.com/7.x/lorelei/svg?seed=Alice',
//     },
//     skill: 'React.js Hooks',
//     date: 'July 5, 2025',
//     time: '3:00 PM IST',
//     duration: '1 hour',
//     chatSessionId: 'session-id-123', // Link to chat
//   },
//   {
//     id: 's2',
//     type: 'teaching',
//     status: 'upcoming',
//     participant: {
//       id: 'user-f',
//       username: 'frank-white',
//       fullName: 'Frank White',
//       profilePic: 'https://api.dicebear.com/7.x/lorelei/svg?seed=Frank',
//     },
//     skill: 'Node.js Express API',
//     date: 'July 7, 2025',
//     time: '10:00 AM IST',
//     duration: '45 minutes',
//     chatSessionId: 'session-id-456', // Link to chat
//   },
//   // Completed Sessions
//   {
//     id: 's3',
//     type: 'learning',
//     status: 'completed',
//     participant: {
//       id: 'user-d',
//       username: 'bob-smith',
//       fullName: 'Bob Smith',
//       profilePic: 'https://api.dicebear.com/7.x/lorelei/svg?seed=Bob',
//     },
//     skill: 'Python Data Visualization',
//     date: 'June 28, 2025',
//     time: '2:00 PM IST',
//     duration: '1 hour',
//     chatSessionId: 'session-id-456',
//     feedbackGiven: true, // Simulate if feedback was given
//   },
//   {
//     id: 's4',
//     type: 'teaching',
//     status: 'completed',
//     participant: {
//       id: 'user-g',
//       username: 'grace-lee',
//       fullName: 'Grace Lee',
//       profilePic: 'https://api.dicebear.com/7.x/lorelei/svg?seed=Grace',
//     },
//     skill: 'Mobile App Deployment',
//     date: 'June 30, 2025',
//     time: '4:00 PM IST',
//     duration: '30 minutes',
//     chatSessionId: 'session-id-123',
//     feedbackGiven: false, // Simulate if feedback was given
//   },
//   // Cancelled Session
//   {
//     id: 's5',
//     type: 'learning',
//     status: 'cancelled',
//     participant: {
//       id: 'user-e',
//       username: 'eve-adams',
//       fullName: 'Eve Adams',
//       profilePic: 'https://api.dicebear.com/7.x/lorelei/svg?seed=Eve',
//     },
//     skill: 'Graphic Design Basics',
//     date: 'July 1, 2025',
//     time: '11:00 AM IST',
//     duration: '1 hour',
//   },
// ];
// // --- End Dummy Data ---

// // Helper component to render a single session card
// function SessionCard({ session }) {
//   const isLearning = session.type === 'learning';
//   const otherParticipant = session.participant;

//   const statusBadgeVariant = {
//     active: 'default',
//     upcoming: 'secondary',
//     completed: 'success', // Assuming you have a 'success' variant for Badge or define custom color
//     cancelled: 'destructive',
//   };

//   const statusBadgeColor = {
//     active: 'bg-blue-500 text-white',
//     upcoming: 'bg-yellow-500 text-white',
//     completed: 'bg-green-500 text-white',
//     cancelled: 'bg-red-500 text-white',
//   };

//   return (
//     <Card className="p-4">
//       <CardHeader className="flex flex-row items-center space-x-3 pb-2">
//         <Avatar className="h-12 w-12">
//           <AvatarImage src={otherParticipant.profilePic} alt={otherParticipant.fullName} />
//           <AvatarFallback>{otherParticipant.fullName.charAt(0)}</AvatarFallback>
//         </Avatar>
//         <div>
//           <CardTitle className="text-lg">
//             {isLearning ? `Learning from ${otherParticipant.fullName}` : `Teaching ${otherParticipant.fullName}`}
//           </CardTitle>
//           <CardDescription className="text-sm">
//             <Link href={`/profile/${otherParticipant.username}`} className="hover:underline">
//               @{otherParticipant.username}
//             </Link>
//           </CardDescription>
//         </div>
//         <Badge className={`ml-auto ${statusBadgeColor[session.status] || 'bg-gray-500 text-white'}`}>
//           {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
//         </Badge>
//       </CardHeader>
//       <CardContent className="pt-2 space-y-2">
//         <p className="text-gray-700">
//           **Skill:** <span className="font-medium">{session.skill}</span>
//         </p>
//         <div className="flex items-center text-sm text-gray-600">
//           <Calendar className="h-4 w-4 mr-2" /> {session.date}
//         </div>
//         <div className="flex items-center text-sm text-gray-600">
//           <Clock className="h-4 w-4 mr-2" /> {session.time} ({session.duration})
//         </div>

//         {session.status === 'active' || session.status === 'upcoming' ? (
//           <Link href={`/chat/${session.chatSessionId}`}>
//             <Button size="sm" className="mt-4 w-full">
//               <MessageSquare className="h-4 w-4 mr-2" /> Go to Chat
//             </Button>
//           </Link>
//         ) : session.status === 'completed' && !session.feedbackGiven ? (
//           <Link href={`/session/${session.chatSessionId}/feedback`}>
//             <Button size="sm" variant="outline" className="mt-4 w-full">
//               <CheckCircle className="h-4 w-4 mr-2" /> Give Feedback
//             </Button>
//           </Link>
//         ) : session.status === 'completed' && session.feedbackGiven ? (
//           <Button size="sm" variant="secondary" disabled className="mt-4 w-full">
//             <CheckCircle className="h-4 w-4 mr-2" /> Feedback Given
//           </Button>
//         ) : session.status === 'cancelled' ? (
//           <Button size="sm" variant="destructive" disabled className="mt-4 w-full">
//             <XCircle className="h-4 w-4 mr-2" /> Cancelled
//           </Button>
//         ) : null}
//       </CardContent>
//     </Card>
//   );
// }

// export default async function MySessionsPage() {
//   // In a real app, you would fetch sessions for the current user from Supabase
//   // For now, we'll use the dummy data.

//   const activeSessions = dummySessions.filter(s => s.status === 'active' || s.status === 'upcoming');
//   const pastSessions = dummySessions.filter(s => s.status === 'completed' || s.status === 'cancelled');

//   return (
//     <div className="container mx-auto py-8 max-w-5xl">
//       <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">My Sessions</h1>

//       <Tabs defaultValue="active" className="w-full">
//         <TabsList className="grid w-full grid-cols-2">
//           <TabsTrigger value="active">Active & Upcoming</TabsTrigger>
//           <TabsTrigger value="past">Past & Cancelled</TabsTrigger>
//         </TabsList>

//         <TabsContent value="active" className="mt-6">
//           {activeSessions.length === 0 ? (
//             <p className="text-gray-600 text-center">No active or upcoming sessions. <Link href="/search" className="text-blue-600 hover:underline">Find a peer to start learning!</Link></p>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {activeSessions.map(session => (
//                 <SessionCard key={session.id} session={session} />
//               ))}
//             </div>
//           )}
//         </TabsContent>

//         <TabsContent value="past" className="mt-6">
//           {pastSessions.length === 0 ? (
//             <p className="text-gray-600 text-center">No past sessions recorded.</p>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {pastSessions.map(session => (
//                 <SessionCard key={session.id} session={session} />
//               ))}
//             </div>
//           )}
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// }








// app/my-sessions/page.jsx
// No "use client"; directive here, making this a Server Component by default

// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Clock, CheckCircle, XCircle, CalendarDays, LinkIcon } from 'lucide-react'; // Added CalendarDays, LinkIcon
// import Link from 'next/link';

// import { createServerSupabaseClient } from '@/lib/supabase/server'; // Import server Supabase client

// export default async function MySessionsPage() {
//   const supabase = await createServerSupabaseClient();

//   const { data: { user } } = await supabase.auth.getUser();

//   if (!user) {
//     // Redirect to login if not authenticated, or display a message
//     return (
//       <div className="container mx-auto py-8 text-center">
//         <h1 className="text-3xl font-bold text-gray-900 mb-4">Access Denied</h1>
//         <p className="text-gray-600">Please log in to view your sessions.</p>
//       </div>
//     );
//   }

//   const currentUserId = user.id;

//   // Fetch all sessions where current user is either proposer or attendee
//   // We'll fetch profiles separately for robustness, similar to my-requests page
//   const { data: rawSessions, error: sessionsError } = await supabase
//     .from('sessions')
//     .select('*') // Select all columns from sessions
//     .or(`proposer_id.eq.${currentUserId},attendee_id.eq.${currentUserId}`);

//   if (sessionsError) {
//     console.error("Error fetching sessions:", sessionsError);
//     return (
//       <div className="container mx-auto py-8 text-center">
//         <h1 className="text-3xl font-bold text-red-600 mb-4">Error Loading Sessions</h1>
//         <p className="text-gray-600">An error occurred while trying to fetch your sessions. Please try again later.</p>
//       </div>
//     );
//   }

//   // Collect all unique proposer and attendee IDs from the fetched sessions
//   const allRelatedUserIds = new Set();
//   rawSessions.forEach(session => {
//     allRelatedUserIds.add(session.proposer_id);
//     allRelatedUserIds.add(session.attendee_id);
//   });

//   const uniqueRelatedUserIds = Array.from(allRelatedUserIds).filter(Boolean);

//   let profilesMap = new Map();
//   if (uniqueRelatedUserIds.length > 0) {
//     // Fetch profiles for all unique related user IDs
//     const { data: relatedProfiles, error: profilesError } = await supabase
//       .from('profiles')
//       .select('id, username, full_name, profile_picture_url');

//     if (profilesError) {
//       console.error("Error fetching related profiles for sessions:", profilesError);
//     } else if (relatedProfiles) {
//       relatedProfiles.forEach(profile => {
//         profilesMap.set(profile.id, profile);
//       });
//     }
//   }

//   // Map the profiles back into the sessions
//   const enrichedSessions = rawSessions.map(session => ({
//     ...session,
//     proposer_profile: profilesMap.get(session.proposer_id),
//     attendee_profile: profilesMap.get(session.attendee_id),
//   }));

//   const sessionsYouProposed = enrichedSessions.filter(session => session.proposer_id === currentUserId);
//   const sessionsWithYou = enrichedSessions.filter(session => session.attendee_id === currentUserId);

//   // Helper function to format date/time
//   const formatDateTime = (isoString) => {
//     if (!isoString) return 'Not set';
//     const date = new Date(isoString);
//     return date.toLocaleString(); // Adjust formatting as needed
//   };

//   return (
//     <div className="container mx-auto py-8 max-w-5xl">
//       <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">My Learning Sessions</h1>

//       {/* Sessions You Proposed Section */}
//       <section className="mb-10">
//         <h2 className="text-2xl font-semibold text-gray-800 mb-4">Sessions You Proposed</h2>
//         {sessionsYouProposed.length === 0 ? (
//           <p className="text-gray-600">You haven't proposed any sessions yet. Accept a peer request or find a connected peer to propose one!</p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {sessionsYouProposed.map(session => (
//               <Card key={session.id} className="p-4">
//                 <CardHeader className="flex flex-row items-center space-x-3 pb-2">
//                   <Avatar className="h-12 w-12">
//                     <AvatarImage src={session.attendee_profile?.profile_picture_url || `https://api.dicebear.com/7.x/lorelei/svg?seed=${session.attendee_profile?.username}`} alt={session.attendee_profile?.full_name} />
//                     <AvatarFallback>{session.attendee_profile?.full_name?.charAt(0) || session.attendee_profile?.username?.charAt(0) || '?'}</AvatarFallback>
//                   </Avatar>
//                   <div>
//                     <CardTitle className="text-lg">With {session.attendee_profile?.full_name || session.attendee_profile?.username || 'Unknown User'}</CardTitle>
//                     <CardDescription className="text-sm">@{session.attendee_profile?.username || 'unknown'}</CardDescription>
//                   </div>
//                 </CardHeader>
//                 <CardContent className="pt-2">
//                   <p className="text-gray-700 mb-2">
//                     **Topic:** <span className="font-medium">{session.topic}</span>
//                   </p>
//                   <p className="text-gray-600 text-sm italic mb-2">"{session.description}"</p>
                  
//                   <div className="flex items-center text-sm text-gray-500 mb-2">
//                     <CalendarDays className="h-4 w-4 mr-1" />
//                     <span>{formatDateTime(session.proposed_datetime)} ({session.duration_minutes} mins)</span>
//                   </div>
//                   {session.meeting_link && (
//                     <div className="flex items-center text-sm text-blue-600 hover:underline mb-2">
//                       <LinkIcon className="h-4 w-4 mr-1" />
//                       <a href={session.meeting_link} target="_blank" rel="noopener noreferrer">Meeting Link</a>
//                     </div>
//                   )}

//                   <div className="flex items-center justify-between mt-3 text-sm text-gray-500">
//                     <span>Proposed on {new Date(session.created_at).toLocaleDateString()}</span>
//                     {session.status === 'proposed' && <Badge variant="outline" className="bg-yellow-100 text-yellow-800"><Clock className="h-3 w-3 mr-1" /> Proposed</Badge>}
//                     {session.status === 'accepted' && <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" /> Accepted</Badge>}
//                     {session.status === 'rescheduled_pending' && <Badge variant="outline" className="bg-orange-100 text-orange-800"><Clock className="h-3 w-3 mr-1" /> Reschedule Pending</Badge>}
//                     {session.status === 'rescheduled_accepted' && <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" /> Reschedule Accepted</Badge>}
//                     {session.status === 'cancelled' && <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" /> Cancelled</Badge>}
//                     {session.status === 'completed' && <Badge className="bg-blue-100 text-blue-800"><CheckCircle className="h-3 w-3 mr-1" /> Completed</Badge>}
//                   </div>
//                   {/* Placeholder for actions */}
//                   {session.status === 'accepted' && (
//                     <Link href={`/chat/${session.id}`} className="w-full">
//                       <Button size="sm" className="mt-4 w-full">
//                         Go to Chat
//                       </Button>
//                     </Link>
//                   )}
//                   {session.status === 'proposed' && (
//                     <Button size="sm" className="mt-4 w-full" variant="outline" disabled>
//                       Waiting for Acceptance
//                     </Button>
//                   )}
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         )}
//       </section>

//       {/* Sessions With You Section (where you are the attendee) */}
//       <section>
//         <h2 className="text-2xl font-semibold text-gray-800 mb-4">Sessions With You</h2>
//         {sessionsWithYou.length === 0 ? (
//           <p className="text-gray-600">No sessions proposed to you yet.</p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {sessionsWithYou.map(session => (
//               <Card key={session.id} className="p-4">
//                 <CardHeader className="flex flex-row items-center space-x-3 pb-2">
//                   <Avatar className="h-12 w-12">
//                     <AvatarImage src={session.proposer_profile?.profile_picture_url || `https://api.dicebear.com/7.x/lorelei/svg?seed=${session.proposer_profile?.username}`} alt={session.proposer_profile?.full_name} />
//                     <AvatarFallback>{session.proposer_profile?.full_name?.charAt(0) || session.proposer_profile?.username?.charAt(0) || '?'}</AvatarFallback>
//                   </Avatar>
//                   <div>
//                     <CardTitle className="text-lg">From {session.proposer_profile?.full_name || session.proposer_profile?.username || 'Unknown User'}</CardTitle>
//                     <CardDescription className="text-sm">@{session.proposer_profile?.username || 'unknown'}</CardDescription>
//                   </div>
//                 </CardHeader>
//                 <CardContent className="pt-2">
//                   <p className="text-gray-700 mb-2">
//                     **Topic:** <span className="font-medium">{session.topic}</span>
//                   </p>
//                   <p className="text-gray-600 text-sm italic mb-2">"{session.description}"</p>

//                   <div className="flex items-center text-sm text-gray-500 mb-2">
//                     <CalendarDays className="h-4 w-4 mr-1" />
//                     <span>{formatDateTime(session.proposed_datetime)} ({session.duration_minutes} mins)</span>
//                   </div>
//                   {session.meeting_link && (
//                     <div className="flex items-center text-sm text-blue-600 hover:underline mb-2">
//                       <LinkIcon className="h-4 w-4 mr-1" />
//                       <a href={session.meeting_link} target="_blank" rel="noopener noreferrer">Meeting Link</a>
//                     </div>
//                   )}

//                   <div className="flex items-center justify-between mt-3 text-sm text-gray-500">
//                     <span>Proposed on {new Date(session.created_at).toLocaleDateString()}</span>
//                     {session.status === 'proposed' && <Badge variant="outline" className="bg-yellow-100 text-yellow-800"><Clock className="h-3 w-3 mr-1" /> Proposed</Badge>}
//                     {session.status === 'accepted' && <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" /> Accepted</Badge>}
//                     {session.status === 'rescheduled_pending' && <Badge variant="outline" className="bg-orange-100 text-orange-800"><Clock className="h-3 w-3 mr-1" /> Reschedule Pending</Badge>}
//                     {session.status === 'rescheduled_accepted' && <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" /> Reschedule Accepted</Badge>}
//                     {session.status === 'cancelled' && <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" /> Cancelled</Badge>}
//                     {session.status === 'completed' && <Badge className="bg-blue-100 text-blue-800"><CheckCircle className="h-3 w-3 mr-1" /> Completed</Badge>}
//                   </div>
//                   {/* Placeholder for actions */}
//                   {session.status === 'proposed' && (
//                     <div className="flex gap-2 mt-4">
//                       <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white flex-1" disabled>
//                         Accept
//                       </Button>
//                       <Button size="sm" variant="outline" className="flex-1" disabled>
//                         Reschedule
//                       </Button>
//                       <Button size="sm" variant="destructive" className="flex-1" disabled>
//                         Decline
//                       </Button>
//                     </div>
//                   )}
//                   {session.status === 'accepted' && (
//                     <Link href={`/chat/${session.id}`} className="w-full">
//                       <Button size="sm" className="mt-4 w-full">
//                         Go to Chat
//                       </Button>
//                     </Link>
//                   )}
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         )}
//       </section>
//     </div>
//   );
// }











// // app/my-sessions/page.jsx
// // No "use client"; directive here, making this a Server Component by default

// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Clock, CheckCircle, XCircle, CalendarDays, LinkIcon } from 'lucide-react';
// import Link from 'next/link';

// import { createServerSupabaseClient } from '@/lib/supabase/server';
// import { SessionActionButtons } from '@/components/sessions/SessionActionButtons'; // NEW: Import the action buttons

// export default async function MySessionsPage() {
//   const supabase = await createServerSupabaseClient();

//   const { data: { user } } = await supabase.auth.getUser();

//   if (!user) {
//     return (
//       <div className="container mx-auto py-8 text-center">
//         <h1 className="text-3xl font-bold text-gray-900 mb-4">Access Denied</h1>
//         <p className="text-gray-600">Please log in to view your sessions.</p>
//       </div>
//     );
//   }

//   const currentUserId = user.id;

//   const { data: rawSessions, error: sessionsError } = await supabase
//     .from('sessions')
//     .select('*')
//     .or(`proposer_id.eq.${currentUserId},attendee_id.eq.${currentUserId}`);

//   if (sessionsError) {
//     console.error("Error fetching sessions:", sessionsError);
//     return (
//       <div className="container mx-auto py-8 text-center">
//         <h1 className="text-3xl font-bold text-red-600 mb-4">Error Loading Sessions</h1>
//         <p className="text-gray-600">An error occurred while trying to fetch your sessions. Please try again later.</p>
//       </div>
//     );
//   }

//   const allRelatedUserIds = new Set();
//   rawSessions.forEach(session => {
//     allRelatedUserIds.add(session.proposer_id);
//     allRelatedUserIds.add(session.attendee_id);
//   });

//   const uniqueRelatedUserIds = Array.from(allRelatedUserIds).filter(Boolean);

//   let profilesMap = new Map();
//   if (uniqueRelatedUserIds.length > 0) {
//     const { data: relatedProfiles, error: profilesError } = await supabase
//       .from('profiles')
//       .select('id, username, full_name, profile_picture_url');

//     if (profilesError) {
//       console.error("Error fetching related profiles for sessions:", profilesError);
//     } else if (relatedProfiles) {
//       relatedProfiles.forEach(profile => {
//         profilesMap.set(profile.id, profile);
//       });
//     }
//   }

//   const enrichedSessions = rawSessions.map(session => ({
//     ...session,
//     proposer_profile: profilesMap.get(session.proposer_id),
//     attendee_profile: profilesMap.get(session.attendee_id),
//   }));

//   const sessionsYouProposed = enrichedSessions.filter(session => session.proposer_id === currentUserId);
//   const sessionsWithYou = enrichedSessions.filter(session => session.attendee_id === currentUserId);

//   const formatDateTime = (isoString) => {
//     if (!isoString) return 'Not set';
//     const date = new Date(isoString);
//     return date.toLocaleString();
//   };

//   return (
//     <div className="container mx-auto py-8 max-w-5xl">
//       <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">My Learning Sessions</h1>

//       {/* Sessions You Proposed Section */}
//       <section className="mb-10">
//         <h2 className="text-2xl font-semibold text-gray-800 mb-4">Sessions You Proposed</h2>
//         {sessionsYouProposed.length === 0 ? (
//           <p className="text-gray-600">You haven't proposed any sessions yet. Accept a peer request or find a connected peer to propose one!</p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {sessionsYouProposed.map(session => (
//               <Card key={session.id} className="p-4">
//                 <CardHeader className="flex flex-row items-center space-x-3 pb-2">
//                   <Avatar className="h-12 w-12">
//                     <AvatarImage src={session.attendee_profile?.profile_picture_url || `https://api.dicebear.com/7.x/lorelei/svg?seed=${session.attendee_profile?.username}`} alt={session.attendee_profile?.full_name} />
//                     <AvatarFallback>{session.attendee_profile?.full_name?.charAt(0) || session.attendee_profile?.username?.charAt(0) || '?'}</AvatarFallback>
//                   </Avatar>
//                   <div>
//                     <CardTitle className="text-lg">With {session.attendee_profile?.full_name || session.attendee_profile?.username || 'Unknown User'}</CardTitle>
//                     <CardDescription className="text-sm">@{session.attendee_profile?.username || 'unknown'}</CardDescription>
//                   </div>
//                 </CardHeader>
//                 <CardContent className="pt-2">
//                   <p className="text-gray-700 mb-2">
//                     **Topic:** <span className="font-medium">{session.topic}</span>
//                   </p>
//                   <p className="text-gray-600 text-sm italic mb-2">"{session.description}"</p>
                  
//                   <div className="flex items-center text-sm text-gray-500 mb-2">
//                     <CalendarDays className="h-4 w-4 mr-1" />
//                     <span>{formatDateTime(session.proposed_datetime)} ({session.duration_minutes} mins)</span>
//                   </div>
//                   {session.meeting_link && (
//                     <div className="flex items-center text-sm text-blue-600 hover:underline mb-2">
//                       <LinkIcon className="h-4 w-4 mr-1" />
//                       <a href={session.meeting_link} target="_blank" rel="noopener noreferrer">Meeting Link</a>
//                     </div>
//                   )}

//                   <div className="flex items-center justify-between mt-3 text-sm text-gray-500">
//                     <span>Proposed on {new Date(session.created_at).toLocaleDateString()}</span>
//                     {session.status === 'proposed' && <Badge variant="outline" className="bg-yellow-100 text-yellow-800"><Clock className="h-3 w-3 mr-1" /> Proposed</Badge>}
//                     {session.status === 'accepted' && <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" /> Accepted</Badge>}
//                     {session.status === 'rescheduled_pending' && <Badge variant="outline" className="bg-orange-100 text-orange-800"><Clock className="h-3 w-3 mr-1" /> Reschedule Pending</Badge>}
//                     {session.status === 'rescheduled_accepted' && <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" /> Reschedule Accepted</Badge>}
//                     {session.status === 'cancelled' && <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" /> Cancelled</Badge>}
//                     {session.status === 'completed' && <Badge className="bg-blue-100 text-blue-800"><CheckCircle className="h-3 w-3 mr-1" /> Completed</Badge>}
//                   </div>
//                   {/* Integrate SessionActionButtons for proposer */}
//                   <SessionActionButtons
//                     sessionId={session.id}
//                     sessionStatus={session.status}
//                     currentUserId={currentUserId}
//                     proposerId={session.proposer_id}
//                     attendeeId={session.attendee_id}
//                   />
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         )}
//       </section>

//       {/* Sessions With You Section (where you are the attendee) */}
//       <section>
//         <h2 className="text-2xl font-semibold text-gray-800 mb-4">Sessions With You</h2>
//         {sessionsWithYou.length === 0 ? (
//           <p className="text-gray-600">No sessions proposed to you yet.</p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {sessionsWithYou.map(session => (
//               <Card key={session.id} className="p-4">
//                 <CardHeader className="flex flex-row items-center space-x-3 pb-2">
//                   <Avatar className="h-12 w-12">
//                     <AvatarImage src={session.proposer_profile?.profile_picture_url || `https://api.dicebear.com/7.x/lorelei/svg?seed=${session.proposer_profile?.username}`} alt={session.proposer_profile?.full_name} />
//                     <AvatarFallback>{session.proposer_profile?.full_name?.charAt(0) || session.proposer_profile?.username?.charAt(0) || '?'}</AvatarFallback>
//                   </Avatar>
//                   <div>
//                     <CardTitle className="text-lg">From {session.proposer_profile?.full_name || session.proposer_profile?.username || 'Unknown User'}</CardTitle>
//                     <CardDescription className="text-sm">@{session.proposer_profile?.username || 'unknown'}</CardDescription>
//                   </div>
//                 </CardHeader>
//                 <CardContent className="pt-2">
//                   <p className="text-gray-700 mb-2">
//                     **Topic:** <span className="font-medium">{session.topic}</span>
//                   </p>
//                   <p className="text-gray-600 text-sm italic mb-2">"{session.description}"</p>

//                   <div className="flex items-center text-sm text-gray-500 mb-2">
//                     <CalendarDays className="h-4 w-4 mr-1" />
//                     <span>{formatDateTime(session.proposed_datetime)} ({session.duration_minutes} mins)</span>
//                   </div>
//                   {session.meeting_link && (
//                     <div className="flex items-center text-sm text-blue-600 hover:underline mb-2">
//                       <LinkIcon className="h-4 w-4 mr-1" />
//                       <a href={session.meeting_link} target="_blank" rel="noopener noreferrer">Meeting Link</a>
//                     </div>
//                   )}

//                   <div className="flex items-center justify-between mt-3 text-sm text-gray-500">
//                     <span>Proposed on {new Date(session.created_at).toLocaleDateString()}</span>
//                     {session.status === 'proposed' && <Badge variant="outline" className="bg-yellow-100 text-yellow-800"><Clock className="h-3 w-3 mr-1" /> Proposed</Badge>}
//                     {session.status === 'accepted' && <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" /> Accepted</Badge>}
//                     {session.status === 'rescheduled_pending' && <Badge variant="outline" className="bg-orange-100 text-orange-800"><Clock className="h-3 w-3 mr-1" /> Reschedule Pending</Badge>}
//                     {session.status === 'rescheduled_accepted' && <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" /> Reschedule Accepted</Badge>}
//                     {session.status === 'cancelled' && <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" /> Cancelled</Badge>}
//                     {session.status === 'completed' && <Badge className="bg-blue-100 text-blue-800"><CheckCircle className="h-3 w-3 mr-1" /> Completed</Badge>}
//                   </div>
//                   {/* Integrate SessionActionButtons for attendee */}
//                   <SessionActionButtons
//                     sessionId={session.id}
//                     sessionStatus={session.status}
//                     currentUserId={currentUserId}
//                     proposerId={session.proposer_id}
//                     attendeeId={session.attendee_id}
//                   />
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         )}
//       </section>
//     </div>
//   );
// }












// // app/my-sessions/page.jsx
// // No "use client"; directive here, making this a Server Component by default

// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Clock, CheckCircle, XCircle, CalendarDays, LinkIcon } from 'lucide-react';
// import Link from 'next/link';

// import { createServerSupabaseClient } from '@/lib/supabase/server';
// import { SessionActionButtons } from '@/components/sessions/SessionActionButtons';

// export default async function MySessionsPage() {
//   const supabase = await createServerSupabaseClient();

//   const { data: { user } } = await supabase.auth.getUser();

//   if (!user) {
//     return (
//       <div className="container mx-auto py-8 text-center">
//         <h1 className="text-3xl font-bold text-gray-900 mb-4">Access Denied</h1>
//         <p className="text-gray-600">Please log in to view your sessions.</p>
//       </div>
//     );
//   }

//   const currentUserId = user.id;

//   const { data: rawSessions, error: sessionsError } = await supabase
//     .from('sessions')
//     .select('*') // Select all columns from sessions
//     .or(`proposer_id.eq.${currentUserId},attendee_id.eq.${currentUserId}`);

//   if (sessionsError) {
//     console.error("Error fetching sessions:", sessionsError);
//     return (
//       <div className="container mx-auto py-8 text-center">
//         <h1 className="text-3xl font-bold text-red-600 mb-4">Error Loading Sessions</h1>
//         <p className="text-gray-600">An error occurred while trying to fetch your sessions. Please try again later.</p>
//       </div>
//     );
//   }

//   const allRelatedUserIds = new Set();
//   rawSessions.forEach(session => {
//     allRelatedUserIds.add(session.proposer_id);
//     allRelatedUserIds.add(session.attendee_id);
//   });

//   const uniqueRelatedUserIds = Array.from(allRelatedUserIds).filter(Boolean);

//   let profilesMap = new Map();
//   if (uniqueRelatedUserIds.length > 0) {
//     const { data: relatedProfiles, error: profilesError } = await supabase
//       .from('profiles')
//       .select('id, username, full_name, profile_picture_url');

//     if (profilesError) {
//       console.error("Error fetching related profiles for sessions:", profilesError);
//     } else if (relatedProfiles) {
//       relatedProfiles.forEach(profile => {
//         profilesMap.set(profile.id, profile);
//       });
//     }
//   }

//   const enrichedSessions = rawSessions.map(session => ({
//     ...session,
//     proposer_profile: profilesMap.get(session.proposer_id),
//     attendee_profile: profilesMap.get(session.attendee_id),
//   }));

//   const sessionsYouProposed = enrichedSessions.filter(session => session.proposer_id === currentUserId);
//   const sessionsWithYou = enrichedSessions.filter(session => session.attendee_id === currentUserId);

//   const formatDateTime = (isoString) => {
//     if (!isoString) return 'Not set';
//     const date = new Date(isoString);
//     return date.toLocaleString();
//   };

//   return (
//     <div className="container mx-auto py-8 max-w-5xl">
//       <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">My Learning Sessions</h1>

//       {/* Sessions You Proposed Section */}
//       <section className="mb-10">
//         <h2 className="text-2xl font-semibold text-gray-800 mb-4">Sessions You Proposed</h2>
//         {sessionsYouProposed.length === 0 ? (
//           <p className="text-gray-600">You haven't proposed any sessions yet. Accept a peer request or find a connected peer to propose one!</p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {sessionsYouProposed.map(session => (
//               <Card key={session.id} className="p-4">
//                 <CardHeader className="flex flex-row items-center space-x-3 pb-2">
//                   <Avatar className="h-12 w-12">
//                     <AvatarImage src={session.attendee_profile?.profile_picture_url || `https://api.dicebear.com/7.x/lorelei/svg?seed=${session.attendee_profile?.username}`} alt={session.attendee_profile?.full_name} />
//                     <AvatarFallback>{session.attendee_profile?.full_name?.charAt(0) || session.attendee_profile?.username?.charAt(0) || '?'}</AvatarFallback>
//                   </Avatar>
//                   <div>
//                     <CardTitle className="text-lg">With {session.attendee_profile?.full_name || session.attendee_profile?.username || 'Unknown User'}</CardTitle>
//                     <CardDescription className="text-sm">@{session.attendee_profile?.username || 'unknown'}</CardDescription>
//                   </div>
//                 </CardHeader>
//                 <CardContent className="pt-2">
//                   <p className="text-gray-700 mb-2">
//                     **Topic:** <span className="font-medium">{session.topic}</span>
//                   </p>
//                   <p className="text-gray-600 text-sm italic mb-2">"{session.description}"</p>
                  
//                   <div className="flex items-center text-sm text-gray-500 mb-2">
//                     <CalendarDays className="h-4 w-4 mr-1" />
//                     <span>{formatDateTime(session.proposed_datetime)} ({session.duration_minutes} mins)</span>
//                   </div>
//                   {session.meeting_link && (
//                     <div className="flex items-center text-sm text-blue-600 hover:underline mb-2">
//                       <LinkIcon className="h-4 w-4 mr-1" />
//                       <a href={session.meeting_link} target="_blank" rel="noopener noreferrer">Meeting Link</a>
//                     </div>
//                   )}

//                   <div className="flex items-center justify-between mt-3 text-sm text-gray-500">
//                     <span>Proposed on {new Date(session.created_at).toLocaleDateString()}</span>
//                     {session.status === 'proposed' && <Badge variant="outline" className="bg-yellow-100 text-yellow-800"><Clock className="h-3 w-3 mr-1" /> Proposed</Badge>}
//                     {session.status === 'accepted' && <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" /> Accepted</Badge>}
//                     {session.status === 'rescheduled_pending' && <Badge variant="outline" className="bg-orange-100 text-orange-800"><Clock className="h-3 w-3 mr-1" /> Reschedule Pending</Badge>}
//                     {session.status === 'rescheduled_accepted' && <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" /> Reschedule Accepted</Badge>}
//                     {session.status === 'cancelled' && <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" /> Cancelled</Badge>}
//                     {session.status === 'completed' && <Badge className="bg-blue-100 text-blue-800"><CheckCircle className="h-3 w-3 mr-1" /> Completed</Badge>}
//                   </div>
//                   <SessionActionButtons
//                     sessionId={session.id}
//                     sessionStatus={session.status}
//                     currentUserId={currentUserId}
//                     proposerId={session.proposer_id}
//                     attendeeId={session.attendee_id}
//                     // lastRescheduleInitiatorId is NOT passed here yet
//                   />
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         )}
//       </section>

//       {/* Sessions With You Section (where you are the attendee) */}
//       <section>
//         <h2 className="text-2xl font-semibold text-gray-800 mb-4">Sessions With You</h2>
//         {sessionsWithYou.length === 0 ? (
//           <p className="text-gray-600">No sessions proposed to you yet.</p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {sessionsWithYou.map(session => (
//               <Card key={session.id} className="p-4">
//                 <CardHeader className="flex flex-row items-center space-x-3 pb-2">
//                   <Avatar className="h-12 w-12">
//                     <AvatarImage src={session.proposer_profile?.profile_picture_url || `https://api.dicebear.com/7.x/lorelei/svg?seed=${session.proposer_profile?.username}`} alt={session.proposer_profile?.full_name} />
//                     <AvatarFallback>{session.proposer_profile?.full_name?.charAt(0) || session.proposer_profile?.username?.charAt(0) || '?'}</AvatarFallback>
//                   </Avatar>
//                   <div>
//                     <CardTitle className="text-lg">From {session.proposer_profile?.full_name || session.proposer_profile?.username || 'Unknown User'}</CardTitle>
//                     <CardDescription className="text-sm">@{session.proposer_profile?.username || 'unknown'}</CardDescription>
//                   </div>
//                 </CardHeader>
//                 <CardContent className="pt-2">
//                   <p className="text-gray-700 mb-2">
//                     **Topic:** <span className="font-medium">{session.topic}</span>
//                   </p>
//                   <p className="text-gray-600 text-sm italic mb-2">"{session.description}"</p>

//                   <div className="flex items-center text-sm text-gray-500 mb-2">
//                     <CalendarDays className="h-4 w-4 mr-1" />
//                     <span>{formatDateTime(session.proposed_datetime)} ({session.duration_minutes} mins)</span>
//                   </div>
//                   {session.meeting_link && (
//                     <div className="flex items-center text-sm text-blue-600 hover:underline mb-2">
//                       <LinkIcon className="h-4 w-4 mr-1" />
//                       <a href={session.meeting_link} target="_blank" rel="noopener noreferrer">Meeting Link</a>
//                     </div>
//                   )}

//                   <div className="flex items-center justify-between mt-3 text-sm text-gray-500">
//                     <span>Proposed on {new Date(session.created_at).toLocaleDateString()}</span>
//                     {session.status === 'proposed' && <Badge variant="outline" className="bg-yellow-100 text-yellow-800"><Clock className="h-3 w-3 mr-1" /> Proposed</Badge>}
//                     {session.status === 'accepted' && <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" /> Accepted</Badge>}
//                     {session.status === 'rescheduled_pending' && <Badge variant="outline" className="bg-orange-100 text-orange-800"><Clock className="h-3 w-3 mr-1" /> Reschedule Pending</Badge>}
//                     {session.status === 'rescheduled_accepted' && <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" /> Reschedule Accepted</Badge>}
//                     {session.status === 'cancelled' && <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" /> Cancelled</Badge>}
//                     {session.status === 'completed' && <Badge className="bg-blue-100 text-blue-800"><CheckCircle className="h-3 w-3 mr-1" /> Completed</Badge>}
//                   </div>
//                   <SessionActionButtons
//                     sessionId={session.id}
//                     sessionStatus={session.status}
//                     currentUserId={currentUserId}
//                     proposerId={session.proposer_id}
//                     attendeeId={session.attendee_id}
//                     // lastRescheduleInitiatorId is NOT passed here yet
//                   />
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         )}
//       </section>
//     </div>
//   );
// }









// // app/my-sessions/page.jsx
// // No "use client"; directive here, making this a Server Component by default

// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Clock, CheckCircle, XCircle, CalendarDays, LinkIcon } from 'lucide-react';
// import Link from 'next/link';

// import { createServerSupabaseClient } from '@/lib/supabase/server';
// import { SessionActionButtons } from '@/components/sessions/SessionActionButtons';

// export default async function MySessionsPage() {
//   const supabase = await createServerSupabaseClient();

//   const { data: { user } } = await supabase.auth.getUser();

//   if (!user) {
//     return (
//       <div className="container mx-auto py-8 text-center">
//         <h1 className="text-3xl font-bold text-gray-900 mb-4">Access Denied</h1>
//         <p className="text-gray-600">Please log in to view your sessions.</p>
//       </div>
//     );
//   }

//   const currentUserId = user.id;

//   // NEW: Select the last_reschedule_initiator_id column
//   const { data: rawSessions, error: sessionsError } = await supabase
//     .from('sessions')
//     .select('*, last_reschedule_initiator_id')
//     .or(`proposer_id.eq.${currentUserId},attendee_id.eq.${currentUserId}`);

//   if (sessionsError) {
//     console.error("Error fetching sessions:", sessionsError);
//     return (
//       <div className="container mx-auto py-8 text-center">
//         <h1 className="text-3xl font-bold text-red-600 mb-4">Error Loading Sessions</h1>
//         <p className="text-gray-600">An error occurred while trying to fetch your sessions. Please try again later.</p>
//       </div>
//     );
//   }

//   const allRelatedUserIds = new Set();
//   rawSessions.forEach(session => {
//     allRelatedUserIds.add(session.proposer_id);
//     allRelatedUserIds.add(session.attendee_id);
//     if (session.last_reschedule_initiator_id) { // Add initiator to map
//       allRelatedUserIds.add(session.last_reschedule_initiator_id);
//     }
//   });

//   const uniqueRelatedUserIds = Array.from(allRelatedUserIds).filter(Boolean);

//   let profilesMap = new Map();
//   if (uniqueRelatedUserIds.length > 0) {
//     const { data: relatedProfiles, error: profilesError } = await supabase
//       .from('profiles')
//       .select('id, username, full_name, profile_picture_url');

//     if (profilesError) {
//       console.error("Error fetching related profiles for sessions:", profilesError);
//     } else if (relatedProfiles) {
//       relatedProfiles.forEach(profile => {
//         profilesMap.set(profile.id, profile);
//       });
//     }
//   }

//   const enrichedSessions = rawSessions.map(session => ({
//     ...session,
//     proposer_profile: profilesMap.get(session.proposer_id),
//     attendee_profile: profilesMap.get(session.attendee_id),
//     last_reschedule_initiator_profile: profilesMap.get(session.last_reschedule_initiator_id), // NEW: Map initiator profile
//   }));

//   const sessionsYouProposed = enrichedSessions.filter(session => session.proposer_id === currentUserId);
//   const sessionsWithYou = enrichedSessions.filter(session => session.attendee_id === currentUserId);

//   const formatDateTime = (isoString) => {
//     if (!isoString) return 'Not set';
//     const date = new Date(isoString);
//     return date.toLocaleString();
//   };

//   return (
//     <div className="container mx-auto py-8 max-w-5xl">
//       <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">My Learning Sessions</h1>

//       {/* Sessions You Proposed Section */}
//       <section className="mb-10">
//         <h2 className="text-2xl font-semibold text-gray-800 mb-4">Sessions You Proposed</h2>
//         {sessionsYouProposed.length === 0 ? (
//           <p className="text-gray-600">You haven't proposed any sessions yet. Accept a peer request or find a connected peer to propose one!</p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {sessionsYouProposed.map(session => (
//               <Card key={session.id} className="p-4">
//                 <CardHeader className="flex flex-row items-center space-x-3 pb-2">
//                   <Avatar className="h-12 w-12">
//                     <AvatarImage src={session.attendee_profile?.profile_picture_url || `https://api.dicebear.com/7.x/lorelei/svg?seed=${session.attendee_profile?.username}`} alt={session.attendee_profile?.full_name} />
//                     <AvatarFallback>{session.attendee_profile?.full_name?.charAt(0) || session.attendee_profile?.username?.charAt(0) || '?'}</AvatarFallback>
//                   </Avatar>
//                   <div>
//                     <CardTitle className="text-lg">With {session.attendee_profile?.full_name || session.attendee_profile?.username || 'Unknown User'}</CardTitle>
//                     <CardDescription className="text-sm">@{session.attendee_profile?.username || 'unknown'}</CardDescription>
//                   </div>
//                 </CardHeader>
//                 <CardContent className="pt-2">
//                   <p className="text-gray-700 mb-2">
//                     **Topic:** <span className="font-medium">{session.topic}</span>
//                   </p>
//                   <p className="text-gray-600 text-sm italic mb-2">"{session.description}"</p>
                  
//                   <div className="flex items-center text-sm text-gray-500 mb-2">
//                     <CalendarDays className="h-4 w-4 mr-1" />
//                     <span>{formatDateTime(session.proposed_datetime)} ({session.duration_minutes} mins)</span>
//                   </div>
//                   {session.meeting_link && (
//                     <div className="flex items-center text-sm text-blue-600 hover:underline mb-2">
//                       <LinkIcon className="h-4 w-4 mr-1" />
//                       <a href={session.meeting_link} target="_blank" rel="noopener noreferrer">Meeting Link</a>
//                     </div>
//                   )}

//                   <div className="flex items-center justify-between mt-3 text-sm text-gray-500">
//                     <span>Proposed on {new Date(session.created_at).toLocaleDateString()}</span>
//                     {session.status === 'proposed' && <Badge variant="outline" className="bg-yellow-100 text-yellow-800"><Clock className="h-3 w-3 mr-1" /> Proposed</Badge>}
//                     {session.status === 'accepted' && <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" /> Accepted</Badge>}
//                     {session.status === 'rescheduled_pending' && <Badge variant="outline" className="bg-orange-100 text-orange-800"><Clock className="h-3 w-3 mr-1" /> Reschedule Pending</Badge>}
//                     {session.status === 'rescheduled_accepted' && <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" /> Reschedule Accepted</Badge>}
//                     {session.status === 'cancelled' && <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" /> Cancelled</Badge>}
//                     {session.status === 'completed' && <Badge className="bg-blue-100 text-blue-800"><CheckCircle className="h-3 w-3 mr-1" /> Completed</Badge>}
//                   </div>
//                   <SessionActionButtons
//                     sessionId={session.id}
//                     sessionStatus={session.status}
//                     currentUserId={currentUserId}
//                     proposerId={session.proposer_id}
//                     attendeeId={session.attendee_id}
//                     lastRescheduleInitiatorId={session.last_reschedule_initiator_id} // NEW: Pass initiator ID
//                   />
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         )}
//       </section>

//       {/* Sessions With You Section (where you are the attendee) */}
//       <section>
//         <h2 className="text-2xl font-semibold text-gray-800 mb-4">Sessions With You</h2>
//         {sessionsWithYou.length === 0 ? (
//           <p className="text-gray-600">No sessions proposed to you yet.</p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {sessionsWithYou.map(session => (
//               <Card key={session.id} className="p-4">
//                 <CardHeader className="flex flex-row items-center space-x-3 pb-2">
//                   <Avatar className="h-12 w-12">
//                     <AvatarImage src={session.proposer_profile?.profile_picture_url || `https://api.dicebear.com/7.x/lorelei/svg?seed=${session.proposer_profile?.username}`} alt={session.proposer_profile?.full_name} />
//                     <AvatarFallback>{session.proposer_profile?.full_name?.charAt(0) || session.proposer_profile?.username?.charAt(0) || '?'}</AvatarFallback>
//                   </Avatar>
//                   <div>
//                     <CardTitle className="text-lg">From {session.proposer_profile?.full_name || session.proposer_profile?.username || 'Unknown User'}</CardTitle>
//                     <CardDescription className="text-sm">@{session.proposer_profile?.username || 'unknown'}</CardDescription>
//                   </div>
//                 </CardHeader>
//                 <CardContent className="pt-2">
//                   <p className="text-gray-700 mb-2">
//                     **Topic:** <span className="font-medium">{session.topic}</span>
//                   </p>
//                   <p className="text-gray-600 text-sm italic mb-2">"{session.description}"</p>

//                   <div className="flex items-center text-sm text-gray-500 mb-2">
//                     <CalendarDays className="h-4 w-4 mr-1" />
//                     <span>{formatDateTime(session.proposed_datetime)} ({session.duration_minutes} mins)</span>
//                   </div>
//                   {session.meeting_link && (
//                     <div className="flex items-center text-sm text-blue-600 hover:underline mb-2">
//                       <LinkIcon className="h-4 w-4 mr-1" />
//                       <a href={session.meeting_link} target="_blank" rel="noopener noreferrer">Meeting Link</a>
//                     </div>
//                   )}

//                   <div className="flex items-center justify-between mt-3 text-sm text-gray-500">
//                     <span>Proposed on {new Date(session.created_at).toLocaleDateString()}</span>
//                     {session.status === 'proposed' && <Badge variant="outline" className="bg-yellow-100 text-yellow-800"><Clock className="h-3 w-3 mr-1" /> Proposed</Badge>}
//                     {session.status === 'accepted' && <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" /> Accepted</Badge>}
//                     {session.status === 'rescheduled_pending' && <Badge variant="outline" className="bg-orange-100 text-orange-800"><Clock className="h-3 w-3 mr-1" /> Reschedule Pending</Badge>}
//                     {session.status === 'rescheduled_accepted' && <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" /> Reschedule Accepted</Badge>}
//                     {session.status === 'cancelled' && <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" /> Cancelled</Badge>}
//                     {session.status === 'completed' && <Badge className="bg-blue-100 text-blue-800"><CheckCircle className="h-3 w-3 mr-1" /> Completed</Badge>}
//                   </div>
//                   <SessionActionButtons
//                     sessionId={session.id}
//                     sessionStatus={session.status}
//                     currentUserId={currentUserId}
//                     proposerId={session.proposer_id}
//                     attendeeId={session.attendee_id}
//                     lastRescheduleInitiatorId={session.last_reschedule_initiator_id} // NEW: Pass initiator ID
//                   />
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         )}
//       </section>
//     </div>
//   );
// }






// // app/my-sessions/page.jsx
// // No "use client"; directive here, making this a Server Component by default

// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Clock, CheckCircle, XCircle, CalendarDays, LinkIcon } from 'lucide-react';
// import Link from 'next/link';

// import { createServerSupabaseClient } from '@/lib/supabase/server';
// import { SessionActionButtons } from '@/components/sessions/SessionActionButtons';

// export default async function MySessionsPage() {
//   const supabase = await createServerSupabaseClient();

//   const { data: { user } } = await supabase.auth.getUser();

//   if (!user) {
//     return (
//       <div className="container mx-auto py-8 text-center">
//         <h1 className="text-3xl font-bold text-gray-900 mb-4">Access Denied</h1>
//         <p className="text-gray-600">Please log in to view your sessions.</p>
//       </div>
//     );
//   }

//   const currentUserId = user.id;

//   // NEW: Select the last_reschedule_initiator_id column
//   const { data: rawSessions, error: sessionsError } = await supabase
//     .from('sessions')
//     .select('*, last_reschedule_initiator_id')
//     .or(`proposer_id.eq.${currentUserId},attendee_id.eq.${currentUserId}`);

//   if (sessionsError) {
//     console.error("Error fetching sessions:", sessionsError);
//     return (
//       <div className="container mx-auto py-8 text-center">
//         <h1 className="text-3xl font-bold text-red-600 mb-4">Error Loading Sessions</h1>
//         <p className="text-gray-600">An error occurred while trying to fetch your sessions. Please try again later.</p>
//       </div>
//     );
//   }

//   const allRelatedUserIds = new Set();
//   rawSessions.forEach(session => {
//     allRelatedUserIds.add(session.proposer_id);
//     allRelatedUserIds.add(session.attendee_id);
//     if (session.last_reschedule_initiator_id) { // Add initiator to map
//       allRelatedUserIds.add(session.last_reschedule_initiator_id);
//     }
//   });

//   const uniqueRelatedUserIds = Array.from(allRelatedUserIds).filter(Boolean);

//   let profilesMap = new Map();
//   if (uniqueRelatedUserIds.length > 0) {
//     const { data: relatedProfiles, error: profilesError } = await supabase
//       .from('profiles')
//       .select('id, username, full_name, profile_picture_url');

//     if (profilesError) {
//       console.error("Error fetching related profiles for sessions:", profilesError);
//     } else if (relatedProfiles) {
//       relatedProfiles.forEach(profile => {
//         profilesMap.set(profile.id, profile);
//       });
//     }
//   }

//   const enrichedSessions = rawSessions.map(session => ({
//     ...session,
//     proposer_profile: profilesMap.get(session.proposer_id),
//     attendee_profile: profilesMap.get(session.attendee_id),
//     last_reschedule_initiator_profile: profilesMap.get(session.last_reschedule_initiator_id), // NEW: Map initiator profile
//   }));

//   const sessionsYouProposed = enrichedSessions.filter(session => session.proposer_id === currentUserId);
//   const sessionsWithYou = enrichedSessions.filter(session => session.attendee_id === currentUserId);

//   const formatDateTime = (isoString) => {
//     if (!isoString) return 'Not set';
//     const date = new Date(isoString);
//     return date.toLocaleString();
//   };

//   return (
//     <div className="container mx-auto py-8 max-w-5xl">
//       <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">My Learning Sessions</h1>

//       {/* Sessions You Proposed Section */}
//       <section className="mb-10">
//         <h2 className="text-2xl font-semibold text-gray-800 mb-4">Sessions You Proposed</h2>
//         {sessionsYouProposed.length === 0 ? (
//           <p className="text-gray-600">You haven't proposed any sessions yet. Accept a peer request or find a connected peer to propose one!</p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {sessionsYouProposed.map(session => (
//               <Card key={session.id} className="p-4">
//                 <CardHeader className="flex flex-row items-center space-x-3 pb-2">
//                   <Avatar className="h-12 w-12">
//                     <AvatarImage src={session.attendee_profile?.profile_picture_url || `https://api.dicebear.com/7.x/lorelei/svg?seed=${session.attendee_profile?.username}`} alt={session.attendee_profile?.full_name} />
//                     <AvatarFallback>{session.attendee_profile?.full_name?.charAt(0) || session.attendee_profile?.username?.charAt(0) || '?'}</AvatarFallback>
//                   </Avatar>
//                   <div>
//                     <CardTitle className="text-lg">With {session.attendee_profile?.full_name || session.attendee_profile?.username || 'Unknown User'}</CardTitle>
//                     <CardDescription className="text-sm">@{session.attendee_profile?.username || 'unknown'}</CardDescription>
//                   </div>
//                 </CardHeader>
//                 <CardContent className="pt-2">
//                   <p className="text-gray-700 mb-2">
//                     **Topic:** <span className="font-medium">{session.topic}</span>
//                   </p>
//                   <p className="text-gray-600 text-sm italic mb-2">"{session.description}"</p>
                  
//                   <div className="flex items-center text-sm text-gray-500 mb-2">
//                     <CalendarDays className="h-4 w-4 mr-1" />
//                     <span>{formatDateTime(session.proposed_datetime)} ({session.duration_minutes} mins)</span>
//                   </div>
//                   {session.meeting_link && (
//                     <div className="flex items-center text-sm text-blue-600 hover:underline mb-2">
//                       <LinkIcon className="h-4 w-4 mr-1" />
//                       <a href={session.meeting_link} target="_blank" rel="noopener noreferrer">Meeting Link</a>
//                     </div>
//                   )}

//                   <div className="flex items-center justify-between mt-3 text-sm text-gray-500">
//                     <span>Proposed on {new Date(session.created_at).toLocaleDateString()}</span>
//                     {session.status === 'proposed' && <Badge variant="outline" className="bg-yellow-100 text-yellow-800"><Clock className="h-3 w-3 mr-1" /> Proposed</Badge>}
//                     {session.status === 'accepted' && <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" /> Accepted</Badge>}
//                     {session.status === 'rescheduled_pending' && <Badge variant="outline" className="bg-orange-100 text-orange-800"><Clock className="h-3 w-3 mr-1" /> Reschedule Pending</Badge>}
//                     {session.status === 'rescheduled_accepted' && <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" /> Reschedule Accepted</Badge>}
//                     {session.status === 'cancelled' && <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" /> Cancelled</Badge>}
//                     {session.status === 'completed' && <Badge className="bg-blue-100 text-blue-800"><CheckCircle className="h-3 w-3 mr-1" /> Completed</Badge>}
//                   </div>
//                   <SessionActionButtons
//                     sessionId={session.id}
//                     sessionStatus={session.status}
//                     currentUserId={currentUserId}
//                     proposerId={session.proposer_id}
//                     attendeeId={session.attendee_id}
//                     lastRescheduleInitiatorId={session.last_reschedule_initiator_id} // NEW: Pass initiator ID
//                   />
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         )}
//       </section>

//       {/* Sessions With You Section (where you are the attendee) */}
//       <section>
//         <h2 className="text-2xl font-semibold text-gray-800 mb-4">Sessions With You</h2>
//         {sessionsWithYou.length === 0 ? (
//           <p className="text-gray-600">No sessions proposed to you yet.</p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {sessionsWithYou.map(session => (
//               <Card key={session.id} className="p-4">
//                 <CardHeader className="flex flex-row items-center space-x-3 pb-2">
//                   <Avatar className="h-12 w-12">
//                     <AvatarImage src={session.proposer_profile?.profile_picture_url || `https://api.dicebear.com/7.x/lorelei/svg?seed=${session.proposer_profile?.username}`} alt={session.proposer_profile?.full_name} />
//                     <AvatarFallback>{session.proposer_profile?.full_name?.charAt(0) || session.proposer_profile?.username?.charAt(0) || '?'}</AvatarFallback>
//                   </Avatar>
//                   <div>
//                     <CardTitle className="text-lg">From {session.proposer_profile?.full_name || session.proposer_profile?.username || 'Unknown User'}</CardTitle>
//                     <CardDescription className="text-sm">@{session.proposer_profile?.username || 'unknown'}</CardDescription>
//                   </div>
//                 </CardHeader>
//                 <CardContent className="pt-2">
//                   <p className="text-gray-700 mb-2">
//                     **Topic:** <span className="font-medium">{session.topic}</span>
//                   </p>
//                   <p className="text-gray-600 text-sm italic mb-2">"{session.description}"</p>

//                   <div className="flex items-center text-sm text-gray-500 mb-2">
//                     <CalendarDays className="h-4 w-4 mr-1" />
//                     <span>{formatDateTime(session.proposed_datetime)} ({session.duration_minutes} mins)</span>
//                   </div>
//                   {session.meeting_link && (
//                     <div className="flex items-center text-sm text-blue-600 hover:underline mb-2">
//                       <LinkIcon className="h-4 w-4 mr-1" />
//                       <a href={session.meeting_link} target="_blank" rel="noopener noreferrer">Meeting Link</a>
//                     </div>
//                   )}

//                   <div className="flex items-center justify-between mt-3 text-sm text-gray-500">
//                     <span>Proposed on {new Date(session.created_at).toLocaleDateString()}</span>
//                     {session.status === 'proposed' && <Badge variant="outline" className="bg-yellow-100 text-yellow-800"><Clock className="h-3 w-3 mr-1" /> Proposed</Badge>}
//                     {session.status === 'accepted' && <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" /> Accepted</Badge>}
//                     {session.status === 'rescheduled_pending' && <Badge variant="outline" className="bg-orange-100 text-orange-800"><Clock className="h-3 w-3 mr-1" /> Reschedule Pending</Badge>}
//                     {session.status === 'rescheduled_accepted' && <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" /> Reschedule Accepted</Badge>}
//                     {session.status === 'cancelled' && <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" /> Cancelled</Badge>}
//                     {session.status === 'completed' && <Badge className="bg-blue-100 text-blue-800"><CheckCircle className="h-3 w-3 mr-1" /> Completed</Badge>}
//                   </div>
//                   <SessionActionButtons
//                     sessionId={session.id}
//                     sessionStatus={session.status}
//                     currentUserId={currentUserId}
//                     proposerId={session.proposer_id}
//                     attendeeId={session.attendee_id}
//                     lastRescheduleInitiatorId={session.last_reschedule_initiator_id} // NEW: Pass initiator ID
//                   />
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         )}
//       </section>
//     </div>
//   );
// }








// // app/my-sessions/page.jsx
// // No "use client"; directive here, making this a Server Component by default

// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Clock, CheckCircle, XCircle, CalendarDays, LinkIcon } from 'lucide-react';
// import Link from 'next/link';

// import { createServerSupabaseClient } from '@/lib/supabase/server';
// import { SessionActionButtons } from '@/components/sessions/SessionActionButtons';

// export default async function MySessionsPage() {
//   const supabase = await createServerSupabaseClient();

//   const { data: { user } } = await supabase.auth.getUser();

//   if (!user) {
//     return (
//       <div className="container mx-auto py-8 text-center">
//         <h1 className="text-3xl font-bold text-gray-900 mb-4">Access Denied</h1>
//         <p className="text-gray-600">Please log in to view your sessions.</p>
//       </div>
//     );
//   }

//   const currentUserId = user.id;

//   // NEW: Select ratings(id, rater_id) to check if current user has rated
//   const { data: rawSessions, error: sessionsError } = await supabase
//     .from('sessions')
//     .select(`
//       *,
//       last_reschedule_initiator_id,
//       ratings(id, rater_id) // Fetch related ratings to check if current user has rated
//     `)
//     .or(`proposer_id.eq.${currentUserId},attendee_id.eq.${currentUserId}`);

//   if (sessionsError) {
//     console.error("Error fetching sessions:", sessionsError);
//     return (
//       <div className="container mx-auto py-8 text-center">
//         <h1 className="text-3xl font-bold text-red-600 mb-4">Error Loading Sessions</h1>
//         <p className="text-gray-600">An error occurred while trying to fetch your sessions. Please try again later.</p>
//       </div>
//     );
//   }

//   const allRelatedUserIds = new Set();
//   rawSessions.forEach(session => {
//     allRelatedUserIds.add(session.proposer_id);
//     allRelatedUserIds.add(session.attendee_id);
//     if (session.last_reschedule_initiator_id) {
//       allRelatedUserIds.add(session.last_reschedule_initiator_id);
//     }
//   });

//   const uniqueRelatedUserIds = Array.from(allRelatedUserIds).filter(Boolean);

//   let profilesMap = new Map();
//   if (uniqueRelatedUserIds.length > 0) {
//     const { data: relatedProfiles, error: profilesError } = await supabase
//       .from('profiles')
//       .select('id, username, full_name, profile_picture_url');

//     if (profilesError) {
//       console.error("Error fetching related profiles for sessions:", profilesError);
//     } else if (relatedProfiles) {
//       relatedProfiles.forEach(profile => {
//         profilesMap.set(profile.id, profile);
//       });
//     }
//   }

//   const enrichedSessions = rawSessions.map(session => ({
//     ...session,
//     proposer_profile: profilesMap.get(session.proposer_id),
//     attendee_profile: profilesMap.get(session.attendee_id),
//     last_reschedule_initiator_profile: profilesMap.get(session.last_reschedule_initiator_id),
//     // NEW: Determine if current user has given feedback for this session
//     feedbackGiven: session.ratings.some(rating => rating.rater_id === currentUserId),
//   }));

//   const sessionsYouProposed = enrichedSessions.filter(session => session.proposer_id === currentUserId);
//   const sessionsWithYou = enrichedSessions.filter(session => session.attendee_id === currentUserId);

//   const formatDateTime = (isoString) => {
//     if (!isoString) return 'Not set';
//     const date = new Date(isoString);
//     return date.toLocaleString();
//   };

//   return (
//     <div className="container mx-auto py-8 max-w-5xl">
//       <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">My Learning Sessions</h1>

//       {/* Sessions You Proposed Section */}
//       <section className="mb-10">
//         <h2 className="text-2xl font-semibold text-gray-800 mb-4">Sessions You Proposed</h2>
//         {sessionsYouProposed.length === 0 ? (
//           <p className="text-gray-600">You haven't proposed any sessions yet. Accept a peer request or find a connected peer to propose one!</p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {sessionsYouProposed.map(session => (
//               <Card key={session.id} className="p-4">
//                 <CardHeader className="flex flex-row items-center space-x-3 pb-2">
//                   <Avatar className="h-12 w-12">
//                     <AvatarImage src={session.attendee_profile?.profile_picture_url || `https://api.dicebear.com/7.x/lorelei/svg?seed=${session.attendee_profile?.username}`} alt={session.attendee_profile?.full_name} />
//                     <AvatarFallback>{session.attendee_profile?.full_name?.charAt(0) || session.attendee_profile?.username?.charAt(0) || '?'}</AvatarFallback>
//                   </Avatar>
//                   <div>
//                     <CardTitle className="text-lg">With {session.attendee_profile?.full_name || session.attendee_profile?.username || 'Unknown User'}</CardTitle>
//                     <CardDescription className="text-sm">@{session.attendee_profile?.username || 'unknown'}</CardDescription>
//                   </div>
//                 </CardHeader>
//                 <CardContent className="pt-2">
//                   <p className="text-gray-700 mb-2">
//                     **Topic:** <span className="font-medium">{session.topic}</span>
//                   </p>
//                   <p className="text-gray-600 text-sm italic mb-2">"{session.description}"</p>
                  
//                   <div className="flex items-center text-sm text-gray-500 mb-2">
//                     <CalendarDays className="h-4 w-4 mr-1" />
//                     <span>{formatDateTime(session.proposed_datetime)} ({session.duration_minutes} mins)</span>
//                   </div>
//                   {session.meeting_link && (
//                     <div className="flex items-center text-sm text-blue-600 hover:underline mb-2">
//                       <LinkIcon className="h-4 w-4 mr-1" />
//                       <a href={session.meeting_link} target="_blank" rel="noopener noreferrer">Meeting Link</a>
//                     </div>
//                   )}

//                   <div className="flex items-center justify-between mt-3 text-sm text-gray-500">
//                     <span>Proposed on {new Date(session.created_at).toLocaleDateString()}</span>
//                     {session.status === 'proposed' && <Badge variant="outline" className="bg-yellow-100 text-yellow-800"><Clock className="h-3 w-3 mr-1" /> Proposed</Badge>}
//                     {session.status === 'accepted' && <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" /> Accepted</Badge>}
//                     {session.status === 'rescheduled_pending' && <Badge variant="outline" className="bg-orange-100 text-orange-800"><Clock className="h-3 w-3 mr-1" /> Reschedule Pending</Badge>}
//                     {session.status === 'rescheduled_accepted' && <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" /> Reschedule Accepted</Badge>}
//                     {session.status === 'cancelled' && <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" /> Cancelled</Badge>}
//                     {session.status === 'completed' && <Badge className="bg-blue-100 text-blue-800"><CheckCircle className="h-3 w-3 mr-1" /> Completed</Badge>}
//                   </div>
//                   <SessionActionButtons
//                     sessionId={session.id}
//                     sessionStatus={session.status}
//                     currentUserId={currentUserId}
//                     proposerId={session.proposer_id}
//                     attendeeId={session.attendee_id}
//                     lastRescheduleInitiatorId={session.last_reschedule_initiator_id}
//                     feedbackGiven={session.feedbackGiven} // NEW: Pass feedbackGiven
//                   />
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         )}
//       </section>

//       {/* Sessions With You Section (where you are the attendee) */}
//       <section>
//         <h2 className="text-2xl font-semibold text-gray-800 mb-4">Sessions With You</h2>
//         {sessionsWithYou.length === 0 ? (
//           <p className="text-gray-600">No sessions proposed to you yet.</p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {sessionsWithYou.map(session => (
//               <Card key={session.id} className="p-4">
//                 <CardHeader className="flex flex-row items-center space-x-3 pb-2">
//                   <Avatar className="h-12 w-12">
//                     <AvatarImage src={session.proposer_profile?.profile_picture_url || `https://api.dicebear.com/7.x/lorelei/svg?seed=${session.proposer_profile?.username}`} alt={session.proposer_profile?.full_name} />
//                     <AvatarFallback>{session.proposer_profile?.full_name?.charAt(0) || session.proposer_profile?.username?.charAt(0) || '?'}</AvatarFallback>
//                   </Avatar>
//                   <div>
//                     <CardTitle className="text-lg">From {session.proposer_profile?.full_name || session.proposer_profile?.username || 'Unknown User'}</CardTitle>
//                     <CardDescription className="text-sm">@{session.proposer_profile?.username || 'unknown'}</CardDescription>
//                   </div>
//                 </CardHeader>
//                 <CardContent className="pt-2">
//                   <p className="text-gray-700 mb-2">
//                     **Topic:** <span className="font-medium">{session.topic}</span>
//                   </p>
//                   <p className="text-gray-600 text-sm italic mb-2">"{session.description}"</p>

//                   <div className="flex items-center text-sm text-gray-500 mb-2">
//                     <CalendarDays className="h-4 w-4 mr-1" />
//                     <span>{formatDateTime(session.proposed_datetime)} ({session.duration_minutes} mins)</span>
//                   </div>
//                   {session.meeting_link && (
//                     <div className="flex items-center text-sm text-blue-600 hover:underline mb-2">
//                       <LinkIcon className="h-4 w-4 mr-1" />
//                       <a href={session.meeting_link} target="_blank" rel="noopener noreferrer">Meeting Link</a>
//                     </div>
//                   )}

//                   <div className="flex items-center justify-between mt-3 text-sm text-gray-500">
//                     <span>Proposed on {new Date(session.created_at).toLocaleDateString()}</span>
//                     {session.status === 'proposed' && <Badge variant="outline" className="bg-yellow-100 text-yellow-800"><Clock className="h-3 w-3 mr-1" /> Proposed</Badge>}
//                     {session.status === 'accepted' && <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" /> Accepted</Badge>}
//                     {session.status === 'rescheduled_pending' && <Badge variant="outline" className="bg-orange-100 text-orange-800"><Clock className="h-3 w-3 mr-1" /> Reschedule Pending</Badge>}
//                     {session.status === 'rescheduled_accepted' && <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" /> Reschedule Accepted</Badge>}
//                     {session.status === 'cancelled' && <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" /> Cancelled</Badge>}
//                     {session.status === 'completed' && <Badge className="bg-blue-100 text-blue-800"><CheckCircle className="h-3 w-3 mr-1" /> Completed</Badge>}
//                   </div>
//                   <SessionActionButtons
//                     sessionId={session.id}
//                     sessionStatus={session.status}
//                     currentUserId={currentUserId}
//                     proposerId={session.proposer_id}
//                     attendeeId={session.attendee_id}
//                     lastRescheduleInitiatorId={session.last_reschedule_initiator_id}
//                     feedbackGiven={session.feedbackGiven} // NEW: Pass feedbackGiven
//                   />
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         )}
//       </section>
//     </div>
//   );
// }








// // app/my-sessions/page.jsx
// // No "use client"; directive here, making this a Server Component by default

// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Clock, CheckCircle, XCircle, CalendarDays, LinkIcon } from 'lucide-react';
// import Link from 'next/link';

// import { createServerSupabaseClient } from '@/lib/supabase/server';
// import { SessionActionButtons } from '@/components/sessions/SessionActionButtons';

// export default async function MySessionsPage() {
//   const supabase = await createServerSupabaseClient();

//   const { data: { user } } = await supabase.auth.getUser();

//   if (!user) {
//     return (
//       <div className="container mx-auto py-8 text-center">
//         <h1 className="text-3xl font-bold text-gray-900 mb-4">Access Denied</h1>
//         <p className="text-gray-600">Please log in to view your sessions.</p>
//       </div>
//     );
//   }

//   const currentUserId = user.id;

//   const { data: rawSessions, error: sessionsError } = await supabase
//     .from('sessions')
//     .select(`
//       *,
//       last_reschedule_initiator_id,
//       ratings(id, rater_id) // Fetch related ratings to check if current user has rated
//     `)
//     .or(`proposer_id.eq.${currentUserId},attendee_id.eq.${currentUserId}`);

//   if (sessionsError) {
//     console.error("Error fetching sessions:", sessionsError);
//     return (
//       <div className="container mx-auto py-8 text-center">
//         <h1 className="text-3xl font-bold text-red-600 mb-4">Error Loading Sessions</h1>
//         <p className="text-gray-600">An error occurred while trying to fetch your sessions. Please try again later.</p>
//       </div>
//     );
//   }

//   const allRelatedUserIds = new Set();
//   rawSessions.forEach(session => {
//     allRelatedUserIds.add(session.proposer_id);
//     allRelatedUserIds.add(session.attendee_id);
//     if (session.last_reschedule_initiator_id) {
//       allRelatedUserIds.add(session.last_reschedule_initiator_id);
//     }
//   });

//   const uniqueRelatedUserIds = Array.from(allRelatedUserIds).filter(Boolean);

//   let profilesMap = new Map();
//   if (uniqueRelatedUserIds.length > 0) {
//     const { data: relatedProfiles, error: profilesError } = await supabase
//       .from('profiles')
//       .select('id, username, full_name, profile_picture_url');

//     if (profilesError) {
//       console.error("Error fetching related profiles for sessions:", profilesError);
//     } else if (relatedProfiles) {
//       relatedProfiles.forEach(profile => {
//         profilesMap.set(profile.id, profile);
//       });
//     }
//   }

//   const enrichedSessions = rawSessions.map(session => ({
//     ...session,
//     proposer_profile: profilesMap.get(session.proposer_id),
//     attendee_profile: profilesMap.get(session.attendee_id),
//     last_reschedule_initiator_profile: profilesMap.get(session.last_reschedule_initiator_id),
//     // FIX: Safely access session.ratings by providing an empty array if null/undefined
//     feedbackGiven: (session.ratings || []).some(rating => rating.rater_id === currentUserId),
//   }));

//   const sessionsYouProposed = enrichedSessions.filter(session => session.proposer_id === currentUserId);
//   const sessionsWithYou = enrichedSessions.filter(session => session.attendee_id === currentUserId);

//   const formatDateTime = (isoString) => {
//     if (!isoString) return 'Not set';
//     const date = new Date(isoString);
//     return date.toLocaleString();
//   };

//   return (
//     <div className="container mx-auto py-8 max-w-5xl">
//       <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">My Learning Sessions</h1>

//       {/* Sessions You Proposed Section */}
//       <section className="mb-10">
//         <h2 className="text-2xl font-semibold text-gray-800 mb-4">Sessions You Proposed</h2>
//         {sessionsYouProposed.length === 0 ? (
//           <p className="text-gray-600">You haven't proposed any sessions yet. Accept a peer request or find a connected peer to propose one!</p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {sessionsYouProposed.map(session => (
//               <Card key={session.id} className="p-4">
//                 <CardHeader className="flex flex-row items-center space-x-3 pb-2">
//                   <Avatar className="h-12 w-12">
//                     <AvatarImage src={session.attendee_profile?.profile_picture_url || `https://api.dicebear.com/7.x/lorelei/svg?seed=${session.attendee_profile?.username}`} alt={session.attendee_profile?.full_name} />
//                     <AvatarFallback>{session.attendee_profile?.full_name?.charAt(0) || session.attendee_profile?.username?.charAt(0) || '?'}</AvatarFallback>
//                   </Avatar>
//                   <div>
//                     <CardTitle className="text-lg">With {session.attendee_profile?.full_name || session.attendee_profile?.username || 'Unknown User'}</CardTitle>
//                     <CardDescription className="text-sm">@{session.attendee_profile?.username || 'unknown'}</CardDescription>
//                   </div>
//                 </CardHeader>
//                 <CardContent className="pt-2">
//                   <p className="text-gray-700 mb-2">
//                     **Topic:** <span className="font-medium">{session.topic}</span>
//                   </p>
//                   <p className="text-gray-600 text-sm italic mb-2">"{session.description}"</p>
                  
//                   <div className="flex items-center text-sm text-gray-500 mb-2">
//                     <CalendarDays className="h-4 w-4 mr-1" />
//                     <span>{formatDateTime(session.proposed_datetime)} ({session.duration_minutes} mins)</span>
//                   </div>
//                   {session.meeting_link && (
//                     <div className="flex items-center text-sm text-blue-600 hover:underline mb-2">
//                       <LinkIcon className="h-4 w-4 mr-1" />
//                       <a href={session.meeting_link} target="_blank" rel="noopener noreferrer">Meeting Link</a>
//                     </div>
//                   )}

//                   <div className="flex items-center justify-between mt-3 text-sm text-gray-500">
//                     <span>Proposed on {new Date(session.created_at).toLocaleDateString()}</span>
//                     {session.status === 'proposed' && <Badge variant="outline" className="bg-yellow-100 text-yellow-800"><Clock className="h-3 w-3 mr-1" /> Proposed</Badge>}
//                     {session.status === 'accepted' && <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" /> Accepted</Badge>}
//                     {session.status === 'rescheduled_pending' && <Badge variant="outline" className="bg-orange-100 text-orange-800"><Clock className="h-3 w-3 mr-1" /> Reschedule Pending</Badge>}
//                     {session.status === 'rescheduled_accepted' && <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" /> Reschedule Accepted</Badge>}
//                     {session.status === 'cancelled' && <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" /> Cancelled</Badge>}
//                     {session.status === 'completed' && <Badge className="bg-blue-100 text-blue-800"><CheckCircle className="h-3 w-3 mr-1" /> Completed</Badge>}
//                   </div>
//                   <SessionActionButtons
//                     sessionId={session.id}
//                     sessionStatus={session.status}
//                     currentUserId={currentUserId}
//                     proposerId={session.proposer_id}
//                     attendeeId={session.attendee_id}
//                     lastRescheduleInitiatorId={session.last_reschedule_initiator_id}
//                     feedbackGiven={session.feedbackGiven}
//                   />
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         )}
//       </section>

//       {/* Sessions With You Section (where you are the attendee) */}
//       <section>
//         <h2 className="text-2xl font-semibold text-gray-800 mb-4">Sessions With You</h2>
//         {sessionsWithYou.length === 0 ? (
//           <p className="text-gray-600">No sessions proposed to you yet.</p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {sessionsWithYou.map(session => (
//               <Card key={session.id} className="p-4">
//                 <CardHeader className="flex flex-row items-center space-x-3 pb-2">
//                   <Avatar className="h-12 w-12">
//                     <AvatarImage src={session.proposer_profile?.profile_picture_url || `https://api.dicebear.com/7.x/lorelei/svg?seed=${session.proposer_profile?.username}`} alt={session.proposer_profile?.full_name} />
//                     <AvatarFallback>{session.proposer_profile?.full_name?.charAt(0) || session.proposer_profile?.username?.charAt(0) || '?'}</AvatarFallback>
//                   </Avatar>
//                   <div>
//                     <CardTitle className="text-lg">From {session.proposer_profile?.full_name || session.proposer_profile?.username || 'Unknown User'}</CardTitle>
//                     <CardDescription className="text-sm">@{session.proposer_profile?.username || 'unknown'}</CardDescription>
//                   </div>
//                 </CardHeader>
//                 <CardContent className="pt-2">
//                   <p className="text-gray-700 mb-2">
//                     **Topic:** <span className="font-medium">{session.topic}</span>
//                   </p>
//                   <p className="text-gray-600 text-sm italic mb-2">"{session.description}"</p>

//                   <div className="flex items-center text-sm text-gray-500 mb-2">
//                     <CalendarDays className="h-4 w-4 mr-1" />
//                     <span>{formatDateTime(session.proposed_datetime)} ({session.duration_minutes} mins)</span>
//                   </div>
//                   {session.meeting_link && (
//                     <div className="flex items-center text-sm text-blue-600 hover:underline mb-2">
//                       <LinkIcon className="h-4 w-4 mr-1" />
//                       <a href={session.meeting_link} target="_blank" rel="noopener noreferrer">Meeting Link</a>
//                     </div>
//                   )}

//                   <div className="flex items-center justify-between mt-3 text-sm text-gray-500">
//                     <span>Proposed on {new Date(session.created_at).toLocaleDateString()}</span>
//                     {session.status === 'proposed' && <Badge variant="outline" className="bg-yellow-100 text-yellow-800"><Clock className="h-3 w-3 mr-1" /> Proposed</Badge>}
//                     {session.status === 'accepted' && <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" /> Accepted</Badge>}
//                     {session.status === 'rescheduled_pending' && <Badge variant="outline" className="bg-orange-100 text-orange-800"><Clock className="h-3 w-3 mr-1" /> Reschedule Pending</Badge>}
//                     {session.status === 'rescheduled_accepted' && <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" /> Reschedule Accepted</Badge>}
//                     {session.status === 'cancelled' && <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" /> Cancelled</Badge>}
//                     {session.status === 'completed' && <Badge className="bg-blue-100 text-blue-800"><CheckCircle className="h-3 w-3 mr-1" /> Completed</Badge>}
//                   </div>
//                   <SessionActionButtons
//                     sessionId={session.id}
//                     sessionStatus={session.status}
//                     currentUserId={currentUserId}
//                     proposerId={session.proposer_id}
//                     attendeeId={session.attendee_id}
//                     lastRescheduleInitiatorId={session.last_reschedule_initiator_id}
//                     feedbackGiven={session.feedbackGiven}
//                   />
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         )}
//       </section>
//     </div>
//   );
// }







// app/my-sessions/page.jsx
// No "use client"; directive here, making this a Server Component by default

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, CheckCircle, XCircle, CalendarDays, LinkIcon } from 'lucide-react';
import Link from 'next/link';

import { createServerSupabaseClient } from '@/lib/supabase/server';
import { SessionActionButtons } from '@/components/sessions/SessionActionButtons';

export default async function MySessionsPage() {
  const supabase = await createServerSupabaseClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="container mx-auto py-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Access Denied</h1>
        <p className="text-gray-600">Please log in to view your sessions.</p>
      </div>
    );
  }

  const currentUserId = user.id;

  const { data: rawSessions, error: sessionsError } = await supabase
    .from('sessions')
    .select(`
      *,
      last_reschedule_initiator_id,
      ratings(id, rater_id) // Fetch related ratings to check if current user has rated
    `)
    .or(`proposer_id.eq.${currentUserId},attendee_id.eq.${currentUserId}`);

  if (sessionsError) {
    console.error("Error fetching sessions:", sessionsError);
    return (
      <div className="container mx-auto py-8 text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Error Loading Sessions</h1>
        <p className="text-gray-600">An error occurred while trying to fetch your sessions. Please try again later.</p>
      </div>
    );
  }

  const allRelatedUserIds = new Set();
  rawSessions.forEach(session => {
    allRelatedUserIds.add(session.proposer_id);
    allRelatedUserIds.add(session.attendee_id);
    if (session.last_reschedule_initiator_id) {
      allRelatedUserIds.add(session.last_reschedule_initiator_id);
    }
  });

  const uniqueRelatedUserIds = Array.from(allRelatedUserIds).filter(Boolean);

  let profilesMap = new Map();
  if (uniqueRelatedUserIds.length > 0) {
    const { data: relatedProfiles, error: profilesError } = await supabase
      .from('profiles')
      .select('id, username, full_name, profile_picture_url');

    if (profilesError) {
      console.error("Error fetching related profiles for sessions:", profilesError);
    } else if (relatedProfiles) {
      relatedProfiles.forEach(profile => {
        profilesMap.set(profile.id, profile);
      });
    }
  }

  const enrichedSessions = rawSessions.map(session => ({
    ...session,
    proposer_profile: profilesMap.get(session.proposer_id),
    attendee_profile: profilesMap.get(session.attendee_id),
    last_reschedule_initiator_profile: profilesMap.get(session.last_reschedule_initiator_id),
    // FIX: Ensure session.ratings is an array before calling .some()
    // If session.ratings is an object (single rating), convert it to an array.
    // If it's null/undefined, default to an empty array.
    feedbackGiven: Array.isArray(session.ratings)
      ? session.ratings.some(rating => rating.rater_id === currentUserId)
      : (session.ratings && session.ratings.rater_id === currentUserId), // If it's a single object
  }));

  const sessionsYouProposed = enrichedSessions.filter(session => session.proposer_id === currentUserId);
  const sessionsWithYou = enrichedSessions.filter(session => session.attendee_id === currentUserId);

  const formatDateTime = (isoString) => {
    if (!isoString) return 'Not set';
    const date = new Date(isoString);
    return date.toLocaleString();
  };

  return (
    <div className="container mx-auto py-8 max-w-5xl">
      <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">My Learning Sessions</h1>

      {/* Sessions You Proposed Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Sessions You Proposed</h2>
        {sessionsYouProposed.length === 0 ? (
          <p className="text-gray-600">You haven't proposed any sessions yet. Accept a peer request or find a connected peer to propose one!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sessionsYouProposed.map(session => (
              <Card key={session.id} className="p-4">
                <CardHeader className="flex flex-row items-center space-x-3 pb-2">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={session.attendee_profile?.profile_picture_url || `https://api.dicebear.com/7.x/lorelei/svg?seed=${session.attendee_profile?.username}`} alt={session.attendee_profile?.full_name} />
                    <AvatarFallback>{session.attendee_profile?.full_name?.charAt(0) || session.attendee_profile?.username?.charAt(0) || '?'}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">With {session.attendee_profile?.full_name || session.attendee_profile?.username || 'Unknown User'}</CardTitle>
                    <CardDescription className="text-sm">@{session.attendee_profile?.username || 'unknown'}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="pt-2">
                  <p className="text-gray-700 mb-2">
                    **Topic:** <span className="font-medium">{session.topic}</span>
                  </p>
                  <p className="text-gray-600 text-sm italic mb-2">"{session.description}"</p>
                  
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <CalendarDays className="h-4 w-4 mr-1" />
                    <span>{formatDateTime(session.proposed_datetime)} ({session.duration_minutes} mins)</span>
                  </div>
                  {session.meeting_link && (
                    <div className="flex items-center text-sm text-blue-600 hover:underline mb-2">
                      <LinkIcon className="h-4 w-4 mr-1" />
                      <a href={session.meeting_link} target="_blank" rel="noopener noreferrer">Meeting Link</a>
                    </div>
                  )}

                  <div className="flex items-center justify-between mt-3 text-sm text-gray-500">
                    <span>Proposed on {new Date(session.created_at).toLocaleDateString()}</span>
                    {session.status === 'proposed' && <Badge variant="outline" className="bg-yellow-100 text-yellow-800"><Clock className="h-3 w-3 mr-1" /> Proposed</Badge>}
                    {session.status === 'accepted' && <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" /> Accepted</Badge>}
                    {session.status === 'rescheduled_pending' && <Badge variant="outline" className="bg-orange-100 text-orange-800"><Clock className="h-3 w-3 mr-1" /> Reschedule Pending</Badge>}
                    {session.status === 'rescheduled_accepted' && <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" /> Reschedule Accepted</Badge>}
                    {session.status === 'cancelled' && <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" /> Cancelled</Badge>}
                    {session.status === 'completed' && <Badge className="bg-blue-100 text-blue-800"><CheckCircle className="h-3 w-3 mr-1" /> Completed</Badge>}
                  </div>
                  <SessionActionButtons
                    sessionId={session.id}
                    sessionStatus={session.status}
                    currentUserId={currentUserId}
                    proposerId={session.proposer_id}
                    attendeeId={session.attendee_id}
                    lastRescheduleInitiatorId={session.last_reschedule_initiator_id}
                    feedbackGiven={session.feedbackGiven}
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Sessions With You Section (where you are the attendee) */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Sessions With You</h2>
        {sessionsWithYou.length === 0 ? (
          <p className="text-gray-600">No sessions proposed to you yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sessionsWithYou.map(session => (
              <Card key={session.id} className="p-4">
                <CardHeader className="flex flex-row items-center space-x-3 pb-2">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={session.proposer_profile?.profile_picture_url || `https://api.dicebear.com/7.x/lorelei/svg?seed=${session.proposer_profile?.username}`} alt={session.proposer_profile?.full_name} />
                    <AvatarFallback>{session.proposer_profile?.full_name?.charAt(0) || session.proposer_profile?.username?.charAt(0) || '?'}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">From {session.proposer_profile?.full_name || session.proposer_profile?.username || 'Unknown User'}</CardTitle>
                    <CardDescription className="text-sm">@{session.proposer_profile?.username || 'unknown'}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="pt-2">
                  <p className="text-gray-700 mb-2">
                    **Topic:** <span className="font-medium">{session.topic}</span>
                  </p>
                  <p className="text-gray-600 text-sm italic mb-2">"{session.description}"</p>

                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <CalendarDays className="h-4 w-4 mr-1" />
                    <span>{formatDateTime(session.proposed_datetime)} ({session.duration_minutes} mins)</span>
                  </div>
                  {session.meeting_link && (
                    <div className="flex items-center text-sm text-blue-600 hover:underline mb-2">
                      <LinkIcon className="h-4 w-4 mr-1" />
                      <a href={session.meeting_link} target="_blank" rel="noopener noreferrer">Meeting Link</a>
                    </div>
                  )}

                  <div className="flex items-center justify-between mt-3 text-sm text-gray-500">
                    <span>Proposed on {new Date(session.created_at).toLocaleDateString()}</span>
                    {session.status === 'proposed' && <Badge variant="outline" className="bg-yellow-100 text-yellow-800"><Clock className="h-3 w-3 mr-1" /> Proposed</Badge>}
                    {session.status === 'accepted' && <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" /> Accepted</Badge>}
                    {session.status === 'rescheduled_pending' && <Badge variant="outline" className="bg-orange-100 text-orange-800"><Clock className="h-3 w-3 mr-1" /> Reschedule Pending</Badge>}
                    {session.status === 'rescheduled_accepted' && <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" /> Reschedule Accepted</Badge>}
                    {session.status === 'cancelled' && <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" /> Cancelled</Badge>}
                    {session.status === 'completed' && <Badge className="bg-blue-100 text-blue-800"><CheckCircle className="h-3 w-3 mr-1" /> Completed</Badge>}
                  </div>
                  <SessionActionButtons
                    sessionId={session.id}
                    sessionStatus={session.status}
                    currentUserId={currentUserId}
                    proposerId={session.proposer_id}
                    attendeeId={session.attendee_id}
                    lastRescheduleInitiatorId={session.last_reschedule_initiator_id}
                    feedbackGiven={session.feedbackGiven}
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}