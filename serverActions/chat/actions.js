// serverActions/chat/actions.js
"use server"; // This marks this file as Server Actions

import { createServerSupabaseClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

/**
 * Server Action to send a message within a session.
 * Inserts a new row into the 'messages' table.
 * @param {string} sessionId - The ID of the session the message belongs to.
 * @param {string} content - The message content.
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export async function sendMessage(sessionId, content) {
  const supabase = await createServerSupabaseClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "User not authenticated." };
  }

  const senderId = user.id;

  // Verify user is a participant of the session (RLS should also enforce this)
  const { data: session, error: sessionError } = await supabase
    .from('sessions')
    .select('proposer_id, attendee_id')
    .eq('id', sessionId)
    .single();

  if (sessionError || !session) {
    console.error("Error fetching session for message:", sessionError);
    return { success: false, error: "Session not found or not accessible." };
  }

  if (session.proposer_id !== senderId && session.attendee_id !== senderId) {
    return { success: false, error: "You are not a participant of this session." };
  }

  // Insert the new message
  const { data, error } = await supabase
    .from('messages')
    .insert({
      session_id: sessionId,
      sender_id: senderId,
      content: content,
    })
    .select() // Select the inserted message to return it
    .single();

  if (error) {
    console.error("Error sending message:", error);
    return { success: false, error: error.message || "Failed to send message." };
  }

  // Revalidate the chat page to show the new message
  revalidatePath(`/chat/${sessionId}`);

  return { success: true, message: data }; // Return the inserted message data
}