// // serverActions/requests/actions.js
// "use server"; // This marks this file as Server Actions

// import { createServerSupabaseClient } from '@/lib/supabase/server'; // Server-side Supabase client
// import { revalidatePath } from 'next/cache'; // For revalidating data after changes

// /**
//  * Server Action to send a peer request.
//  * Inserts a new row into the 'peer_requests' table.
//  * @param {string} receiverId - The UUID of the user receiving the request.
//  * @returns {Promise<{success: boolean, error?: string}>}
//  */
// export async function sendPeerRequest(receiverId) {
//   const supabase = await createServerSupabaseClient();

//   // Get the current authenticated user's ID (the sender)
//   const { data: { user } } = await supabase.auth.getUser();

//   if (!user) {
//     // This should ideally be caught by middleware, but good safeguard
//     return { success: false, error: "User not authenticated." };
//   }

//   const senderId = user.id;

//   // Prevent sending a request to self
//   if (senderId === receiverId) {
//     return { success: false, error: "Cannot send a peer request to yourself." };
//   }

//   // Check if a pending request already exists (either way)
//   const { data: existingRequests, error: checkError } = await supabase
//     .from('peer_requests')
//     .select('id, status')
//     .or(`and(sender_id.eq.${senderId},receiver_id.eq.${receiverId}),and(sender_id.eq.${receiverId},receiver_id.eq.${senderId})`);
//     // This checks if (sender -> receiver) OR (receiver -> sender) request already exists

//   if (checkError) {
//     console.error("Error checking existing peer requests:", checkError);
//     return { success: false, error: "Failed to check existing requests." };
//   }

//   if (existingRequests && existingRequests.length > 0) {
//     const existingStatus = existingRequests[0].status;
//     if (existingStatus === 'pending') {
//       return { success: false, error: "A pending request already exists between you and this user." };
//     } else if (existingStatus === 'accepted') {
//       return { success: false, error: "You are already connected with this user." };
//     } else if (existingStatus === 'declined') {
//       return { success: false, error: "A previous request was declined. You may need to wait or try again later." };
//     }
//   }


//   // Insert the new peer request
//   const { data, error } = await supabase
//     .from('peer_requests')
//     .insert({
//       sender_id: senderId,
//       receiver_id: receiverId,
//       status: 'pending', // Default status
//     });

//   if (error) {
//     console.error("Error sending peer request:", error);
//     // Check for unique constraint violation if you add one later
//     // if (error.code === '23505') { return { success: false, error: "Request already sent." }; }
//     return { success: false, error: error.message || "Failed to send peer request." };
//   }

//   // Revalidate paths that might display request status or connections
//   revalidatePath(`/profile/${receiverId}`); // Revalidate the receiver's profile page
//   revalidatePath('/dashboard'); // Assuming dashboard might show outgoing/incoming requests
//   // You might also revalidate the sender's profile if it shows outgoing requests

//   return { success: true };
// }





// // serverActions/requests/actions.js
// "use server";

// import { createServerSupabaseClient } from '@/lib/supabase/server';
// import { revalidatePath } from 'next/cache';

// /**
//  * Server Action to send a peer request.
//  * Inserts a new row into the 'peer_requests' table.
//  * @param {string} receiverId - The UUID of the user receiving the request.
//  * @returns {Promise<{success: boolean, error?: string}>}
//  */
// export async function sendPeerRequest(receiverId) {
//   const supabase = await createServerSupabaseClient();

//   const { data: { user } } = await supabase.auth.getUser();

//   if (!user) {
//     return { success: false, error: "User not authenticated." };
//   }

//   const senderId = user.id;

//   if (senderId === receiverId) {
//     return { success: false, error: "Cannot send a peer request to yourself." };
//   }

//   const { data: existingRequests, error: checkError } = await supabase
//     .from('peer_requests')
//     .select('id, status')
//     .or(`and(sender_id.eq.${senderId},receiver_id.eq.${receiverId}),and(sender_id.eq.${receiverId},receiver_id.eq.${senderId})`);

//   if (checkError) {
//     console.error("Error checking existing peer requests:", checkError);
//     return { success: false, error: "Failed to check existing requests." };
//   }

//   if (existingRequests && existingRequests.length > 0) {
//     const existingStatus = existingRequests[0].status;
//     if (existingStatus === 'pending') {
//       return { success: false, error: "A pending request already exists between you and this user." };
//     } else if (existingStatus === 'accepted') {
//       return { success: false, error: "You are already connected with this user." };
//     } else if (existingStatus === 'declined') {
//       return { success: false, error: "A previous request was declined. You may need to wait or try again later." };
//     }
//   }

