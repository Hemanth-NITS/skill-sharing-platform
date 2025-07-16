// // actions/profile.js
// "use server"; // This directive marks all functions in this file as Server Actions

// import { revalidatePath } from 'next/cache'; // For revalidating data after changes
// import { redirect } from 'next/navigation'; // For server-side redirects
// import { createServerSupabaseClient } from '@/lib/supabase/server'; // Server-side Supabase client

// // Function to fetch a user's profile and their associated skills
// export async function getProfileAndSkills() { // No userId parameter needed here, we get it from auth
//   const supabase = await createServerSupabaseClient();

//   // Get the current authenticated user's ID
//   const { data: { user } } = await supabase.auth.getUser();

//   if (!user) {
//     // If no user, this action shouldn't be called, or redirect to login
//     // For profile setup, we expect a user to be logged in.
//     // We'll handle unauthenticated access via middleware later.
//     console.warn("getProfileAndSkills called without an authenticated user.");
//     return { profile: null, skills: [] };
//   }

//   const userId = user.id;

//   // Fetch profile data
//   const { data: profile, error: profileError } = await supabase
//     .from('profiles')
//     .select('*')
//     .eq('id', userId)
//     .single();

//   // PGRST116 means 'no rows found', which is okay for a new user who hasn't set up profile yet
//   if (profileError && profileError.code !== 'PGRST116') {
//     console.error("Error fetching profile:", profileError);
//     return { profile: null, skills: [] };
//   }

//   // Fetch user's associated skills
//   const { data: userSkills, error: userSkillsError } = await supabase
//     .from('user_skills')
//     .select('skill_id, skills(name, slug)') // Select skill_id and join to get skill name/slug
//     .eq('user_id', userId);

//   if (userSkillsError) {
//     console.error("Error fetching user skills:", userSkillsError);
//     return { profile, skills: [] }; // Return profile but no skills if there's an error
//   }

//   // Format skills for the frontend (MultiSelect expects { value, label })
//   const formattedSkills = userSkills.map(us => ({
//     value: us.skills.slug, // Use slug as value for MultiSelect
//     label: us.skills.name, // Use name as label
//   }));

//   return { profile, skills: formattedSkills };
// }


// // Function to save/update a user's profile and their skills
// export async function saveProfile(formData) {
//   const supabase = await createServerSupabaseClient();

//   // Get the current authenticated user's ID
//   const { data: { user } } = await supabase.auth.getUser();

//   if (!user) {
//     // If no user, redirect to login (shouldn't happen if route is protected, but good safeguard)
//     redirect('/signin'); // Server-side redirect
//   }

//   const userId = user.id;

//   const fullName = formData.get('fullName');
//   const username = formData.get('username');
//   const bio = formData.get('bio');
//   // const profilePicture = formData.get('profilePicture'); // We'll handle this separately later
//   const selectedSkillsJson = formData.get('selectedSkills'); // This comes as a JSON string from MultiSelect

//   let selectedSkills = [];
//   try {
//     selectedSkills = JSON.parse(selectedSkillsJson);
//   } catch (e) {
//     console.error("Error parsing selected skills JSON:", e);
//     return { error: "Invalid skills data provided." };
//   }

//   console.log("--- saveProfile Server Action Debug ---");
//   console.log("Authenticated User ID (auth.uid()):", userId);
//   console.log("Username being saved:", username);
//   console.log("--- End Debug ---");
//   // 1. Save/Update Profile Data
//   const { error: profileError } = await supabase
//     .from('profiles')
//     .upsert(
//       {
//         id: userId,
//         full_name: fullName,
//         username: username,
//         bio: bio,
//         // profile_picture_url: 'placeholder_url', // Placeholder for now
//         // updated_at is handled by the database trigger
//       },
//       { onConflict: 'id' } // If id exists, update; otherwise, insert
//     );

//   if (profileError) {
//     console.error("Error saving profile:", profileError);
//     // Check for unique constraint violation on username
//     if (profileError.code === '23505' && profileError.details.includes('username')) {
//       return { error: "Username already taken. Please choose a different one." };
//     }
//     return { error: profileError.message };
//   }

//   // 2. Update User Skills (Transactional approach: delete all, then insert new)

