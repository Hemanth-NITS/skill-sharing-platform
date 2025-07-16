// // app/my-requests/page.jsx
// // No "use client"; directive here, making this a Server Component by default

// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button"; // Still needed for the "Go to Chat" button in sent requests
// import { Clock, CheckCircle, XCircle, MessageSquare } from 'lucide-react';
// import Link from 'next/link';
// import { RequestActionButtons } from '@/components/common/RequestActionButtons'; // <-- NEW: Import the client component

// // --- Dummy Data for Teaching Requests ---
// const dummyRequests = [
//   // Requests YOU sent
//   {
//     id: 'req1',
//     type: 'sent', // 'sent' or 'received'
//     status: 'pending', // 'pending', 'accepted', 'declined'
//     recipient: {
//       id: 'user-b',
//       username: 'alice-johnson',
//       fullName: 'Alice Johnson',
//       profilePic: 'https://api.dicebear.com/7.x/lorelei/svg?seed=Alice',
//     },
//     skillRequested: 'React.js Hooks',
//     message: 'Hi Alice, I saw your profile and would love a session on React hooks.',
//     date: '2025-07-01',
//   },
//   {
//     id: 'req2',
//     type: 'sent',
//     status: 'accepted',
//     recipient: {
//       id: 'user-d',
//       username: 'bob-smith',
//       fullName: 'Bob Smith',
//       profilePic: 'https://api.dicebear.com/7.x/lorelei/svg?seed=Bob',
//     },
//     skillRequested: 'Python Data Visualization',
//     message: 'Hey Bob, interested in a session on Matplotlib basics.',
//     date: '2025-06-28',
//     sessionId: 'session-id-456', // Link to actual chat session if accepted
//   },
//   {
//     id: 'req3',
//     type: 'sent',
//     status: 'declined',
//     recipient: {
//       id: 'user-e',
//       username: 'eve-adams',
//       fullName: 'Eve Adams',
//       profilePic: 'https://api.dicebear.com/7.x/lorelei/svg?seed=Eve',
//     },
//     skillRequested: 'Photoshop Basics',
//     message: 'Hi Eve, looking for some guidance on Photoshop layers.',
//     date: '2025-06-25',
//   },
//   // Requests YOU received
//   {
//     id: 'req4',
//     type: 'received',
//     status: 'pending',
//     sender: {
//       id: 'user-f',
//       username: 'frank-white',
//       fullName: 'Frank White',
//       profilePic: 'https://api.dicebear.com/7.x/lorelei/svg?seed=Frank',
//     },
//     skillRequested: 'Node.js Express API',
//     message: 'Hello! I need help setting up an Express API. Are you available?',
//     date: '2025-07-02',
//   },
//   {
//     id: 'req5',
//     type: 'received',
//     status: 'accepted',
//     sender: {
//       id: 'user-g',
//       username: 'grace-lee',
//       fullName: 'Grace Lee',
//       profilePic: 'https://api.dicebear.com/7.x/lorelei/svg?seed=Grace',
//     },
//     skillRequested: 'Mobile App Deployment',
//     message: 'Hi, I saw you expertise in mobile dev. Can you help with app store deployment?',
//     date: '2025-06-30',
//     sessionId: 'session-id-123', // Link to actual chat session if accepted
//   },
// ];
// // --- End Dummy Data ---

// export default async function MyRequestsPage() {
//   const sentRequests = dummyRequests.filter(req => req.type === 'sent');
//   const receivedRequests = dummyRequests.filter(req => req.type === 'received');

//   // Removed simulateAccept and simulateDecline from here, as they are now in the client component

//   return (
//     <div className="container mx-auto py-8 max-w-5xl">
//       <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">My Teaching Requests</h1>