//   const { data, error } = await supabase
//     .from('peer_requests')
//     .insert({
//       sender_id: senderId,
//       receiver_id: receiverId,
//       status: 'pending',
//     });

//   if (error) {
//     console.error("Error sending peer request:", error);
//     return { success: false, error: error.message || "Failed to send peer request." };
//   }

//   revalidatePath(`/profile/${receiverId}`);
//   revalidatePath('/dashboard');
//   revalidatePath('/my-requests'); // Revalidate the requests page

//   return { success: true };
// }

// /**
//  * Server Action to accept a peer request.
//  * @param {string} requestId - The ID of the request to accept.
//  * @returns {Promise<{success: boolean, error?: string}>}
//  */
// export async function acceptPeerRequest(requestId) {
//   const supabase = await createServerSupabaseClient();
//   const { data: { user } } = await supabase.auth.getUser();

//   if (!user) {
//     return { success: false, error: "User not authenticated." };
//   }

//   const { data, error } = await supabase
//     .from('peer_requests')
//     .update({ status: 'accepted', updated_at: new Date().toISOString() })
//     .eq('id', requestId)
//     .eq('receiver_id', user.id) // Ensure only the receiver can accept
//     .select() // Select the updated row to confirm it
//     .single();

//   if (error) {
//     console.error("Error accepting peer request:", error);
//     return { success: false, error: error.message || "Failed to accept request." };
//   }

//   if (!data) {
//     return { success: false, error: "Request not found or you are not authorized to accept it." };
//   }

//   revalidatePath('/dashboard');
//   revalidatePath('/my-requests');
//   revalidatePath(`/profile/${data.sender_profile.username}`); // Revalidate sender's profile
//   revalidatePath(`/profile/${data.receiver_profile.username}`); // Revalidate receiver's profile

//   return { success: true };
// }

// /**
//  * Server Action to decline a peer request.
//  * @param {string} requestId - The ID of the request to decline.
//  * @returns {Promise<{success: boolean, error?: string}>}
//  */
// export async function declinePeerRequest(requestId) {
//   const supabase = await createServerSupabaseClient();
//   const { data: { user } } = await supabase.auth.getUser();

//   if (!user) {
//     return { success: false, error: "User not authenticated." };
//   }

//   const { data, error } = await supabase
//     .from('peer_requests')
//     .update({ status: 'declined', updated_at: new Date().toISOString() })
//     .eq('id', requestId)
//     .eq('receiver_id', user.id) // Ensure only the receiver can decline
//     .select()
//     .single();

//   if (error) {
//     console.error("Error declining peer request:", error);
//     return { success: false, error: error.message || "Failed to decline request." };
//   }

//   if (!data) {
//     return { success: false, error: "Request not found or you are not authorized to decline it." };
//   }

//   revalidatePath('/dashboard');
//   revalidatePath('/my-requests');
//   revalidatePath(`/profile/${data.sender_profile.username}`); // Revalidate sender's profile
//   revalidatePath(`/profile/${data.receiver_profile.username}`); // Revalidate receiver's profile

//   return { success: true };
// }






// // serverActions/requests/actions.js
// "use server";

// import { createServerSupabaseClient } from '@/lib/supabase/server';
// import { revalidatePath } from 'next/cache';

// /**
//  * Server Action to send a peer request.
//  * Inserts a new row into the 'peer_requests' table.
//  * @param {string} receiverId - The UUID of the user receiving the request.
//  * @returns {Promise<{success: boolean, error?: string}>}
//  */
// export async function sendPeerRequest(receiverId) {
//   const supabase = await createServerSupabaseClient();

//   const { data: { user } } = await supabase.auth.getUser();

//   if (!user) {
//     return { success: false, error: "User not authenticated." };
//   }

//   const senderId = user.id;

//   if (senderId === receiverId) {
//     return { success: false, error: "Cannot send a peer request to yourself." };
//   }

//   const { data: existingRequests, error: checkError } = await supabase
//     .from('peer_requests')
//     .select('id, status')
//     .or(`and(sender_id.eq.${senderId},receiver_id.eq.${receiverId}),and(sender_id.eq.${receiverId},receiver_id.eq.${senderId})`);

//   if (checkError) {
//     console.error("Error checking existing peer requests:", checkError);
//     return { success: false, error: "Failed to check existing requests." };
//   }