//   // First, get all available skills from the database to map slugs to IDs
//   const { data: allSkills, error: allSkillsError } = await supabase
//     .from('skills')
//     .select('id, slug');

//   if (allSkillsError) {
//     console.error("Error fetching all skills for mapping:", allSkillsError);
//     return { error: allSkillsError.message };
//   }

//   // Create a map from slug to skill ID
//   const skillSlugToIdMap = new Map(allSkills.map(skill => [skill.slug, skill.id]));

//   // Delete existing user skills
//   const { error: deleteSkillsError } = await supabase
//     .from('user_skills')
//     .delete()
//     .eq('user_id', userId);

//   if (deleteSkillsError) {
//     console.error("Error deleting old user skills:", deleteSkillsError);
//     return { error: deleteSkillsError.message };
//   }

//   // Prepare new user skills for insertion
//   const skillsToInsert = selectedSkills.map(skill => ({
//     user_id: userId,
//     skill_id: skillSlugToIdMap.get(skill.value), // Get the actual skill ID from the slug
//   })).filter(item => item.skill_id); // Filter out any skills not found (shouldn't happen with valid slugs)

//   if (skillsToInsert.length > 0) {
//     const { error: insertSkillsError } = await supabase
//       .from('user_skills')
//       .insert(skillsToInsert);

//     if (insertSkillsError) {
//       console.error("Error inserting new user skills:", insertSkillsError);
//       return { error: insertSkillsError.message };
//     }
//   }

//   // Revalidate paths to show updated data
//   // Note: We don't have the username easily here for /profile/[username]
//   // We can revalidate a generic path or rely on client-side navigation to trigger re-fetch.
//   revalidatePath('/dashboard');
//   revalidatePath('/profile/setup'); // Revalidate the setup page itself for consistent state
//   revalidatePath('/search'); // If search results rely on profile data

//   return { success: true, username: username }; // Return username for potential client-side redirect
// }




// export async function searchProfiles(searchQuery = '', selectedSkills = []) {
//   const supabase = await createServerSupabaseClient();

//   let query = supabase
//     .from('profiles')
//     .select('id, full_name, username, bio, profile_picture_url, user_skills(skills(name, slug))');

//   // Filter by search query (case-insensitive on full_name or username or bio)
//   if (searchQuery) {
//     const searchLower = `%${searchQuery.toLowerCase()}%`;
//     query = query.or(`full_name.ilike.${searchLower},username.ilike.${searchLower},bio.ilike.${searchLower}`);
//   }

//   // Filter by selected skills (this requires a more complex query with joins)
//   // For simplicity, we'll fetch all and filter in memory for now if multiple skills are selected.
//   // A proper SQL query for multiple skills would involve `has` or `contains` operators on arrays,
//   // or a subquery on the join table. Let's start simple.

//   const { data: profiles, error } = await query;

//   if (error) {
//     console.error("Error searching profiles:", error);
//     return { profiles: [], error: error.message };
//   }

//   // If multiple skills are selected, filter in memory for now
//   // (This can be optimized with more advanced Supabase/PostgreSQL queries later)
//   let filteredBySkills = profiles;
//   if (selectedSkills && selectedSkills.length > 0) {
//     filteredBySkills = profiles.filter(profile => {
//       const profileSkillSlugs = profile.user_skills.map(us => us.skills.slug);
//       return selectedSkills.every(selectedSlug => profileSkillSlugs.includes(selectedSlug));
//     });
//   }

//   return { profiles: filteredBySkills, error: null };
// }




// // actions/profile.js
// "use server"; // This directive marks all functions in this file as Server Actions

// import { revalidatePath } from 'next/cache'; // For revalidating data after changes
// import { redirect } from 'next/navigation'; // For server-side redirects
// import { createServerSupabaseClient } from '@/lib/supabase/server'; // Server-side Supabase client

// // Function to fetch a user's profile and their associated skills
// export async function getProfileAndSkills() {
//   const supabase = await createServerSupabaseClient();

//   const { data: { user } } = await supabase.auth.getUser();

//   if (!user) {
//     console.warn("getProfileAndSkills called without an authenticated user.");
//     return { profile: null, skills: [] };
//   }

//   const userId = user.id;