//       {/* Sent Requests Section */}
//       <section className="mb-10">
//         <h2 className="text-2xl font-semibold text-gray-800 mb-4">Requests You Sent</h2>
//         {sentRequests.length === 0 ? (
//           <p className="text-gray-600">You haven't sent any teaching requests yet. <Link href="/search" className="text-blue-600 hover:underline">Find a peer!</Link></p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {sentRequests.map(request => (
//               <Card key={request.id} className="p-4">
//                 <CardHeader className="flex flex-row items-center space-x-3 pb-2">
//                   <Avatar className="h-12 w-12">
//                     <AvatarImage src={request.recipient.profilePic} alt={request.recipient.fullName} />
//                     <AvatarFallback>{request.recipient.fullName.charAt(0)}</AvatarFallback>
//                   </Avatar>
//                   <div>
//                     <CardTitle className="text-lg">{request.recipient.fullName}</CardTitle>
//                     <CardDescription className="text-sm">@{request.recipient.username}</CardDescription>
//                   </div>
//                 </CardHeader>
//                 <CardContent className="pt-2">
//                   <p className="text-gray-700 mb-2">
//                     **Skill Requested:** <span className="font-medium">{request.skillRequested}</span>
//                   </p>
//                   <p className="text-gray-600 text-sm italic">"{request.message}"</p>
//                   <div className="flex items-center justify-between mt-3 text-sm text-gray-500">
//                     <span>Sent on {request.date}</span>
//                     {request.status === 'pending' && <Badge variant="outline" className="bg-yellow-100 text-yellow-800"><Clock className="h-3 w-3 mr-1" /> Pending</Badge>}
//                     {request.status === 'accepted' && <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" /> Accepted</Badge>}
//                     {request.status === 'declined' && <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" /> Declined</Badge>}
//                   </div>
//                   {request.status === 'accepted' && request.sessionId && (
//                     <Link href={`/chat/${request.sessionId}`}>
//                       <Button size="sm" className="mt-4">
//                         <MessageSquare className="h-4 w-4 mr-2" /> Go to Chat
//                       </Button>
//                     </Link>
//                   )}
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         )}
//       </section>

//       {/* Received Requests Section */}
//       <section>
//         <h2 className="text-2xl font-semibold text-gray-800 mb-4">Requests You Received</h2>
//         {receivedRequests.length === 0 ? (
//           <p className="text-gray-600">No requests received yet.</p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {receivedRequests.map(request => (
//               <Card key={request.id} className="p-4">
//                 <CardHeader className="flex flex-row items-center space-x-3 pb-2">
//                   <Avatar className="h-12 w-12">
//                     <AvatarImage src={request.sender.profilePic} alt={request.sender.fullName} />
//                     <AvatarFallback>{request.sender.fullName.charAt(0)}</AvatarFallback>
//                   </Avatar>
//                   <div>
//                     <CardTitle className="text-lg">{request.sender.fullName}</CardTitle>
//                     <CardDescription className="text-sm">@{request.sender.username}</CardDescription>
//                   </div>
//                 </CardHeader>
//                 <CardContent className="pt-2">
//                   <p className="text-gray-700 mb-2">
//                     **Skill Requested:** <span className="font-medium">{request.skillRequested}</span>
//                   </p>
//                   <p className="text-gray-600 text-sm italic">"{request.message}"</p>
//                   <div className="flex items-center justify-between mt-3 text-sm text-gray-500">
//                     <span>Received on {request.date}</span>
//                     {request.status === 'pending' && <Badge variant="outline" className="bg-yellow-100 text-yellow-800"><Clock className="h-3 w-3 mr-1" /> Pending</Badge>}
//                     {request.status === 'accepted' && <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" /> Accepted</Badge>}
//                     {request.status === 'declined' && <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" /> Declined</Badge>}
//                   </div>
//                   {/* Action buttons for received requests - now passing only serializable props */}
//                   <RequestActionButtons
//                     requestId={request.id}
//                     status={request.status}
//                     sessionId={request.sessionId}
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







// // app/my-requests/page.jsx
// // No "use client"; directive here, making this a Server Component by default

// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Clock, CheckCircle, XCircle } from 'lucide-react'; // MessageSquare is in RequestActionButtons
// import Link from 'next/link';
// import { RequestActionButtons } from '@/components/common/RequestActionButtons'; // Import the client component

// import { createServerSupabaseClient } from '@/lib/supabase/server'; // Import server Supabase client

// export default async function MyRequestsPage() {
//   const supabase = await createServerSupabaseClient();

//   const { data: { user } } = await supabase.auth.getUser();

