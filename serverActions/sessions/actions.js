// // serverActions/sessions/actions.js
// "use server"; // This marks this file as Server Actions

// import { createServerSupabaseClient } from '@/lib/supabase/server';
// import { revalidatePath } from 'next/cache';

// /**
//  * Server Action to accept a proposed session.
//  * Only the attendee can accept a session.
//  * @param {string} sessionId - The ID of the session to accept.
//  * @returns {Promise<{success: boolean, error?: string}>}
//  */
// export async function acceptSession(sessionId) {
//   const supabase = await createServerSupabaseClient();
//   const { data: { user } } = await supabase.auth.getUser();

//   if (!user) {
//     return { success: false, error: "User not authenticated." };
//   }

//   // Update the session status to 'accepted'
//   const { data: updatedSession, error: updateError } = await supabase
//     .from('sessions')
//     .update({ status: 'accepted', updated_at: new Date().toISOString() })
//     .eq('id', sessionId)
//     .eq('attendee_id', user.id) // Ensure only the attendee can accept
//     .eq('status', 'proposed') // Only accept if current status is 'proposed'
//     .select('*')
//     .single();

//   if (updateError) {
//     console.error("Error accepting session:", updateError);
//     return { success: false, error: updateError.message || "Failed to accept session." };
//   }

//   if (!updatedSession) {
//     return { success: false, error: "Session not found, not in 'proposed' status, or you are not authorized to accept it." };
//   }

//   // Revalidate paths for both proposer and attendee
//   const { data: proposerProfile } = await supabase.from('profiles').select('username').eq('id', updatedSession.proposer_id).single();
//   const { data: attendeeProfile } = await supabase.from('profiles').select('username').eq('id', updatedSession.attendee_id).single();

//   revalidatePath('/dashboard');
//   revalidatePath('/my-sessions');
//   if (proposerProfile?.username) {
//     revalidatePath(`/profile/${proposerProfile.username}`);
//   }
//   if (attendeeProfile?.username) {
//     revalidatePath(`/profile/${attendeeProfile.username}`);
//   }

//   return { success: true };
// }

// /**
//  * Server Action to propose a reschedule for a session.
//  * Can be done by either proposer or attendee.
//  * @param {string} sessionId - The ID of the session to reschedule.
//  * @param {string} newProposedDatetime - The new proposed datetime in ISO string format.
//  * @param {number} newDurationMinutes - The new duration in minutes.
//  * @param {string} newMeetingLink - (Optional) New meeting link.
//  * @returns {Promise<{success: boolean, error?: string}>}
//  */
// export async function proposeReschedule(sessionId, newProposedDatetime, newDurationMinutes, newMeetingLink) {
//   const supabase = await createServerSupabaseClient();
//   const { data: { user } } = await supabase.auth.getUser();

//   if (!user) {
//     return { success: false, error: "User not authenticated." };
//   }

//   // Check if user is proposer or attendee
//   const { data: sessionToUpdate, error: fetchError } = await supabase
//     .from('sessions')
//     .select('proposer_id, attendee_id, status')
//     .eq('id', sessionId)
//     .single();

//   if (fetchError || !sessionToUpdate) {
//     console.error("Error fetching session for reschedule:", fetchError);
//     return { success: false, error: "Session not found." };
//   }

//   const isProposer = sessionToUpdate.proposer_id === user.id;
//   const isAttendee = sessionToUpdate.attendee_id === user.id;

//   if (!isProposer && !isAttendee) {
//     return { success: false, error: "You are not authorized to reschedule this session." };
//   }

//   // Only allow reschedule if status is 'proposed' or 'accepted' or 'rescheduled_pending'
//   if (!['proposed', 'accepted', 'rescheduled_pending'].includes(sessionToUpdate.status)) {
//     return { success: false, error: "Session cannot be rescheduled in its current status." };
//   }

//   const { data: updatedSession, error: updateError } = await supabase
//     .from('sessions')
//     .update({
//       proposed_datetime: newProposedDatetime,
//       duration_minutes: newDurationMinutes,
//       meeting_link: newMeetingLink,
//       status: 'rescheduled_pending', // Set status to pending reschedule
//       updated_at: new Date().toISOString(),
//     })
//     .eq('id', sessionId)
//     .or(`proposer_id.eq.${user.id},attendee_id.eq.${user.id}`) // Ensure current user is involved
//     .select('*')
//     .single();

//   if (updateError) {
//     console.error("Error proposing reschedule:", updateError);
//     return { success: false, error: updateError.message || "Failed to propose reschedule." };
//   }

//   // Revalidate paths for both proposer and attendee
//   const { data: proposerProfile } = await supabase.from('profiles').select('username').eq('id', updatedSession.proposer_id).single();
//   const { data: attendeeProfile } = await supabase.from('profiles').select('username').eq('id', updatedSession.attendee_id).single();

//   revalidatePath('/dashboard');
//   revalidatePath('/my-sessions');
//   if (proposerProfile?.username) {
//     revalidatePath(`/profile/${proposerProfile.username}`);
//   }
//   if (attendeeProfile?.username) {
//     revalidatePath(`/profile/${attendeeProfile.username}`);
//   }

//   return { success: true };
// }

// /**
//  * Server Action to cancel a session.
//  * Can be done by either proposer or attendee.
//  * @param {string} sessionId - The ID of the session to cancel.
//  * @returns {Promise<{success: boolean, error?: string}>}
//  */
// export async function cancelSession(sessionId) {
//   const supabase = await createServerSupabaseClient();
//   const { data: { user } } = await supabase.auth.getUser();

//   if (!user) {
//     return { success: false, error: "User not authenticated." };
//   }

//   // Check if user is proposer or attendee
//   const { data: sessionToUpdate, error: fetchError } = await supabase
//     .from('sessions')
//     .select('proposer_id, attendee_id, status')
//     .eq('id', sessionId)
//     .single();

//   if (fetchError || !sessionToUpdate) {
//     console.error("Error fetching session for cancellation:", fetchError);
//     return { success: false, error: "Session not found." };
//   }

//   const isProposer = sessionToUpdate.proposer_id === user.id;
//   const isAttendee = sessionToUpdate.attendee_id === user.id;

//   if (!isProposer && !isAttendee) {
//     return { success: false, error: "You are not authorized to cancel this session." };
//   }

//   // Only allow cancellation if status is not already cancelled or completed
//   if (['cancelled', 'completed'].includes(sessionToUpdate.status)) {
//     return { success: false, error: "Session is already cancelled or completed." };
//   }

//   const { data: updatedSession, error: updateError } = await supabase
//     .from('sessions')
//     .update({ status: 'cancelled', updated_at: new Date().toISOString() })
//     .eq('id', sessionId)
//     .or(`proposer_id.eq.${user.id},attendee_id.eq.${user.id}`) // Ensure current user is involved
//     .select('*')
//     .single();

//   if (updateError) {
//     console.error("Error cancelling session:", updateError);
//     return { success: false, error: updateError.message || "Failed to cancel session." };
//   }

//   // Revalidate paths for both proposer and attendee
//   const { data: proposerProfile } = await supabase.from('profiles').select('username').eq('id', updatedSession.proposer_id).single();
//   const { data: attendeeProfile } = await supabase.from('profiles').select('username').eq('id', updatedSession.attendee_id).single();

//   revalidatePath('/dashboard');
//   revalidatePath('/my-sessions');
//   if (proposerProfile?.username) {
//     revalidatePath(`/profile/${proposerProfile.username}`);
//   }
//   if (attendeeProfile?.username) {
//     revalidatePath(`/profile/${attendeeProfile.username}`);
//   }

//   return { success: true };
// }






// // serverActions/sessions/actions.js
// "use server";

// import { createServerSupabaseClient } from '@/lib/supabase/server';
// import { revalidatePath } from 'next/cache';