//   const { data: profile, error: profileError } = await supabase
//     .from('profiles')
//     .select('*')
//     .eq('id', userId)
//     .single();

//   if (profileError && profileError.code !== 'PGRST116') { // PGRST116 means 'no rows found', which is okay for new users
//     console.error("Error fetching profile:", profileError);
//     return { profile: null, skills: [] };
//   }

//   // Fetch user's associated skills
//   // We need to fetch the skill_id and then join to get the name and slug
//   const { data: userSkills, error: userSkillsError } = await supabase
//     .from('user_skills')
//     .select('skill_id, skills(name, slug)') // Select skill_id and join to get skill name/slug
//     .eq('user_id', userId);

//   if (userSkillsError) {
//     console.error("Error fetching user skills:", userSkillsError);
//     return { profile, skills: [] };
//   }

//   // Format skills for the frontend (MultiSelect expects { value, label })
//   // And the ProfileSetupForm's state expects this format too.
//   const formattedSkills = userSkills.map(us => ({
//     value: us.skills.slug, // Use slug as value for MultiSelect
//     label: us.skills.name, // Use name as label
//   }));

//   return { profile, skills: formattedSkills };
// }


// // Function to save/update a user's profile and their skills
// export async function saveProfile(formData) {
//   const supabase = await createServerSupabaseClient();

//   const { data: { user } } = await supabase.auth.getUser();

//   if (!user) {
//     redirect('/signin');
//   }

//   const userId = user.id;

//   const fullName = formData.get('fullName');
//   const username = formData.get('username');
//   const bio = formData.get('bio');
//   const selectedSkillsJson = formData.get('selectedSkills'); // This comes as a JSON string from MultiSelect

//   let selectedSkills = [];
//   try {
//     // Parse the JSON string back into an array of { value, label } objects
//     selectedSkills = JSON.parse(selectedSkillsJson);
//   } catch (e) {
//     console.error("Error parsing selected skills JSON:", e);
//     return { error: "Invalid skills data provided." };
//   }

//   console.log("--- saveProfile Server Action Debug ---");
//   console.log("Authenticated User ID (auth.uid()):", userId);
//   console.log("Username being saved:", username);
//   console.log("Selected Skills (parsed):", selectedSkills); // Debug: check what skills are being sent
//   console.log("--- End Debug ---");

//   // 1. Save/Update Profile Data
//   const { error: profileError } = await supabase
//     .from('profiles')
//     .upsert(
//       {
//         id: userId,
//         full_name: fullName,
//         username: username,
//         bio: bio,
//         // profile_picture_url: 'placeholder_url', // Placeholder for now
//         // updated_at is handled by the database trigger
//       },
//       { onConflict: 'id' } // If id exists, update; otherwise, insert
//     );

//   if (profileError) {
//     console.error("Error saving profile:", profileError);
//     if (profileError.code === '23505' && profileError.details.includes('username')) {
//       return { error: "Username already taken. Please choose a different one." };
//     }
//     return { error: profileError.message };
//   }

//   // 2. Update User Skills (Transactional approach: delete all, then insert new)

//   // First, get all available skills from the database to map slugs to IDs
//   const { data: allSkills, error: allSkillsError } = await supabase
//     .from('skills')
//     .select('id, slug');

//   if (allSkillsError) {
//     console.error("Error fetching all skills for mapping:", allSkillsError);
//     return { error: allSkillsError.message };
//   }

//   // Create a map from slug to skill ID for efficient lookup
//   const skillSlugToIdMap = new Map(allSkills.map(skill => [skill.slug, skill.id]));

//   // Delete existing user skills for this user
//   const { error: deleteSkillsError } = await supabase
//     .from('user_skills')
//     .delete()
//     .eq('user_id', userId);

//   if (deleteSkillsError) {
//     console.error("Error deleting old user skills:", deleteSkillsError);
//     return { error: deleteSkillsError.message };
//   }

//   // Prepare new user skills for insertion
//   // Map the selected skill objects ({value: slug, label: name}) to { user_id, skill_id }
//   const skillsToInsert = selectedSkills.map(skill => ({
//     user_id: userId,
//     skill_id: skillSlugToIdMap.get(skill.value), // Get the actual skill ID from the slug
//   })).filter(item => item.skill_id); // Filter out any skills whose slug wasn't found (shouldn't happen with valid slugs)