//   if (!user) {
//     // Redirect to login if not authenticated, or display a message
//     return (
//       <div className="container mx-auto py-8 text-center">
//         <h1 className="text-3xl font-bold text-gray-900 mb-4">Access Denied</h1>
//         <p className="text-gray-600">Please log in to view your requests.</p>
//       </div>
//     );
//   }

//   const currentUserId = user.id;

//   // Fetch all requests where current user is either sender or receiver
//   const { data: allRequests, error: requestsError } = await supabase
//     .from('peer_requests')
//     .select(`
//       *,
//       sender_profile:profiles!peer_requests_sender_id_fkey(id, username, full_name, profile_picture_url),
//       receiver_profile:profiles!peer_requests_receiver_id_fkey(id, username, full_name, profile_picture_url)
//     `)
//     .or(`sender_id.eq.${currentUserId},receiver_id.eq.${currentUserId}`);

//   if (requestsError) {
//     console.error("Error fetching peer requests:", requestsError);
//     return (
//       <div className="container mx-auto py-8 text-center">
//         <h1 className="text-3xl font-bold text-red-600 mb-4">Error Loading Requests</h1>
//         <p className="text-gray-600">An error occurred while trying to fetch your requests. Please try again later.</p>
//       </div>
//     );
//   }

//   const sentRequests = allRequests.filter(req => req.sender_id === currentUserId);
//   const receivedRequests = allRequests.filter(req => req.receiver_id === currentUserId);

//   return (
//     <div className="container mx-auto py-8 max-w-5xl">
//       <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">My Peer Requests</h1>

//       {/* Sent Requests Section */}
//       <section className="mb-10">
//         <h2 className="text-2xl font-semibold text-gray-800 mb-4">Requests You Sent</h2>
//         {sentRequests.length === 0 ? (
//           <p className="text-gray-600">You haven't sent any peer requests yet. <Link href="/search" className="text-blue-600 hover:underline">Find a peer!</Link></p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {sentRequests.map(request => (
//               <Card key={request.id} className="p-4">
//                 <CardHeader className="flex flex-row items-center space-x-3 pb-2">
//                   <Avatar className="h-12 w-12">
//                     <AvatarImage src={request.receiver_profile?.profile_picture_url || `https://api.dicebear.com/7.x/lorelei/svg?seed=${request.receiver_profile?.username}`} alt={request.receiver_profile?.full_name} />
//                     <AvatarFallback>{request.receiver_profile?.full_name?.charAt(0) || request.receiver_profile?.username?.charAt(0) || '?'}</AvatarFallback>
//                   </Avatar>
//                   <div>
//                     <CardTitle className="text-lg">{request.receiver_profile?.full_name || request.receiver_profile?.username || 'Unknown User'}</CardTitle>
//                     <CardDescription className="text-sm">@{request.receiver_profile?.username || 'unknown'}</CardDescription>
//                   </div>
//                 </CardHeader>
//                 <CardContent className="pt-2">
//                   {/* Note: skillRequested and message are not in your peer_requests table schema.
//                       You might need to add these columns to peer_requests if you want to store them.
//                       For now, I'll remove them or add placeholders.
//                       Assuming 'message' could be added to peer_requests later.
//                       'skillRequested' would likely be a foreign key to the skills table.
//                   */}
//                   {/* <p className="text-gray-700 mb-2">
//                     **Skill Requested:** <span className="font-medium">{request.skillRequested}</span>
//                   </p>
//                   <p className="text-gray-600 text-sm italic">"{request.message}"</p> */}
//                   <p className="text-gray-600 text-sm italic mb-2">No specific message or skill details stored yet.</p>

//                   <div className="flex items-center justify-between mt-3 text-sm text-gray-500">
//                     <span>Sent on {new Date(request.created_at).toLocaleDateString()}</span>
//                     {request.status === 'pending' && <Badge variant="outline" className="bg-yellow-100 text-yellow-800"><Clock className="h-3 w-3 mr-1" /> Pending</Badge>}
//                     {request.status === 'accepted' && <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" /> Accepted</Badge>}
//                     {request.status === 'declined' && <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" /> Declined</Badge>}
//                   </div>
//                   {request.status === 'accepted' && (
//                     <Link href={`/chat/${request.id}`} className="w-full"> {/* Using request.id as a placeholder for sessionId */}
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

