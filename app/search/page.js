// // app/search/page.jsx
// // No "use client"; here, making it a Server Component by default

// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Star } from "lucide-react";
// import { SubmitButton } from "@/components/little/SubmitButton";
// import { searchPeersAction } from "@/serverActions/search/actions"; // <-- UPDATED: Import the Server Action with new name
// import { ScrollArea } from "@/components/ui/scroll-area";

// // Dummy data (moved here so the Server Component can directly access it)
// const dummyPeers = [
//   {
//     id: "1",
//     name: "Alice Johnson",
//     headline: "Experienced React Developer & Mentor",
//     skills: ["React", "JavaScript", "Node.js", "Mentoring", "Frontend"],
//     rating: 4.8,
//     profilePic: "https://api.dicebear.com/7.x/lorelei/svg?seed=Alice",
//   },
//   {
//     id: "2",
//     name: "Bob Smith",
//     headline: "Python Enthusiast & Data Science Tutor",
//     skills: ["Python", "Data Science", "Machine Learning", "SQL"],
//     rating: 4.5,
//     profilePic: "https://api.dicebear.com/7.x/lorelei/svg?seed=Bob",
//   },
//   {
//     id: "3",
//     name: "Charlie Brown",
//     headline: "UI/UX Designer & Figma Expert",
//     skills: ["UI/UX Design", "Figma", "Sketch", "Prototyping", "User Research"],
//     rating: 4.9,
//     profilePic: "https://api.dicebear.com/7.x/lorelei/svg?seed=Charlie",
//   },
//   {
//     id: "4",
//     name: "Diana Prince",
//     headline: "Backend Developer & Database Administrator",
//     skills: ["Java", "Spring Boot", "PostgreSQL", "Docker"],
//     rating: 4.6,
//     profilePic: "https://api.dicebear.com/7.x/lorelei/svg?seed=Diana",
//   },
//   {
//     id: "5",
//     name: "Eve Adams",
//     headline: "Graphic Designer & Photoshop Master",
//     skills: ["Graphic Design", "Photoshop", "Illustrator", "Branding"],
//     rating: 4.7,
//     profilePic: "https://api.dicebear.com/7.x/lorelei/svg?seed=Eve",
//   },
//   {
//     id: "6",
//     name: "Frank White",
//     headline: "Full-stack Developer & Cybersecurity",
//     skills: ["JavaScript", "Node.js", "React", "Cybersecurity", "Express"],
//     rating: 4.4,
//     profilePic: "https://api.dicebear.com/7.x/lorelei/svg?seed=Frank",
//   },
//   {
//     id: "7",
//     name: "Grace Lee",
//     headline: "Mobile App Developer (iOS/Android)",
//     skills: ["Swift", "Kotlin", "React Native", "Mobile Development"],
//     rating: 4.9,
//     profilePic: "https://api.dicebear.com/7.x/lorelei/svg?seed=Grace",
//   },
// ];

// export default async function SearchPage({
//   searchParams, // Next.js automatically provides searchParams
// }) {
//   const currentSearchTerm =
//     searchParams?.searchTerm?.toString().toLowerCase() || ""; // Safely get and convert

//   let searchResults = [];

//   if (currentSearchTerm) {
//     // Perform filtering directly within the Server Component's render
//     // This makes the component fully responsible for displaying results based on its props (searchParams)
//     searchResults = dummyPeers.filter(
//       (peer) =>
//         peer.name.toLowerCase().includes(currentSearchTerm) ||
//         peer.headline.toLowerCase().includes(currentSearchTerm) ||
//         peer.skills.some((skill) =>
//           skill.toLowerCase().includes(currentSearchTerm)
//         )
//     );
//   }

//   return (
//     <div className="container mx-auto py-8">
//       <h1 className="text-4xl font-bold text-gray-900 mb-6">Find Your Peers</h1>

//       {/* Form action now points to the redirecting server action */}
//       <form
//         action={searchPeersAction}
//         className="flex w-full max-w-xl items-center space-x-2 mb-8"
//       >
//         <Input
//           type="text"
//           placeholder="Search for skills (e.g., React, Python) or names..."
//           name="searchTerm"
//           defaultValue={currentSearchTerm} // Set initial value from URL param
//           className="flex-1"
//         />
//         <SubmitButton>Search</SubmitButton>
//       </form>

