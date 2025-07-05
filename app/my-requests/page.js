// app/my-requests/page.jsx
// No "use client"; directive here, making this a Server Component by default

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button"; // Still needed for the "Go to Chat" button in sent requests
import { Clock, CheckCircle, XCircle, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { RequestActionButtons } from '@/components/common/RequestActionButtons'; // <-- NEW: Import the client component

// --- Dummy Data for Teaching Requests ---
const dummyRequests = [
  // Requests YOU sent
  {
    id: 'req1',
    type: 'sent', // 'sent' or 'received'
    status: 'pending', // 'pending', 'accepted', 'declined'
    recipient: {
      id: 'user-b',
      username: 'alice-johnson',
      fullName: 'Alice Johnson',
      profilePic: 'https://api.dicebear.com/7.x/lorelei/svg?seed=Alice',
    },
    skillRequested: 'React.js Hooks',
    message: 'Hi Alice, I saw your profile and would love a session on React hooks.',
    date: '2025-07-01',
  },
  {
    id: 'req2',
    type: 'sent',
    status: 'accepted',
    recipient: {
      id: 'user-d',
      username: 'bob-smith',
      fullName: 'Bob Smith',
      profilePic: 'https://api.dicebear.com/7.x/lorelei/svg?seed=Bob',
    },
    skillRequested: 'Python Data Visualization',
    message: 'Hey Bob, interested in a session on Matplotlib basics.',
    date: '2025-06-28',
    sessionId: 'session-id-456', // Link to actual chat session if accepted
  },
  {
    id: 'req3',
    type: 'sent',
    status: 'declined',
    recipient: {
      id: 'user-e',
      username: 'eve-adams',
      fullName: 'Eve Adams',
      profilePic: 'https://api.dicebear.com/7.x/lorelei/svg?seed=Eve',
    },
    skillRequested: 'Photoshop Basics',
    message: 'Hi Eve, looking for some guidance on Photoshop layers.',
    date: '2025-06-25',
  },
  // Requests YOU received
  {
    id: 'req4',
    type: 'received',
    status: 'pending',
    sender: {
      id: 'user-f',
      username: 'frank-white',
      fullName: 'Frank White',
      profilePic: 'https://api.dicebear.com/7.x/lorelei/svg?seed=Frank',
    },
    skillRequested: 'Node.js Express API',
    message: 'Hello! I need help setting up an Express API. Are you available?',
    date: '2025-07-02',
  },
  {
    id: 'req5',
    type: 'received',
    status: 'accepted',
    sender: {
      id: 'user-g',
      username: 'grace-lee',
      fullName: 'Grace Lee',
      profilePic: 'https://api.dicebear.com/7.x/lorelei/svg?seed=Grace',
    },
    skillRequested: 'Mobile App Deployment',
    message: 'Hi, I saw you expertise in mobile dev. Can you help with app store deployment?',
    date: '2025-06-30',
    sessionId: 'session-id-123', // Link to actual chat session if accepted
  },
];
// --- End Dummy Data ---

export default async function MyRequestsPage() {
  const sentRequests = dummyRequests.filter(req => req.type === 'sent');
  const receivedRequests = dummyRequests.filter(req => req.type === 'received');

  // Removed simulateAccept and simulateDecline from here, as they are now in the client component

  return (
    <div className="container mx-auto py-8 max-w-5xl">
      <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">My Teaching Requests</h1>

      {/* Sent Requests Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Requests You Sent</h2>
        {sentRequests.length === 0 ? (
          <p className="text-gray-600">You haven't sent any teaching requests yet. <Link href="/search" className="text-blue-600 hover:underline">Find a peer!</Link></p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sentRequests.map(request => (
              <Card key={request.id} className="p-4">
                <CardHeader className="flex flex-row items-center space-x-3 pb-2">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={request.recipient.profilePic} alt={request.recipient.fullName} />
                    <AvatarFallback>{request.recipient.fullName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{request.recipient.fullName}</CardTitle>
                    <CardDescription className="text-sm">@{request.recipient.username}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="pt-2">
                  <p className="text-gray-700 mb-2">
                    **Skill Requested:** <span className="font-medium">{request.skillRequested}</span>
                  </p>
                  <p className="text-gray-600 text-sm italic">"{request.message}"</p>
                  <div className="flex items-center justify-between mt-3 text-sm text-gray-500">
                    <span>Sent on {request.date}</span>
                    {request.status === 'pending' && <Badge variant="outline" className="bg-yellow-100 text-yellow-800"><Clock className="h-3 w-3 mr-1" /> Pending</Badge>}
                    {request.status === 'accepted' && <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" /> Accepted</Badge>}
                    {request.status === 'declined' && <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" /> Declined</Badge>}
                  </div>
                  {request.status === 'accepted' && request.sessionId && (
                    <Link href={`/chat/${request.sessionId}`}>
                      <Button size="sm" className="mt-4">
                        <MessageSquare className="h-4 w-4 mr-2" /> Go to Chat
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
                    <AvatarImage src={request.sender.profilePic} alt={request.sender.fullName} />
                    <AvatarFallback>{request.sender.fullName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{request.sender.fullName}</CardTitle>
                    <CardDescription className="text-sm">@{request.sender.username}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="pt-2">
                  <p className="text-gray-700 mb-2">
                    **Skill Requested:** <span className="font-medium">{request.skillRequested}</span>
                  </p>
                  <p className="text-gray-600 text-sm italic">"{request.message}"</p>
                  <div className="flex items-center justify-between mt-3 text-sm text-gray-500">
                    <span>Received on {request.date}</span>
                    {request.status === 'pending' && <Badge variant="outline" className="bg-yellow-100 text-yellow-800"><Clock className="h-3 w-3 mr-1" /> Pending</Badge>}
                    {request.status === 'accepted' && <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" /> Accepted</Badge>}
                    {request.status === 'declined' && <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" /> Declined</Badge>}
                  </div>
                  {/* Action buttons for received requests - now passing only serializable props */}
                  <RequestActionButtons
                    requestId={request.id}
                    status={request.status}
                    sessionId={request.sessionId}
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