//       {/* Received Requests Section */}
//       <section>
//         <h2 className="text-2xl font-semibold text-gray-800 mb-4">Requests You Received</h2>
//         {receivedRequests.length === 0 ? (
//           <p className="text-gray-600">No requests received yet.</p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {receivedRequests.map(request => (
//               <Card key={request.id} className="p-4">
//                 <CardHeader className="flex flex-row items-center space-x-3 pb-2">
//                   <Avatar className="h-12 w-12">
//                     <AvatarImage src={request.sender_profile?.profile_picture_url || `https://api.dicebear.com/7.x/lorelei/svg?seed=${request.sender_profile?.username}`} alt={request.sender_profile?.full_name} />
//                     <AvatarFallback>{request.sender_profile?.full_name?.charAt(0) || request.sender_profile?.username?.charAt(0) || '?'}</AvatarFallback>
//                   </Avatar>
//                   <div>
//                     <CardTitle className="text-lg">{request.sender_profile?.full_name || request.sender_profile?.username || 'Unknown User'}</CardTitle>
//                     <CardDescription className="text-sm">@{request.sender_profile?.username || 'unknown'}</CardDescription>
//                   </div>
//                 </CardHeader>
//                 <CardContent className="pt-2">
//                   {/* Placeholder for skill and message */}
//                   <p className="text-gray-600 text-sm italic mb-2">No specific message or skill details stored yet.</p>

//                   <div className="flex items-center justify-between mt-3 text-sm text-gray-500">
//                     <span>Received on {new Date(request.created_at).toLocaleDateString()}</span>
//                     {request.status === 'pending' && <Badge variant="outline" className="bg-yellow-100 text-yellow-800"><Clock className="h-3 w-3 mr-1" /> Pending</Badge>}
//                     {request.status === 'accepted' && <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" /> Accepted</Badge>}
//                     {request.status === 'declined' && <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" /> Declined</Badge>}
//                   </div>
//                   {/* Action buttons for received requests */}
//                   <RequestActionButtons
//                     requestId={request.id}
//                     status={request.status}
//                     sessionId={request.id} // Using request.id as a placeholder for sessionId for now
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






// app/my-requests/page.jsx
// No "use client"; directive here, making this a Server Component by default

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';
import { RequestActionButtons } from '@/components/common/RequestActionButtons';

import { createServerSupabaseClient } from '@/lib/supabase/server';