//   if (skillsToInsert.length > 0) {
//     const { error: insertSkillsError } = await supabase
//       .from('user_skills')
//       .insert(skillsToInsert);

//     if (insertSkillsError) {
//       console.error("Error inserting new user skills:", insertSkillsError);
//       return { error: insertSkillsError.message };
//     }
//   }

//   // Revalidate paths to show updated data
//   revalidatePath('/dashboard');
//   revalidatePath('/profile/setup');
//   revalidatePath('/search'); // Revalidate search if it shows updated profiles

//   return { success: true, username: username }; // Return username for potential client-side redirect
// }


// // // Function to search profiles (UPDATED for skill filtering using subquery)
// // export async function searchProfiles(searchQuery = '', selectedSkillSlugs = []) {
// //   const supabase = await createServerSupabaseClient();

// //   let query = supabase
// //     .from('profiles')
// //     .select('id, full_name, username, bio, profile_picture_url, user_skills(skills(name, slug))');

// //   // Filter by search query (case-insensitive on full_name or username or bio)
// //   if (searchQuery) {
// //     const searchLower = `%${searchQuery.toLowerCase()}%`;
// //     query = query.or(`full_name.ilike.${searchLower},username.ilike.${searchLower},bio.ilike.${searchLower}`);
// //   }

// //   // Filter by selected skills using a subquery to find matching user_ids
// //   if (selectedSkillSlugs && selectedSkillSlugs.length > 0) {
// //     // First, get the actual skill_ids from the slugs
// //     const { data: skillIds, error: skillIdError } = await supabase
// //       .from('skills')
// //       .select('id')
// //       .in('slug', selectedSkillSlugs);

// //     if (skillIdError) {
// //       console.error("Error fetching skill IDs for search:", skillIdError);
// //       return { profiles: [], error: skillIdError.message };
// //     }

// //     const numericSkillIds = skillIds.map(s => s.id);

// //     if (numericSkillIds.length === 0) {
// //       // If no matching skill IDs found for the provided slugs, return empty profiles
// //       return { profiles: [], error: null };
// //     }

// //     // Now, find user_ids that have any of these skill_ids
// //     const { data: userIdsWithSkills, error: subqueryError } = await supabase
// //       .from('user_skills')
// //       .select('user_id')
// //       .in('skill_id', numericSkillIds);

// //     if (subqueryError) {
// //       console.error("Subquery error fetching user IDs by skill:", subqueryError);
// //       return { profiles: [], error: subqueryError.message };
// //     }

// //     const uniqueUserIds = [...new Set(userIdsWithSkills.map(item => item.user_id))];

// //     if (uniqueUserIds.length === 0) {
// //       // If no users have the selected skills, return empty profiles
// //       return { profiles: [], error: null };
// //     }

// //     // Filter the main profiles query by the user IDs found in the subquery
// //     query = query.in('id', uniqueUserIds);
// //   }

// //   const { data: profiles, error } = await query;

// //   if (error) {
// //     console.error("Error searching profiles:", error);
// //     return { profiles: [], error: error.message };
// //   }
  
// //   return { profiles: profiles, error: null };
// // }



// // export async function searchProfiles(nameKeywordQuery = '', skillSearchQuery = '') {
// //   const supabase = await createServerSupabaseClient();

// //   let query = supabase
// //     .from('profiles')
// //     .select('id, full_name, username, bio, profile_picture_url, user_skills(skills(name, slug))');

// //   const conditions = [];
// //   const searchLower = `%${(nameKeywordQuery || '').toLowerCase()}%`;
// //   const skillSearchLower = `%${(skillSearchQuery || '').toLowerCase()}%`;

// //   // Condition 1: Search by name, username, or bio
// //   if (nameKeywordQuery) {
// //     conditions.push(`full_name.ilike.${searchLower}`);
// //     conditions.push(`username.ilike.${searchLower}`);
// //     conditions.push(`bio.ilike.${searchLower}`);
// //   }

// //   // Condition 2: Search by skill name (requires finding user_ids with matching skills)
// //   if (skillSearchQuery) {
// //     const { data: matchingSkillUserIds, error: skillSearchError } = await supabase
// //       .from('user_skills')
// //       .select('user_id')
// //       .ilike('skills.name', skillSearchLower); // Search skill name directly

