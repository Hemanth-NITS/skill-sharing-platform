// app/my-sessions/page.jsx
// No "use client"; directive here, making this a Server Component by default

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Shadcn UI Tabs
import { Calendar, Clock, MessageSquare, CheckCircle, XCircle } from 'lucide-react'; // Icons

import Link from 'next/link';

// --- Dummy Data for User Sessions ---
const dummySessions = [
  // Active/Upcoming Sessions
  {
    id: 's1',
    type: 'learning', // 'learning' or 'teaching'
    status: 'active', // 'active', 'upcoming', 'completed', 'cancelled'
    participant: {
      id: 'user-b',
      username: 'alice-johnson',
      fullName: 'Alice Johnson',
      profilePic: 'https://api.dicebear.com/7.x/lorelei/svg?seed=Alice',
    },
    skill: 'React.js Hooks',
    date: 'July 5, 2025',
    time: '3:00 PM IST',
    duration: '1 hour',
    chatSessionId: 'session-id-123', // Link to chat
  },
  {
    id: 's2',
    type: 'teaching',
    status: 'upcoming',
    participant: {
      id: 'user-f',
      username: 'frank-white',
      fullName: 'Frank White',
      profilePic: 'https://api.dicebear.com/7.x/lorelei/svg?seed=Frank',
    },
    skill: 'Node.js Express API',
    date: 'July 7, 2025',
    time: '10:00 AM IST',
    duration: '45 minutes',
    chatSessionId: 'session-id-456', // Link to chat
  },
  // Completed Sessions
  {
    id: 's3',
    type: 'learning',
    status: 'completed',
    participant: {
      id: 'user-d',
      username: 'bob-smith',
      fullName: 'Bob Smith',
      profilePic: 'https://api.dicebear.com/7.x/lorelei/svg?seed=Bob',
    },
    skill: 'Python Data Visualization',
    date: 'June 28, 2025',
    time: '2:00 PM IST',
    duration: '1 hour',
    chatSessionId: 'session-id-456',
    feedbackGiven: true, // Simulate if feedback was given
  },
  {
    id: 's4',
    type: 'teaching',
    status: 'completed',
    participant: {
      id: 'user-g',
      username: 'grace-lee',
      fullName: 'Grace Lee',
      profilePic: 'https://api.dicebear.com/7.x/lorelei/svg?seed=Grace',
    },
    skill: 'Mobile App Deployment',
    date: 'June 30, 2025',
    time: '4:00 PM IST',
    duration: '30 minutes',
    chatSessionId: 'session-id-123',
    feedbackGiven: false, // Simulate if feedback was given
  },
  // Cancelled Session
  {
    id: 's5',
    type: 'learning',
    status: 'cancelled',
    participant: {
      id: 'user-e',
      username: 'eve-adams',
      fullName: 'Eve Adams',
      profilePic: 'https://api.dicebear.com/7.x/lorelei/svg?seed=Eve',
    },
    skill: 'Graphic Design Basics',
    date: 'July 1, 2025',
    time: '11:00 AM IST',
    duration: '1 hour',
  },
];
// --- End Dummy Data ---

// Helper component to render a single session card
function SessionCard({ session }) {
  const isLearning = session.type === 'learning';
  const otherParticipant = session.participant;

  const statusBadgeVariant = {
    active: 'default',
    upcoming: 'secondary',
    completed: 'success', // Assuming you have a 'success' variant for Badge or define custom color
    cancelled: 'destructive',
  };

  const statusBadgeColor = {
    active: 'bg-blue-500 text-white',
    upcoming: 'bg-yellow-500 text-white',
    completed: 'bg-green-500 text-white',
    cancelled: 'bg-red-500 text-white',
  };

  return (
    <Card className="p-4">
      <CardHeader className="flex flex-row items-center space-x-3 pb-2">
        <Avatar className="h-12 w-12">
          <AvatarImage src={otherParticipant.profilePic} alt={otherParticipant.fullName} />
          <AvatarFallback>{otherParticipant.fullName.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-lg">
            {isLearning ? `Learning from ${otherParticipant.fullName}` : `Teaching ${otherParticipant.fullName}`}
          </CardTitle>
          <CardDescription className="text-sm">
            <Link href={`/profile/${otherParticipant.username}`} className="hover:underline">
              @{otherParticipant.username}
            </Link>
          </CardDescription>
        </div>
        <Badge className={`ml-auto ${statusBadgeColor[session.status] || 'bg-gray-500 text-white'}`}>
          {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
        </Badge>
      </CardHeader>
      <CardContent className="pt-2 space-y-2">
        <p className="text-gray-700">
          **Skill:** <span className="font-medium">{session.skill}</span>
        </p>
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="h-4 w-4 mr-2" /> {session.date}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Clock className="h-4 w-4 mr-2" /> {session.time} ({session.duration})
        </div>

        {session.status === 'active' || session.status === 'upcoming' ? (
          <Link href={`/chat/${session.chatSessionId}`}>
            <Button size="sm" className="mt-4 w-full">
              <MessageSquare className="h-4 w-4 mr-2" /> Go to Chat
            </Button>
          </Link>
        ) : session.status === 'completed' && !session.feedbackGiven ? (
          <Link href={`/session/${session.chatSessionId}/feedback`}>
            <Button size="sm" variant="outline" className="mt-4 w-full">
              <CheckCircle className="h-4 w-4 mr-2" /> Give Feedback
            </Button>
          </Link>
        ) : session.status === 'completed' && session.feedbackGiven ? (
          <Button size="sm" variant="secondary" disabled className="mt-4 w-full">
            <CheckCircle className="h-4 w-4 mr-2" /> Feedback Given
          </Button>
        ) : session.status === 'cancelled' ? (
          <Button size="sm" variant="destructive" disabled className="mt-4 w-full">
            <XCircle className="h-4 w-4 mr-2" /> Cancelled
          </Button>
        ) : null}
      </CardContent>
    </Card>
  );
}

export default async function MySessionsPage() {
  // In a real app, you would fetch sessions for the current user from Supabase
  // For now, we'll use the dummy data.

  const activeSessions = dummySessions.filter(s => s.status === 'active' || s.status === 'upcoming');
  const pastSessions = dummySessions.filter(s => s.status === 'completed' || s.status === 'cancelled');

  return (
    <div className="container mx-auto py-8 max-w-5xl">
      <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">My Sessions</h1>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="active">Active & Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past & Cancelled</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="mt-6">
          {activeSessions.length === 0 ? (
            <p className="text-gray-600 text-center">No active or upcoming sessions. <Link href="/search" className="text-blue-600 hover:underline">Find a peer to start learning!</Link></p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeSessions.map(session => (
                <SessionCard key={session.id} session={session} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="past" className="mt-6">
          {pastSessions.length === 0 ? (
            <p className="text-gray-600 text-center">No past sessions recorded.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pastSessions.map(session => (
                <SessionCard key={session.id} session={session} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}