//   if (existingRequests && existingRequests.length > 0) {
//     const existingStatus = existingRequests[0].status;
//     if (existingStatus === 'pending') {
//       return { success: false, error: "A pending request already exists between you and this user." };
//     } else if (existingStatus === 'accepted') {
//       return { success: false, error: "You are already connected with this user." };
//     } else if (existingStatus === 'declined') {
//       return { success: false, error: "A previous request was declined. You may need to wait or try again later." };
//     }
//   }

//   const { data, error } = await supabase
//     .from('peer_requests')
//     .insert({
//       sender_id: senderId,
//       receiver_id: receiverId,
//       status: 'pending',
//     });

//   if (error) {
//     console.error("Error sending peer request:", error);
//     return { success: false, error: error.message || "Failed to send peer request." };
//   }

//   revalidatePath(`/profile/${receiverId}`);
//   revalidatePath('/dashboard');
//   revalidatePath('/my-requests');

//   return { success: true };
// }

// /**
//  * Server Action to accept a peer request.
//  * @param {string} requestId - The ID of the request to accept.
//  * @returns {Promise<{success: boolean, error?: string}>}
//  */
// export async function acceptPeerRequest(requestId) {
//   const supabase = await createServerSupabaseClient();
//   const { data: { user } } = await supabase.auth.getUser();

//   if (!user) {
//     return { success: false, error: "User not authenticated." };
//   }

//   // --- FIX: Explicitly select sender and receiver profiles for revalidation ---
//   const { data, error } = await supabase
//     .from('peer_requests')
//     .update({ status: 'accepted', updated_at: new Date().toISOString() })
//     .eq('id', requestId)
//     .eq('receiver_id', user.id) // Ensure only the receiver can accept
//     .select(`
//       *,
//       sender_profile:profiles!peer_requests_sender_id_fkey(username),
//       receiver_profile:profiles!peer_requests_receiver_id_fkey(username)
//     `) // Select all columns from peer_requests and the username from related profiles
//     .single();

//   if (error) {
//     console.error("Error accepting peer request:", error);
//     return { success: false, error: error.message || "Failed to accept request." };
//   }

//   if (!data) {
//     return { success: false, error: "Request not found or you are not authorized to accept it." };
//   }

//   revalidatePath('/dashboard');
//   revalidatePath('/my-requests');
//   // Now data.sender_profile and data.receiver_profile should exist
//   if (data.sender_profile?.username) {
//     revalidatePath(`/profile/${data.sender_profile.username}`);
//   }
//   if (data.receiver_profile?.username) {
//     revalidatePath(`/profile/${data.receiver_profile.username}`);
//   }

//   return { success: true };
// }

// /**
//  * Server Action to decline a peer request.
//  * @param {string} requestId - The ID of the request to decline.
//  * @returns {Promise<{success: boolean, error?: string}>}
//  */
// export async function declinePeerRequest(requestId) {
//   const supabase = await createServerSupabaseClient();
//   const { data: { user } } = await supabase.auth.getUser();

//   if (!user) {
//     return { success: false, error: "User not authenticated." };
//   }

//   // --- FIX: Explicitly select sender and receiver profiles for revalidation ---
//   const { data, error } = await supabase
//     .from('peer_requests')
//     .update({ status: 'declined', updated_at: new Date().toISOString() })
//     .eq('id', requestId)
//     .eq('receiver_id', user.id) // Ensure only the receiver can decline
//     .select(`
//       *,
//       sender_profile:profiles!peer_requests_sender_id_fkey(username),
//       receiver_profile:profiles!peer_requests_receiver_id_fkey(username)
//     `) // Select all columns from peer_requests and the username from related profiles
//     .single();

//   if (error) {
//     console.error("Error declining peer request:", error);
//     return { success: false, error: error.message || "Failed to decline request." };
//   }

//   if (!data) {
//     return { success: false, error: "Request not found or you are not authorized to decline it." };
//   }

//   revalidatePath('/dashboard');
//   revalidatePath('/my-requests');
//   // Now data.sender_profile and data.receiver_profile should exist
//   if (data.sender_profile?.username) {
//     revalidatePath(`/profile/${data.sender_profile.username}`);
//   }
//   if (data.receiver_profile?.username) {
//     revalidatePath(`/profile/${data.receiver_profile.username}`);
//   }

//   return { success: true };
// }






// // serverActions/requests/actions.js
// "use server";

// import { createServerSupabaseClient } from '@/lib/supabase/server';
// import { revalidatePath } from 'next/cache';

// /**
//  * Server Action to send a peer request.
//  * Inserts a new row into the 'peer_requests' table.
//  * @param {string} receiverId - The UUID of the user receiving the request.
//  * @returns {Promise<{success: boolean, error?: string}>}
//  */
// export async function sendPeerRequest(receiverId) {
//   const supabase = await createServerSupabaseClient();

