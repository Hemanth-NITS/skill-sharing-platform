// // app/chat/[sessionId]/page.jsx
// "use client";

// import { useState, useEffect, useRef } from 'react';
// import { useParams, useRouter } from 'next/navigation'; // <-- Import useRouter
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Send } from 'lucide-react'; // Only Send icon needed here, removed MessageSquareText, Users if not used

// // --- Dummy Data for Chat Participants and Initial Messages ---
// const dummyChatParticipants = {
//   'session-id-123': {
//     learner: { id: 'user-a', name: 'You (Learner)', profilePic: 'https://api.dicebear.com/7.x/lorelei/svg?seed=Learner' },
//     teacher: { id: 'user-b', name: 'Alice Johnson (Teacher)', profilePic: 'https://api.dicebear.com/7.x/lorelei/svg?seed=Alice' },
//   },
//   'session-id-456': {
//     learner: { id: 'user-c', name: 'You (Learner)', profilePic: 'https://api.dicebear.com/7.x/lorelei/svg?seed=Learner2' },
//     teacher: { id: 'user-d', name: 'Bob Smith (Teacher)', profilePic: 'https://api.dicebear.com/7.x/lorelei/svg?seed=Bob' },
//   },
// };

// const initialDummyMessages = {
//   'session-id-123': [
//     { id: 'm1', senderId: 'user-b', text: 'Hi there! Ready to start our React session?', timestamp: '10:00 AM' },
//     { id: 'm2', senderId: 'user-a', text: 'Yes, absolutely! I have a few questions about hooks.', timestamp: '10:01 AM' },
//   ],
//   'session-id-456': [
//     { id: 'm3', senderId: 'user-d', text: 'Hello! Welcome to our Python session. What topic would you like to cover?', timestamp: '09:30 AM' },
//     { id: 'm4', senderId: 'user-c', text: 'I need help with data visualization using Matplotlib.', timestamp: '09:31 AM' },
//   ],
// };
// // --- End Dummy Data ---

// export default function ChatSessionPage() {
//   const params = useParams();
//   const router = useRouter(); // <-- Initialize useRouter
//   const { sessionId } = params;

//   const [messages, setMessages] = useState(initialDummyMessages[sessionId] || []);
//   const [newMessage, setNewMessage] = useState('');
//   const messagesEndRef = useRef(null);
//   const chatParticipants = dummyChatParticipants[sessionId];