// //     if (skillSearchError) {
// //       console.error("Error searching skills for profiles:", skillSearchError);
// //       // If there's an error, we won't add skill conditions, but won't fail the whole query
// //     } else if (matchingSkillUserIds && matchingSkillUserIds.length > 0) {
// //       const uniqueUserIdsFromSkills = [...new Set(matchingSkillUserIds.map(item => item.user_id))];
// //       conditions.push(`id.in.(${uniqueUserIdsFromSkills.join(',')})`);
// //     } else {
// //       // If a skill search query is present but yields no results,
// //       // and no other conditions are met, we should return an empty set.
// //       // This is implicitly handled if `conditions` remains empty or if no profiles match.
// //     }
// //   }

// //   // Apply combined OR conditions if any exist
// //   if (conditions.length > 0) {
// //     query = query.or(conditions.join(','));
// //   } else if (nameKeywordQuery === '' && skillSearchQuery === '') {
// //     // If both search fields are empty, return all profiles (or a default set)
// //     // No additional filtering needed here, `query` is already set to select all.
// //   } else {
// //     // If there were search terms but no conditions could be built (e.g., skill search found nothing)
// //     // then we should effectively return no results.
// //     // We can do this by adding a condition that will always be false.
// //     query = query.eq('id', '00000000-0000-0000-0000-000000000000'); // A UUID that will never match
// //   }


// //   const { data: profiles, error } = await query;

// //   if (error) {
// //     console.error("Error searching profiles:", error);
// //     return { profiles: [], error: error.message };
// //   }
  
// //   return { profiles: profiles, error: null };
// // }



// export async function searchProfiles(nameKeywordQuery = '', skillSearchQuery = '') {
//   const supabase = await createServerSupabaseClient();

//   // Start with a base query selecting profiles and their skills
//   let query = supabase
//     .from('profiles')
//     .select('id, full_name, username, bio, profile_picture_url, user_skills(skills(name, slug))');

//   const conditions = [];
//   const searchLower = `%${(nameKeywordQuery || '').toLowerCase()}%`;
//   const skillSearchLower = `%${(skillSearchQuery || '').toLowerCase()}%`;

//   // Build conditions for name/keyword search
//   if (nameKeywordQuery) {
//     conditions.push(`full_name.ilike.${searchLower}`);
//     conditions.push(`username.ilike.${searchLower}`);
//     conditions.push(`bio.ilike.${searchLower}`);
//   }

//   // Build conditions for skill search
//   if (skillSearchQuery) {
//     // Step 1: Find skill IDs that match the skill search query
//     const { data: matchingSkills, error: skillLookupError } = await supabase
//       .from('skills')
//       .select('id')
//       .ilike('name', skillSearchLower);

//     if (skillLookupError) {
//       console.error("Error looking up skills by name:", skillLookupError);
//       // Don't add skill conditions if there's an error
//     } else if (matchingSkills && matchingSkills.length > 0) {
//       const matchingSkillIds = matchingSkills.map(skill => skill.id);

//       // Step 2: Find user_ids that have any of these matching skill IDs
//       const { data: userIdsWithSkills, error: userSkillsLookupError } = await supabase
//         .from('user_skills')
//         .select('user_id')
//         .in('skill_id', matchingSkillIds); // Correct: Pass array of skill_ids

//       if (userSkillsLookupError) {
//         console.error("Error looking up user_ids with matching skills:", userSkillsLookupError);
//         // Don't add skill conditions if there's an error
//       } else if (userIdsWithSkills && userIdsWithSkills.length > 0) {
//         const uniqueUserIdsFromSkills = [...new Set(userIdsWithSkills.map(item => item.user_id))];
        
//         // Step 3: Add a condition to the main query to filter by these user IDs
//         // This is where the previous error was. We need to add this as a separate filter
//         // or ensure it's part of a correctly formed .or() string.
        
//         // If we have user IDs from skill search, add a condition for them.
//         // The .in() operator expects an array.
//         // We'll add this as a string condition to be joined by .or()
//         // The format for .or() is 'column.operator.value,column.operator.value'
//         // For .in(), it's 'column.in.(value1,value2)' as a string.
//         // So, we need to format the UUID array into a comma-separated string for the .in() part.
        
