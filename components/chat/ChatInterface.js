// components/chat/ChatInterface.jsx
"use client"; // This MUST be the very first line

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send } from 'lucide-react';

import { createClient } from '@/lib/supabase/client';
import { sendMessage } from '@/serverActions/chat/actions'; // Server Action

export function ChatInterface({ initialMessages, currentUserId, chatParticipants, sessionId }) {
  const router = useRouter();
  const supabase = createClient();

  const [messages, setMessages] = useState(initialMessages);
  const [newMessageContent, setNewMessageContent] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Only subscribe if we have a valid sessionId
    if (!sessionId) {
      setError("Invalid session ID for chat.");
      return;
    }

    const channel = supabase
      .channel(`chat_room_${sessionId}`, {
        config: {
          presence: {
            key: currentUserId,
          },
          broadcast: {
            self: true,
          },
        },
      })
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages', filter: `session_id=eq.${sessionId}` },
        (payload) => {
          if (payload.new.session_id === sessionId) {
            setMessages((prevMessages) => [...prevMessages, payload.new]);
          }
        }
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          console.log(`Subscribed to chat_room_${sessionId}`);
        } else if (status === 'CHANNEL_ERROR') {
          console.error(`Error subscribing to chat_room_${sessionId}`);
          setError("Realtime connection error. Please refresh.");
        } else if (status === 'TIMED_OUT') {
          console.warn(`Realtime subscription timed out for chat_room_${sessionId}`);
        } else if (status === 'CLOSED') {
          console.log(`Realtime subscription closed for chat_room_${sessionId}`);
        }
      });

    // --- FIX: Correctly unsubscribe from authListener ---
    const { data: { subscription: authSubscription } } = supabase.auth.onAuthStateChange((event, currentSession) => {
      if (event === 'TOKEN_REFRESHED' || event === 'SIGNED_IN') {
        if (currentSession?.access_token) {
          channel.send({ type: 'auth', payload: currentSession.access_token });
        }
      }
    });

    return () => {
      supabase.removeChannel(channel);
      authSubscription?.unsubscribe(); // <-- FIX: Call unsubscribe on the subscription object
    };
  }, [sessionId, supabase, currentUserId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessageContent.trim() === '') return;

    setLoading(true);
    const content = newMessageContent.trim();
    setNewMessageContent('');

    const { success, error: sendError } = await sendMessage(sessionId, content);

    if (sendError) {
      console.error("Error sending message:", sendError);
      setError(sendError);
      setNewMessageContent(content);
    }
    setLoading(false);
  };

  const handleEndSession = () => {
    alert("Ending session. Redirecting to feedback page.");
    router.push(`/session/${sessionId}/feedback`);
  };

  if (error) {
    return (
      <div className="container mx-auto py-8 text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Error</h1>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  const otherParticipant = chatParticipants.other;

  return (
    <div className="container mx-auto py-8 max-w-3xl h-full flex flex-col">
      <Card className="flex-1 flex flex-col overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={otherParticipant.profilePic} alt={otherParticipant.fullName} />
              <AvatarFallback>{otherParticipant.fullName?.charAt(0) || otherParticipant.username?.charAt(0) || '?'}</AvatarFallback>
            </Avatar>
            <CardTitle className="text-xl">{otherParticipant.fullName || otherParticipant.username || 'Unknown User'}</CardTitle>
          </div>
          <Button variant="outline" onClick={handleEndSession}>
            End Session
          </Button>
        </CardHeader>

        <CardContent className="flex-1 p-4 overflow-y-auto hide-scrollbar">
          <div className="flex flex-col space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender_id === currentUserId ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`flex items-end max-w-[70%] ${
                    msg.sender_id === currentUserId ? 'flex-row-reverse space-x-reverse' : 'space-x-2'
                  }`}
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={
                        msg.sender_id === chatParticipants.current.id
                          ? chatParticipants.current.profilePic
                          : chatParticipants.other.profilePic
                      }
                      alt={
                        msg.sender_id === chatParticipants.current.id
                          ? chatParticipants.current.fullName
                          : chatParticipants.other.fullName
                      }
                    />
                    <AvatarFallback>
                      {msg.sender_id === chatParticipants.current.id
                        ? chatParticipants.current.fullName?.charAt(0) || '?'
                        : chatParticipants.other.fullName?.charAt(0) || '?'
                      }
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={`p-3 rounded-lg ${
                      msg.sender_id === currentUserId
                        ? 'bg-blue-500 text-white rounded-br-none'
                        : 'bg-gray-200 text-gray-800 rounded-bl-none'
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                    <span className={`block text-xs mt-1 ${msg.sender_id === currentUserId ? 'text-blue-100' : 'text-gray-500'}`}>
                      {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
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
              value={newMessageContent}
              onChange={(e) => setNewMessageContent(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" disabled={loading}>
              <Send className="h-5 w-5" />
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}