// /**
//  * Server Action to accept a proposed session or an accepted reschedule.
//  * Only the attendee can accept a session.
//  * @param {string} sessionId - The ID of the session to accept.
//  * @returns {Promise<{success: boolean, error?: string}>}
//  */
// export async function acceptSession(sessionId) {
//   const supabase = await createServerSupabaseClient();
//   const { data: { user } } = await supabase.auth.getUser();

//   if (!user) {
//     return { success: false, error: "User not authenticated." };
//   }

//   // Fetch the current session status first to determine the correct new status
//   const { data: currentSession, error: fetchError } = await supabase
//     .from('sessions')
//     .select('status, proposer_id, attendee_id') // Select necessary IDs for revalidation later
//     .eq('id', sessionId)
//     .single();

//   if (fetchError || !currentSession) {
//     console.error("Error fetching session for acceptance:", fetchError);
//     return { success: false, error: "Session not found." };
//   }

//   // Ensure the current user is the attendee for this session
//   if (currentSession.attendee_id !== user.id) {
//     return { success: false, error: "You are not authorized to accept this session." };
//   }

//   let newStatus = '';
//   // Determine the new status based on the current status
//   if (currentSession.status === 'proposed') {
//     newStatus = 'accepted';
//   } else if (currentSession.status === 'rescheduled_pending') {
//     newStatus = 'rescheduled_accepted'; // If accepting a pending reschedule
//   } else {
//     // If session is already accepted, cancelled, or completed, prevent further acceptance
//     return { success: false, error: "Session cannot be accepted in its current state." };
//   }

//   // Update the session status
//   const { data: updatedSession, error: updateError } = await supabase
//     .from('sessions')
//     .update({ status: newStatus, updated_at: new Date().toISOString() })
//     .eq('id', sessionId)
//     .eq('attendee_id', user.id) // Ensure only the attendee can update
//     // No need to check current status here again, as we already did above
//     .select('*') // Select all columns to get proposer_id and attendee_id for revalidation
//     .single();

//   if (updateError) {
//     console.error("Error accepting session:", updateError);
//     return { success: false, error: updateError.message || "Failed to accept session." };
//   }

//   // Revalidate paths for both proposer and attendee
//   const { data: proposerProfile } = await supabase.from('profiles').select('username').eq('id', updatedSession.proposer_id).single();
//   const { data: attendeeProfile } = await supabase.from('profiles').select('username').eq('id', updatedSession.attendee_id).single();

//   revalidatePath('/dashboard');
//   revalidatePath('/my-sessions');
//   if (proposerProfile?.username) {
//     revalidatePath(`/profile/${proposerProfile.username}`);
//   }
//   if (attendeeProfile?.username) {
//     revalidatePath(`/profile/${attendeeProfile.username}`);
//   }

//   return { success: true };
// }

// /**
//  * Server Action to propose a reschedule for a session.
//  * Can be done by either proposer or attendee.
//  * @param {string} sessionId - The ID of the session to reschedule.
//  * @param {string} newProposedDatetime - The new proposed datetime in ISO string format.
//  * @param {number} newDurationMinutes - The new duration in minutes.
//  * @param {string} newMeetingLink - (Optional) New meeting link.
//  * @returns {Promise<{success: boolean, error?: string}>}
//  */
// export async function proposeReschedule(sessionId, newProposedDatetime, newDurationMinutes, newMeetingLink) {
//   const supabase = await createServerSupabaseClient();
//   const { data: { user } } = await supabase.auth.getUser();

//   if (!user) {
//     return { success: false, error: "User not authenticated." };
//   }

//   // Check if user is proposer or attendee
//   const { data: sessionToUpdate, error: fetchError } = await supabase
//     .from('sessions')
//     .select('proposer_id, attendee_id, status')
//     .eq('id', sessionId)
//     .single();

//   if (fetchError || !sessionToUpdate) {
//     console.error("Error fetching session for reschedule:", fetchError);
//     return { success: false, error: "Session not found." };
//   }

//   const isProposer = sessionToUpdate.proposer_id === user.id;
//   const isAttendee = sessionToUpdate.attendee_id === user.id;

//   if (!isProposer && !isAttendee) {
//     return { success: false, error: "You are not authorized to reschedule this session." };
//   }

//   // Only allow reschedule if status is 'proposed' or 'accepted' or 'rescheduled_pending'
//   if (!['proposed', 'accepted', 'rescheduled_pending'].includes(sessionToUpdate.status)) {
//     return { success: false, error: "Session cannot be rescheduled in its current status." };
//   }

//   const { data: updatedSession, error: updateError } = await supabase
//     .from('sessions')
//     .update({
//       proposed_datetime: newProposedDatetime,
//       duration_minutes: newDurationMinutes,
//       meeting_link: newMeetingLink,
//       status: 'rescheduled_pending', // Set status to pending reschedule
//       updated_at: new Date().toISOString(),
//       // last_reschedule_initiator_id: user.id, // REMOVED: This is for a future step
//     })
//     .eq('id', sessionId)
//     .or(`proposer_id.eq.${user.id},attendee_id.eq.${user.id}`) // Ensure current user is involved
//     .select('*')
//     .single();

//   if (updateError) {
//     console.error("Error proposing reschedule:", updateError);
//     return { success: false, error: updateError.message || "Failed to propose reschedule." };
//   }

//   // Revalidate paths for both proposer and attendee
//   const { data: proposerProfile } = await supabase.from('profiles').select('username').eq('id', updatedSession.proposer_id).single();
//   const { data: attendeeProfile } = await supabase.from('profiles').select('username').eq('id', updatedSession.attendee_id).single();

//   revalidatePath('/dashboard');
//   revalidatePath('/my-sessions');
//   if (proposerProfile?.username) {
//     revalidatePath(`/profile/${proposerProfile.username}`);
//   }
//   if (attendeeProfile?.username) {
//     revalidatePath(`/profile/${attendeeProfile.username}`);
//   }

//   return { success: true };
// }

// /**
//  * Server Action to cancel a session.
//  * Can be done by either proposer or attendee.
//  * @param {string} sessionId - The ID of the session to cancel.
//  * @returns {Promise<{success: boolean, error?: string}>}
//  */
// export async function cancelSession(sessionId) {
//   const supabase = await createServerSupabaseClient();
//   const { data: { user } } = await supabase.auth.getUser();

//   if (!user) {
//     return { success: false, error: "User not authenticated." };
//   }

//   // Check if user is proposer or attendee
//   const { data: sessionToUpdate, error: fetchError } = await supabase
//     .from('sessions')
//     .select('proposer_id, attendee_id, status')
//     .eq('id', sessionId)
//     .single();

//   if (fetchError || !sessionToUpdate) {
//     console.error("Error fetching session for cancellation:", fetchError);
//     return { success: false, error: "Session not found." };
//   }

//   const isProposer = sessionToUpdate.proposer_id === user.id;
//   const isAttendee = sessionToUpdate.attendee_id === user.id;

//   if (!isProposer && !isAttendee) {
//     return { success: false, error: "You are not authorized to cancel this session." };
//   }

//   // Only allow cancellation if status is not already cancelled or completed
//   if (['cancelled', 'completed'].includes(sessionToUpdate.status)) {
//     return { success: false, error: "Session is already cancelled or completed." };
//   }

//   const { data: updatedSession, error: updateError } = await supabase
//     .from('sessions')
//     .update({ status: 'cancelled', updated_at: new Date().toISOString() })
//     .eq('id', sessionId)
//     .or(`proposer_id.eq.${user.id},attendee_id.eq.${user.id}`) // Ensure current user is involved
//     .select('*')
//     .single();

//   if (updateError) {
//     console.error("Error cancelling session:", updateError);
//     return { success: false, error: updateError.message || "Failed to cancel session." };
//   }

//   // Revalidate paths for both proposer and attendee
//   const { data: proposerProfile } = await supabase.from('profiles').select('username').eq('id', updatedSession.proposer_id).single();
//   const { data: attendeeProfile } = await supabase.from('profiles').select('username').eq('id', updatedSession.attendee_id).single();