//         // Example: `id.in.("uuid1","uuid2")`
//         const inConditionString = `id.in.("${uniqueUserIdsFromSkills.join('","')}")`;
//         conditions.push(inConditionString);

//       } else {
//         // If skill search query is present but no users have those skills,
//         // and no other conditions are met, we should implicitly return no results.
//         // This is handled by the final `if (conditions.length > 0)` block.
//       }
//     } else {
//       // If a skill search query is present but no skills match that name,
//       // and no other conditions are met, we should implicitly return no results.
//     }
//   }

//   // Apply combined OR conditions if any exist
//   if (conditions.length > 0) {
//     query = query.or(conditions.join(',')); // Join all conditions with OR
//   } else if (nameKeywordQuery === '' && skillSearchQuery === '') {
//     // If both search fields are empty, return all profiles (no additional filter needed)
//     // The initial `query` already selects all profiles.
//   } else {
//     // This else block handles cases where search terms exist but no valid conditions were generated
//     // (e.g., skill search term but no matching skills found, and no name/keyword query).
//     // In this case, we want to return an empty result.
//     query = query.eq('id', '00000000-0000-0000-0000-000000000000'); // Guaranteed no match
//   }

//   const { data: profiles, error } = await query;

//   if (error) {
//     console.error("Error searching profiles (main query):", error); // Clarified error message
//     return { profiles: [], error: error.message || "An unknown error occurred during search." };
//   }

//   return { profiles: profiles, error: null };
// }


// actions/profile.js
"use server";

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/supabase/server';

// Function to fetch a user's profile and their associated skills
export async function getProfileAndSkills() {
  const supabase = await createServerSupabaseClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    console.warn("getProfileAndSkills called without an authenticated user.");
    return { profile: null, skills: [] };
  }

  const userId = user.id;

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (profileError && profileError.code !== 'PGRST116') {
    console.error("Error fetching profile:", profileError);
    return { profile: null, skills: [] };
  }

  const { data: userSkills, error: userSkillsError } = await supabase
    .from('user_skills')
    .select('skill_id, skills(name, slug)')
    .eq('user_id', userId);

  if (userSkillsError) {
    console.error("Error fetching user skills:", userSkillsError);
    return { profile, skills: [] };
  }

  const formattedSkills = userSkills.map(us => ({
    value: us.skills.slug,
    label: us.skills.name,
  }));

  return { profile, skills: formattedSkills };
}


