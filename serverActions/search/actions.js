// app/search/actions.js
"use server"; // Marks this file as a Server Action file

import { redirect } from 'next/navigation'; // Import the redirect function

export async function searchPeersAction(formData) { // Renamed to searchPeersAction for clarity
  const searchTerm = formData.get('searchTerm')?.toString().toLowerCase() || '';

  // No need for dummy delay or filtering here anymore.
  // The action's job is to get the term and redirect.

  // Redirect to the search page with the search term as a query parameter
  // encodeURIComponent is important to handle spaces and special characters
  redirect(`/search?searchTerm=${searchTerm}`);
}