//       {/* Filters/Options (Placeholder) - remains the same */}
//       <div className="mb-8">
//         <h2 className="text-2xl font-semibold text-gray-800 mb-4">
//           Filters (Coming Soon)
//         </h2>
//         <div className="flex space-x-4">
//           <Button variant="outline" disabled>
//             By Rating
//           </Button>
//           <Button variant="outline" disabled>
//             By Availability
//           </Button>
//           <Button variant="outline" disabled>
//             By Location
//           </Button>
//         </div>
//       </div>

//       {/* Search Results Display - remains the same */}
//       <div>
//         <h2 className="text-2xl font-semibold text-gray-800 mb-4">Results</h2>
//         {searchResults.length === 0 && currentSearchTerm === "" && (
//           <p className="text-gray-600">
//             Start by typing in a skill or name and hit Search!
//           </p>
//         )}
//         {searchResults.length === 0 && currentSearchTerm !== "" && (
//           <p className="text-gray-600">
//             No peers found for "{currentSearchTerm}". Try a different search
//             term.
//           </p>
//         )}
//         {searchResults.length > 0 && (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {searchResults.map((peer) => (
//               <Card
//                 key={peer.id}
//                 className="hover:shadow-lg transition-shadow duration-200"
//               >
//                 <CardHeader className="flex flex-row items-center space-x-4 pb-2">
//                   <Avatar className="h-16 w-16">
//                     <AvatarImage
//                       src={peer.profilePic}
//                       alt={`${peer.name}'s profile`}
//                     />
//                     <AvatarFallback>{peer.name.charAt(0)}</AvatarFallback>
//                   </Avatar>
//                   <div>
//                     <CardTitle className="text-xl">{peer.name}</CardTitle>
//                     <CardDescription>{peer.headline}</CardDescription>
//                   </div>
//                 </CardHeader>
//                 <CardContent className="pt-2">
//                   <div className="flex items-center text-sm text-gray-600 mb-2">
//                     <Star className="h-4 w-4 text-yellow-500 mr-1 fill-current" />
//                     <span>{peer.rating.toFixed(1)}</span>
//                   </div>
//                   <div className="flex flex-wrap gap-2">
//                     {peer.skills.map((skill) => (
//                       <span
//                         key={skill}
//                         className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full"
//                       >
//                         {skill}
//                       </span>
//                     ))}
//                   </div>
//                   <Button className="mt-4 w-full">View Profile</Button>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }



// app/search/page.jsx
// This is a Server Component

// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import Link from "next/link";
// import { SearchIcon, Star } from 'lucide-react';
// import { Label } from "@/components/ui/label";
// // NEW: Import the server-side Supabase client
// import { createServerSupabaseClient } from '@/lib/supabase/server';

// // NEW: Import the Server Action for search (we'll define this below)
// import { searchProfiles } from '@/actions/profile'; // Reusing actions/profile.js for this

// export default async function SearchPage({ searchParams }) {
//   // Get the search query from URL parameters
//   const searchQuery = searchParams.query || '';
//   const selectedSkills = searchParams.skills ? searchParams.skills.split(',') : [];

//   // Fetch profiles using the Server Action
//   // The searchProfiles action will handle the filtering based on searchQuery and selectedSkills
//   const { profiles: filteredProfiles, error } = await searchProfiles(searchQuery, selectedSkills);

//   if (error) {
//     console.error("Error fetching profiles for search:", error);
//     return (
//       <div className="container mx-auto py-8 text-center">
//         <h1 className="text-3xl font-bold text-red-600 mb-4">Error Loading Search Results</h1>
//         <p className="text-gray-600">An error occurred while trying to fetch profiles. Please try again later.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto py-8">
//       <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">Find Your Peer</h1>

//       <div className="bg-white p-6 rounded-lg shadow-md mb-8">
//         <form className="flex flex-col md:flex-row gap-4 items-end" action={searchProfiles}>
//           <div className="flex-1 w-full">
//             <Label htmlFor="query" className="sr-only">Search by name or keyword</Label>
//             <Input
//               id="query"
//               name="query" // Important for Server Actions to get the value
//               type="text"
//               placeholder="Search by name, skill, or keyword..."
//               defaultValue={searchQuery} // Pre-fill with current search query
//               className="w-full"
//             />
//           </div>
//           {/* We'll add a MultiSelect for skills filtering here later if needed */}
//           {/* For now, we'll keep it simple with text search */}
//           <Button type="submit" className="w-full md:w-auto bg-fuchsia-600 hover:bg-fuchsia-700 text-white">
//             <SearchIcon className="h-5 w-5 mr-2" /> Search
//           </Button>
//         </form>
//       </div>

