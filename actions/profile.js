// actions/profile.js
"use server"; // This directive marks all functions in this file as Server Actions

import { revalidatePath } from 'next/cache'; // For revalidating data after changes
import { redirect } from 'next/navigation'; // For server-side redirects
import { createServerSupabaseClient } from '@/lib/supabase/server'; // Server-side Supabase client

// Function to fetch a user's profile and their associated skills
export async function getProfileAndSkills() { // No userId parameter needed here, we get it from auth
  const supabase = await createServerSupabaseClient();

  // Get the current authenticated user's ID
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    // If no user, this action shouldn't be called, or redirect to login
    // For profile setup, we expect a user to be logged in.
    // We'll handle unauthenticated access via middleware later.
    console.warn("getProfileAndSkills called without an authenticated user.");
    return { profile: null, skills: [] };
  }

  const userId = user.id;

  // Fetch profile data
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  // PGRST116 means 'no rows found', which is okay for a new user who hasn't set up profile yet
  if (profileError && profileError.code !== 'PGRST116') {
    console.error("Error fetching profile:", profileError);
    return { profile: null, skills: [] };
  }

  // Fetch user's associated skills
  const { data: userSkills, error: userSkillsError } = await supabase
    .from('user_skills')
    .select('skill_id, skills(name, slug)') // Select skill_id and join to get skill name/slug
    .eq('user_id', userId);

  if (userSkillsError) {
    console.error("Error fetching user skills:", userSkillsError);
    return { profile, skills: [] }; // Return profile but no skills if there's an error
  }

  // Format skills for the frontend (MultiSelect expects { value, label })
  const formattedSkills = userSkills.map(us => ({
    value: us.skills.slug, // Use slug as value for MultiSelect
    label: us.skills.name, // Use name as label
  }));

  return { profile, skills: formattedSkills };
}


// Function to save/update a user's profile and their skills
export async function saveProfile(formData) {
  const supabase = await createServerSupabaseClient();

  // Get the current authenticated user's ID
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    // If no user, redirect to login (shouldn't happen if route is protected, but good safeguard)
    redirect('/signin'); // Server-side redirect
  }

  const userId = user.id;

  const fullName = formData.get('fullName');
  const username = formData.get('username');
  const bio = formData.get('bio');
  // const profilePicture = formData.get('profilePicture'); // We'll handle this separately later
  const selectedSkillsJson = formData.get('selectedSkills'); // This comes as a JSON string from MultiSelect

  let selectedSkills = [];
  try {
    selectedSkills = JSON.parse(selectedSkillsJson);
  } catch (e) {
    console.error("Error parsing selected skills JSON:", e);
    return { error: "Invalid skills data provided." };
  }

  console.log("--- saveProfile Server Action Debug ---");
  console.log("Authenticated User ID (auth.uid()):", userId);
  console.log("Username being saved:", username);
  console.log("--- End Debug ---");
  // 1. Save/Update Profile Data
  const { error: profileError } = await supabase
    .from('profiles')
    .upsert(
      {
        id: userId,
        full_name: fullName,
        username: username,
        bio: bio,
        // profile_picture_url: 'placeholder_url', // Placeholder for now
        // updated_at is handled by the database trigger
      },
      { onConflict: 'id' } // If id exists, update; otherwise, insert
    );

  if (profileError) {
    console.error("Error saving profile:", profileError);
    // Check for unique constraint violation on username
    if (profileError.code === '23505' && profileError.details.includes('username')) {
      return { error: "Username already taken. Please choose a different one." };
    }
    return { error: profileError.message };
  }

  // 2. Update User Skills (Transactional approach: delete all, then insert new)

  // First, get all available skills from the database to map slugs to IDs
  const { data: allSkills, error: allSkillsError } = await supabase
    .from('skills')
    .select('id, slug');

  if (allSkillsError) {
    console.error("Error fetching all skills for mapping:", allSkillsError);
    return { error: allSkillsError.message };
  }

  // Create a map from slug to skill ID
  const skillSlugToIdMap = new Map(allSkills.map(skill => [skill.slug, skill.id]));

  // Delete existing user skills
  const { error: deleteSkillsError } = await supabase
    .from('user_skills')
    .delete()
    .eq('user_id', userId);

  if (deleteSkillsError) {
    console.error("Error deleting old user skills:", deleteSkillsError);
    return { error: deleteSkillsError.message };
  }

  // Prepare new user skills for insertion
  const skillsToInsert = selectedSkills.map(skill => ({
    user_id: userId,
    skill_id: skillSlugToIdMap.get(skill.value), // Get the actual skill ID from the slug
  })).filter(item => item.skill_id); // Filter out any skills not found (shouldn't happen with valid slugs)

  if (skillsToInsert.length > 0) {
    const { error: insertSkillsError } = await supabase
      .from('user_skills')
      .insert(skillsToInsert);

    if (insertSkillsError) {
      console.error("Error inserting new user skills:", insertSkillsError);
      return { error: insertSkillsError.message };
    }
  }

  // Revalidate paths to show updated data
  // Note: We don't have the username easily here for /profile/[username]
  // We can revalidate a generic path or rely on client-side navigation to trigger re-fetch.
  revalidatePath('/dashboard');
  revalidatePath('/profile/setup'); // Revalidate the setup page itself for consistent state
  revalidatePath('/search'); // If search results rely on profile data

  return { success: true, username: username }; // Return username for potential client-side redirect
}