//   const { data: { user } } = await supabase.auth.getUser();

//   if (!user) {
//     return { success: false, error: "User not authenticated." };
//   }

//   const senderId = user.id;

//   if (senderId === receiverId) {
//     return { success: false, error: "Cannot send a peer request to yourself." };
//   }

//   const { data: existingRequests, error: checkError } = await supabase
//     .from('peer_requests')
//     .select('id, status')
//     .or(`and(sender_id.eq.${senderId},receiver_id.eq.${receiverId}),and(sender_id.eq.${receiverId},receiver_id.eq.${senderId})`);

//   if (checkError) {
//     console.error("Error checking existing peer requests:", checkError);
//     return { success: false, error: "Failed to check existing requests." };
//   }

//   if (existingRequests && existingRequests.length > 0) {
//     const existingStatus = existingRequests[0].status;
//     if (existingStatus === 'pending') {
//       return { success: false, error: "A pending request already exists between you and this user." };
//     } else if (existingStatus === 'accepted') {
//       return { success: false, error: "You are already connected with this user." };
//     } else if (existingStatus === 'declined') {
//       return { success: false, error: "A previous request was declined. You may need to wait or try again later." };
//     }
//   }

//   const { data, error } = await supabase
//     .from('peer_requests')
//     .insert({
//       sender_id: senderId,
//       receiver_id: receiverId,
//       status: 'pending',
//     });

//   if (error) {
//     console.error("Error sending peer request:", error);
//     return { success: false, error: error.message || "Failed to send peer request." };
//   }

//   revalidatePath(`/profile/${receiverId}`);
//   revalidatePath('/dashboard');
//   revalidatePath('/my-requests');

//   return { success: true };
// }

// /**
//  * Server Action to accept a peer request.
//  * @param {string} requestId - The ID of the request to accept.
//  * @returns {Promise<{success: boolean, error?: string}>}
//  */
// export async function acceptPeerRequest(requestId) {
//   const supabase = await createServerSupabaseClient();
//   const { data: { user } } = await supabase.auth.getUser();

//   if (!user) {
//     return { success: false, error: "User not authenticated." };
//   }

//   const { data, error } = await supabase
//     .from('peer_requests')
//     .update({ status: 'accepted', updated_at: new Date().toISOString() })
//     .eq('id', requestId)
//     .eq('receiver_id', user.id)
//     .select(`
//       *,
//       sender_id(username),
//       receiver_id(username)
//     `) // Removed comments from here
//     .single();

//   if (error) {
//     console.error("Error accepting peer request:", error);
//     return { success: false, error: error.message || "Failed to accept request." };
//   }

//   if (!data) {
//     return { success: false, error: "Request not found or you are not authorized to accept it." };
//   }

//   revalidatePath('/dashboard');
//   revalidatePath('/my-requests');
//   if (data.sender_id?.username) {
//     revalidatePath(`/profile/${data.sender_id.username}`);
//   }
//   if (data.receiver_id?.username) {
//     revalidatePath(`/profile/${data.receiver_id.username}`);
//   }

//   return { success: true };
// }

// /**
//  * Server Action to decline a peer request.
//  * @param {string} requestId - The ID of the request to decline.
//  * @returns {Promise<{success: boolean, error?: string}>}
//  */
// export async function declinePeerRequest(requestId) {
//   const supabase = await createServerSupabaseClient();
//   const { data: { user } } = await supabase.auth.getUser();

//   if (!user) {
//     return { success: false, error: "User not authenticated." };
//   }

//   const { data, error } = await supabase
//     .from('peer_requests')
//     .update({ status: 'declined', updated_at: new Date().toISOString() })
//     .eq('id', requestId)
//     .eq('receiver_id', user.id)
//     .select(`
//       *,
//       sender_id(username),
//       receiver_id(username)
//     `) // Removed comments from here
//     .single();

//   if (error) {
//     console.error("Error declining peer request:", error);
//     return { success: false, error: error.message || "Failed to decline request." };
//   }

//   if (!data) {
//     return { success: false, error: "Request not found or you are not authorized to decline it." };
//   }

//   revalidatePath('/dashboard');
//   revalidatePath('/my-requests');
//   if (data.sender_id?.username) {
//     revalidatePath(`/profile/${data.sender_id.username}`);
//   }
//   if (data.receiver_id?.username) {
//     revalidatePath(`/profile/${data.receiver_id.username}`);
//   }

//   return { success: true };
// }







// // serverActions/requests/actions.js
// "use server";