//       {filteredProfiles.length === 0 ? (
//         <div className="text-center py-12">
//           <p className="text-xl text-gray-600">No profiles found matching your search criteria.</p>
//           <p className="text-gray-500 mt-2">Try a different name or skill.</p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredProfiles.map((user) => (
//             <Card key={user.id} className="flex flex-col items-center text-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
//               <Avatar className="h-24 w-24 mb-4 border-2 border-fuchsia-500">
//                 <AvatarImage src={user.profile_picture_url || `https://api.dicebear.com/7.x/lorelei/svg?seed=${user.username}`} alt={`${user.full_name}'s profile`} />
//                 <AvatarFallback>{user.full_name?.charAt(0) || user.username?.charAt(0) || 'U'}</AvatarFallback>
//               </Avatar>
//               <CardTitle className="text-2xl font-bold text-gray-900 mb-1">{user.full_name}</CardTitle>
//               <CardDescription className="text-lg text-gray-700 mb-3">@{user.username}</CardDescription>
//               <p className="text-gray-600 text-sm mb-4 line-clamp-2">{user.bio}</p>
//               <div className="flex items-center text-lg text-gray-600 mb-4">
//                 <Star className="h-5 w-5 text-yellow-500 mr-1 fill-current" />
//                 {/* Placeholder for rating and sessions */}
//                 <span>0.0 Average Rating (0 sessions)</span>
//               </div>
//               <div className="flex flex-wrap justify-center gap-2 mb-4">
//                 {user.user_skills.map(us => (
//                   <Badge key={us.skills.slug} variant="default" className="bg-blue-600 text-white">
//                     {us.skills.name}
//                   </Badge>
//                 ))}
//               </div>
//               <Link href={`/profile/${user.username}`} className="w-full">
//                 <Button className="w-full bg-fuchsia-600 hover:bg-fuchsia-700 text-white">View Profile</Button>
//               </Link>
//             </Card>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }



















// // app/search/page.jsx
// // This is a Server Component, no "use client"

// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge"; // Keep Badge for skills
// import Link from "next/link";
// import { Star } from "lucide-react";
// import { Label } from "@/components/ui/label"; // Make sure Label is imported

// // NEW: Import the MultiSelect component
// import MultiSelect from "@/components/little/MultiSelect"; // Adjust path if needed, assuming it's here now

// // NEW: Import the SubmitButton
// import { SubmitButton } from "@/components/little/SubmitButton";
// // NEW: Import the searchPeersAction
// import { searchPeersAction } from "@/serverActions/search/actions";
// // Import the actual search logic from actions/profile
// import { searchProfiles } from '@/actions/profile';
// // Import server-side Supabase client to fetch all skills
// import { createServerSupabaseClient } from '@/lib/supabase/server';


// export default async function SearchPage({ searchParams }) {
//   // Get the search query and selected skills from URL parameters
//   const searchQuery = searchParams.query || '';
//   const selectedSkillSlugs = searchParams.skills ? searchParams.skills.split(',') : []; // Array of slugs

//   // Fetch all available skills for the MultiSelect options
//   const supabase = await createServerSupabaseClient();
//   const { data: allSkills, error: skillsError } = await supabase
//     .from('skills')
//     .select('name, slug');

//   if (skillsError) {
//     console.error("Error fetching all available skills for MultiSelect:", skillsError);
//     // Handle error, perhaps return an empty array or a specific error state
//   }

//   // Format available skills for MultiSelect ({ value, label })
//   const formattedAvailableSkills = allSkills ? allSkills.map(s => ({
//     value: s.slug,
//     label: s.name,
//   })) : [];

//   // Determine which skills are initially selected in the MultiSelect based on URL params
//   // The MultiSelect needs an array of { value, label } objects for its `selected` prop
//   const initialSelectedSkills = formattedAvailableSkills.filter(skill =>
//     selectedSkillSlugs.includes(skill.value)
//   );

//   // Fetch profiles using the Server Action
//   const { profiles: searchResults, error: searchError } = await searchProfiles(searchQuery, selectedSkillSlugs);

//   if (searchError) {
//     console.error("Error fetching profiles for search:", searchError);
//     return (
//       <div className="container mx-auto py-8 text-center">
//         <h1 className="text-3xl font-bold text-red-600 mb-4">Error Loading Search Results</h1>
//         <p className="text-gray-600">An error occurred while trying to fetch profiles. Please try again later.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto py-8">
//       <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">Find Your Peers</h1>