//   revalidatePath('/dashboard');
//   revalidatePath('/my-sessions');
//   if (proposerProfile?.username) {
//     revalidatePath(`/profile/${proposerProfile.username}`);
//   }
//   if (attendeeProfile?.username) {
//     revalidatePath(`/profile/${attendeeProfile.username}`);
//   }

//   return { success: true };
// }




// // serverActions/sessions/actions.js
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
//  * Server Action to accept a proposed session or an accepted reschedule.
//  * Only the attendee can accept a session.
//  * @param {string} sessionId - The ID of the session to accept.
//  * @returns {Promise<{success: boolean, error?: string}>}
//  */
// export async function acceptSession(sessionId) {
//   const supabase = await createServerSupabaseClient();
//   const { data: { user } } = await supabase.auth.getUser();

//   if (!user) {
//     return { success: false, error: "User not authenticated." };
//   }

//   // Fetch the current session status first to determine the correct new status
//   const { data: currentSession, error: fetchError } = await supabase
//     .from('sessions')
//     .select('status, proposer_id, attendee_id')
//     .eq('id', sessionId)
//     .single();

//   if (fetchError || !currentSession) {
//     console.error("Error fetching session for acceptance:", fetchError);
//     return { success: false, error: "Session not found." };
//   }

//   // Ensure the current user is the attendee for this session
//   if (currentSession.attendee_id !== user.id) {
//     return { success: false, error: "You are not authorized to accept this session." };
//   }

//   let newStatus = '';
//   // Determine the new status based on the current status
//   if (currentSession.status === 'proposed') {
//     newStatus = 'accepted';
//   } else if (currentSession.status === 'rescheduled_pending') {
//     newStatus = 'rescheduled_accepted'; // If accepting a pending reschedule
//   } else {
//     // If session is already accepted, cancelled, or completed, prevent further acceptance
//     return { success: false, error: "Session cannot be accepted in its current state." };
//   }

//   // Update the session status
//   const { data: updatedSession, error: updateError } = await supabase
//     .from('sessions')
//     .update({ status: newStatus, updated_at: new Date().toISOString() })
//     .eq('id', sessionId)
//     .eq('attendee_id', user.id) // Ensure only the attendee can update
//     .select('*') // Select all columns to get proposer_id and attendee_id for revalidation
//     .single();

//   if (updateError) {
//     console.error("Error accepting session:", updateError);
//     return { success: false, error: updateError.message || "Failed to accept session." };
//   }

//   // Revalidate paths for both proposer and attendee
//   const { data: proposerProfile } = await supabase.from('profiles').select('username').eq('id', updatedSession.proposer_id).single();
//   const { data: attendeeProfile } = await supabase.from('profiles').select('username').eq('id', updatedSession.attendee_id).single();

//   revalidatePath('/dashboard');
//   revalidatePath('/my-sessions');
//   if (proposerProfile?.username) {
//     revalidatePath(`/profile/${proposerProfile.username}`);
//   }
//   if (attendeeProfile?.username) {
//     revalidatePath(`/profile/${attendeeProfile.username}`);
//   }

//   return { success: true };
// }

// /**
//  * Server Action to propose a reschedule for a session.
//  * Can be done by either proposer or attendee.
//  * @param {string} sessionId - The ID of the session to reschedule.
//  * @param {string} newProposedDatetime - The new proposed datetime in ISO string format.
//  * @param {number} newDurationMinutes - The new duration in minutes.
//  * @param {string} newMeetingLink - (Optional) New meeting link.
//  * @returns {Promise<{success: boolean, error?: string}>}
//  */
// export async function proposeReschedule(sessionId, newProposedDatetime, newDurationMinutes, newMeetingLink) {
//   const supabase = await createServerSupabaseClient();
//   const { data: { user } } = await supabase.auth.getUser();

//   if (!user) {
//     return { success: false, error: "User not authenticated." };
//   }

//   // Check if user is proposer or attendee
//   const { data: sessionToUpdate, error: fetchError } = await supabase
//     .from('sessions')
//     .select('proposer_id, attendee_id, status')
//     .eq('id', sessionId)
//     .single();

//   if (fetchError || !sessionToUpdate) {
//     console.error("Error fetching session for reschedule:", fetchError);
//     return { success: false, error: "Session not found." };
//   }

//   const isProposer = sessionToUpdate.proposer_id === user.id;
//   const isAttendee = sessionToUpdate.attendee_id === user.id;

//   if (!isProposer && !isAttendee) {
//     return { success: false, error: "You are not authorized to reschedule this session." };
//   }

//   // Only allow reschedule if status is 'proposed' or 'accepted' or 'rescheduled_pending'
//   if (!['proposed', 'accepted', 'rescheduled_pending'].includes(sessionToUpdate.status)) {
//     return { success: false, error: "Session cannot be rescheduled in its current status." };
//   }

//   const { data: updatedSession, error: updateError } = await supabase
//     .from('sessions')
//     .update({
//       proposed_datetime: newProposedDatetime,
//       duration_minutes: newDurationMinutes,
//       meeting_link: newMeetingLink,
//       status: 'rescheduled_pending', // Set status to pending reschedule
//       updated_at: new Date().toISOString(),
//     })
//     .eq('id', sessionId)
//     .or(`proposer_id.eq.${user.id},attendee_id.eq.${user.id}`) // Ensure current user is involved
//     .select('*')
//     .single();

//   if (updateError) {
//     console.error("Error proposing reschedule:", updateError);
//     return { success: false, error: updateError.message || "Failed to propose reschedule." };
//   }

//   // Revalidate paths for both proposer and attendee
//   const { data: proposerProfile } = await supabase.from('profiles').select('username').eq('id', updatedSession.proposer_id).single();
//   const { data: attendeeProfile } = await supabase.from('profiles').select('username').eq('id', updatedSession.attendee_id).single();

//   revalidatePath('/dashboard');
//   revalidatePath('/my-sessions');
//   if (proposerProfile?.username) {
//     revalidatePath(`/profile/${proposerProfile.username}`);
//   }
//   if (attendeeProfile?.username) {
//     revalidatePath(`/profile/${attendeeProfile.username}`);
//   }

//   return { success: true };
// }

// /**
//  * Server Action to cancel a session.
//  * Can be done by either proposer or attendee.
//  * @param {string} sessionId - The ID of the session to cancel.
//  * @returns {Promise<{success: boolean, error?: string}>}
//  */
// export async function cancelSession(sessionId) {
//   const supabase = await createServerSupabaseClient();
//   const { data: { user } } = await supabase.auth.getUser();

//   if (!user) {
//     return { success: false, error: "User not authenticated." };
//   }

//   // Check if user is proposer or attendee
//   const { data: sessionToUpdate, error: fetchError } = await supabase
//     .from('sessions')
//     .select('proposer_id, attendee_id, status')
//     .eq('id', sessionId)
//     .single();

//   if (fetchError || !sessionToUpdate) {
//     console.error("Error fetching session for cancellation:", fetchError);
//     return { success: false, error: "Session not found." };
//   }

//   const isProposer = sessionToUpdate.proposer_id === user.id;
//   const isAttendee = sessionToUpdate.attendee_id === user.id;

//   if (!isProposer && !isAttendee) {
//     return { success: false, error: "You are not authorized to cancel this session." };
//   }

//   // Only allow cancellation if status is not already cancelled or completed
//   if (['cancelled', 'completed'].includes(sessionToUpdate.status)) {
//     return { success: false, error: "Session is already cancelled or completed." };
//   }

//   const { data: updatedSession, error: updateError } = await supabase
//     .from('sessions')
//     .update({ status: 'cancelled', updated_at: new Date().toISOString() })
//     .eq('id', sessionId)
//     .or(`proposer_id.eq.${user.id},attendee_id.eq.${user.id}`) // Ensure current user is involved
//     .select('*')
//     .single();

