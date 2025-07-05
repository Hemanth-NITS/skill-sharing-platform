// app/chat/[sessionId]/page.jsx
"use client";

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation'; // <-- Import useRouter
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send } from 'lucide-react'; // Only Send icon needed here, removed MessageSquareText, Users if not used

// --- Dummy Data for Chat Participants and Initial Messages ---
const dummyChatParticipants = {
  'session-id-123': {
    learner: { id: 'user-a', name: 'You (Learner)', profilePic: 'https://api.dicebear.com/7.x/lorelei/svg?seed=Learner' },
    teacher: { id: 'user-b', name: 'Alice Johnson (Teacher)', profilePic: 'https://api.dicebear.com/7.x/lorelei/svg?seed=Alice' },
  },
  'session-id-456': {
    learner: { id: 'user-c', name: 'You (Learner)', profilePic: 'https://api.dicebear.com/7.x/lorelei/svg?seed=Learner2' },
    teacher: { id: 'user-d', name: 'Bob Smith (Teacher)', profilePic: 'https://api.dicebear.com/7.x/lorelei/svg?seed=Bob' },
  },
};

const initialDummyMessages = {
  'session-id-123': [
    { id: 'm1', senderId: 'user-b', text: 'Hi there! Ready to start our React session?', timestamp: '10:00 AM' },
    { id: 'm2', senderId: 'user-a', text: 'Yes, absolutely! I have a few questions about hooks.', timestamp: '10:01 AM' },
  ],
  'session-id-456': [
    { id: 'm3', senderId: 'user-d', text: 'Hello! Welcome to our Python session. What topic would you like to cover?', timestamp: '09:30 AM' },
    { id: 'm4', senderId: 'user-c', text: 'I need help with data visualization using Matplotlib.', timestamp: '09:31 AM' },
  ],
};
// --- End Dummy Data ---

export default function ChatSessionPage() {
  const params = useParams();
  const router = useRouter(); // <-- Initialize useRouter
  const { sessionId } = params;

  const [messages, setMessages] = useState(initialDummyMessages[sessionId] || []);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);
  const chatParticipants = dummyChatParticipants[sessionId];

  const currentUserId = chatParticipants?.learner.id;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const newMsgId = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

    const newMsg = {
      id: newMsgId,
      senderId: currentUserId,
      text: newMessage.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prevMessages) => [...prevMessages, newMsg]);
    setNewMessage('');

    setTimeout(() => {
      const otherParticipant = currentUserId === chatParticipants.learner.id
        ? chatParticipants.teacher
        : chatParticipants.learner;

      const replyMsgId = `${Date.now() + 1}-${Math.random().toString(36).substring(2, 9)}`;

      const replyMsg = {
        id: replyMsgId,
        senderId: otherParticipant.id,
        text: `(Simulated reply from ${otherParticipant.name.split(' ')[0]}): Got it! Let's discuss that.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prevMessages) => [...prevMessages, replyMsg]);
    }, 1500);
  };

  // NEW: Function to handle ending the session and navigating to feedback
  const handleEndSession = () => {
    // In a real app, you might confirm with the user, log session end, etc.
    alert("Ending session. Redirecting to feedback page.");
    router.push(`/session/${sessionId}/feedback`); // Navigate to the feedback page
  };


  if (!chatParticipants) {
    return (
      <div className="container mx-auto py-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Chat Session Not Found</h1>
        <p className="text-gray-600">The chat session you are looking for does not exist.</p>
      </div>
    );
  }

  const otherParticipant = currentUserId === chatParticipants.learner.id
    ? chatParticipants.teacher
    : chatParticipants.learner;

  return (
    <div className="container mx-auto py-8 max-w-3xl h-full flex flex-col">
      <Card className="flex-1 flex flex-col overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={otherParticipant.profilePic} alt={otherParticipant.name} />
              <AvatarFallback>{otherParticipant.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <CardTitle className="text-xl">{otherParticipant.name}</CardTitle>
          </div>
          {/* UPDATED: Call handleEndSession */}
          <Button variant="outline" onClick={handleEndSession}>
            End Session
          </Button>
        </CardHeader>

        <CardContent className="flex-1 p-4 overflow-y-auto hide-scrollbar">
          <div className="flex flex-col space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.senderId === currentUserId ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`flex items-end max-w-[70%] ${
                    msg.senderId === currentUserId ? 'flex-row-reverse space-x-reverse' : 'space-x-2'
                  }`}
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={msg.senderId === currentUserId ? chatParticipants.learner.profilePic : chatParticipants.teacher.profilePic}
                      alt={msg.senderId === currentUserId ? chatParticipants.learner.name : chatParticipants.teacher.name}
                    />
                    <AvatarFallback>
                      {msg.senderId === currentUserId ? chatParticipants.learner.name.charAt(0) : chatParticipants.teacher.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={`p-3 rounded-lg ${
                      msg.senderId === currentUserId
                        ? 'bg-blue-500 text-white rounded-br-none'
                        : 'bg-gray-200 text-gray-800 rounded-bl-none'
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <span className={`block text-xs mt-1 ${msg.senderId === currentUserId ? 'text-blue-100' : 'text-gray-500'}`}>
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </CardContent>

        <div className="p-4 border-t">
          <form onSubmit={handleSendMessage} className="flex space-x-2">
            <Input
              type="text"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1"
            />
            <Button type="submit">
              <Send className="h-5 w-5" />
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}