//   const currentUserId = chatParticipants?.learner.id;

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const handleSendMessage = (e) => {
//     e.preventDefault();
//     if (newMessage.trim() === '') return;

//     const newMsgId = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

//     const newMsg = {
//       id: newMsgId,
//       senderId: currentUserId,
//       text: newMessage.trim(),
//       timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//     };

//     setMessages((prevMessages) => [...prevMessages, newMsg]);
//     setNewMessage('');

//     setTimeout(() => {
//       const otherParticipant = currentUserId === chatParticipants.learner.id
//         ? chatParticipants.teacher
//         : chatParticipants.learner;

//       const replyMsgId = `${Date.now() + 1}-${Math.random().toString(36).substring(2, 9)}`;

//       const replyMsg = {
//         id: replyMsgId,
//         senderId: otherParticipant.id,
//         text: `(Simulated reply from ${otherParticipant.name.split(' ')[0]}): Got it! Let's discuss that.`,
//         timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//       };
//       setMessages((prevMessages) => [...prevMessages, replyMsg]);
//     }, 1500);
//   };

//   // NEW: Function to handle ending the session and navigating to feedback
//   const handleEndSession = () => {
//     // In a real app, you might confirm with the user, log session end, etc.
//     alert("Ending session. Redirecting to feedback page.");
//     router.push(`/session/${sessionId}/feedback`); // Navigate to the feedback page
//   };


//   if (!chatParticipants) {
//     return (
//       <div className="container mx-auto py-8 text-center">
//         <h1 className="text-3xl font-bold text-gray-900 mb-4">Chat Session Not Found</h1>
//         <p className="text-gray-600">The chat session you are looking for does not exist.</p>
//       </div>
//     );
//   }

//   const otherParticipant = currentUserId === chatParticipants.learner.id
//     ? chatParticipants.teacher
//     : chatParticipants.learner;

//   return (
//     <div className="container mx-auto py-8 max-w-3xl h-full flex flex-col">
//       <Card className="flex-1 flex flex-col overflow-hidden">
//         <CardHeader className="flex flex-row items-center justify-between p-4 border-b">
//           <div className="flex items-center space-x-3">
//             <Avatar className="h-10 w-10">
//               <AvatarImage src={otherParticipant.profilePic} alt={otherParticipant.name} />
//               <AvatarFallback>{otherParticipant.name.charAt(0)}</AvatarFallback>
//             </Avatar>
//             <CardTitle className="text-xl">{otherParticipant.name}</CardTitle>
//           </div>
//           {/* UPDATED: Call handleEndSession */}
//           <Button variant="outline" onClick={handleEndSession}>
//             End Session
//           </Button>
//         </CardHeader>

//         <CardContent className="flex-1 p-4 overflow-y-auto hide-scrollbar">
//           <div className="flex flex-col space-y-4">
//             {messages.map((msg) => (
//               <div
//                 key={msg.id}
//                 className={`flex ${msg.senderId === currentUserId ? 'justify-end' : 'justify-start'}`}
//               >
//                 <div
//                   className={`flex items-end max-w-[70%] ${
//                     msg.senderId === currentUserId ? 'flex-row-reverse space-x-reverse' : 'space-x-2'
//                   }`}
//                 >
//                   <Avatar className="h-8 w-8">
//                     <AvatarImage
//                       src={msg.senderId === currentUserId ? chatParticipants.learner.profilePic : chatParticipants.teacher.profilePic}
//                       alt={msg.senderId === currentUserId ? chatParticipants.learner.name : chatParticipants.teacher.name}
//                     />
//                     <AvatarFallback>
//                       {msg.senderId === currentUserId ? chatParticipants.learner.name.charAt(0) : chatParticipants.teacher.name.charAt(0)}
//                     </AvatarFallback>
//                   </Avatar>
//                   <div
//                     className={`p-3 rounded-lg ${
//                       msg.senderId === currentUserId
//                         ? 'bg-blue-500 text-white rounded-br-none'
//                         : 'bg-gray-200 text-gray-800 rounded-bl-none'
//                     }`}
//                   >
//                     <p className="text-sm">{msg.text}</p>
//                     <span className={`block text-xs mt-1 ${msg.senderId === currentUserId ? 'text-blue-100' : 'text-gray-500'}`}>
//                       {msg.timestamp}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//             <div ref={messagesEndRef} />
//           </div>
//         </CardContent>

//         <div className="p-4 border-t">
//           <form onSubmit={handleSendMessage} className="flex space-x-2">
//             <Input
//               type="text"
//               placeholder="Type your message..."
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//               className="flex-1"
//             />
//             <Button type="submit">
//               <Send className="h-5 w-5" />
//             </Button>
//           </form>
//         </div>
//       </Card>
//     </div>
//   );
// }







// // app/chat/[sessionId]/page.jsx
// "use client"; // This page is a Client Component for real-time interactivity

// import { useState, useEffect, useRef } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Send } from 'lucide-react';

// // Import client-side Supabase client
// import { createClient } from '@/lib/supabase/client';
// // NEW: Import sendMessage Server Action from its correct new file
// import { sendMessage } from '@/serverActions/chat/actions';

// export default function ChatSessionPage() {
//   const params = useParams();
//   const router = useRouter();
//   const { sessionId } = params;

//   const supabase = createClient(); // Initialize client-side Supabase

//   const [messages, setMessages] = useState([]);
//   const [newMessageContent, setNewMessageContent] = useState('');
//   const [chatParticipants, setChatParticipants] = useState(null); // To store actual participant profiles
//   const [currentUserId, setCurrentUserId] = useState(null); // To store current logged-in user ID
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const messagesEndRef = useRef(null); // Ref for auto-scrolling

//   // Effect to fetch initial messages and set up real-time subscription
//   useEffect(() => {
//     async function loadChat() {
//       setLoading(true);
//       setError(null);

//       // Get current user
//       const { data: { user } } = await supabase.auth.getUser();
//       if (!user) {
//         router.push('/signin'); // Redirect if not logged in
//         return;
//       }
//       setCurrentUserId(user.id);

//       // Fetch session details to get proposer/attendee IDs and profiles
//       const { data: session, error: sessionError } = await supabase
//         .from('sessions')
//         .select(`
//           proposer_id,
//           attendee_id,
//           proposer_profile:profiles!sessions_proposer_id_fkey(id, username, full_name, profile_picture_url),
//           attendee_profile:profiles!sessions_attendee_id_fkey(id, username, full_name, profile_picture_url)
//         `)
//         .eq('id', sessionId)
//         .single();

//       if (sessionError || !session) {
//         console.error("Error fetching session details:", sessionError);
//         setError("Chat session not found or not accessible.");
//         setLoading(false);
//         return;
//       }

//       // Determine the other participant and set chatParticipants state
//       const otherParticipant = session.proposer_id === user.id ? session.attendee_profile : session.proposer_profile;
//       setChatParticipants({
//         current: {
//           id: user.id,
//           username: user.user_metadata?.username || user.email?.split('@')[0],
//           fullName: user.user_metadata?.full_name || user.email,
//           profilePic: user.user_metadata?.avatar_url || `https://api.dicebear.com/7.x/lorelei/svg?seed=${user.email}`,
//         },
//         other: otherParticipant
//       });

//       // Fetch initial messages for this session
//       const { data: initialMessages, error: messagesError } = await supabase
//         .from('messages')
//         .select('*')
//         .eq('session_id', sessionId)
//         .order('created_at', { ascending: true });

//       if (messagesError) {
//         console.error("Error fetching initial messages:", messagesError);
//         setError("Failed to load chat history.");
//         setLoading(false);
//         return;
//       }
//       setMessages(initialMessages);

//       setLoading(false);

//       // Set up real-time subscription for new messages
//       const channel = supabase
//         .channel(`chat_session_${sessionId}`) // Unique channel name for this session
//         .on(
//           'postgres_changes',
//           { event: 'INSERT', schema: 'public', table: 'messages', filter: `session_id=eq.${sessionId}` },
//           (payload) => {
//             // Add new message to state if it's for this session
//             setMessages((prevMessages) => [...prevMessages, payload.new]);
//           }
//         )
//         .subscribe();

//       // Cleanup function for subscription
//       return () => {
//         supabase.removeChannel(channel);
//       };
//     }

//     loadChat();
//   }, [sessionId, supabase, router]); // Dependency array: re-run if sessionId or supabase client changes

//   // Effect to scroll to the bottom of messages
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const handleSendMessage = async (e) => {
//     e.preventDefault();
//     if (newMessageContent.trim() === '') return;

//     const content = newMessageContent.trim();
//     setNewMessageContent(''); // Clear input immediately

//     // Call the Server Action to send the message
//     const { success, error: sendError, message: sentMessage } = await sendMessage(sessionId, content);

//     if (sendError) {
//       console.error("Error sending message:", sendError);
//       setError(sendError); // Display error to user
//       // Optionally re-add message to input if send failed
//       setNewMessageContent(content);
//     } else {
//       // Message will be added via real-time subscription, no need to manually add to state here
//       // setMessages((prev) => [...prevMessages, sentMessage]); // Only if not using real-time
//     }
//   };

//   const handleEndSession = () => {
//     alert("Ending session. Redirecting to feedback page.");
//     router.push(`/session/${sessionId}/feedback`);
//   };

//   if (loading) {
//     return (
//       <div className="container mx-auto py-8 text-center">
//         <h1 className="text-3xl font-bold text-gray-900 mb-4">Loading Chat...</h1>
//         <p className="text-gray-600">Please wait while we load your conversation.</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="container mx-auto py-8 text-center">
//         <h1 className="text-3xl font-bold text-red-600 mb-4">Error</h1>
//         <p className="text-gray-600">{error}</p>
//       </div>
//     );
//   }

//   if (!chatParticipants) {
//     return (
//       <div className="container mx-auto py-8 text-center">
//         <h1 className="text-3xl font-bold text-gray-900 mb-4">Chat Session Not Found</h1>
//         <p className="text-gray-600">The chat session you are looking for does not exist or is not accessible.</p>
//       </div>
//     );
//   }

//   const otherParticipant = chatParticipants.other;

//   return (
//     <div className="container mx-auto py-8 max-w-3xl h-full flex flex-col">
//       <Card className="flex-1 flex flex-col overflow-hidden">
//         <CardHeader className="flex flex-row items-center justify-between p-4 border-b">
//           <div className="flex items-center space-x-3">
//             <Avatar className="h-10 w-10">
//               <AvatarImage src={otherParticipant?.profilePic} alt={otherParticipant?.fullName} />
//               <AvatarFallback>{otherParticipant?.fullName?.charAt(0) || otherParticipant?.username?.charAt(0) || '?'}</AvatarFallback>
//             </Avatar>
//             <CardTitle className="text-xl">{otherParticipant?.fullName || otherParticipant?.username || 'Unknown User'}</CardTitle>
//           </div>
//           <Button variant="outline" onClick={handleEndSession}>
//             End Session
//           </Button>
//         </CardHeader>

//         <CardContent className="flex-1 p-4 overflow-y-auto hide-scrollbar">
//           <div className="flex flex-col space-y-4">
//             {messages.map((msg) => (
//               <div
//                 key={msg.id}
//                 className={`flex ${msg.sender_id === currentUserId ? 'justify-end' : 'justify-start'}`}
//               >
//                 <div
//                   className={`flex items-end max-w-[70%] ${
//                     msg.sender_id === currentUserId ? 'flex-row-reverse space-x-reverse' : 'space-x-2'
//                   }`}
//                 >
//                   <Avatar className="h-8 w-8">
//                     <AvatarImage
//                       src={
//                         msg.sender_id === chatParticipants.current.id
//                           ? chatParticipants.current.profilePic
//                           : chatParticipants.other?.profilePic
//                       }
//                       alt={
//                         msg.sender_id === chatParticipants.current.id
//                           ? chatParticipants.current.fullName
//                           : chatParticipants.other?.fullName
//                       }
//                     />
//                     <AvatarFallback>
//                       {msg.sender_id === chatParticipants.current.id
//                         ? chatParticipants.current.fullName?.charAt(0) || '?'
//                         : chatParticipants.other?.fullName?.charAt(0) || '?'
//                       }
//                     </AvatarFallback>
//                   </Avatar>
//                   <div
//                     className={`p-3 rounded-lg ${
//                       msg.sender_id === currentUserId
//                         ? 'bg-blue-500 text-white rounded-br-none'
//                         : 'bg-gray-200 text-gray-800 rounded-bl-none'
//                     }`}
//                   >
//                     <p className="text-sm">{msg.content}</p>
//                     <span className={`block text-xs mt-1 ${msg.sender_id === currentUserId ? 'text-blue-100' : 'text-gray-500'}`}>
//                       {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//             <div ref={messagesEndRef} />
//           </div>
//         </CardContent>

//         <div className="p-4 border-t">
//           <form onSubmit={handleSendMessage} className="flex space-x-2">
//             <Input
//               type="text"
//               placeholder="Type your message..."
//               value={newMessageContent}
//               onChange={(e) => setNewMessageContent(e.target.value)}
//               className="flex-1"
//             />
//             <Button type="submit" disabled={loading}>
//               <Send className="h-5 w-5" />
//             </Button>
//           </form>
//         </div>
//       </Card>
//     </div>
//   );
// }









// // app/chat/[sessionId]/page.jsx
// "use client"; // This page is a Client Component for real-time interactivity

// import { useState, useEffect, useRef } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Send } from 'lucide-react';

// import { createClient } from '@/lib/supabase/client';
// import { sendMessage } from '@/serverActions/chat/actions';

// export default function ChatSessionPage() {
//   const params = useParams();
//   const router = useRouter();
//   const { sessionId } = params;

//   const supabase = createClient();

//   const [messages, setMessages] = useState([]);
//   const [newMessageContent, setNewMessageContent] = useState('');
//   const [chatParticipants, setChatParticipants] = useState(null);
//   const [currentUserId, setCurrentUserId] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const messagesEndRef = useRef(null);

//   useEffect(() => {
//     async function loadChat() {
//       setLoading(true);
//       setError(null);

//       const { data: { user } } = await supabase.auth.getUser();
//       if (!user) {
//         router.push('/signin');
//         return;
//       }
//       setCurrentUserId(user.id);

//       // --- FIX: Fetch session and profiles separately ---

//       // 1. Fetch the session details first (without direct profile joins)
//       const { data: session, error: sessionError } = await supabase
//         .from('sessions')
//         .select('proposer_id, attendee_id') // Only select the IDs
//         .eq('id', sessionId)
//         .single();

//       if (sessionError || !session) {
//         console.error("Error fetching session details:", sessionError);
//         setError("Chat session not found or not accessible.");
//         setLoading(false);
//         return;
//       }

//       // 2. Collect all unique participant IDs from this session
//       const participantIds = new Set();
//       participantIds.add(session.proposer_id);
//       participantIds.add(session.attendee_id);
//       const uniqueParticipantIds = Array.from(participantIds).filter(Boolean);

//       let profilesMap = new Map();
//       if (uniqueParticipantIds.length > 0) {
//         // 3. Fetch profiles for these specific participants
//         const { data: participantsProfiles, error: profilesError } = await supabase
//           .from('profiles')
//           .select('id, username, full_name, profile_picture_url')
//           .in('id', uniqueParticipantIds);

//         if (profilesError) {
//           console.error("Error fetching participant profiles:", profilesError);
//           // Continue even if error, but profilesMap might be incomplete
//         } else if (participantsProfiles) {
//           participantsProfiles.forEach(profile => {
//             profilesMap.set(profile.id, profile);
//           });
//         }
//       }

//       // 4. Map the fetched profiles back to chatParticipants state
//       const currentProfile = profilesMap.get(user.id);
//       const otherProfile = profilesMap.get(session.proposer_id === user.id ? session.attendee_id : session.proposer_id);

//       setChatParticipants({
//         current: {
//           id: user.id,
//           username: currentProfile?.username || user.email?.split('@')[0],
//           fullName: currentProfile?.full_name || user.email,
//           profilePic: currentProfile?.profile_picture_url || `https://api.dicebear.com/7.x/lorelei/svg?seed=${user.email}`,
//         },
//         other: {
//           id: otherProfile?.id,
//           username: otherProfile?.username,
//           fullName: otherProfile?.full_name,
//           profilePic: otherProfile?.profile_picture_url,
//         }
//       });

//       // Fetch initial messages for this session
//       const { data: initialMessages, error: messagesError } = await supabase
//         .from('messages')
//         .select('*')
//         .eq('session_id', sessionId)
//         .order('created_at', { ascending: true });

//       if (messagesError) {
//         console.error("Error fetching initial messages:", messagesError);
//         setError("Failed to load chat history.");
//         setLoading(false);
//         return;
//       }
//       setMessages(initialMessages);

//       setLoading(false);

//       // Set up real-time subscription for new messages
//       const channel = supabase
//         .channel(`chat_session_${sessionId}`)
//         .on(
//           'postgres_changes',
//           { event: 'INSERT', schema: 'public', table: 'messages', filter: `session_id=eq.${sessionId}` },
//           (payload) => {
//             setMessages((prevMessages) => [...prevMessages, payload.new]);
//           }
//         )
//         .subscribe();

//       return () => {
//         supabase.removeChannel(channel);
//       };
//     }

//     loadChat();
//   }, [sessionId, supabase, router]);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const handleSendMessage = async (e) => {
//     e.preventDefault();
//     if (newMessageContent.trim() === '') return;

//     const content = newMessageContent.trim();
//     setNewMessageContent('');

//     const { success, error: sendError } = await sendMessage(sessionId, content);

//     if (sendError) {
//       console.error("Error sending message:", sendError);
//       setError(sendError);
//       setNewMessageContent(content);
//     }
//   };

//   const handleEndSession = () => {
//     alert("Ending session. Redirecting to feedback page.");
//     router.push(`/session/${sessionId}/feedback`);
//   };

//   if (loading) {
//     return (
//       <div className="container mx-auto py-8 text-center">
//         <h1 className="text-3xl font-bold text-gray-900 mb-4">Loading Chat...</h1>
//         <p className="text-gray-600">Please wait while we load your conversation.</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="container mx-auto py-8 text-center">
//         <h1 className="text-3xl font-bold text-red-600 mb-4">Error</h1>
//         <p className="text-gray-600">{error}</p>
//       </div>
//     );
//   }

//   if (!chatParticipants || !chatParticipants.other) { // Check if other participant profile loaded
//     return (
//       <div className="container mx-auto py-8 text-center">
//         <h1 className="text-3xl font-bold text-gray-900 mb-4">Chat Session Not Found</h1>
//         <p className="text-gray-600">The chat session you are looking for does not exist or participant data is missing.</p>
//       </div>
//     );
//   }

//   const otherParticipant = chatParticipants.other;

//   return (
//     <div className="container mx-auto py-8 max-w-3xl h-full flex flex-col">
//       <Card className="flex-1 flex flex-col overflow-hidden">
//         <CardHeader className="flex flex-row items-center justify-between p-4 border-b">
//           <div className="flex items-center space-x-3">
//             <Avatar className="h-10 w-10">
//               <AvatarImage src={otherParticipant.profilePic} alt={otherParticipant.fullName} />
//               <AvatarFallback>{otherParticipant.fullName?.charAt(0) || otherParticipant.username?.charAt(0) || '?'}</AvatarFallback>
//             </Avatar>
//             <CardTitle className="text-xl">{otherParticipant.fullName || otherParticipant.username || 'Unknown User'}</CardTitle>
//           </div>
//           <Button variant="outline" onClick={handleEndSession}>
//             End Session
//           </Button>
//         </CardHeader>

//         <CardContent className="flex-1 p-4 overflow-y-auto hide-scrollbar">
//           <div className="flex flex-col space-y-4">
//             {messages.map((msg) => (
//               <div
//                 key={msg.id}
//                 className={`flex ${msg.sender_id === currentUserId ? 'justify-end' : 'justify-start'}`}
//               >
//                 <div
//                   className={`flex items-end max-w-[70%] ${
//                     msg.sender_id === currentUserId ? 'flex-row-reverse space-x-reverse' : 'space-x-2'
//                   }`}
//                 >
//                   <Avatar className="h-8 w-8">
//                     <AvatarImage
//                       src={
//                         msg.sender_id === chatParticipants.current.id
//                           ? chatParticipants.current.profilePic
//                           : chatParticipants.other.profilePic
//                       }
//                       alt={
//                         msg.sender_id === chatParticipants.current.id
//                           ? chatParticipants.current.fullName
//                           : chatParticipants.other.fullName
//                       }
//                     />
//                     <AvatarFallback>
//                       {msg.sender_id === chatParticipants.current.id
//                         ? chatParticipants.current.fullName?.charAt(0) || '?'
//                         : chatParticipants.other.fullName?.charAt(0) || '?'
//                       }
//                     </AvatarFallback>
//                   </Avatar>
//                   <div
//                     className={`p-3 rounded-lg ${
//                       msg.sender_id === currentUserId
//                         ? 'bg-blue-500 text-white rounded-br-none'
//                         : 'bg-gray-200 text-gray-800 rounded-bl-none'
//                     }`}
//                   >
//                     <p className="text-sm">{msg.content}</p>
//                     <span className={`block text-xs mt-1 ${msg.sender_id === currentUserId ? 'text-blue-100' : 'text-gray-500'}`}>
//                       {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//             <div ref={messagesEndRef} />
//           </div>
//         </CardContent>

//         <div className="p-4 border-t">
//           <form onSubmit={handleSendMessage} className="flex space-x-2">
//             <Input
//               type="text"
//               placeholder="Type your message..."
//               value={newMessageContent}
//               onChange={(e) => setNewMessageContent(e.target.value)}
//               className="flex-1"
//             />
//             <Button type="submit" disabled={loading}>
//               <Send className="h-5 w-5" />
//             </Button>
//           </form>
//         </div>
//       </Card>
//     </div>
//   );
// }










// // app/chat/[sessionId]/page.jsx
// "use client"; // This page is a Client Component for real-time interactivity

// import { useState, useEffect, useRef } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Send } from 'lucide-react';

// import { createClient } from '@/lib/supabase/client';
// import { sendMessage } from '@/serverActions/chat/actions';

// export default function ChatSessionPage() {
//   const params = useParams();
//   const router = useRouter();
//   const { sessionId } = params;

//   const supabase = createClient();

//   const [messages, setMessages] = useState([]);
//   const [newMessageContent, setNewMessageContent] = useState('');
//   const [chatParticipants, setChatParticipants] = useState(null);
//   const [currentUserId, setCurrentUserId] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const messagesEndRef = useRef(null);

//   useEffect(() => {
//     async function loadChat() {
//       setLoading(true);
//       setError(null);

//       const { data: { user } } = await supabase.auth.getUser();
//       if (!user) {
//         router.push('/signin');
//         return;
//       }
//       setCurrentUserId(user.id);

//       // Fetch session details to get proposer/attendee IDs
//       const { data: session, error: sessionError } = await supabase
//         .from('sessions')
//         .select('proposer_id, attendee_id')
//         .eq('id', sessionId)
//         .single();

//       if (sessionError || !session) {
//         console.error("Error fetching session details:", sessionError);
//         setError("Chat session not found or not accessible.");
//         setLoading(false);
//         return;
//       }

//       // --- FIX: Fetch profiles for current user and other participant separately ---
//       const participantIds = new Set();
//       participantIds.add(user.id);
//       participantIds.add(session.proposer_id);
//       participantIds.add(session.attendee_id);
//       const uniqueParticipantIds = Array.from(participantIds).filter(Boolean);

//       let profilesMap = new Map();
//       if (uniqueParticipantIds.length > 0) {
//         const { data: participantsProfiles, error: profilesError } = await supabase
//           .from('profiles')
//           .select('id, username, full_name, profile_picture_url')
//           .in('id', uniqueParticipantIds);

//         if (profilesError) {
//           console.error("Error fetching participant profiles:", profilesError);
//           // Continue even if error, but profilesMap might be incomplete
//         } else if (participantsProfiles) {
//           participantsProfiles.forEach(profile => {
//             profilesMap.set(profile.id, profile);
//           });
//         }
//       }

//       const currentProfile = profilesMap.get(user.id);
//       const otherParticipantProfile = profilesMap.get(session.proposer_id === user.id ? session.attendee_id : session.proposer_id);

//       setChatParticipants({
//         current: {
//           id: user.id,
//           username: currentProfile?.username || user.email?.split('@')[0],
//           fullName: currentProfile?.full_name || user.email,
//           profilePic: currentProfile?.profile_picture_url || `https://api.dicebear.com/7.x/lorelei/svg?seed=${user.email}`,
//         },
//         other: {
//           id: otherParticipantProfile?.id,
//           username: otherParticipantProfile?.username,
//           fullName: otherParticipantProfile?.full_name,
//           profilePic: otherParticipantProfile?.profile_picture_url,
//         }
//       });

//       // Fetch initial messages for this session
//       const { data: initialMessages, error: messagesError } = await supabase
//         .from('messages')
//         .select('*')
//         .eq('session_id', sessionId)
//         .order('created_at', { ascending: true });

//       if (messagesError) {
//         console.error("Error fetching initial messages:", messagesError);
//         setError("Failed to load chat history.");
//         setLoading(false);
//         return;
//       }
//       setMessages(initialMessages);

//       setLoading(false);

//       const channel = supabase
//         .channel(`chat_session_${sessionId}`)
//         .on(
//           'postgres_changes',
//           { event: 'INSERT', schema: 'public', table: 'messages', filter: `session_id=eq.${sessionId}` },
//           (payload) => {
//             setMessages((prevMessages) => [...prevMessages, payload.new]);
//           }
//         )
//         .subscribe();

//       return () => {
//         supabase.removeChannel(channel);
//       };
//     }

//     loadChat();
//   }, [sessionId, supabase, router]);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const handleSendMessage = async (e) => {
//     e.preventDefault();
//     if (newMessageContent.trim() === '') return;

//     const content = newMessageContent.trim();
//     setNewMessageContent('');

//     const { success, error: sendError, message: sentMessage } = await sendMessage(sessionId, content);

//     if (sendError) {
//       console.error("Error sending message:", sendError);
//       setError(sendError);
//       setNewMessageContent(content);
//     } else {
//       if (sentMessage) {
//         setMessages((prevMessages) => [...prevMessages, sentMessage]);
//       }
//     }
//   };

//   const handleEndSession = () => {
//     alert("Ending session. Redirecting to feedback page.");
//     router.push(`/session/${sessionId}/feedback`);
//   };

//   if (loading) {
//     return (
//       <div className="container mx-auto py-8 text-center">
//         <h1 className="text-3xl font-bold text-gray-900 mb-4">Loading Chat...</h1>
//         <p className="text-gray-600">Please wait while we load your conversation.</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="container mx-auto py-8 text-center">
//         <h1 className="text-3xl font-bold text-red-600 mb-4">Error</h1>
//         <p className="text-gray-600">{error}</p>
//       </div>
//     );
//   }

//   if (!chatParticipants || !chatParticipants.other) {
//     return (
//       <div className="container mx-auto py-8 text-center">
//         <h1 className="text-3xl font-bold text-gray-900 mb-4">Chat Session Not Found</h1>
//         <p className="text-gray-600">The chat session you are looking for does not exist or participant data is missing.</p>
//       </div>
//     );
//   }

//   const otherParticipant = chatParticipants.other;

//   return (
//     <div className="container mx-auto py-8 max-w-3xl h-full flex flex-col">
//       <Card className="flex-1 flex flex-col overflow-hidden">
//         <CardHeader className="flex flex-row items-center justify-between p-4 border-b">
//           <div className="flex items-center space-x-3">
//             <Avatar className="h-10 w-10">
//               <AvatarImage src={otherParticipant.profilePic} alt={otherParticipant.fullName} />
//               <AvatarFallback>{otherParticipant.fullName?.charAt(0) || otherParticipant.username?.charAt(0) || '?'}</AvatarFallback>
//             </Avatar>
//             <CardTitle className="text-xl">{otherParticipant.fullName || otherParticipant.username || 'Unknown User'}</CardTitle>
//           </div>
//           <Button variant="outline" onClick={handleEndSession}>
//             End Session
//           </Button>
//         </CardHeader>

//         <CardContent className="flex-1 p-4 overflow-y-auto hide-scrollbar">
//           <div className="flex flex-col space-y-4">
//             {messages.map((msg) => (
//               <div
//                 key={msg.id}
//                 className={`flex ${msg.sender_id === currentUserId ? 'justify-end' : 'justify-start'}`}
//               >
//                 <div
//                   className={`flex items-end max-w-[70%] ${
//                     msg.sender_id === currentUserId ? 'flex-row-reverse space-x-reverse' : 'space-x-2'
//                   }`}
//                 >
//                   <Avatar className="h-8 w-8">
//                     <AvatarImage
//                       src={
//                         msg.sender_id === chatParticipants.current.id
//                           ? chatParticipants.current.profilePic
//                           : chatParticipants.other.profilePic
//                       }
//                       alt={
//                         msg.sender_id === chatParticipants.current.id
//                           ? chatParticipants.current.fullName
//                           : chatParticipants.other.fullName
//                       }
//                     />
//                     <AvatarFallback>
//                       {msg.sender_id === chatParticipants.current.id
//                         ? chatParticipants.current.fullName?.charAt(0) || '?'
//                         : chatParticipants.other.fullName?.charAt(0) || '?'
//                       }
//                     </AvatarFallback>
//                   </Avatar>
//                   <div
//                     className={`p-3 rounded-lg ${
//                       msg.sender_id === currentUserId
//                         ? 'bg-blue-500 text-white rounded-br-none'
//                         : 'bg-gray-200 text-gray-800 rounded-bl-none'
//                     }`}
//                   >
//                     <p className="text-sm">{msg.content}</p>
//                     <span className={`block text-xs mt-1 ${msg.sender_id === currentUserId ? 'text-blue-100' : 'text-gray-500'}`}>
//                       {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//             <div ref={messagesEndRef} />
//           </div>
//         </CardContent>

//         <div className="p-4 border-t">
//           <form onSubmit={handleSendMessage} className="flex space-x-2">
//             <Input
//               type="text"
//               placeholder="Type your message..."
//               value={newMessageContent}
//               onChange={(e) => setNewMessageContent(e.target.value)}
//               className="flex-1"
//             />
//             <Button type="submit" disabled={loading}>
//               <Send className="h-5 w-5" />
//             </Button>
//           </form>
//         </div>
//       </Card>
//     </div>
//   );
// }








// app/chat/[sessionId]/page.jsx
// "use client"; // This page is a Client Component for real-time interactivity

// import { useState, useEffect, useRef } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Send } from 'lucide-react';

// import { createClient } from '@/lib/supabase/client';
// import { sendMessage } from '@/serverActions/chat/actions';

// export default function ChatSessionPage() {
//   const params = useParams();
//   const router = useRouter();
//   const { sessionId } = params;

//   const supabase = createClient();

//   const [messages, setMessages] = useState([]);
//   const [newMessageContent, setNewMessageContent] = useState('');
//   const [chatParticipants, setChatParticipants] = useState(null);
//   const [currentUserId, setCurrentUserId] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const messagesEndRef = useRef(null);

//   useEffect(() => {
//     async function loadChat() {
//       setLoading(true);
//       setError(null);

//       const { data: { user } } = await supabase.auth.getUser();
//       if (!user) {
//         router.push('/signin');
//         return;
//       }
//       setCurrentUserId(user.id);

//       const { data: session, error: sessionError } = await supabase
//         .from('sessions')
//         .select('proposer_id, attendee_id')
//         .eq('id', sessionId)
//         .single();

//       if (sessionError || !session) {
//         console.error("Error fetching session details:", sessionError);
//         setError("Chat session not found or not accessible.");
//         setLoading(false);
//         return;
//       }

//       const participantIds = new Set();
//       participantIds.add(user.id);
//       participantIds.add(session.proposer_id);
//       participantIds.add(session.attendee_id);
//       const uniqueParticipantIds = Array.from(participantIds).filter(Boolean);

//       let profilesMap = new Map();
//       if (uniqueParticipantIds.length > 0) {
//         const { data: participantsProfiles, error: profilesError } = await supabase
//           .from('profiles')
//           .select('id, username, full_name, profile_picture_url')
//           .in('id', uniqueParticipantIds);

//         if (profilesError) {
//           console.error("Error fetching participant profiles:", profilesError);
//         } else if (participantsProfiles) {
//           participantsProfiles.forEach(profile => {
//             profilesMap.set(profile.id, profile);
//           });
//         }
//       }

//       const currentProfile = profilesMap.get(user.id);
//       const otherParticipantProfile = profilesMap.get(session.proposer_id === user.id ? session.attendee_id : session.proposer_id);

//       setChatParticipants({
//         current: {
//           id: user.id,
//           username: currentProfile?.username || user.email?.split('@')[0],
//           fullName: currentProfile?.full_name || user.email,
//           profilePic: currentProfile?.profile_picture_url || `https://api.dicebear.com/7.x/lorelei/svg?seed=${user.email}`,
//         },
//         other: {
//           id: otherParticipantProfile?.id,
//           username: otherParticipantProfile?.username,
//           fullName: otherParticipantProfile?.full_name,
//           profilePic: otherParticipantProfile?.profile_picture_url,
//         }
//       });

//       const { data: initialMessages, error: messagesError } = await supabase
//         .from('messages')
//         .select('*')
//         .eq('session_id', sessionId)
//         .order('created_at', { ascending: true });

//       if (messagesError) {
//         console.error("Error fetching initial messages:", messagesError);
//         setError("Failed to load chat history.");
//         setLoading(false);
//         return;
//       }
//       setMessages(initialMessages);

//       setLoading(false);

//       const channel = supabase
//         .channel(`chat_room_${sessionId}`)
//         .on(
//           'postgres_changes',
//           { event: 'INSERT', schema: 'public', table: 'messages' },
//           (payload) => {
//             if (payload.new.session_id === sessionId) {
//               setMessages((prevMessages) => [...prevMessages, payload.new]);
//             }
//           }
//         )
//         .subscribe((status) => {
//           if (status === 'SUBSCRIBED') {
//             console.log(`Subscribed to chat_room_${sessionId}`);
//           } else if (status === 'CHANNEL_ERROR') {
//             console.error(`Error subscribing to chat_room_${sessionId}`);
//           }
//         });

//       return () => {
//         supabase.removeChannel(channel);
//       };
//     }

//     loadChat();
//   }, [sessionId, supabase, router]);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const handleSendMessage = async (e) => {
//     e.preventDefault();
//     if (newMessageContent.trim() === '') return;

//     const content = newMessageContent.trim();
//     setNewMessageContent('');

//     const { success, error: sendError } = await sendMessage(sessionId, content);

//     if (sendError) {
//       console.error("Error sending message:", sendError);
//       setError(sendError);
//       setNewMessageContent(content);
//     }
//     // FIX: Removed manual setMessages here. Realtime subscription is the source of truth.
//     // if (sentMessage) {
//     //   setMessages((prevMessages) => [...prevMessages, sentMessage]);
//     // }
//   };

//   const handleEndSession = () => {
//     alert("Ending session. Redirecting to feedback page.");
//     router.push(`/session/${sessionId}/feedback`);
//   };

//   if (loading) {
//     return (
//       <div className="container mx-auto py-8 text-center">
//         <h1 className="text-3xl font-bold text-gray-900 mb-4">Loading Chat...</h1>
//         <p className="text-gray-600">Please wait while we load your conversation.</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="container mx-auto py-8 text-center">
//         <h1 className="text-3xl font-bold text-red-600 mb-4">Error</h1>
//         <p className="text-gray-600">{error}</p>
//       </div>
//     );
//   }

//   if (!chatParticipants || !chatParticipants.other) {
//     return (
//       <div className="container mx-auto py-8 text-center">
//         <h1 className="text-3xl font-bold text-gray-900 mb-4">Chat Session Not Found</h1>
//         <p className="text-gray-600">The chat session you are looking for does not exist or participant data is missing.</p>
//       </div>
//     );
//   }

//   const otherParticipant = chatParticipants.other;

//   return (
//     <div className="container mx-auto py-8 max-w-3xl h-full flex flex-col">
//       <Card className="flex-1 flex flex-col overflow-hidden">
//         <CardHeader className="flex flex-row items-center justify-between p-4 border-b">
//           <div className="flex items-center space-x-3">
//             <Avatar className="h-10 w-10">
//               <AvatarImage src={otherParticipant.profilePic} alt={otherParticipant.fullName} />
//               <AvatarFallback>{otherParticipant.fullName?.charAt(0) || otherParticipant.username?.charAt(0) || '?'}</AvatarFallback>
//             </Avatar>
//             <CardTitle className="text-xl">{otherParticipant.fullName || otherParticipant.username || 'Unknown User'}</CardTitle>
//           </div>
//           <Button variant="outline" onClick={handleEndSession}>
//             End Session
//           </Button>
//         </CardHeader>

//         <CardContent className="flex-1 p-4 overflow-y-auto hide-scrollbar">
//           <div className="flex flex-col space-y-4">
//             {messages.map((msg) => (
//               <div
//                 key={msg.id}
//                 className={`flex ${msg.sender_id === currentUserId ? 'justify-end' : 'justify-start'}`}
//               >
//                 <div
//                   className={`flex items-end max-w-[70%] ${
//                     msg.sender_id === currentUserId ? 'flex-row-reverse space-x-reverse' : 'space-x-2'
//                   }`}
//                 >
//                   <Avatar className="h-8 w-8">
//                     <AvatarImage
//                       src={
//                         msg.sender_id === chatParticipants.current.id
//                           ? chatParticipants.current.profilePic
//                           : chatParticipants.other.profilePic
//                       }
//                       alt={
//                         msg.sender_id === chatParticipants.current.id
//                           ? chatParticipants.current.fullName
//                           : chatParticipants.other.fullName
//                       }
//                     />
//                     <AvatarFallback>
//                       {msg.sender_id === chatParticipants.current.id
//                         ? chatParticipants.current.fullName?.charAt(0) || '?'
//                         : chatParticipants.other.fullName?.charAt(0) || '?'
//                       }
//                     </AvatarFallback>
//                   </Avatar>
//                   <div
//                     className={`p-3 rounded-lg ${
//                       msg.sender_id === currentUserId
//                         ? 'bg-blue-500 text-white rounded-br-none'
//                         : 'bg-gray-200 text-gray-800 rounded-bl-none'
//                     }`}
//                   >
//                     <p className="text-sm">{msg.content}</p>
//                     <span className={`block text-xs mt-1 ${msg.sender_id === currentUserId ? 'text-blue-100' : 'text-gray-500'}`}>
//                       {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//             <div ref={messagesEndRef} />
//           </div>
//         </CardContent>

//         <div className="p-4 border-t">
//           <form onSubmit={handleSendMessage} className="flex space-x-2">
//             <Input
//               type="text"
//               placeholder="Type your message..."
//               value={newMessageContent}
//               onChange={(e) => setNewMessageContent(e.target.value)}
//               className="flex-1"
//             />
//             <Button type="submit" disabled={loading}>
//               <Send className="h-5 w-5" />
//             </Button>
//           </form>
//         </div>
//       </Card>
//     </div>
//   );
// }







// app/chat/[sessionId]/page.jsx
// This is a Server Component (no "use client")

import { createServerSupabaseClient } from '@/lib/supabase/server';
import { ChatInterface } from '@/components/chat/ChatInterface'; // NEW: Import the client component

export default async function ChatSessionPage({ params }) {
  const { sessionId } = await params;

  const supabase = await createServerSupabaseClient();

  // 1. Get current user session (server-side)
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    // Middleware should handle this, but as a fallback, redirect to login
    // In a real app, you might use redirect('/signin') here
    return (
      <div className="container mx-auto py-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Access Denied</h1>
        <p className="text-gray-600">Please log in to view this chat session.</p>
      </div>
    );
  }

  // 2. Fetch session details to get proposer/attendee IDs
  const { data: session, error: sessionError } = await supabase
    .from('sessions')
    .select('proposer_id, attendee_id')
    .eq('id', sessionId)
    .single();

  if (sessionError || !session) {
    console.error("Error fetching session details:", sessionError);
    return (
      <div className="container mx-auto py-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Chat Session Not Found</h1>
        <p className="text-gray-600">The chat session you are looking for does not exist or is not accessible.</p>
      </div>
    );
  }

  // Verify user is a participant of this session
  if (session.proposer_id !== user.id && session.attendee_id !== user.id) {
    return (
      <div className="container mx-auto py-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Unauthorized Access</h1>
        <p className="text-gray-600">You are not a participant of this chat session.</p>
      </div>
    );
  }

  // 3. Fetch profiles for current user and other participant
  const participantIds = new Set();
  participantIds.add(user.id);
  participantIds.add(session.proposer_id);
  participantIds.add(session.attendee_id);
  const uniqueParticipantIds = Array.from(participantIds).filter(Boolean);

  let profilesMap = new Map();
  if (uniqueParticipantIds.length > 0) {
    const { data: participantsProfiles, error: profilesError } = await supabase
      .from('profiles')
      .select('id, username, full_name, profile_picture_url')
      .in('id', uniqueParticipantIds);

    if (profilesError) {
      console.error("Error fetching participant profiles:", profilesError);
      // Fallback to basic user data if profiles can't be fetched
    } else if (participantsProfiles) {
      participantsProfiles.forEach(profile => {
        profilesMap.set(profile.id, profile);
      });
    }
  }

  const currentProfile = profilesMap.get(user.id);
  const otherParticipantProfile = profilesMap.get(session.proposer_id === user.id ? session.attendee_id : session.proposer_id);

  const chatParticipants = {
    current: {
      id: user.id,
      username: currentProfile?.username || user.email?.split('@')[0],
      fullName: currentProfile?.full_name || user.email,
      profilePic: currentProfile?.profile_picture_url || `https://api.dicebear.com/7.x/lorelei/svg?seed=${user.email}`,
    },
    other: {
      id: otherParticipantProfile?.id,
      username: otherParticipantProfile?.username,
      fullName: otherParticipantProfile?.full_name,
      profilePic: otherParticipantProfile?.profile_picture_url,
    }
  };

  // 4. Fetch initial messages for this session
  const { data: initialMessages, error: messagesError } = await supabase
    .from('messages')
    .select('*')
    .eq('session_id', sessionId)
    .order('created_at', { ascending: true });

  if (messagesError) {
    console.error("Error fetching initial messages:", messagesError);
    return (
      <div className="container mx-auto py-8 text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Error</h1>
        <p className="text-gray-600">Failed to load chat history.</p>
      </div>
    );
  }

  return (
    // Pass all fetched data as props to the ChatInterface client component
    <ChatInterface
      sessionId={sessionId}
      initialMessages={initialMessages}
      currentUserId={user.id}
      chatParticipants={chatParticipants}
    />
  );
}