// UPDATED: Function to save/update a user's profile and their skills, including profile picture
export async function saveProfile(formData) {
  const supabase = await createServerSupabaseClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/signin');
  }

  const userId = user.id;

  const fullName = formData.get('fullName');
  const username = formData.get('username');
  const bio = formData.get('bio');
  const profilePictureFile = formData.get('profilePicture'); // Get the file from FormData
  const selectedSkillsJson = formData.get('selectedSkills');

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
  console.log("Selected Skills (parsed):", selectedSkills);
  console.log("Profile Picture File:", profilePictureFile ? profilePictureFile.name : 'No file');
  console.log("--- End Debug ---");

  let profilePictureUrl = formData.get('currentProfilePictureUrl') || null; // Get existing URL if available

  // Handle profile picture upload if a new file is provided
  if (profilePictureFile && profilePictureFile.size > 0) {
    const fileExtension = profilePictureFile.name.split('.').pop();
    const filePath = `${userId}/profile.${fileExtension}`; // Path: user_id/profile.jpg
    const BUCKET_NAME = 'profilepictures'; // Correct bucket name

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, profilePictureFile, {
        upsert: true, // Overwrite if file exists
      });

    if (uploadError) {
      console.error("Error uploading profile picture:", uploadError);
      return { error: `Error uploading profile picture: ${uploadError.message}` };
    }

    // Get the public URL of the uploaded file
    const { data: publicUrlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(filePath);

    if (publicUrlData && publicUrlData.publicUrl) {
      profilePictureUrl = publicUrlData.publicUrl;
    } else {
      console.error("Failed to get public URL for profile picture.");
      return { error: "Failed to get public URL for profile picture." };
    }
  }

  // 1. Save/Update Profile Data
  const { error: profileError } = await supabase
    .from('profiles')
    .upsert(
      {
        id: userId,
        full_name: fullName,
        username: username,
        bio: bio,
        profile_picture_url: profilePictureUrl, // Save the URL
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'id' }
    );

  if (profileError) {
    console.error("Error saving profile:", profileError);
    if (profileError.code === '23505' && profileError.details.includes('username')) {
      return { error: "Username already taken. Please choose a different one." };
    }
    return { error: profileError.message };
  }

  // 2. Update User Skills (Transactional approach: delete all, then insert new)
  const { data: allSkills, error: allSkillsError } = await supabase
    .from('skills')
    .select('id, slug');

  if (allSkillsError) {
    console.error("Error fetching all skills for mapping:", allSkillsError);
    return { error: allSkillsError.message };
  }

  const skillSlugToIdMap = new Map(allSkills.map(skill => [skill.slug, skill.id]));

  const { error: deleteSkillsError } = await supabase
    .from('user_skills')
    .delete()
    .eq('user_id', userId);

  if (deleteSkillsError) {
    console.error("Error deleting old user skills:", deleteSkillsError);
    return { error: deleteSkillsError.message };
  }

  const skillsToInsert = selectedSkills.map(skill => ({
    user_id: userId,
    skill_id: skillSlugToIdMap.get(skill.value),
  })).filter(item => item.skill_id);

  if (skillsToInsert.length > 0) {
    const { error: insertSkillsError } = await supabase
      .from('user_skills')
      .insert(skillsToInsert);

    if (insertSkillsError) {
      console.error("Error inserting new user skills:", insertSkillsError);
      return { error: insertSkillsError.message };
    }
  }

  revalidatePath('/dashboard');
  revalidatePath('/profile/setup');
  revalidatePath('/search');
  revalidatePath(`/profile/${username}`); // Revalidate the specific profile page

  return { success: true, username: username };
}


// Function to search profiles
export async function searchProfiles(nameKeywordQuery = '', skillSearchQuery = '') {
  const supabase = await createServerSupabaseClient();

  let query = supabase
    .from('profiles')
    .select('id, full_name, username, bio, profile_picture_url, user_skills(skills(name, slug))');

  const conditions = [];
  const searchLower = `%${(nameKeywordQuery || '').toLowerCase()}%`;
  const skillSearchLower = `%${(skillSearchQuery || '').toLowerCase()}%`;

  if (nameKeywordQuery) {
    conditions.push(`full_name.ilike.${searchLower}`);
    conditions.push(`username.ilike.${searchLower}`);
    conditions.push(`bio.ilike.${searchLower}`);
  }

  if (skillSearchQuery) {
    const { data: matchingSkills, error: skillLookupError } = await supabase
      .from('skills')
      .select('id')
      .ilike('name', skillSearchLower);

    if (skillLookupError) {
      console.error("Error looking up skills by name:", skillLookupError);
    } else if (matchingSkills && matchingSkills.length > 0) {
      const matchingSkillIds = matchingSkills.map(skill => skill.id);

      const { data: userIdsWithSkills, error: userSkillsLookupError } = await supabase
        .from('user_skills')
        .select('user_id')
        .in('skill_id', matchingSkillIds);

      if (userSkillsLookupError) {
        console.error("Error looking up user_ids with matching skills:", userSkillsLookupError);
      } else if (userIdsWithSkills && userIdsWithSkills.length > 0) {
        const uniqueUserIdsFromSkills = [...new Set(userIdsWithSkills.map(item => item.user_id))];
        const inConditionString = `id.in.("${uniqueUserIdsFromSkills.join('","')}")`;
        conditions.push(inConditionString);
      }
    }
  }

  if (conditions.length > 0) {
    query = query.or(conditions.join(','));
  } else if (nameKeywordQuery === '' && skillSearchQuery === '') {
    // No additional filter needed, `query` already selects all.
  } else {
    query = query.eq('id', '00000000-0000-0000-0000-000000000000');
  }

  const { data: profiles, error } = await query;

  if (error) {
    console.error("Error searching profiles (main query):", error);
    return { profiles: [], error: error.message || "An unknown error occurred during search." };
  }

  return { profiles: profiles, error: null };
}