// import { createServerSupabaseClient } from '@/lib/supabase/server';
// import { revalidatePath } from 'next/cache';

// /**
//  * Server Action to send a peer request.
//  * Inserts a new row into the 'peer_requests' table.
//  * @param {string} receiverId - The UUID of the user receiving the request.
//  * @returns {Promise<{success: boolean, error?: string}>}
//  */
// export async function sendPeerRequest(receiverId) {
//   const supabase = await createServerSupabaseClient();

//   const { data: { user } } = await supabase.auth.getUser();

//   if (!user) {
//     return { success: false, error: "User not authenticated." };
//   }

//   const senderId = user.id;

//   if (senderId === receiverId) {
//     return { success: false, error: "Cannot send a peer request to yourself." };
//   }

//   const { data: existingRequests, error: checkError } = await supabase
//     .from('peer_requests')
//     .select('id, status')
//     .or(`and(sender_id.eq.${senderId},receiver_id.eq.${receiverId}),and(sender_id.eq.${receiverId},receiver_id.eq.${senderId})`);

//   if (checkError) {
//     console.error("Error checking existing peer requests:", checkError);
//     return { success: false, error: "Failed to check existing requests." };
//   }

//   if (existingRequests && existingRequests.length > 0) {
//     const existingStatus = existingRequests[0].status;
//     if (existingStatus === 'pending') {
//       return { success: false, error: "A pending request already exists between you and this user." };
//     } else if (existingStatus === 'accepted') {
//       return { success: false, error: "You are already connected with this user." };
//     } else if (existingStatus === 'declined') {
//       return { success: false, error: "A previous request was declined. You may need to wait or try again later." };
//     }
//   }

//   const { data, error } = await supabase
//     .from('peer_requests')
//     .insert({
//       sender_id: senderId,
//       receiver_id: receiverId,
//       status: 'pending',
//     });

//   if (error) {
//     console.error("Error sending peer request:", error);
//     return { success: false, error: error.message || "Failed to send peer request." };
//   }

//   revalidatePath(`/profile/${receiverId}`);
//   revalidatePath('/dashboard');
//   revalidatePath('/my-requests');

//   return { success: true };
// }

// /**
//  * Server Action to accept a peer request.
//  * @param {string} requestId - The ID of the request to accept.
//  * @returns {Promise<{success: boolean, error?: string}>}
//  */
// export async function acceptPeerRequest(requestId) {
//   const supabase = await createServerSupabaseClient();
//   const { data: { user } } = await supabase.auth.getUser();

//   if (!user) {
//     return { success: false, error: "User not authenticated." };
//   }

//   // --- FIX: Select only direct columns from peer_requests after update ---
//   const { data: updatedRequest, error } = await supabase
//     .from('peer_requests')
//     .update({ status: 'accepted', updated_at: new Date().toISOString() })
//     .eq('id', requestId)
//     .eq('receiver_id', user.id) // Ensure only the receiver can accept
//     .select('*') // Select all columns directly from the peer_requests table
//     .single();

//   if (error) {
//     console.error("Error accepting peer request:", error);
//     return { success: false, error: error.message || "Failed to accept request." };
//   }

//   if (!updatedRequest) {
//     return { success: false, error: "Request not found or you are not authorized to accept it." };
//   }

//   // --- NEW: Fetch sender and receiver profiles separately for revalidation ---
//   // Fetch sender's username
//   const { data: senderProfile, error: senderProfileError } = await supabase
//     .from('profiles')
//     .select('username')
//     .eq('id', updatedRequest.sender_id)
//     .single();

//   if (senderProfileError) {
//     console.error("Error fetching sender profile for revalidation:", senderProfileError);
//     // Continue even if there's an error, as the main update was successful.
//   }

//   // Fetch receiver's username (though receiver is current user, good for consistency)
//   const { data: receiverProfile, error: receiverProfileError } = await supabase
//     .from('profiles')
//     .select('username')
//     .eq('id', updatedRequest.receiver_id)
//     .single();

//   if (receiverProfileError) {
//     console.error("Error fetching receiver profile for revalidation:", receiverProfileError);
//     // Continue even if there's an error.
//   }

//   revalidatePath('/dashboard');
//   revalidatePath('/my-requests');

//   // Use the fetched profile usernames for revalidation
//   if (senderProfile?.username) {
//     revalidatePath(`/profile/${senderProfile.username}`);
//   }
//   if (receiverProfile?.username) {
//     revalidatePath(`/profile/${receiverProfile.username}`);
//   }

//   return { success: true };
// }