export default async function MyRequestsPage() {
  const supabase = await createServerSupabaseClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="container mx-auto py-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Access Denied</h1>
        <p className="text-gray-600">Please log in to view your requests.</p>
      </div>
    );
  }

  const currentUserId = user.id;

  // --- REVISED DATA FETCHING ---

  // 1. Fetch peer_requests without joining profiles directly
  const { data: rawRequests, error: requestsError } = await supabase
    .from('peer_requests')
    .select('*') // Select all columns from peer_requests
    .or(`sender_id.eq.${currentUserId},receiver_id.eq.${currentUserId}`);

  if (requestsError) {
    console.error("Error fetching raw peer requests:", requestsError);
    return (
      <div className="container mx-auto py-8 text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Error Loading Requests</h1>
        <p className="text-gray-600">An error occurred while trying to fetch your requests. Please try again later.</p>
      </div>
    );
  }

  // 2. Collect all unique sender and receiver IDs from the fetched requests
  const allRelatedUserIds = new Set();
  rawRequests.forEach(req => {
    allRelatedUserIds.add(req.sender_id);
    allRelatedUserIds.add(req.receiver_id);
  });

  // Convert Set to Array and filter out null/undefined if any
  const uniqueRelatedUserIds = Array.from(allRelatedUserIds).filter(Boolean);

  let profilesMap = new Map();
  if (uniqueRelatedUserIds.length > 0) {
    // 3. Fetch profiles for all unique related user IDs
    const { data: relatedProfiles, error: profilesError } = await supabase
      .from('profiles')
      .select('id, username, full_name, profile_picture_url')
      .in('id', uniqueRelatedUserIds);

    if (profilesError) {
      console.error("Error fetching related profiles:", profilesError);
      // Handle this error, but don't stop the page from rendering if requests themselves loaded
    } else if (relatedProfiles) {
      // Create a map for easy lookup: profileId -> profileObject
      relatedProfiles.forEach(profile => {
        profilesMap.set(profile.id, profile);
      });
    }
  }

  // 4. Map the profiles back into the requests
  const enrichedRequests = rawRequests.map(req => ({
    ...req,
    sender_profile: profilesMap.get(req.sender_id),
    receiver_profile: profilesMap.get(req.receiver_id),
  }));

  const sentRequests = enrichedRequests.filter(req => req.sender_id === currentUserId);
  const receivedRequests = enrichedRequests.filter(req => req.receiver_id === currentUserId);

  return (
    <div className="container mx-auto py-8 max-w-5xl">
      <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">My Peer Requests</h1>

      {/* Sent Requests Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Requests You Sent</h2>
        {sentRequests.length === 0 ? (
          <p className="text-gray-600">You haven't sent any peer requests yet. <Link href="/search" className="text-blue-600 hover:underline">Find a peer!</Link></p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sentRequests.map(request => (
              <Card key={request.id} className="p-4">
                <CardHeader className="flex flex-row items-center space-x-3 pb-2">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={request.receiver_profile?.profile_picture_url || `https://api.dicebear.com/7.x/lorelei/svg?seed=${request.receiver_profile?.username}`} alt={request.receiver_profile?.full_name} />
                    <AvatarFallback>{request.receiver_profile?.full_name?.charAt(0) || request.receiver_profile?.username?.charAt(0) || '?'}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{request.receiver_profile?.full_name || request.receiver_profile?.username || 'Unknown User'}</CardTitle>
                    <CardDescription className="text-sm">@{request.receiver_profile?.username || 'unknown'}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="pt-2">
                  <p className="text-gray-600 text-sm italic mb-2">No specific message or skill details stored yet.</p>

                  <div className="flex items-center justify-between mt-3 text-sm text-gray-500">
                    <span>Sent on {new Date(request.created_at).toLocaleDateString()}</span>
                    {request.status === 'pending' && <Badge variant="outline" className="bg-yellow-100 text-yellow-800"><Clock className="h-3 w-3 mr-1" /> Pending</Badge>}
                    {request.status === 'accepted' && <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" /> Accepted</Badge>}
                    {request.status === 'declined' && <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" /> Declined</Badge>}
                  </div>
                  {request.status === 'accepted' && (
                    <Link href={`/chat/${request.id}`} className="w-full">
                      <Button size="sm" className="mt-4 w-full">
                        Go to Chat
                      </Button>
                    </Link>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Received Requests Section */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Requests You Received</h2>
        {receivedRequests.length === 0 ? (
          <p className="text-gray-600">No requests received yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {receivedRequests.map(request => (
              <Card key={request.id} className="p-4">
                <CardHeader className="flex flex-row items-center space-x-3 pb-2">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={request.sender_profile?.profile_picture_url || `https://api.dicebear.com/7.x/lorelei/svg?seed=${request.sender_profile?.username}`} alt={request.sender_profile?.full_name} />
                    <AvatarFallback>{request.sender_profile?.full_name?.charAt(0) || request.sender_profile?.username?.charAt(0) || '?'}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{request.sender_profile?.full_name || request.sender_profile?.username || 'Unknown User'}</CardTitle>
                    <CardDescription className="text-sm">@{request.sender_profile?.username || 'unknown'}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="pt-2">
                  <p className="text-gray-600 text-sm italic mb-2">No specific message or skill details stored yet.</p>

                  <div className="flex items-center justify-between mt-3 text-sm text-gray-500">
                    <span>Received on {new Date(request.created_at).toLocaleDateString()}</span>
                    {request.status === 'pending' && <Badge variant="outline" className="bg-yellow-100 text-yellow-800"><Clock className="h-3 w-3 mr-1" /> Pending</Badge>}
                    {request.status === 'accepted' && <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" /> Accepted</Badge>}
                    {request.status === 'declined' && <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" /> Declined</Badge>}
                  </div>
                  <RequestActionButtons
                    requestId={request.id}
                    status={request.status}
                    sessionId={request.id}
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