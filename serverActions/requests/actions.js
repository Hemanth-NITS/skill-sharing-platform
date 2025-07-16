// serverActions/requests/actions.js
"use server"; // This marks this file as Server Actions

import { createServerSupabaseClient } from '@/lib/supabase/server'; // Server-side Supabase client
import { revalidatePath } from 'next/cache'; // For revalidating data after changes

/**
 * Server Action to send a peer request.
 * Inserts a new row into the 'peer_requests' table.
 * @param {string} receiverId - The UUID of the user receiving the request.
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export async function sendPeerRequest(receiverId) {
  const supabase = await createServerSupabaseClient();

  // Get the current authenticated user's ID (the sender)
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    // This should ideally be caught by middleware, but good safeguard
    return { success: false, error: "User not authenticated." };
  }

  const senderId = user.id;

  // Prevent sending a request to self
  if (senderId === receiverId) {
    return { success: false, error: "Cannot send a peer request to yourself." };
  }

  // Check if a pending request already exists (either way)
  const { data: existingRequests, error: checkError } = await supabase
    .from('peer_requests')
    .select('id, status')
    .or(`and(sender_id.eq.${senderId},receiver_id.eq.${receiverId}),and(sender_id.eq.${receiverId},receiver_id.eq.${senderId})`);
    // This checks if (sender -> receiver) OR (receiver -> sender) request already exists

  if (checkError) {
    console.error("Error checking existing peer requests:", checkError);
    return { success: false, error: "Failed to check existing requests." };
  }

  if (existingRequests && existingRequests.length > 0) {
    const existingStatus = existingRequests[0].status;
    if (existingStatus === 'pending') {
      return { success: false, error: "A pending request already exists between you and this user." };
    } else if (existingStatus === 'accepted') {
      return { success: false, error: "You are already connected with this user." };
    } else if (existingStatus === 'declined') {
      return { success: false, error: "A previous request was declined. You may need to wait or try again later." };
    }
  }


  // Insert the new peer request
  const { data, error } = await supabase
    .from('peer_requests')
    .insert({
      sender_id: senderId,
      receiver_id: receiverId,
      status: 'pending', // Default status
    });

  if (error) {
    console.error("Error sending peer request:", error);
    // Check for unique constraint violation if you add one later
    // if (error.code === '23505') { return { success: false, error: "Request already sent." }; }
    return { success: false, error: error.message || "Failed to send peer request." };
  }

  // Revalidate paths that might display request status or connections
  revalidatePath(`/profile/${receiverId}`); // Revalidate the receiver's profile page
  revalidatePath('/dashboard'); // Assuming dashboard might show outgoing/incoming requests
  // You might also revalidate the sender's profile if it shows outgoing requests

  return { success: true };
}