//   if (updateError) {
//     console.error("Error cancelling session:", updateError);
//     return { success: false, error: updateError.message || "Failed to cancel session." };
//   }

//   // Revalidate paths for both proposer and attendee
//   const { data: proposerProfile } = await supabase.from('profiles').select('username').eq('id', updatedSession.proposer_id).single();
//   const { data: attendeeProfile } = await supabase.from('profiles').select('username').eq('id', updatedSession.attendee_id).single();

//   revalidatePath('/dashboard');
//   revalidatePath('/my-sessions');
//   if (proposerProfile?.username) {
//     revalidatePath(`/profile/${proposerProfile.username}`);
//   }
//   if (attendeeProfile?.username) {
//     revalidatePath(`/profile/${attendeeProfile.username}`);
//   }

//   return { success: true };
// }








// // serverActions/sessions/actions.js
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
//  * Server Action to accept a proposed session or an accepted reschedule.
//  * Only the attendee can accept a session.
//  * @param {string} sessionId - The ID of the session to accept.
//  * @returns {Promise<{success: boolean, error?: string}>}
//  */
// export async function acceptSession(sessionId) {
//   const supabase = await createServerSupabaseClient();
//   const { data: { user } } = await supabase.auth.getUser();

//   if (!user) {
//     return { success: false, error: "User not authenticated." };
//   }

//   const { data: currentSession, error: fetchError } = await supabase
//     .from('sessions')
//     .select('status, proposer_id, attendee_id')
//     .eq('id', sessionId)
//     .single();

//   if (fetchError || !currentSession) {
//     console.error("Error fetching session for acceptance:", fetchError);
//     return { success: false, error: "Session not found." };
//   }

//   if (currentSession.attendee_id !== user.id) {
//     return { success: false, error: "You are not authorized to accept this session." };
//   }

//   let newStatus = '';
//   if (currentSession.status === 'proposed') {
//     newStatus = 'accepted';
//   } else if (currentSession.status === 'rescheduled_pending') {
//     newStatus = 'rescheduled_accepted';
//   } else {
//     return { success: false, error: "Session cannot be accepted in its current state." };
//   }

//   const { data: updatedSession, error: updateError } = await supabase
//     .from('sessions')
//     .update({ status: newStatus, updated_at: new Date().toISOString() })
//     .eq('id', sessionId)
//     .eq('attendee_id', user.id)
//     .select('*')
//     .single();

//   if (updateError) {
//     console.error("Error accepting session:", updateError);
//     return { success: false, error: updateError.message || "Failed to accept session." };
//   }

//   const { data: proposerProfile } = await supabase.from('profiles').select('username').eq('id', updatedSession.proposer_id).single();
//   const { data: attendeeProfile } = await supabase.from('profiles').select('username').eq('id', updatedSession.attendee_id).single();

//   revalidatePath('/dashboard');
//   revalidatePath('/my-sessions');
//   if (proposerProfile?.username) {
//     revalidatePath(`/profile/${proposerProfile.username}`);
//   }
//   if (attendeeProfile?.username) {
//     revalidatePath(`/profile/${attendeeProfile.username}`);
//   }

//   return { success: true };
// }

// /**
//  * Server Action to propose a reschedule for a session.
//  * Can be done by either proposer or attendee.
//  * @param {string} sessionId - The ID of the session to reschedule.
//  * @param {string} newProposedDatetime - The new proposed datetime in ISO string format.
//  * @param {number} newDurationMinutes - The new duration in minutes.
//  * @param {string} newMeetingLink - (Optional) New meeting link.
//  * @returns {Promise<{success: boolean, error?: string}>}
//  */
// export async function proposeReschedule(sessionId, newProposedDatetime, newDurationMinutes, newMeetingLink) {
//   const supabase = await createServerSupabaseClient();
//   const { data: { user } } = await supabase.auth.getUser();

//   if (!user) {
//     return { success: false, error: "User not authenticated." };
//   }

//   const { data: sessionToUpdate, error: fetchError } = await supabase
//     .from('sessions')
//     .select('proposer_id, attendee_id, status')
//     .eq('id', sessionId)
//     .single();

//   if (fetchError || !sessionToUpdate) {
//     console.error("Error fetching session for reschedule:", fetchError);
//     return { success: false, error: "Session not found." };
//   }

//   const isProposer = sessionToUpdate.proposer_id === user.id;
//   const isAttendee = sessionToUpdate.attendee_id === user.id;

//   if (!isProposer && !isAttendee) {
//     return { success: false, error: "You are not authorized to reschedule this session." };
//   }

//   if (!['proposed', 'accepted', 'rescheduled_pending'].includes(sessionToUpdate.status)) {
//     return { success: false, error: "Session cannot be rescheduled in its current status." };
//   }

//   const { data: updatedSession, error: updateError } = await supabase
//     .from('sessions')
//     .update({
//       proposed_datetime: newProposedDatetime,
//       duration_minutes: newDurationMinutes,
//       meeting_link: newMeetingLink,
//       status: 'rescheduled_pending',
//       updated_at: new Date().toISOString(),
//       last_reschedule_initiator_id: user.id, // NEW: Set who initiated the reschedule
//     })
//     .eq('id', sessionId)
//     .or(`proposer_id.eq.${user.id},attendee_id.eq.${user.id}`)
//     .select('*')
//     .single();

//   if (updateError) {
//     console.error("Error proposing reschedule:", updateError);
//     return { success: false, error: updateError.message || "Failed to propose reschedule." };
//   }

//   const { data: proposerProfile } = await supabase.from('profiles').select('username').eq('id', updatedSession.proposer_id).single();
//   const { data: attendeeProfile } = await supabase.from('profiles').select('username').eq('id', updatedSession.attendee_id).single();

//   revalidatePath('/dashboard');
//   revalidatePath('/my-sessions');
//   if (proposerProfile?.username) {
//     revalidatePath(`/profile/${proposerProfile.username}`);
//   }
//   if (attendeeProfile?.username) {
//     revalidatePath(`/profile/${attendeeProfile.username}`);
//   }

//   return { success: true };
// }

// /**
//  * Server Action to cancel a session.
//  * Can be done by either proposer or attendee.
//  * @param {string} sessionId - The ID of the session to cancel.
//  * @returns {Promise<{success: boolean, error?: string}>}
//  */
// export async function cancelSession(sessionId) {
//   const supabase = await createServerSupabaseClient();
//   const { data: { user } } = await supabase.auth.getUser();

//   if (!user) {
//     return { success: false, error: "User not authenticated." };
//   }

//   const { data: sessionToUpdate, error: fetchError } = await supabase
//     .from('sessions')
//     .select('proposer_id, attendee_id, status')
//     .eq('id', sessionId)
//     .single();

//   if (fetchError || !sessionToUpdate) {
//     console.error("Error fetching session for cancellation:", fetchError);
//     return { success: false, error: "Session not found." };
//   }

//   const isProposer = sessionToUpdate.proposer_id === user.id;
//   const isAttendee = sessionToUpdate.attendee_id === user.id;

//   if (!isProposer && !isAttendee) {
//     return { success: false, error: "You are not authorized to cancel this session." };
//   }

//   if (['cancelled', 'completed'].includes(sessionToUpdate.status)) {
//     return { success: false, error: "Session is already cancelled or completed." };
//   }

//   const { data: updatedSession, error: updateError } = await supabase
//     .from('sessions')
//     .update({ status: 'cancelled', updated_at: new Date().toISOString() })
//     .eq('id', sessionId)
//     .or(`proposer_id.eq.${user.id},attendee_id.eq.${user.id}`)
//     .select('*')
//     .single();

//   if (updateError) {
//     console.error("Error cancelling session:", updateError);
//     return { success: false, error: updateError.message || "Failed to cancel session." };
//   }