// /**
//  * Server Action to decline a peer request.
//  * @param {string} requestId - The ID of the request to decline.
//  * @returns {Promise<{success: boolean, error?: string}>}
//  */
// export async function declinePeerRequest(requestId) {
//   const supabase = await createServerSupabaseClient();
//   const { data: { user } } = await supabase.auth.getUser();

//   if (!user) {
//     return { success: false, error: "User not authenticated." };
//   }

//   // --- FIX: Select only direct columns from peer_requests after update ---
//   const { data: updatedRequest, error } = await supabase
//     .from('peer_requests')
//     .update({ status: 'declined', updated_at: new Date().toISOString() })
//     .eq('id', requestId)
//     .eq('receiver_id', user.id) // Ensure only the receiver can decline
//     .select('*') // Select all columns directly from the peer_requests table
//     .single();

//   if (error) {
//     console.error("Error declining peer request:", error);
//     return { success: false, error: error.message || "Failed to decline request." };
//   }

//   if (!updatedRequest) {
//     return { success: false, error: "Request not found or you are not authorized to decline it." };
//   }

//   // --- NEW: Fetch sender and receiver profiles separately for revalidation ---
//   // Fetch sender's username
//   const { data: senderProfile, error: senderProfileError } = await supabase
//     .from('profiles')
//     .select('username')
//     .eq('id', updatedRequest.sender_id)
//     .single();

//   if (senderProfileError) {
//     console.error("Error fetching sender profile for revalidation:", senderProfileError);
//   }

//   // Fetch receiver's username
//   const { data: receiverProfile, error: receiverProfileError } = await supabase
//     .from('profiles')
//     .select('username')
//     .eq('id', updatedRequest.receiver_id)
//     .single();

//   if (receiverProfileError) {
//     console.error("Error fetching receiver profile for revalidation:", receiverProfileError);
//   }

//   revalidatePath('/dashboard');
//   revalidatePath('/my-requests');
//   if (senderProfile?.username) {
//     revalidatePath(`/profile/${senderProfile.username}`);
//   }
//   if (receiverProfile?.username) {
//     revalidatePath(`/profile/${receiverProfile.username}`);
//   }

//   return { success: true };
// }





// // serverActions/requests/actions.js
// "use server";

// import { createServerSupabaseClient } from '@/lib/supabase/server';
// import { revalidatePath } from 'next/cache';

// /**
//  * Server Action to send a peer request.
//  * Inserts a new row into the 'peer_requests' table.
//  * @param {string} receiverId - The UUID of the user receiving the request.
//  * @returns {Promise<{success: boolean, error?: string}>}
//  */
// export async function sendPeerRequest(receiverId) {
//   const supabase = await createServerSupabaseClient();

//   const { data: { user } } = await supabase.auth.getUser();

//   if (!user) {
//     return { success: false, error: "User not authenticated." };
//   }

//   const senderId = user.id;

//   if (senderId === receiverId) {
//     return { success: false, error: "Cannot send a peer request to yourself." };
//   }

//   const { data: existingRequests, error: checkError } = await supabase
//     .from('peer_requests')
//     .select('id, status')
//     .or(`and(sender_id.eq.${senderId},receiver_id.eq.${receiverId}),and(sender_id.eq.${receiverId},receiver_id.eq.${senderId})`);

//   if (checkError) {
//     console.error("Error checking existing peer requests:", checkError);
//     return { success: false, error: "Failed to check existing requests." };
//   }

//   if (existingRequests && existingRequests.length > 0) {
//     const existingStatus = existingRequests[0].status;
//     if (existingStatus === 'pending') {
//       return { success: false, error: "A pending request already exists between you and this user." };
//     } else if (existingStatus === 'accepted') {
//       return { success: false, error: "You are already connected with this user." };
//     } else if (existingStatus === 'declined') {
//       return { success: false, error: "A previous request was declined. You may need to wait or try again later." };
//     }
//   }

//   const { data, error } = await supabase
//     .from('peer_requests')
//     .insert({
//       sender_id: senderId,
//       receiver_id: receiverId,
//       status: 'pending',
//     });

//   if (error) {
//     console.error("Error sending peer request:", error);
//     return { success: false, error: error.message || "Failed to send peer request." };
//   }

//   revalidatePath(`/profile/${receiverId}`);
//   revalidatePath('/dashboard');
//   revalidatePath('/my-requests');

//   return { success: true };
// }

// /**
//  * Server Action to accept a peer request.
//  * Updates request status and creates an initial session.
//  * @param {string} requestId - The ID of the request to accept.
//  * @returns {Promise<{success: boolean, error?: string}>}
//  */
// export async function acceptPeerRequest(requestId) {
//   const supabase = await createServerSupabaseClient();
//   const { data: { user } } = await supabase.auth.getUser();