//       <form
//         action={searchPeersAction} // This action will handle the redirect with new params
//         className="flex flex-col gap-4 w-full max-w-xl mx-auto mb-8 bg-white p-6 rounded-lg shadow-md"
//       >
//         <div className="w-full">
//           <Label htmlFor="searchTerm" className="sr-only">Search by name or keyword</Label>
//           <Input
//             type="text"
//             placeholder="Search by name or keyword..."
//             name="searchTerm" // Match the name in searchPeersAction
//             defaultValue={searchQuery} // Set initial value from URL param
//             className="w-full"
//           />
//         </div>

//         <div className="w-full">
//           <Label htmlFor="skills">Filter by skills</Label> {/* Label for MultiSelect */}
//           {/* MultiSelect component for skills */}
//           {/* We need to pass the initial selected skills (as values) and all available options */}
//           <MultiSelect
//             options={formattedAvailableSkills}
//             // MultiSelect's `selected` prop expects an array of `value` strings
//             selected={initialSelectedSkills.map(s => s.value)}
//             name="selectedSkills" // Important: Name for FormData
//             placeholder="Filter by skills..."
//             // The MultiSelect component itself manages its internal state and passes the selected values
//             // to the form via the 'name' prop when submitted.
//           />
//         </div>

//         <SubmitButton>Search</SubmitButton> {/* Use the new SubmitButton */}
//       </form>

//       {/* Filters/Options (Placeholder) - remains the same for now */}
//       <div className="mb-8 text-center">
//         <h2 className="text-2xl font-semibold text-gray-800 mb-4">
//           Filters (Coming Soon)
//         </h2>
//         <div className="flex justify-center space-x-4">
//           <Button variant="outline" disabled>
//             By Rating
//           </Button>
//           <Button variant="outline" disabled>
//             By Availability
//           </Button>
//           <Button variant="outline" disabled>
//             By Location
//           </Button>
//         </div>
//       </div>

//       {/* Search Results Display */}
//       <div>
//         <h2 className="text-2xl font-semibold text-gray-800 mb-4">Results</h2>
//         {searchResults.length === 0 && searchQuery === "" && selectedSkillSlugs.length === 0 ? (
//           <p className="text-gray-600 text-center">
//             Start by typing in a skill or name, or select skills from the dropdown!
//           </p>
//         ) : searchResults.length === 0 && (searchQuery !== "" || selectedSkillSlugs.length > 0) ? (
//           <p className="text-gray-600 text-center">
//             No peers found matching your criteria. Try a different search term.
//           </p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {searchResults.map((peer) => (
//               <Card
//                 key={peer.id}
//                 className="hover:shadow-lg transition-shadow duration-200 flex flex-col"
//               >
//                 <CardHeader className="flex flex-row items-center space-x-4 pb-2">
//                   <Avatar className="h-16 w-16">
//                     <AvatarImage
//                       src={peer.profile_picture_url || `https://api.dicebear.com/7.x/lorelei/svg?seed=${peer.username}`}
//                       alt={`${peer.full_name}'s profile`}
//                     />
//                     <AvatarFallback>{peer.full_name?.charAt(0) || peer.username?.charAt(0) || 'U'}</AvatarFallback>
//                   </Avatar>
//                   <div>
//                     <CardTitle className="text-xl">{peer.full_name}</CardTitle>
//                     <CardDescription className="line-clamp-1">@{peer.username}</CardDescription>
//                   </div>
//                 </CardHeader>
//                 <CardContent className="pt-2 flex-grow flex flex-col justify-between">
//                   <div className="flex items-center text-sm text-gray-600 mb-2">
//                     <Star className="h-4 w-4 text-yellow-500 mr-1 fill-current" />
//                     <span>0.0 Average Rating (0 sessions)</span> {/* Placeholder */}
//                   </div>
//                   <div className="flex flex-wrap gap-2 mb-4">
//                     {peer.user_skills.map((us) => (
//                       <Badge
//                         key={us.skills.slug}
//                         variant="default"
//                         className="bg-blue-600 text-white text-xs font-medium px-2.5 py-0.5 rounded-full"
//                       >
//                         {us.skills.name}
//                       </Badge>
//                     ))}
//                   </div>
//                   <Link href={`/profile/${peer.username}`} className="w-full">
//                     <Button className="mt-auto w-full bg-fuchsia-600 hover:bg-fuchsia-700 text-white">View Profile</Button>
//                   </Link>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }




// app/search/page.jsx
// This is a Server Component, no "use client"

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Star } from "lucide-react";
import { Label } from "@/components/ui/label";

import { SubmitButton } from "@/components/little/SubmitButton";
import { searchPeersAction } from "@/serverActions/search/actions";
import { searchProfiles } from '@/actions/profile'; // This will be updated to take two params

export default async function SearchPage({ searchParams }) {
  // Get both search queries from URL parameters
  const searchParam = await searchParams;
  const nameKeywordQuery = searchParam.query || ''; // For name/keyword search
  const skillSearchQuery = searchParam.skills || ''; // For skill search

  // Fetch profiles using the Server Action, passing both queries
  const { profiles: searchResults, error: searchError } = await searchProfiles(nameKeywordQuery, skillSearchQuery);

  if (searchError) {
    console.error("Error fetching profiles for search:", searchError);
    return (
      <div className="container mx-auto py-8 text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Error Loading Search Results</h1>
        <p className="text-gray-600">An error occurred while trying to fetch profiles. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">Find Your Peers</h1>

      <form
        action={searchPeersAction} // This action will handle the redirect with new params
        className="flex flex-col gap-4 w-full max-w-xl mx-auto mb-8 bg-white p-6 rounded-lg shadow-md"
      >
        {/* Input for Name/Keyword Search */}
        <div className="w-full">
          <Label htmlFor="nameKeywordSearch">Search by Name or Keyword</Label>
          <Input
            id="nameKeywordSearch"
            type="text"
            placeholder="e.g., John Doe, frontend, mentor..."
            name="nameKeywordSearch" // New name for this input
            defaultValue={nameKeywordQuery}
            className="w-full"
          />
        </div>

        {/* Input for Skill Search */}
        <div className="w-full">
          <Label htmlFor="skillSearch">Search by Skill</Label>
          <Input
            id="skillSearch"
            type="text"
            placeholder="e.g., React.js, Python, UI/UX Design..."
            name="skillSearch" // New name for this input
            defaultValue={skillSearchQuery}
            className="w-full"
          />
        </div>

        <SubmitButton>Search</SubmitButton>
      </form>

      {/* Filters/Options (Placeholder) - remains the same */}
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Filters (Coming Soon)
        </h2>
        <div className="flex justify-center space-x-4">
          <Button variant="outline" disabled>
            By Rating
          </Button>
          <Button variant="outline" disabled>
            By Availability
          </Button>
          <Button variant="outline" disabled>
            By Location
          </Button>
        </div>
      </div>

      {/* Search Results Display */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Results</h2>
        {searchResults.length === 0 && nameKeywordQuery === "" && skillSearchQuery === "" ? (
          <p className="text-gray-600 text-center">
            Enter a name, keyword, or skill to find your peers!
          </p>
        ) : searchResults.length === 0 && (nameKeywordQuery !== "" || skillSearchQuery !== "") ? (
          <p className="text-gray-600 text-center">
            No peers found matching your criteria. Try a different search.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.map((peer) => (
              <Card
                key={peer.id}
                className="hover:shadow-lg transition-shadow duration-200 flex flex-col"
              >
                <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                  <Avatar className="h-16 w-16">
                    <AvatarImage
                      src={peer.profile_picture_url || `https://api.dicebear.com/7.x/lorelei/svg?seed=${peer.username}`}
                      alt={`${peer.full_name}'s profile`}
                    />
                    <AvatarFallback>{peer.full_name?.charAt(0) || peer.username?.charAt(0) || 'U'}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-xl">{peer.full_name}</CardTitle>
                    <CardDescription className="line-clamp-1">@{peer.username}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="pt-2 flex-grow flex flex-col justify-between">
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <Star className="h-4 w-4 text-yellow-500 mr-1 fill-current" />
                    <span>0.0 Average Rating (0 sessions)</span> {/* Placeholder */}
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {peer.user_skills.map((us) => (
                      <Badge
                        key={us.skills.slug}
                        variant="default"
                        className="bg-blue-600 text-white text-xs font-medium px-2.5 py-0.5 rounded-full"
                      >
                        {us.skills.name}
                      </Badge>
                    ))}
                  </div>
                  <Link href={`/profile/${peer.username}`} className="w-full">
                    <Button className="mt-auto w-full bg-fuchsia-600 hover:bg-fuchsia-700 text-white">View Profile</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}