// // serverActions/search/actions.js
// "use server"; // This marks this file as Server Actions

// import { redirect } from 'next/navigation'; // For server-side redirect

// // This Server Action handles the form submission from the search page
// export async function searchPeersAction(formData) {
//   const searchTerm = formData.get('searchTerm'); // Get the search term from the form data
//   const selectedSkillsJson = formData.get('selectedSkills'); // Get the JSON string from MultiSelect

//   let selectedSkillSlugs = [];
//   if (selectedSkillsJson) {
//     try {
//       const parsedSkills = JSON.parse(selectedSkillsJson);
//       // MultiSelect returns objects like { value: 'slug', label: 'Name' }
//       // We only need the 'value' (slug) for the URL
//       selectedSkillSlugs = parsedSkills.map(skill => skill.value);
//     } catch (e) {
//       console.error("Error parsing selected skills JSON in searchPeersAction:", e);
//       // Handle error, perhaps redirect without skills or show a message
//     }
//   }

//   // Construct the query string
//   const params = new URLSearchParams();
//   if (searchTerm) {
//     params.set('query', searchTerm);
//   }
//   if (selectedSkillSlugs.length > 0) {
//     params.set('skills', selectedSkillSlugs.join(',')); // Join slugs with comma for URL
//   }

//   // Redirect to the search page with the updated query parameters
//   redirect(`/search?${params.toString()}`);
// }



// serverActions/search/actions.js
"use server";

import { redirect } from 'next/navigation';

// This Server Action handles the form submission from the search page
export async function searchPeersAction(formData) {
  const nameKeywordSearch = formData.get('nameKeywordSearch'); // Get name/keyword term
  const skillSearch = formData.get('skillSearch'); // Get skill search term

  // Construct the query string with both parameters
  const params = new URLSearchParams();
  if (nameKeywordSearch) {
    params.set('query', nameKeywordSearch); // Use 'query' for name/keyword
  }
  if (skillSearch) {
    params.set('skills', skillSearch); // Use 'skills' for skill search
  }

  // Redirect to the search page with the updated query parameters
  redirect(`/search?${params.toString()}`);
}