//   if (!user) {
//     return { success: false, error: "User not authenticated." };
//   }

//   // 1. Update the peer_request status to 'accepted'
//   const { data: updatedRequest, error: updateError } = await supabase
//     .from('peer_requests')
//     .update({ status: 'accepted', updated_at: new Date().toISOString() })
//     .eq('id', requestId)
//     .eq('receiver_id', user.id)
//     .select('*') // Select all columns directly from the peer_requests table
//     .single();

//   if (updateError) {
//     console.error("Error updating peer request to accepted:", updateError);
//     return { success: false, error: updateError.message || "Failed to accept request." };
//   }

//   if (!updatedRequest) {
//     return { success: false, error: "Request not found or you are not authorized to accept it." };
//   }

//   // 2. Create an initial session entry
//   const { data: newSession, error: sessionError } = await supabase
//     .from('sessions')
//     .insert({
//       proposer_id: updatedRequest.sender_id, // The sender of the request proposes the first session
//       attendee_id: updatedRequest.receiver_id, // The receiver of the request is the attendee
//       status: 'proposed', // Initial status
//       topic: 'Initial Session Topic', // Placeholder topic
//       description: 'Discussing initial learning goals.', // Placeholder description
//       duration_minutes: 60, // Default 60 minutes
//       // proposed_datetime and meeting_link will be set when a session is actually proposed
//     })
//     .select()
//     .single();

//   if (sessionError) {
//     console.error("Error creating initial session:", sessionError);
//     // Decide if you want to roll back the request update or just log and continue
//     // For now, we'll just log and return error, leaving request as accepted
//     return { success: false, error: sessionError.message || "Request accepted, but failed to create initial session." };
//   }

//   // Fetch sender and receiver profiles separately for revalidation
//   const { data: senderProfile } = await supabase
//     .from('profiles')
//     .select('username')
//     .eq('id', updatedRequest.sender_id)
//     .single();

//   const { data: receiverProfile } = await supabase
//     .from('profiles')
//     .select('username')
//     .eq('id', updatedRequest.receiver_id)
//     .single();

//   revalidatePath('/dashboard');
//   revalidatePath('/my-requests');
//   revalidatePath('/my-sessions'); // NEW: Revalidate sessions page
//   if (senderProfile?.username) {
//     revalidatePath(`/profile/${senderProfile.username}`);
//   }
//   if (receiverProfile?.username) {
//     revalidatePath(`/profile/${receiverProfile.username}`);
//   }

//   return { success: true };
// }

// /**
//  * Server Action to decline a peer request.
//  * @param {string} requestId - The ID of the request to decline.
//  * @returns {Promise<{success: boolean, error?: string}>}
//  */
// export async function declinePeerRequest(requestId) {
//   const supabase = await createServerSupabaseClient();
//   const { data: { user } } = await supabase.auth.getUser();

//   if (!user) {
//     return { success: false, error: "User not authenticated." };
//   }

//   const { data: updatedRequest, error } = await supabase
//     .from('peer_requests')
//     .update({ status: 'declined', updated_at: new Date().toISOString() })
//     .eq('id', requestId)
//     .eq('receiver_id', user.id)
//     .select('*')
//     .single();

//   if (error) {
//     console.error("Error declining peer request:", error);
//     return { success: false, error: error.message || "Failed to decline request." };
//   }

//   if (!updatedRequest) {
//     return { success: false, error: "Request not found or you are not authorized to decline it." };
//   }

//   const { data: senderProfile } = await supabase
//     .from('profiles')
//     .select('username')
//     .eq('id', updatedRequest.sender_id)
//     .single();

//   const { data: receiverProfile } = await supabase
//     .from('profiles')
//     .select('username')
//     .eq('id', updatedRequest.receiver_id)
//     .single();

//   revalidatePath('/dashboard');
//   revalidatePath('/my-requests');
//   if (senderProfile?.username) {
//     revalidatePath(`/profile/${senderProfile.username}`);
//   }
//   if (receiverProfile?.username) {
//     revalidatePath(`/profile/${receiverProfile.username}`);
//   }

//   return { success: true };
// }






// serverActions/requests/actions.js
"use server";

import { createServerSupabaseClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

/**
 * Server Action to send a peer request.
 * Inserts a new row into the 'peer_requests' table.
 * @param {string} receiverId - The UUID of the user receiving the request.
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export async function sendPeerRequest(receiverId) {
  const supabase = await createServerSupabaseClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "User not authenticated." };
  }

  const senderId = user.id;

  if (senderId === receiverId) {
    return { success: false, error: "Cannot send a peer request to yourself." };
  }

  const { data: existingRequests, error: checkError } = await supabase
    .from('peer_requests')
    .select('id, status')
    .or(`and(sender_id.eq.${senderId},receiver_id.eq.${receiverId}),and(sender_id.eq.${receiverId},receiver_id.eq.${senderId})`);

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

  const { data, error } = await supabase
    .from('peer_requests')
    .insert({
      sender_id: senderId,
      receiver_id: receiverId,
      status: 'pending',
    });

  if (error) {
    console.error("Error sending peer request:", error);
    return { success: false, error: error.message || "Failed to send peer request." };
  }

  revalidatePath(`/profile/${receiverId}`);
  revalidatePath('/dashboard');
  revalidatePath('/my-requests');

  return { success: true };
}

/**
 * Server Action to accept a peer request.
 * Updates request status and creates an initial session.
 * @param {string} requestId - The ID of the request to accept.
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export async function acceptPeerRequest(requestId) {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "User not authenticated." };
  }

  // 1. Update the peer_request status to 'accepted'
  const { data: updatedRequest, error: updateError } = await supabase
    .from('peer_requests')
    .update({ status: 'accepted', updated_at: new Date().toISOString() })
    .eq('id', requestId)
    .eq('receiver_id', user.id)
    .select('*')
    .single();

  if (updateError) {
    console.error("Error updating peer request to accepted:", updateError);
    return { success: false, error: updateError.message || "Failed to accept request." };
  }

  if (!updatedRequest) {
    return { success: false, error: "Request not found or you are not authorized to accept it." };
  }

  // 2. Create an initial session entry
  // --- FIX: Explicitly provide values for all non-nullable columns ---
  const { data: newSession, error: sessionError } = await supabase
    .from('sessions')
    .insert({
      proposer_id: updatedRequest.sender_id,
      attendee_id: updatedRequest.receiver_id,
      topic: 'Initial Discussion', // Explicitly provide topic
      description: 'Discussing initial learning goals and availability.', // Explicitly provide description
      proposed_datetime: new Date().toISOString(), // Provide a default datetime for now
      duration_minutes: 60, // Explicitly provide duration
      status: 'proposed', // Explicitly provide status
      meeting_link: null, // Explicitly provide meeting_link (can be null)
    })
    .select()
    .single();

  if (sessionError) {
    console.error("Error creating initial session:", sessionError);
    return { success: false, error: sessionError.message || "Request accepted, but failed to create initial session." };
  }

  const { data: senderProfile } = await supabase
    .from('profiles')
    .select('username')
    .eq('id', updatedRequest.sender_id)
    .single();

  const { data: receiverProfile } = await supabase
    .from('profiles')
    .select('username')
    .eq('id', updatedRequest.receiver_id)
    .single();

  revalidatePath('/dashboard');
  revalidatePath('/my-requests');
  revalidatePath('/my-sessions');
  if (senderProfile?.username) {
    revalidatePath(`/profile/${senderProfile.username}`);
  }
  if (receiverProfile?.username) {
    revalidatePath(`/profile/${receiverProfile.username}`);
  }

  return { success: true };
}

/**
 * Server Action to decline a peer request.
 * @param {string} requestId - The ID of the request to decline.
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export async function declinePeerRequest(requestId) {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "User not authenticated." };
  }

  const { data: updatedRequest, error } = await supabase
    .from('peer_requests')
    .update({ status: 'declined', updated_at: new Date().toISOString() })
    .eq('id', requestId)
    .eq('receiver_id', user.id)
    .select('*')
    .single();

  if (error) {
    console.error("Error declining peer request:", error);
    return { success: false, error: error.message || "Failed to decline request." };
  }

  if (!updatedRequest) {
    return { success: false, error: "Request not found or you are not authorized to decline it." };
  }

  const { data: senderProfile } = await supabase
    .from('profiles')
    .select('username')
    .eq('id', updatedRequest.sender_id)
    .single();

  const { data: receiverProfile } = await supabase
    .from('profiles')
    .select('username')
    .eq('id', updatedRequest.receiver_id)
    .single();

  revalidatePath('/dashboard');
  revalidatePath('/my-requests');
  if (senderProfile?.username) {
    revalidatePath(`/profile/${senderProfile.username}`);
  }
  if (receiverProfile?.username) {
    revalidatePath(`/profile/${receiverProfile.username}`);
  }

  return { success: true };
}