//   const { data: proposerProfile } = await supabase.from('profiles').select('username').eq('id', updatedSession.proposer_id).single();
//   const { data: attendeeProfile } = await supabase.from('profiles').select('username').eq('id', updatedSession.attendee_id).single();

//   revalidatePath('/dashboard');
//   revalidatePath('/my-sessions');
//   if (proposerProfile?.username) {
//     revalidatePath(`/profile/${proposerProfile.username}`);
//   }
//   if (attendeeProfile?.username) {
//     revalidatePath(`/profile/${attendeeProfile.username}`);
//   }

//   return { success: true };
// }











// // serverActions/sessions/actions.js
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
//  * Server Action to accept a proposed session or an accepted reschedule.
//  * @param {string} sessionId - The ID of the session to accept.
//  * @returns {Promise<{success: boolean, error?: string}>}
//  */
// export async function acceptSession(sessionId) {
//   const supabase = await createServerSupabaseClient();
//   const { data: { user } } = await supabase.auth.getUser();

//   if (!user) {
//     return { success: false, error: "User not authenticated." };
//   }

//   // Fetch the current session status and initiator ID
//   const { data: currentSession, error: fetchError } = await supabase
//     .from('sessions')
//     .select('status, proposer_id, attendee_id, last_reschedule_initiator_id') // NEW: Select initiator ID
//     .eq('id', sessionId)
//     .single();

//   if (fetchError || !currentSession) {
//     console.error("Error fetching session for acceptance:", fetchError);
//     return { success: false, error: "Session not found." };
//   }

//   // Determine if the current user is authorized to accept
//   const isProposer = currentSession.proposer_id === user.id;
//   const isAttendee = currentSession.attendee_id === user.id;

//   if (!isProposer && !isAttendee) {
//     return { success: false, error: "You are not authorized to accept this session." };
//   }

//   // If status is 'rescheduled_pending', only the non-initiator can accept.
//   // If status is 'proposed', only the attendee can accept.
//   let newStatus = '';
//   if (currentSession.status === 'proposed') {
//     if (!isAttendee) { // Only attendee can accept initial proposal
//       return { success: false, error: "Only the attendee can accept the initial session proposal." };
//     }
//     newStatus = 'accepted';
//   } else if (currentSession.status === 'rescheduled_pending') {
//     if (user.id === currentSession.last_reschedule_initiator_id) {
//       // The user trying to accept is the one who proposed the reschedule, which is incorrect.
//       return { success: false, error: "You initiated the reschedule. Waiting for the other party to accept." };
//     }
//     newStatus = 'rescheduled_accepted'; // If accepting a pending reschedule
//   } else {
//     return { success: false, error: "Session cannot be accepted in its current state." };
//   }

//   // Update the session status
//   const { data: updatedSession, error: updateError } = await supabase
//     .from('sessions')
//     .update({ status: newStatus, updated_at: new Date().toISOString() })
//     .eq('id', sessionId)
//     // IMPORTANT: Filter by either proposer_id or attendee_id to ensure authorization
//     .or(`proposer_id.eq.${user.id},attendee_id.eq.${user.id}`)
//     .select('*')
//     .single();

//   if (updateError) {
//     console.error("Error accepting session:", updateError);
//     return { success: false, error: updateError.message || "Failed to accept session." };
//   }

//   const { data: proposerProfile } = await supabase.from('profiles').select('username').eq('id', updatedSession.proposer_id).single();
//   const { data: attendeeProfile } = await supabase.from('profiles').select('username').eq('id', updatedSession.attendee_id).single();

//   revalidatePath('/dashboard');
//   revalidatePath('/my-sessions');
//   if (proposerProfile?.username) {
//     revalidatePath(`/profile/${proposerProfile.username}`);
//   }
//   if (attendeeProfile?.username) {
//     revalidatePath(`/profile/${attendeeProfile.username}`);
//   }

//   return { success: true };
// }

// /**
//  * Server Action to propose a reschedule for a session.
//  * Can be done by either proposer or attendee.
//  * @param {string} sessionId - The ID of the session to reschedule.
//  * @param {string} newProposedDatetime - The new proposed datetime in ISO string format.
//  * @param {number} newDurationMinutes - The new duration in minutes.
//  * @param {string} newMeetingLink - (Optional) New meeting link.
//  * @returns {Promise<{success: boolean, error?: string}>}
//  */
// export async function proposeReschedule(sessionId, newProposedDatetime, newDurationMinutes, newMeetingLink) {
//   const supabase = await createServerSupabaseClient();
//   const { data: { user } } = await supabase.auth.getUser();

//   if (!user) {
//     return { success: false, error: "User not authenticated." };
//   }

//   const { data: sessionToUpdate, error: fetchError } = await supabase
//     .from('sessions')
//     .select('proposer_id, attendee_id, status')
//     .eq('id', sessionId)
//     .single();

//   if (fetchError || !sessionToUpdate) {
//     console.error("Error fetching session for reschedule:", fetchError);
//     return { success: false, error: "Session not found." };
//   }

//   const isProposer = sessionToUpdate.proposer_id === user.id;
//   const isAttendee = sessionToUpdate.attendee_id === user.id;

//   if (!isProposer && !isAttendee) {
//     return { success: false, error: "You are not authorized to reschedule this session." };
//   }

//   if (!['proposed', 'accepted', 'rescheduled_pending'].includes(sessionToUpdate.status)) {
//     return { success: false, error: "Session cannot be rescheduled in its current status." };
//   }

//   const { data: updatedSession, error: updateError } = await supabase
//     .from('sessions')
//     .update({
//       proposed_datetime: newProposedDatetime,
//       duration_minutes: newDurationMinutes,
//       meeting_link: newMeetingLink,
//       status: 'rescheduled_pending',
//       updated_at: new Date().toISOString(),
//       last_reschedule_initiator_id: user.id, // Set who initiated the reschedule
//     })
//     .eq('id', sessionId)
//     .or(`proposer_id.eq.${user.id},attendee_id.eq.${user.id}`)
//     .select('*')
//     .single();

//   if (updateError) {
//     console.error("Error proposing reschedule:", updateError);
//     return { success: false, error: updateError.message || "Failed to propose reschedule." };
//   }

//   const { data: proposerProfile } = await supabase.from('profiles').select('username').eq('id', updatedSession.proposer_id).single();
//   const { data: attendeeProfile } = await supabase.from('profiles').select('username').eq('id', updatedSession.attendee_id).single();

//   revalidatePath('/dashboard');
//   revalidatePath('/my-sessions');
//   if (proposerProfile?.username) {
//     revalidatePath(`/profile/${proposerProfile.username}`);
//   }
//   if (attendeeProfile?.username) {
//     revalidatePath(`/profile/${attendeeProfile.username}`);
//   }

//   return { success: true };
// }

// /**
//  * Server Action to cancel a session.
//  * Can be done by either proposer or attendee.
//  * @param {string} sessionId - The ID of the session to cancel.
//  * @returns {Promise<{success: boolean, error?: string}>}
//  */
// export async function cancelSession(sessionId) {
//   const supabase = await createServerSupabaseClient();
//   const { data: { user } } = await supabase.auth.getUser();

//   if (!user) {
//     return { success: false, error: "User not authenticated." };
//   }

//   const { data: sessionToUpdate, error: fetchError } = await supabase
//     .from('sessions')
//     .select('proposer_id, attendee_id, status')
//     .eq('id', sessionId)
//     .single();

//   if (fetchError || !sessionToUpdate) {
//     console.error("Error fetching session for cancellation:", fetchError);
//     return { success: false, error: "Session not found." };
//   }

//   const isProposer = sessionToUpdate.proposer_id === user.id;
//   const isAttendee = sessionToUpdate.attendee_id === user.id;

//   if (!isProposer && !isAttendee) {
//     return { success: false, error: "You are not authorized to cancel this session." };
//   }

//   if (['cancelled', 'completed'].includes(sessionToUpdate.status)) {
//     return { success: false, error: "Session is already cancelled or completed." };
//   }

//   const { data: updatedSession, error: updateError } = await supabase
//     .from('sessions')
//     .update({ status: 'cancelled', updated_at: new Date().toISOString() })
//     .eq('id', sessionId)
//     .or(`proposer_id.eq.${user.id},attendee_id.eq.${user.id}`)
//     .select('*')
//     .single();

//   if (updateError) {
//     console.error("Error cancelling session:", updateError);
//     return { success: false, error: updateError.message || "Failed to cancel session." };
//   }

//   const { data: proposerProfile } = await supabase.from('profiles').select('username').eq('id', updatedSession.proposer_id).single();
//   const { data: attendeeProfile } = await supabase.from('profiles').select('username').eq('id', updatedSession.attendee_id).single();

//   revalidatePath('/dashboard');
//   revalidatePath('/my-sessions');
//   if (proposerProfile?.username) {
//     revalidatePath(`/profile/${proposerProfile.username}`);
//   }
//   if (attendeeProfile?.username) {
//     revalidatePath(`/profile/${attendeeProfile.username}`);
//   }

//   return { success: true };
// }








// // serverActions/sessions/actions.js
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
//  * Server Action to accept a proposed session or an accepted reschedule.
//  * Only the attendee can accept a session.
//  * @param {string} sessionId - The ID of the session to accept.
//  * @returns {Promise<{success: boolean, error?: string}>}
//  */
// export async function acceptSession(sessionId) {
//   const supabase = await createServerSupabaseClient();
//   const { data: { user } } = await supabase.auth.getUser();

//   if (!user) {
//     return { success: false, error: "User not authenticated." };
//   }

//   const { data: currentSession, error: fetchError } = await supabase
//     .from('sessions')
//     .select('status, proposer_id, attendee_id')
//     .eq('id', sessionId)
//     .single();

//   if (fetchError || !currentSession) {
//     console.error("Error fetching session for acceptance:", fetchError);
//     return { success: false, error: "Session not found." };
//   }

//   const isProposer = currentSession.proposer_id === user.id;
//   const isAttendee = currentSession.attendee_id === user.id;

//   if (!isProposer && !isAttendee) {
//     return { success: false, error: "You are not authorized to accept this session." };
//   }

//   let newStatus = '';
//   if (currentSession.status === 'proposed') {
//     if (!isAttendee) {
//       return { success: false, error: "Only the attendee can accept the initial session proposal." };
//     }
//     newStatus = 'accepted';
//   } else if (currentSession.status === 'rescheduled_pending') {
//     if (user.id === currentSession.last_reschedule_initiator_id) {
//       return { success: false, error: "You initiated the reschedule. Waiting for the other party to accept." };
//     }
//     newStatus = 'rescheduled_accepted';
//   } else {
//     return { success: false, error: "Session cannot be accepted in its current state." };
//   }

//   const { data: updatedSession, error: updateError } = await supabase
//     .from('sessions')
//     .update({ status: newStatus, updated_at: new Date().toISOString() })
//     .eq('id', sessionId)
//     .or(`proposer_id.eq.${user.id},attendee_id.eq.${user.id}`)
//     .select('*')
//     .single();

//   if (updateError) {
//     console.error("Error accepting session:", updateError);
//     return { success: false, error: updateError.message || "Failed to accept session." };
//   }

//   const { data: proposerProfile } = await supabase.from('profiles').select('username').eq('id', updatedSession.proposer_id).single();
//   const { data: attendeeProfile } = await supabase.from('profiles').select('username').eq('id', updatedSession.attendee_id).single();

//   revalidatePath('/dashboard');
//   revalidatePath('/my-sessions');
//   if (proposerProfile?.username) {
//     revalidatePath(`/profile/${proposerProfile.username}`);
//   }
//   if (attendeeProfile?.username) {
//     revalidatePath(`/profile/${attendeeProfile.username}`);
//   }

//   return { success: true };
// }

// /**
//  * Server Action to propose a reschedule for a session.
//  * Can be done by either proposer or attendee.
//  * @param {string} sessionId - The ID of the session to reschedule.
//  * @param {string} newProposedDatetime - The new proposed datetime in ISO string format.
//  * @param {number} newDurationMinutes - The new duration in minutes.
//  * @param {string} newMeetingLink - (Optional) New meeting link.
//  * @returns {Promise<{success: boolean, error?: string}>}
//  */
// export async function proposeReschedule(sessionId, newProposedDatetime, newDurationMinutes, newMeetingLink) {
//   const supabase = await createServerSupabaseClient();
//   const { data: { user } } = await supabase.auth.getUser();

//   if (!user) {
//     return { success: false, error: "User not authenticated." };
//   }

//   const { data: sessionToUpdate, error: fetchError } = await supabase
//     .from('sessions')
//     .select('proposer_id, attendee_id, status')
//     .eq('id', sessionId)
//     .single();

//   if (fetchError || !sessionToUpdate) {
//     console.error("Error fetching session for reschedule:", fetchError);
//     return { success: false, error: "Session not found." };
//   }

//   const isProposer = sessionToUpdate.proposer_id === user.id;
//   const isAttendee = sessionToUpdate.attendee_id === user.id;

//   if (!isProposer && !isAttendee) {
//     return { success: false, error: "You are not authorized to reschedule this session." };
//   }

//   if (!['proposed', 'accepted', 'rescheduled_pending'].includes(sessionToUpdate.status)) {
//     return { success: false, error: "Session cannot be rescheduled in its current status." };
//   }

//   const { data: updatedSession, error: updateError } = await supabase
//     .from('sessions')
//     .update({
//       proposed_datetime: newProposedDatetime,
//       duration_minutes: newDurationMinutes,
//       meeting_link: newMeetingLink,
//       status: 'rescheduled_pending',
//       updated_at: new Date().toISOString(),
//       last_reschedule_initiator_id: user.id,
//     })
//     .eq('id', sessionId)
//     .or(`proposer_id.eq.${user.id},attendee_id.eq.${user.id}`)
//     .select('*')
//     .single();

//   if (updateError) {
//     console.error("Error proposing reschedule:", updateError);
//     return { success: false, error: updateError.message || "Failed to propose reschedule." };
//   }

//   const { data: proposerProfile } = await supabase.from('profiles').select('username').eq('id', updatedSession.proposer_id).single();
//   const { data: attendeeProfile } = await supabase.from('profiles').select('username').eq('id', updatedSession.attendee_id).single();

//   revalidatePath('/dashboard');
//   revalidatePath('/my-sessions');
//   if (proposerProfile?.username) {
//     revalidatePath(`/profile/${proposerProfile.username}`);
//   }
//   if (attendeeProfile?.username) {
//     revalidatePath(`/profile/${attendeeProfile.username}`);
//   }

//   return { success: true };
// }

// /**
//  * Server Action to cancel a session.
//  * Can be done by either proposer or attendee.
//  * @param {string} sessionId - The ID of the session to cancel.
//  * @returns {Promise<{success: boolean, error?: string}>}
//  */
// export async function cancelSession(sessionId) {
//   const supabase = await createServerSupabaseClient();
//   const { data: { user } } = await supabase.auth.getUser();

//   if (!user) {
//     return { success: false, error: "User not authenticated." };
//   }

//   const { data: sessionToUpdate, error: fetchError } = await supabase
//     .from('sessions')
//     .select('proposer_id, attendee_id, status')
//     .eq('id', sessionId)
//     .single();

//   if (fetchError || !sessionToUpdate) {
//     console.error("Error fetching session for cancellation:", fetchError);
//     return { success: false, error: "Session not found." };
//   }

//   const isProposer = sessionToUpdate.proposer_id === user.id;
//   const isAttendee = sessionToUpdate.attendee_id === user.id;

//   if (!isProposer && !isAttendee) {
//     return { success: false, error: "You are not authorized to cancel this session." };
//   }

//   if (['cancelled', 'completed'].includes(sessionToUpdate.status)) {
//     return { success: false, error: "Session is already cancelled or completed." };
//   }

//   const { data: updatedSession, error: updateError } = await supabase
//     .from('sessions')
//     .update({ status: 'cancelled', updated_at: new Date().toISOString() })
//     .eq('id', sessionId)
//     .or(`proposer_id.eq.${user.id},attendee_id.eq.${user.id}`)
//     .select('*')
//     .single();

//   if (updateError) {
//     console.error("Error cancelling session:", updateError);
//     return { success: false, error: updateError.message || "Failed to cancel session." };
//   }

//   const { data: proposerProfile } = await supabase.from('profiles').select('username').eq('id', updatedSession.proposer_id).single();
//   const { data: attendeeProfile } = await supabase.from('profiles').select('username').eq('id', updatedSession.attendee_id).single();

//   revalidatePath('/dashboard');
//   revalidatePath('/my-sessions');
//   if (proposerProfile?.username) {
//     revalidatePath(`/profile/${proposerProfile.username}`);
//   }
//   if (attendeeProfile?.username) {
//     revalidatePath(`/profile/${attendeeProfile.username}`);
//   }

//   return { success: true };
// }

// /**
//  * Server Action to mark a session as completed.
//  * Can be done by either proposer or attendee.
//  * @param {string} sessionId - The ID of the session to mark as completed.
//  * @returns {Promise<{success: boolean, error?: string}>}
//  */
// export async function completeSession(sessionId) {
//   const supabase = await createServerSupabaseClient();
//   const { data: { user } } = await supabase.auth.getUser();

//   if (!user) {
//     return { success: false, error: "User not authenticated." };
//   }

//   // Fetch the current session to check authorization and status
//   const { data: sessionToUpdate, error: fetchError } = await supabase
//     .from('sessions')
//     .select('proposer_id, attendee_id, status')
//     .eq('id', sessionId)
//     .single();

//   if (fetchError || !sessionToUpdate) {
//     console.error("Error fetching session for completion:", fetchError);
//     return { success: false, error: "Session not found." };
//   }

//   const isProposer = sessionToUpdate.proposer_id === user.id;
//   const isAttendee = sessionToUpdate.attendee_id === user.id;

//   if (!isProposer && !isAttendee) {
//     return { success: false, error: "You are not authorized to mark this session as completed." };
//   }

//   // Only allow completion if status is 'accepted' or 'rescheduled_accepted'
//   if (!['accepted', 'rescheduled_accepted'].includes(sessionToUpdate.status)) {
//     return { success: false, error: "Session cannot be marked as completed in its current status. It must be accepted or rescheduled accepted." };
//   }

//   const { data: updatedSession, error: updateError } = await supabase
//     .from('sessions')
//     .update({ status: 'completed', updated_at: new Date().toISOString() })
//     .eq('id', sessionId)
//     .or(`proposer_id.eq.${user.id},attendee_id.eq.${user.id}`) // Ensure current user is involved
//     .select('*')
//     .single();

//   if (updateError) {
//     console.error("Error completing session:", updateError);
//     return { success: false, error: updateError.message || "Failed to mark session as completed." };
//   }

//   // Revalidate paths for both proposer and attendee
//   const { data: proposerProfile } = await supabase.from('profiles').select('username').eq('id', updatedSession.proposer_id).single();
//   const { data: attendeeProfile } = await supabase.from('profiles').select('username').eq('id', updatedSession.attendee_id).single();

//   revalidatePath('/dashboard');
//   revalidatePath('/my-sessions');
//   if (proposerProfile?.username) {
//     revalidatePath(`/profile/${proposerProfile.username}`);
//   }
//   if (attendeeProfile?.username) {
//     revalidatePath(`/profile/${attendeeProfile.username}`);
//   }

//   return { success: true };
// }






// serverActions/sessions/actions.js
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
 * Server Action to accept a proposed session or an accepted reschedule.
 * Only the attendee can accept a session.
 * @param {string} sessionId - The ID of the session to accept.
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export async function acceptSession(sessionId) {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "User not authenticated." };
  }

  const { data: currentSession, error: fetchError } = await supabase
    .from('sessions')
    .select('status, proposer_id, attendee_id')
    .eq('id', sessionId)
    .single();

  if (fetchError || !currentSession) {
    console.error("Error fetching session for acceptance:", fetchError);
    return { success: false, error: "Session not found." };
  }

  const isProposer = currentSession.proposer_id === user.id;
  const isAttendee = currentSession.attendee_id === user.id;

  if (!isProposer && !isAttendee) {
    return { success: false, error: "You are not authorized to accept this session." };
  }

  let newStatus = '';
  if (currentSession.status === 'proposed') {
    if (!isAttendee) {
      return { success: false, error: "Only the attendee can accept the initial session proposal." };
    }
    newStatus = 'accepted';
  } else if (currentSession.status === 'rescheduled_pending') {
    if (user.id === currentSession.last_reschedule_initiator_id) {
      return { success: false, error: "You initiated the reschedule. Waiting for the other party to accept." };
    }
    newStatus = 'rescheduled_accepted';
  } else {
    return { success: false, error: "Session cannot be accepted in its current state." };
  }

  const { data: updatedSession, error: updateError } = await supabase
    .from('sessions')
    .update({ status: newStatus, updated_at: new Date().toISOString() })
    .eq('id', sessionId)
    .or(`proposer_id.eq.${user.id},attendee_id.eq.${user.id}`)
    .select('*')
    .single();

  if (updateError) {
    console.error("Error accepting session:", updateError);
    return { success: false, error: updateError.message || "Failed to accept session." };
  }

  const { data: proposerProfile } = await supabase.from('profiles').select('username').eq('id', updatedSession.proposer_id).single();
  const { data: attendeeProfile } = await supabase.from('profiles').select('username').eq('id', updatedSession.attendee_id).single();

  revalidatePath('/dashboard');
  revalidatePath('/my-sessions');
  if (proposerProfile?.username) {
    revalidatePath(`/profile/${proposerProfile.username}`);
  }
  if (attendeeProfile?.username) {
    revalidatePath(`/profile/${attendeeProfile.username}`);
  }

  return { success: true };
}

/**
 * Server Action to propose a reschedule for a session.
 * Can be done by either proposer or attendee.
 * @param {string} sessionId - The ID of the session to reschedule.
 * @param {string} newProposedDatetime - The new proposed datetime in ISO string format.
 * @param {number} newDurationMinutes - The new duration in minutes.
 * @param {string} newMeetingLink - (Optional) New meeting link.
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export async function proposeReschedule(sessionId, newProposedDatetime, newDurationMinutes, newMeetingLink) {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "User not authenticated." };
  }

  const { data: sessionToUpdate, error: fetchError } = await supabase
    .from('sessions')
    .select('proposer_id, attendee_id, status')
    .eq('id', sessionId)
    .single();

  if (fetchError || !sessionToUpdate) {
    console.error("Error fetching session for reschedule:", fetchError);
    return { success: false, error: "Session not found." };
  }

  const isProposer = sessionToUpdate.proposer_id === user.id;
  const isAttendee = sessionToUpdate.attendee_id === user.id;

  if (!isProposer && !isAttendee) {
    return { success: false, error: "You are not authorized to reschedule this session." };
  }

  if (!['proposed', 'accepted', 'rescheduled_pending'].includes(sessionToUpdate.status)) {
    return { success: false, error: "Session cannot be rescheduled in its current status." };
  }

  const { data: updatedSession, error: updateError } = await supabase
    .from('sessions')
    .update({
      proposed_datetime: newProposedDatetime,
      duration_minutes: newDurationMinutes,
      meeting_link: newMeetingLink,
      status: 'rescheduled_pending',
      updated_at: new Date().toISOString(),
      last_reschedule_initiator_id: user.id,
    })
    .eq('id', sessionId)
    .or(`proposer_id.eq.${user.id},attendee_id.eq.${user.id}`)
    .select('*')
    .single();

  if (updateError) {
    console.error("Error proposing reschedule:", updateError);
    return { success: false, error: updateError.message || "Failed to propose reschedule." };
  }

  const { data: proposerProfile } = await supabase.from('profiles').select('username').eq('id', updatedSession.proposer_id).single();
  const { data: attendeeProfile } = await supabase.from('profiles').select('username').eq('id', updatedSession.attendee_id).single();

  revalidatePath('/dashboard');
  revalidatePath('/my-sessions');
  if (proposerProfile?.username) {
    revalidatePath(`/profile/${proposerProfile.username}`);
  }
  if (attendeeProfile?.username) {
    revalidatePath(`/profile/${attendeeProfile.username}`);
  }

  return { success: true };
}

/**
 * Server Action to cancel a session.
 * Can be done by either proposer or attendee.
 * @param {string} sessionId - The ID of the session to cancel.
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export async function cancelSession(sessionId) {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "User not authenticated." };
  }

  const { data: sessionToUpdate, error: fetchError } = await supabase
    .from('sessions')
    .select('proposer_id, attendee_id, status')
    .eq('id', sessionId)
    .single();

  if (fetchError || !sessionToUpdate) {
    console.error("Error fetching session for cancellation:", fetchError);
    return { success: false, error: "Session not found." };
  }

  const isProposer = sessionToUpdate.proposer_id === user.id;
  const isAttendee = sessionToUpdate.attendee_id === user.id;

  if (!isProposer && !isAttendee) {
    return { success: false, error: "You are not authorized to cancel this session." };
  }

  if (['cancelled', 'completed'].includes(sessionToUpdate.status)) {
    return { success: false, error: "Session is already cancelled or completed." };
  }

  const { data: updatedSession, error: updateError } = await supabase
    .from('sessions')
    .update({ status: 'cancelled', updated_at: new Date().toISOString() })
    .eq('id', sessionId)
    .or(`proposer_id.eq.${user.id},attendee_id.eq.${user.id}`)
    .select('*')
    .single();

  if (updateError) {
    console.error("Error cancelling session:", updateError);
    return { success: false, error: updateError.message || "Failed to cancel session." };
  }

  const { data: proposerProfile } = await supabase.from('profiles').select('username').eq('id', updatedSession.proposer_id).single();
  const { data: attendeeProfile } = await supabase.from('profiles').select('username').eq('id', updatedSession.attendee_id).single();

  revalidatePath('/dashboard');
  revalidatePath('/my-sessions');
  if (proposerProfile?.username) {
    revalidatePath(`/profile/${proposerProfile.username}`);
  }
  if (attendeeProfile?.username) {
    revalidatePath(`/profile/${attendeeProfile.username}`);
  }

  return { success: true };
}

/**
 * Server Action to mark a session as completed.
 * Can be done by either proposer or attendee.
 * @param {string} sessionId - The ID of the session to mark as completed.
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export async function completeSession(sessionId) {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "User not authenticated." };
  }

  const { data: sessionToUpdate, error: fetchError } = await supabase
    .from('sessions')
    .select('proposer_id, attendee_id, status')
    .eq('id', sessionId)
    .single();

  if (fetchError || !sessionToUpdate) {
    console.error("Error fetching session for completion:", fetchError);
    return { success: false, error: "Session not found." };
  }

  const isProposer = sessionToUpdate.proposer_id === user.id;
  const isAttendee = sessionToUpdate.attendee_id === user.id;

  if (!isProposer && !isAttendee) {
    return { success: false, error: "You are not authorized to mark this session as completed." };
  }

  if (!['accepted', 'rescheduled_accepted'].includes(sessionToUpdate.status)) {
    return { success: false, error: "Session cannot be marked as completed in its current status. It must be accepted or rescheduled accepted." };
  }

  const { data: updatedSession, error: updateError } = await supabase
    .from('sessions')
    .update({ status: 'completed', updated_at: new Date().toISOString() })
    .eq('id', sessionId)
    .or(`proposer_id.eq.${user.id},attendee_id.eq.${user.id}`)
    .select('*')
    .single();

  if (updateError) {
    console.error("Error completing session:", updateError);
    return { success: false, error: updateError.message || "Failed to mark session as completed." };
  }

  const { data: proposerProfile } = await supabase.from('profiles').select('username').eq('id', updatedSession.proposer_id).single();
  const { data: attendeeProfile } = await supabase.from('profiles').select('username').eq('id', updatedSession.attendee_id).single();

  revalidatePath('/dashboard');
  revalidatePath('/my-sessions');
  if (proposerProfile?.username) {
    revalidatePath(`/profile/${proposerProfile.username}`);
  }
  if (attendeeProfile?.username) {
    revalidatePath(`/profile/${attendeeProfile.username}`);
  }

  return { success: true };
}

/**
 * Server Action to submit feedback for a completed session.
 * @param {string} sessionId - The ID of the session being rated.
 * @param {string} ratedUserId - The ID of the user being rated.
 * @param {number} rating - The star rating (1-5).
 * @param {string} testimonialContent - The testimonial message.
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export async function submitFeedback(sessionId, ratedUserId, rating, testimonialContent) {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "User not authenticated." };
  }

  const raterId = user.id;

  // --- Application-level validation (as RLS is simplified) ---
  // 1. Check if the session exists and is completed
  const { data: session, error: sessionError } = await supabase
    .from('sessions')
    .select('proposer_id, attendee_id, status')
    .eq('id', sessionId)
    .single();

  if (sessionError || !session) {
    console.error("Error fetching session for feedback:", sessionError);
    return { success: false, error: "Session not found or not accessible." };
  }

  if (session.status !== 'completed') {
    return { success: false, error: "Feedback can only be submitted for completed sessions." };
  }

  // 2. Check if the rater is a participant of this session
  if (raterId !== session.proposer_id && raterId !== session.attendee_id) {
    return { success: false, error: "You are not a participant of this session." };
  }

  // 3. Check if the rated_user_id is the other participant in the session
  const isRaterProposer = raterId === session.proposer_id;
  const expectedRatedUserId = isRaterProposer ? session.attendee_id : session.proposer_id;

  if (ratedUserId !== expectedRatedUserId) {
    return { success: false, error: "Invalid user selected for rating. Please rate the other participant of the session." };
  }

  // 4. Check if this user has already rated this session
  const { data: existingRating, error: existingRatingError } = await supabase
    .from('ratings')
    .select('id')
    .eq('session_id', sessionId)
    .eq('rater_id', raterId)
    .single();

  if (existingRatingError && existingRatingError.code !== 'PGRST116') { // PGRST116 means no rows found
    console.error("Error checking for existing rating:", existingRatingError);
    return { success: false, error: "Failed to check for existing feedback." };
  }
  if (existingRating) {
    return { success: false, error: "You have already submitted feedback for this session." };
  }

  // 5. Validate rating value
  if (rating < 1 || rating > 5) {
    return { success: false, error: "Rating must be between 1 and 5 stars." };
  }

  // Insert the new rating
  const { data, error } = await supabase
    .from('ratings')
    .insert({
      session_id: sessionId,
      rater_id: raterId,
      rated_user_id: ratedUserId,
      rating: rating,
      testimonial_content: testimonialContent,
    })
    .select()
    .single();

  if (error) {
    console.error("Error submitting feedback:", error);
    return { success: false, error: error.message || "Failed to submit feedback." };
  }

  // Revalidate paths that display ratings or are affected by new feedback
  revalidatePath('/dashboard');
  revalidatePath('/my-sessions');
  revalidatePath(`/profile/${ratedUserId}`); // Revalidate the rated user's profile
  revalidatePath('/leaderboard'); // Revalidate leaderboard as ratings affect it

  return { success: true };
}