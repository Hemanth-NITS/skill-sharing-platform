// // app/profile/[username]/page.jsx
// // No "use client"; directive here, making this a Server Component by default

// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { Separator } from "@/components/ui/separator";
// import { Star } from 'lucide-react'; // Only Star icon needed here
// import { SendRequestButton } from '@/components/profile/SendRequestButton'; // <-- NEW: Import the client button

// // --- Dummy Data (Remains the same, now directly accessible by Server Component) ---
// const dummyUsers = [
//   {
//     id: 'user1',
//     username: 'alice-johnson',
//     fullName: 'Alice Johnson',
//     headline: 'Experienced React Developer & Mentor',
//     bio: 'Passionate about teaching modern web development. I specialize in React, Next.js, and state management. Love helping others grow!',
//     profilePic: 'https://api.dicebear.com/7.x/lorelei/svg?seed=Alice',
//     skills: ['React.js', 'JavaScript', 'Node.js', 'Mentoring', 'Frontend Development', 'Next.js'],
//     averageRating: 4.8,
//     totalSessions: 120,
//     testimonials: [
//       { id: 't1', author: 'Student A', rating: 5, comment: 'Alice is an amazing teacher! Very clear explanations and patient.' },
//       { id: 't2', author: 'Student B', rating: 5, comment: 'Learned so much about React hooks. Highly recommend!' },
//       { id: 't3', author: 'Student C', rating: 4, comment: 'Good session, a bit fast-paced but very knowledgeable.' },
//     ],
//   },
//   {
//     id: 'user2',
//     username: 'bob-smith',
//     fullName: 'Bob Smith',
//     headline: 'Python Enthusiast & Data Science Tutor',
//     bio: 'I enjoy breaking down complex data science concepts into easy-to-understand lessons. From Pandas to Machine Learning, let\'s learn together!',
//     profilePic: 'https://api.dicebear.com/7.x/lorelei/svg?seed=Bob',
//     skills: ['Python', 'Data Science', 'Machine Learning', 'SQL', 'Pandas', 'Jupyter Notebooks'],
//     averageRating: 4.5,
//     totalSessions: 85,
//     testimonials: [
//       { id: 't4', author: 'Student D', rating: 4, comment: 'Bob helped me understand SQL joins better. Very helpful!' },
//       { id: 't5', author: 'Student E', rating: 5, comment: 'Excellent tutor for Python. Patient and encouraging.' },
//     ],
//   },
//   {
//     id: 'user3',
//     username: 'charlie-brown',
//     fullName: 'Charlie Brown',
//     headline: 'UI/UX Designer & Figma Expert',
//     bio: 'Bringing ideas to life through intuitive and beautiful design. I can guide you through Figma, design principles, and user research methodologies.',
//     profilePic: 'https://api.dicebear.com/7.x/lorelei/svg?seed=Charlie',
//     skills: ['UI/UX Design', 'Figma', 'Sketch', 'Prototyping', 'User Research', 'Design Systems'],
//     averageRating: 4.9,
//     totalSessions: 150,
//     testimonials: [
//       { id: 't6', author: 'Student F', rating: 5, comment: 'Charlie is a design guru! My Figma skills improved dramatically.' },
//       { id: 't7', author: 'Student G', rating: 5, comment: 'Incredible insights into user psychology. Highly recommend for aspiring designers.' },
//     ],
//   },
// ];
// // --- End Dummy Data ---

// // PublicProfilePage is now an async Server Component
// export default async function PublicProfilePage({ params }) { // Receive params directly as a prop
//   const { username } = params; // Extract username from parameters

//   // In a real app, you'd fetch data from Supabase here
//   // const { data: userProfile, error } = await supabase.from('profiles').select('*').eq('username', username).single();

//   // For now, find the dummy user based on the username from the URL
//   const userProfile = dummyUsers.find(user => user.username === username);

//   if (!userProfile) {
//     // Handle case where user is not found (e.g., show a 404 message)
//     // In a Server Component, you might want to use notFound() from next/navigation
//     // or return a specific 404 UI. For now, a simple message.
//     return (
//       <div className="container mx-auto py-8 text-center">
//         <h1 className="text-3xl font-bold text-gray-900 mb-4">User Not Found</h1>
//         <p className="text-gray-600">The profile you are looking for does not exist.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto py-8 max-w-4xl">
//       <Card className="p-6">
//         <CardHeader className="flex flex-col md:flex-row items-center md:items-start gap-6 pb-4">
//           <Avatar className="h-28 w-28 border-4 border-blue-500 shadow-md">
//             <AvatarImage src={userProfile.profilePic} alt={`${userProfile.fullName}'s profile`} />
//             <AvatarFallback>{userProfile.fullName.charAt(0)}</AvatarFallback>
//           </Avatar>
//           <div className="text-center md:text-left flex-1">
//             <CardTitle className="text-4xl font-bold text-gray-900 mb-2">{userProfile.fullName}</CardTitle>
//             <CardDescription className="text-xl text-gray-700 mb-2">{userProfile.headline}</CardDescription>
//             <div className="flex items-center justify-center md:justify-start text-lg text-gray-600 mb-2">
//               <Star className="h-5 w-5 text-yellow-500 mr-1 fill-current" />
//               <span>{userProfile.averageRating.toFixed(1)} Average Rating ({userProfile.totalSessions} sessions)</span>
//             </div>
//             {/* Render the client-side SendRequestButton */}
//             <SendRequestButton userFullName={userProfile.fullName} />
//           </div>
//         </CardHeader>

//         <Separator className="my-6" />

//         <CardContent className="space-y-6">
//           {/* Bio Section */}
//           <div>
//             <h2 className="text-2xl font-semibold text-gray-800 mb-3">About {userProfile.fullName.split(' ')[0]}</h2>
//             <p className="text-gray-700 leading-relaxed">{userProfile.bio}</p>
//           </div>

//           {/* Skills Section */}
//           <div>
//             <h2 className="text-2xl font-semibold text-gray-800 mb-3">Expertise Badges</h2>
//             <div className="flex flex-wrap gap-2">
//               {userProfile.skills.map(skill => (
//                 <Badge key={skill} variant="default" className="text-base px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white">
//                   {skill}
//                 </Badge>
//               ))}
//             </div>
//           </div>

//           {/* Testimonials Section */}
//           <div>
//             <h2 className="text-2xl font-semibold text-gray-800 mb-3">Testimonials</h2>
//             {userProfile.testimonials.length > 0 ? (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {userProfile.testimonials.map(testimonial => (
//                   <Card key={testimonial.id} className="p-4 bg-gray-50 border border-gray-200">
//                     <div className="flex items-center mb-2">
//                       {[...Array(testimonial.rating)].map((_, i) => (
//                         <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
//                       ))}
//                       {[...Array(5 - testimonial.rating)].map((_, i) => (
//                         <Star key={i} className="h-4 w-4 text-gray-300" />
//                       ))}
//                     </div>
//                     <p className="text-gray-800 italic mb-2">"{testimonial.comment}"</p>
//                     <p className="text-sm text-gray-500">- {testimonial.author}</p>
//                   </Card>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-gray-600">No testimonials yet.</p>
//             )}
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// app/profile/[username]/page.jsx
// No "use client"; directive here, making this a Server Component by default

// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { Separator } from "@/components/ui/separator";
// import { Star } from 'lucide-react';
// // import { SendRequestButton } from '@/components/profile/SendRequestButton'; // REMOVE this import
// import { SendRequestModal } from '@/components/profile/SendRequestModal'; // <-- NEW: Import the modal component

// // --- Dummy Data (Remains the same) ---
// const dummyUsers = [
//   {
//     id: 'user1',
//     username: 'alice-johnson',
//     fullName: 'Alice Johnson',
//     headline: 'Experienced React Developer & Mentor',
//     bio: 'Passionate about teaching modern web development. I specialize in React, Next.js, and state management. Love helping others grow!',
//     profilePic: 'https://api.dicebear.com/7.x/lorelei/svg?seed=Alice',
//     skills: ['React.js', 'JavaScript', 'Node.js', 'Mentoring', 'Frontend Development', 'Next.js'],
//     averageRating: 4.8,
//     totalSessions: 120,
//     testimonials: [
//       { id: 't1', author: 'Student A', rating: 5, comment: 'Alice is an amazing teacher! Very clear explanations and patient.' },
//       { id: 't2', author: 'Student B', rating: 5, comment: 'Learned so much about React hooks. Highly recommend!' },
//       { id: 't3', author: 'Student C', rating: 4, comment: 'Good session, a bit fast-paced but very knowledgeable.' },
//     ],
//   },
//   {
//     id: 'user2',
//     username: 'bob-smith',
//     fullName: 'Bob Smith',
//     headline: 'Python Enthusiast & Data Science Tutor',
//     bio: 'I enjoy breaking down complex data science concepts into easy-to-understand lessons. From Pandas to Machine Learning, let\'s learn together!',
//     profilePic: 'https://api.dicebear.com/7.x/lorelei/svg?seed=Bob',
//     skills: ['Python', 'Data Science', 'Machine Learning', 'SQL', 'Pandas', 'Jupyter Notebooks'],
//     averageRating: 4.5,
//     totalSessions: 85,
//     testimonials: [
//       { id: 't4', author: 'Student D', rating: 4, comment: 'Bob helped me understand SQL joins better. Very helpful!' },
//       { id: 't5', author: 'Student E', rating: 5, comment: 'Excellent tutor for Python. Patient and encouraging.' },
//     ],
//   },
//   {
//     id: 'user3',
//     username: 'charlie-brown',
//     fullName: 'Charlie Brown',
//     headline: 'UI/UX Designer & Figma Expert',
//     bio: 'Bringing ideas to life through intuitive and beautiful design. I can guide you through Figma, design principles, and user research methodologies.',
//     profilePic: 'https://api.dicebear.com/7.x/lorelei/svg?seed=Charlie',
//     skills: ['UI/UX Design', 'Figma', 'Sketch', 'Prototyping', 'User Research', 'Design Systems'],
//     averageRating: 4.9,
//     totalSessions: 150,
//     testimonials: [
//       { id: 't6', author: 'Student F', rating: 5, comment: 'Charlie is a design guru! My Figma skills improved dramatically.' },
//       { id: 't7', author: 'Student G', rating: 5, comment: 'Incredible insights into user psychology. Highly recommend for aspiring designers.' },
//     ],
//   },
// ];
// // --- End Dummy Data ---

// export default async function PublicProfilePage({ params }) {
//   const { username } = await params;
//   const userProfile = dummyUsers.find(user => user.username === username);

//   if (!userProfile) {
//     return (
//       <div className="container mx-auto py-8 text-center">
//         <h1 className="text-3xl font-bold text-gray-900 mb-4">User Not Found</h1>
//         <p className="text-gray-600">The profile you are looking for does not exist.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto py-8 max-w-4xl">
//       <Card className="p-6">
//         <CardHeader className="flex flex-col md:flex-row items-center md:items-start gap-6 pb-4">
//           <Avatar className="h-28 w-28 border-4 border-blue-500 shadow-md">
//             <AvatarImage src={userProfile.profilePic} alt={`${userProfile.fullName}'s profile`} />
//             <AvatarFallback>{userProfile.fullName.charAt(0)}</AvatarFallback>
//           </Avatar>
//           <div className="text-center md:text-left flex-1">
//             <CardTitle className="text-4xl font-bold text-gray-900 mb-2">{userProfile.fullName}</CardTitle>
//             <CardDescription className="text-xl text-gray-700 mb-2">{userProfile.headline}</CardDescription>
//             <div className="flex items-center justify-center md:justify-start text-lg text-gray-600 mb-2">
//               <Star className="h-5 w-5 text-yellow-500 mr-1 fill-current" />
//               <span>{userProfile.averageRating.toFixed(1)} Average Rating ({userProfile.totalSessions} sessions)</span>
//             </div>
//             {/* Render the SendRequestModal component */}
//             <SendRequestModal
//               recipientName={userProfile.fullName}
//               recipientUsername={userProfile.username}
//             />
//           </div>
//         </CardHeader>

//         <Separator className="my-6" />

//         <CardContent className="space-y-6">
//           {/* Bio Section */}
//           <div>
//             <h2 className="text-2xl font-semibold text-gray-800 mb-3">About {userProfile.fullName.split(' ')[0]}</h2>
//             <p className="text-gray-700 leading-relaxed">{userProfile.bio}</p>
//           </div>

//           {/* Skills Section */}
//           <div>
//             <h2 className="text-2xl font-semibold text-gray-800 mb-3">Expertise Badges</h2>
//             <div className="flex flex-wrap gap-2">
//               {userProfile.skills.map(skill => (
//                 <Badge key={skill} variant="default" className="text-base px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white">
//                   {skill}
//                 </Badge>
//               ))}
//             </div>
//           </div>

//           {/* Testimonials Section */}
//           <div>
//             <h2 className="text-2xl font-semibold text-gray-800 mb-3">Testimonials</h2>
//             {userProfile.testimonials.length > 0 ? (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {userProfile.testimonials.map(testimonial => (
//                   <Card key={testimonial.id} className="p-4 bg-gray-50 border border-gray-200">
//                     <div className="flex items-center mb-2">
//                       {[...Array(testimonial.rating)].map((_, i) => (
//                         <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
//                       ))}
//                       {[...Array(5 - testimonial.rating)].map((_, i) => (
//                         <Star key={i} className="h-4 w-4 text-gray-300" />
//                       ))}
//                     </div>
//                     <p className="text-gray-800 italic mb-2">"{testimonial.comment}"</p>
//                     <p className="text-sm text-gray-500">- {testimonial.author}</p>
//                   </Card>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-gray-600">No testimonials yet.</p>
//             )}
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
















// app/profile/[username]/page.jsx
// No "use client" here, this is a Server Component

// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { Separator } from "@/components/ui/separator";
// import { Star } from 'lucide-react';
// import { SendRequestModal } from '@/components/profile/SendRequestModal';

// // NEW: Import the server-side Supabase client
// import { createServerSupabaseClient } from '@/lib/supabase/server';

// // This page is now an async Server Component to fetch data
// export default async function PublicProfilePage({ params }) {
//   const { username } = await params; // Get the username from the URL parameters

//   // Initialize Supabase client for server-side data fetching
//   const supabase = await createServerSupabaseClient();

//   // 1. Fetch the profile from the 'profiles' table using the username
//   const { data: userProfile, error: profileError } = await supabase
//     .from('profiles')
//     .select('*, user_skills(skills(name, slug))') // Select profile data and join user_skills to get skill names/slugs
//     .eq('username', username)
//     .single(); // Use .single() to get one record or null

//   if (profileError && profileError.code !== 'PGRST116') { // PGRST116 means 'no rows found'
//     console.error("Error fetching user profile:", profileError);
//     // For a real error (not just not found), you might want a different message or error page
//     return (
//       <div className="container mx-auto py-8 text-center">
//         <h1 className="text-3xl font-bold text-red-600 mb-4">Error Loading Profile</h1>
//         <p className="text-gray-600">An error occurred while trying to load the profile. Please try again later.</p>
//       </div>
//     );
//   }

//   // If no profile is found, display the "User Not Found" message
//   if (!userProfile) {
//     return (
//       <div className="container mx-auto py-8 text-center">
//         <h1 className="text-3xl font-bold text-gray-900 mb-4">User Not Found</h1>
//         <p className="text-gray-600">The profile you are looking for does not exist.</p>
//       </div>
//     );
//   }

//   // Format skills for display
//   // userProfile.user_skills will be an array like [{ skills: { name: 'React.js', slug: 'react-js' } }]
//   const skillsForDisplay = userProfile.user_skills.map(us => us.skills.name);

//   // --- Placeholder for averageRating and totalSessions ---
//   // As discussed, these will be derived from other tables (sessions, ratings) later.
//   // For now, let's use some default or placeholder values.
//   const averageRating = 0; // Will fetch from ratings table later
//   const totalSessions = 0; // Will fetch from sessions table later
//   const testimonials = []; // Will fetch from testimonials table later

//   return (
//     <div className="container mx-auto py-8 max-w-4xl">
//       <Card className="p-6">
//         <CardHeader className="flex flex-col md:flex-row items-center md:items-start gap-6 pb-4">
//           <Avatar className="h-28 w-28 border-4 border-blue-500 shadow-md">
//             {/* Use profile_picture_url from Supabase, fallback to DiceBear */}
//             <AvatarImage src={userProfile.profile_picture_url || `https://api.dicebear.com/7.x/lorelei/svg?seed=${userProfile.username}`} alt={`${userProfile.full_name}'s profile`} />
//             <AvatarFallback>{userProfile.full_name?.charAt(0) || userProfile.username?.charAt(0) || 'U'}</AvatarFallback>
//           </Avatar>
//           <div className="text-center md:text-left flex-1">
//             <CardTitle className="text-4xl font-bold text-gray-900 mb-2">{userProfile.full_name}</CardTitle>
//             {/* Headline is not in our current schema, so we can remove or placeholder it */}
//             <CardDescription className="text-xl text-gray-700 mb-2">@{userProfile.username}</CardDescription>
//             <div className="flex items-center justify-center md:justify-start text-lg text-gray-600 mb-2">
//               <Star className="h-5 w-5 text-yellow-500 mr-1 fill-current" />
//               <span>{averageRating.toFixed(1)} Average Rating ({totalSessions} sessions)</span>
//             </div>
//             <SendRequestModal
//               recipientName={userProfile.full_name}
//               recipientUsername={userProfile.username}
//             />
//           </div>
//         </CardHeader>

//         <Separator className="my-6" />

//         <CardContent className="space-y-6">
//           {/* Bio Section */}
//           <div>
//             <h2 className="text-2xl font-semibold text-gray-800 mb-3">About {userProfile.full_name?.split(' ')[0] || userProfile.username}</h2>
//             <p className="text-gray-700 leading-relaxed">{userProfile.bio}</p>
//           </div>

//           {/* Skills Section */}
//           <div>
//             <h2 className="text-2xl font-semibold text-gray-800 mb-3">Expertise Badges</h2>
//             <div className="flex flex-wrap gap-2">
//               {skillsForDisplay.length > 0 ? (
//                 skillsForDisplay.map(skill => (
//                   <Badge key={skill} variant="default" className="text-base px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white">
//                     {skill}
//                   </Badge>
//                 ))
//               ) : (
//                 <p className="text-gray-600">No skills listed yet.</p>
//               )}
//             </div>
//           </div>

//           {/* Testimonials Section (Placeholder) */}
//           <div>
//             <h2 className="text-2xl font-semibold text-gray-800 mb-3">Testimonials</h2>
//             {testimonials.length > 0 ? (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {/* Map through testimonials here when you fetch them */}
//               </div>
//             ) : (
//               <p className="text-gray-600">No testimonials yet.</p>
//             )}
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }





// app/profile/[username]/page.jsx
// No "use client" here, this is a Server Component

// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { Separator } from "@/components/ui/separator";
// import { Star } from 'lucide-react';
// import { SendRequestModal } from '@/components/profile/SendRequestModal';

// import { createServerSupabaseClient } from '@/lib/supabase/server';

// export default async function PublicProfilePage({ params }) {
//   const { username } = params;

//   const supabase = await createServerSupabaseClient();

//   const { data: userProfile, error: profileError } = await supabase
//     .from('profiles')
//     .select('*, user_skills(skills(name, slug))')
//     .eq('username', username)
//     .single();

//   if (profileError && profileError.code !== 'PGRST116') {
//     console.error("Error fetching user profile:", profileError);
//     return (
//       <div className="container mx-auto py-8 text-center">
//         <h1 className="text-3xl font-bold text-red-600 mb-4">Error Loading Profile</h1>
//         <p className="text-gray-600">An error occurred while trying to load the profile. Please try again later.</p>
//       </div>
//     );
//   }

//   if (!userProfile) {
//     return (
//       <div className="container mx-auto py-8 text-center">
//         <h1 className="text-3xl font-bold text-gray-900 mb-4">User Not Found</h1>
//         <p className="text-gray-600">The profile you are looking for does not exist.</p>
//       </div>
//     );
//   }

//   const skillsForDisplay = userProfile.user_skills.map(us => us.skills.name);

//   const averageRating = 0;
//   const totalSessions = 0;
//   const testimonials = [];

//   return (
//     <div className="container mx-auto py-8 max-w-4xl">
//       <Card className="p-6">
//         <CardHeader className="flex flex-col md:flex-row items-center md:items-start gap-6 pb-4">
//           <Avatar className="h-28 w-28 border-4 border-blue-500 shadow-md">
//             {/* Use profile_picture_url from Supabase, fallback to DiceBear */}
//             <AvatarImage src={userProfile.profile_picture_url || `https://api.dicebear.com/7.x/lorelei/svg?seed=${userProfile.username}`} alt={`${userProfile.full_name}'s profile`} />
//             <AvatarFallback>{userProfile.full_name?.charAt(0) || userProfile.username?.charAt(0) || 'U'}</AvatarFallback>
//           </Avatar>
//           <div className="text-center md:text-left flex-1">
//             <CardTitle className="text-4xl font-bold text-gray-900 mb-2">{userProfile.full_name}</CardTitle>
//             <CardDescription className="text-xl text-gray-700 mb-2">@{userProfile.username}</CardDescription>
//             <div className="flex items-center justify-center md:justify-start text-lg text-gray-600 mb-2">
//               <Star className="h-5 w-5 text-yellow-500 mr-1 fill-current" />
//               <span>{averageRating.toFixed(1)} Average Rating ({totalSessions} sessions)</span>
//             </div>
//             <SendRequestModal
//               recipientName={userProfile.full_name}
//               recipientUsername={userProfile.username}
//             />
//           </div>
//         </CardHeader>

//         <Separator className="my-6" />

//         <CardContent className="space-y-6">
//           {/* Bio Section */}
//           <div>
//             <h2 className="text-2xl font-semibold text-gray-800 mb-3">About {userProfile.full_name?.split(' ')[0] || userProfile.username}</h2>
//             <p className="text-gray-700 leading-relaxed">{userProfile.bio}</p>
//           </div>

//           {/* Skills Section */}
//           <div>
//             <h2 className="text-2xl font-semibold text-gray-800 mb-3">Expertise Badges</h2>
//             <div className="flex flex-wrap gap-2">
//               {skillsForDisplay.length > 0 ? (
//                 skillsForDisplay.map(skill => (
//                   <Badge key={skill} variant="default" className="text-base px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white">
//                     {skill}
//                   </Badge>
//                 ))
//               ) : (
//                 <p className="text-gray-600">No skills listed yet.</p>
//               )}
//             </div>
//           </div>

//           {/* Testimonials Section (Placeholder) */}
//           <div>
//             <h2 className="text-2xl font-semibold text-gray-800 mb-3">Testimonials</h2>
//             {testimonials.length > 0 ? (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {/* Map through testimonials here when you fetch them */}
//               </div>
//             ) : (
//               <p className="text-gray-600">No testimonials yet.</p>
//             )}
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }













////////this is the one////////////

// // app/profile/[username]/page.jsx
// No "use client" here, this is a Server Component

// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { Separator } from "@/components/ui/separator";
// import { Star } from 'lucide-react';
// // import { SendRequestModal } from '@/components/profile/SendRequestModal'; // REMOVE if not using modal anymore

// import { SendRequestButton } from '@/components/profile/SendRequestButton'; // NEW: Import the button component

// import { createServerSupabaseClient } from '@/lib/supabase/server';

// export default async function PublicProfilePage({ params }) {
//   const { username } = await params;

//   const supabase = await createServerSupabaseClient();

//   // Get current authenticated user's ID
//   const { data: { user: currentUser } } = await supabase.auth.getUser();
//   const currentUserId = currentUser?.id || null; // Will be null if not logged in

//   const { data: userProfile, error: profileError } = await supabase
//     .from('profiles')
//     .select('*, user_skills(skills(name, slug))')
//     .eq('username', username)
//     .single();

//   if (profileError && profileError.code !== 'PGRST116') {
//     console.error("Error fetching user profile:", profileError);
//     return (
//       <div className="container mx-auto py-8 text-center">
//         <h1 className="text-3xl font-bold text-red-600 mb-4">Error Loading Profile</h1>
//         <p className="text-gray-600">An error occurred while trying to load the profile. Please try again later.</p>
//       </div>
//     );
//   }

//   if (!userProfile) {
//     return (
//       <div className="container mx-auto py-8 text-center">
//         <h1 className="text-3xl font-bold text-gray-900 mb-4">User Not Found</h1>
//         <p className="text-gray-600">The profile you are looking for does not exist.</p>
//       </div>
//     );
//   }

//   // NEW: Check for existing peer request status between current user and this profile user
//   let isConnected = false;
//   let requestStatus = null; // 'pending', 'accepted', 'declined'

//   if (currentUserId && currentUserId !== userProfile.id) { // Only check if logged in and not viewing own profile
//     const { data: existingRequest, error: requestCheckError } = await supabase
//       .from('peer_requests')
//       .select('status')
//       .or(`and(sender_id.eq.${currentUserId},receiver_id.eq.${userProfile.id}),and(sender_id.eq.${userProfile.id},receiver_id.eq.${currentUserId})`)
//       .single(); // Try to get a single matching request

//     if (requestCheckError && requestCheckError.code !== 'PGRST116') { // PGRST116 is no rows found
//       console.error("Error checking existing request status:", requestCheckError);
//     } else if (existingRequest) {
//       requestStatus = existingRequest.status;
//       if (requestStatus === 'accepted') {
//         isConnected = true;
//       }
//     }
//   }


//   const skillsForDisplay = userProfile.user_skills.map(us => us.skills.name);

//   const averageRating = 0;
//   const totalSessions = 0;
//   const testimonials = [];

//   return (
//     <div className="container mx-auto py-8 max-w-4xl">
//       <Card className="p-6">
//         <CardHeader className="flex flex-col md:flex-row items-center md:items-start gap-6 pb-4">
//           <Avatar className="h-28 w-28 border-4 border-blue-500 shadow-md">
//             <AvatarImage src={userProfile.profile_picture_url || `https://api.dicebear.com/7.x/lorelei/svg?seed=${userProfile.username}`} alt={`${userProfile.full_name}'s profile`} />
//             <AvatarFallback>{userProfile.full_name?.charAt(0) || userProfile.username?.charAt(0) || 'U'}</AvatarFallback>
//           </Avatar>
//           <div className="text-center md:text-left flex-1">
//             <CardTitle className="text-4xl font-bold text-gray-900 mb-2">{userProfile.full_name}</CardTitle>
//             <CardDescription className="text-xl text-gray-700 mb-2">@{userProfile.username}</CardDescription>
//             <div className="flex items-center justify-center md:justify-start text-lg text-gray-600 mb-2">
//               <Star className="h-5 w-5 text-yellow-500 mr-1 fill-current" />
//               <span>{averageRating.toFixed(1)} Average Rating ({totalSessions} sessions)</span>
//             </div>
//             {/* Replace SendRequestModal with SendRequestButton */}
//             {currentUserId && ( // Only show button if a user is logged in
//               <SendRequestButton
//                 recipientId={userProfile.id}
//                 currentUserId={currentUserId}
//                 isConnected={isConnected}
//                 requestStatus={requestStatus}
//               />
//             )}
//           </div>
//         </CardHeader>

//         <Separator className="my-6" />

//         <CardContent className="space-y-6">
//           {/* Bio Section */}
//           <div>
//             <h2 className="text-2xl font-semibold text-gray-800 mb-3">About {userProfile.full_name?.split(' ')[0] || userProfile.username}</h2>
//             <p className="text-gray-700 leading-relaxed">{userProfile.bio}</p>
//           </div>

//           {/* Skills Section */}
//           <div>
//             <h2 className="text-2xl font-semibold text-gray-800 mb-3">Expertise Badges</h2>
//             <div className="flex flex-wrap gap-2">
//               {skillsForDisplay.length > 0 ? (
//                 skillsForDisplay.map(skill => (
//                   <Badge key={skill} variant="default" className="text-base px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white">
//                     {skill}
//                   </Badge>
//                 ))
//               ) : (
//                 <p className="text-gray-600">No skills listed yet.</p>
//               )}
//             </div>
//           </div>

//           {/* Testimonials Section (Placeholder) */}
//           <div>
//             <h2 className="text-2xl font-semibold text-gray-800 mb-3">Testimonials</h2>
//             {testimonials.length > 0 ? (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {/* Map through testimonials here when you fetch them */}
//               </div>
//             ) : (
//               <p className="text-gray-600">No testimonials yet.</p>
//             )}
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }







// ///////not this.......
// //supabase connected code like showing testimonials, ratings, etc.

// // app/profile/[username]/page.jsx
// // No "use client" here, this is a Server Component

// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { Separator } from "@/components/ui/separator";
// import { Star } from 'lucide-react';
// import { SendRequestModal } from '@/components/profile/SendRequestModal';

// import { createServerSupabaseClient } from '@/lib/supabase/server';

// export default async function PublicProfilePage({ params }) {
//   const { username } = await params;

//   const supabase = await createServerSupabaseClient();

//   const { data: { user: currentUser } } = await supabase.auth.getUser();
//   const currentUserId = currentUser?.id || null;

//   const { data: userProfile, error: profileError } = await supabase
//     .from('profiles')
//     .select('*, user_skills(skills(name, slug))')
//     .eq('username', username)
//     .single();

//   if (profileError && profileError.code !== 'PGRST116') {
//     console.error("Error fetching user profile:", profileError);
//     return (
//       <div className="container mx-auto py-8 text-center">
//         <h1 className="text-3xl font-bold text-red-600 mb-4">Error Loading Profile</h1>
//         <p className="text-gray-600">An error occurred while trying to load the profile. Please try again later.</p>
//       </div>
//     );
//   }

//   if (!userProfile) {
//     return (
//       <div className="container mx-auto py-8 text-center">
//         <h1 className="text-3xl font-bold text-gray-900 mb-4">User Not Found</h1>
//         <p className="text-gray-600">The profile you are looking for does not exist.</p>
//       </div>
//     );
//   }

//   // --- FIX: Fetch ratings and rater profiles separately ---

//   // 1. Fetch raw ratings for this user
//   const { data: rawUserRatings, error: ratingsError } = await supabase
//     .from('ratings')
//     .select('id, rating, testimonial_content, created_at, rater_id') // Only select rater_id, not the profile join
//     .eq('rated_user_id', userProfile.id)
//     .order('created_at', { ascending: false });

//   if (ratingsError) {
//     console.error("Error fetching raw user ratings:", ratingsError);
//     // Continue even if error, but ratings/testimonials won't show
//   }

//   // 2. Collect all unique rater_ids from these ratings
//   const allRaterIds = new Set();
//   rawUserRatings?.forEach(rating => {
//     allRaterIds.add(rating.rater_id);
//   });
//   const uniqueRaterIds = Array.from(allRaterIds).filter(Boolean);

//   let raterProfilesMap = new Map();
//   if (uniqueRaterIds.length > 0) {
//     // 3. Fetch profiles for all unique rater IDs
//     const { data: raterProfiles, error: raterProfilesError } = await supabase
//       .from('profiles')
//       .select('id, full_name, username, profile_picture_url')
//       .in('id', uniqueRaterIds);

//     if (raterProfilesError) {
//       console.error("Error fetching rater profiles:", raterProfilesError);
//     } else if (raterProfiles) {
//       raterProfiles.forEach(profile => {
//         raterProfilesMap.set(profile.id, profile);
//       });
//     }
//   }

//   // 4. Map the rater profiles back into the userRatings
//   const enrichedUserRatings = rawUserRatings ? rawUserRatings.map(rating => ({
//     ...rating,
//     rater_profile: raterProfilesMap.get(rating.rater_id),
//   })) : [];


//   // Calculate average rating and total ratings count
//   let averageRating = 0;
//   let totalRatingsCount = 0;
//   if (enrichedUserRatings.length > 0) {
//     const totalRatingSum = enrichedUserRatings.reduce((sum, r) => sum + r.rating, 0);
//     averageRating = totalRatingSum / enrichedUserRatings.length;
//     totalRatingsCount = enrichedUserRatings.length;
//   }

//   // Check for existing peer request status between current user and this profile user
//   let isConnected = false;
//   let requestStatus = null;

//   if (currentUserId && currentUserId !== userProfile.id) {
//     const { data: existingRequest, error: requestCheckError } = await supabase
//       .from('peer_requests')
//       .select('status')
//       .or(`and(sender_id.eq.${currentUserId},receiver_id.eq.${userProfile.id}),and(sender_id.eq.${userProfile.id},receiver_id.eq.${currentUserId})`)
//       .single();

//     if (requestCheckError && requestCheckError.code !== 'PGRST116') {
//       console.error("Error checking existing request status:", requestCheckError);
//     } else if (existingRequest) {
//       requestStatus = existingRequest.status;
//       if (requestStatus === 'accepted') {
//         isConnected = true;
//       }
//     }
//   }

//   const skillsForDisplay = userProfile.user_skills.map(us => us.skills.name);

//   return (
//     <div className="container mx-auto py-8 max-w-4xl">
//       <Card className="p-6">
//         <CardHeader className="flex flex-col md:flex-row items-center md:items-start gap-6 pb-4">
//           <Avatar className="h-28 w-28 border-4 border-blue-500 shadow-md">
//             <AvatarImage src={userProfile.profile_picture_url || `https://api.dicebear.com/7.x/lorelei/svg?seed=${userProfile.username}`} alt={`${userProfile.full_name}'s profile`} />
//             <AvatarFallback>{userProfile.full_name?.charAt(0) || userProfile.username?.charAt(0) || 'U'}</AvatarFallback>
//           </Avatar>
//           <div className="text-center md:text-left flex-1">
//             <CardTitle className="text-4xl font-bold text-gray-900 mb-2">{userProfile.full_name}</CardTitle>
//             <CardDescription className="text-xl text-gray-700 mb-2">@{userProfile.username}</CardDescription>
//             <div className="flex items-center justify-center md:justify-start text-lg text-gray-600 mb-2">
//               <Star className="h-5 w-5 text-yellow-500 mr-1 fill-current" />
//               <span>{averageRating.toFixed(1)} Average Rating ({totalRatingsCount} ratings)</span>
//             </div>
//             {currentUserId && (
//               <SendRequestModal
//                 recipientName={userProfile.full_name}
//                 recipientUsername={userProfile.username}
//                 recipientId={userProfile.id}
//                 currentUserId={currentUserId}
//                 isConnected={isConnected}
//                 requestStatus={requestStatus}
//               />
//             )}
//           </div>
//         </CardHeader>

//         <Separator className="my-6" />

//         <CardContent className="space-y-6">
//           {/* Bio Section */}
//           <div>
//             <h2 className="text-2xl font-semibold text-gray-800 mb-3">About {userProfile.full_name?.split(' ')[0] || userProfile.username}</h2>
//             <p className="text-gray-700 leading-relaxed">{userProfile.bio}</p>
//           </div>

//           {/* Skills Section */}
//           <div>
//             <h2 className="text-2xl font-semibold text-gray-800 mb-3">Expertise Badges</h2>
//             <div className="flex flex-wrap gap-2">
//               {skillsForDisplay.length > 0 ? (
//                 skillsForDisplay.map(skill => (
//                   <Badge key={skill} variant="default" className="text-base px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white">
//                     {skill}
//                   </Badge>
//                 ))
//               ) : (
//                 <p className="text-gray-600">No skills listed yet.</p>
//               )}
//             </div>
//           </div>

//           {/* Testimonials Section */}
//           <div>
//             <h2 className="text-2xl font-semibold text-gray-800 mb-3">Testimonials</h2>
//             {enrichedUserRatings.length > 0 ? (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {enrichedUserRatings.map(testimonial => (
//                   <Card key={testimonial.id} className="p-4 bg-gray-50 border border-gray-200">
//                     <div className="flex items-center mb-2">
//                       {[...Array(testimonial.rating)].map((_, i) => (
//                         <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
//                       ))}
//                       {[...Array(5 - testimonial.rating)].map((_, i) => (
//                         <Star key={i} className="h-4 w-4 text-gray-300" />
//                       ))}
//                     </div>
//                     <p className="text-gray-800 italic mb-2">"{testimonial.testimonial_content}"</p>
//                     <p className="text-sm text-gray-500">- {testimonial.rater_profile?.full_name || testimonial.rater_profile?.username || 'Anonymous'}</p>
//                     <p className="text-xs text-gray-500 mt-1">on {new Date(testimonial.created_at).toLocaleDateString()}</p>
//                   </Card>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-gray-600">No testimonials yet.</p>
//             )}
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }



///////not this......
// app/profile/[username]/page.jsx
// No "use client" here, this is a Server Component

// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { Separator } from "@/components/ui/separator";
// import { Star } from 'lucide-react';
// import { SendRequestModal } from '@/components/profile/SendRequestModal'; // Assuming this is still used

// import { createServerSupabaseClient } from '@/lib/supabase/server';

// export default async function PublicProfilePage({ params }) {
//   const { username } = await params;

//   const supabase = await createServerSupabaseClient();

//   const { data: { user: currentUser } } = await supabase.auth.getUser();
//   const currentUserId = currentUser?.id || null;

//   const { data: userProfile, error: profileError } = await supabase
//     .from('profiles')
//     .select('*, user_skills(skills(name, slug))')
//     .eq('username', username)
//     .single();

//   if (profileError && profileError.code !== 'PGRST116') {
//     console.error("Error fetching user profile:", profileError);
//     return (
//       <div className="container mx-auto py-8 text-center">
//         <h1 className="text-3xl font-bold text-red-600 mb-4">Error Loading Profile</h1>
//         <p className="text-gray-600">An error occurred while trying to load the profile. Please try again later.</p>
//       </div>
//     );
//   }

//   if (!userProfile) {
//     return (
//       <div className="container mx-auto py-8 text-center">
//         <h1 className="text-3xl font-bold text-gray-900 mb-4">User Not Found</h1>
//         <p className="text-gray-600">The profile you are looking for does not exist.</p>
//       </div>
//     );
//   }

//   // --- FIX: Fetch ratings and rater profiles separately ---

//   // 1. Fetch raw ratings for this user
//   const { data: rawUserRatings, error: ratingsError } = await supabase
//     .from('ratings')
//     .select('id, rating, testimonial_content, created_at, rater_id') // Only select direct columns
//     .eq('rated_user_id', userProfile.id) // Get ratings where this user is the rated_user_id
//     .order('created_at', { ascending: false });

//   if (ratingsError) {
//     console.error("Error fetching raw user ratings:", ratingsError);
//     // Continue even if error, but ratings/testimonials won't show
//   }

//   // 2. Collect all unique rater_ids from these ratings
//   const allRaterIds = new Set();
//   rawUserRatings?.forEach(rating => {
//     allRaterIds.add(rating.rater_id);
//   });
//   const uniqueRaterIds = Array.from(allRaterIds).filter(Boolean);

//   let raterProfilesMap = new Map();
//   if (uniqueRaterIds.length > 0) {
//     // 3. Fetch profiles for all unique rater IDs
//     const { data: raterProfiles, error: raterProfilesError } = await supabase
//       .from('profiles')
//       .select('id, full_name, username, profile_picture_url')
//       .in('id', uniqueRaterIds);

//     if (raterProfilesError) {
//       console.error("Error fetching rater profiles:", raterProfilesError);
//     } else if (raterProfiles) {
//       raterProfiles.forEach(profile => {
//         raterProfilesMap.set(profile.id, profile);
//       });
//     }
//   }

//   // 4. Map the rater profiles back into the userRatings
//   const enrichedUserRatings = rawUserRatings ? rawUserRatings.map(rating => ({
//     ...rating,
//     rater_profile: raterProfilesMap.get(rating.rater_id),
//   })) : [];


//   // Calculate average rating and total ratings count
//   let averageRating = 0;
//   let totalRatingsCount = 0;
//   if (enrichedUserRatings.length > 0) {
//     const totalRatingSum = enrichedUserRatings.reduce((sum, r) => sum + r.rating, 0);
//     averageRating = totalRatingSum / enrichedUserRatings.length;
//     totalRatingsCount = enrichedUserRatings.length;
//   }

//   // Check for existing peer request status between current user and this profile user
//   let isConnected = false;
//   let requestStatus = null;

//   if (currentUserId && currentUserId !== userProfile.id) {
//     const { data: existingRequest, error: requestCheckError } = await supabase
//       .from('peer_requests')
//       .select('status')
//       .or(`and(sender_id.eq.${currentUserId},receiver_id.eq.${userProfile.id}),and(sender_id.eq.${userProfile.id},receiver_id.eq.${currentUserId})`)
//       .single();

//     if (requestCheckError && requestCheckError.code !== 'PGRST116') {
//       console.error("Error checking existing request status:", requestCheckError);
//     } else if (existingRequest) {
//       requestStatus = existingRequest.status;
//       if (requestStatus === 'accepted') {
//         isConnected = true;
//       }
//     }
//   }

//   const skillsForDisplay = userProfile.user_skills.map(us => us.skills.name);

//   return (
//     <div className="container mx-auto py-8 max-w-4xl">
//       <Card className="p-6">
//         <CardHeader className="flex flex-col md:flex-row items-center md:items-start gap-6 pb-4">
//           <Avatar className="h-28 w-28 border-4 border-blue-500 shadow-md">
//             <AvatarImage src={userProfile.profile_picture_url || `https://api.dicebear.com/7.x/lorelei/svg?seed=${userProfile.username}`} alt={`${userProfile.full_name}'s profile`} />
//             <AvatarFallback>{userProfile.full_name?.charAt(0) || userProfile.username?.charAt(0) || 'U'}</AvatarFallback>
//           </Avatar>
//           <div className="text-center md:text-left flex-1">
//             <CardTitle className="text-4xl font-bold text-gray-900 mb-2">{userProfile.full_name}</CardTitle>
//             <CardDescription className="text-xl text-gray-700 mb-2">@{userProfile.username}</CardDescription>
//             <div className="flex items-center justify-center md:justify-start text-lg text-gray-600 mb-2">
//               <Star className="h-5 w-5 text-yellow-500 mr-1 fill-current" />
//               <span>{averageRating.toFixed(1)} Average Rating ({totalRatingsCount} ratings)</span>
//             </div>
//             {currentUserId && ( // Only show button if a user is logged in
//               <SendRequestModal
//                 recipientName={userProfile.full_name}
//                 recipientUsername={userProfile.username}
//                 recipientId={userProfile.id}
//                 currentUserId={currentUserId}
//                 isConnected={isConnected}
//                 requestStatus={requestStatus}
//               />
//             )}
//           </div>
//         </CardHeader>

//         <Separator className="my-6" />

//         <CardContent className="space-y-6">
//           {/* Bio Section */}
//           <div>
//             <h2 className="text-2xl font-semibold text-gray-800 mb-3">About {userProfile.full_name?.split(' ')[0] || userProfile.username}</h2>
//             <p className="text-gray-700 leading-relaxed">{userProfile.bio}</p>
//           </div>

//           {/* Skills Section */}
//           <div>
//             <h2 className="text-2xl font-semibold text-gray-800 mb-3">Expertise Badges</h2>
//             <div className="flex flex-wrap gap-2">
//               {skillsForDisplay.length > 0 ? (
//                 skillsForDisplay.map(skill => (
//                   <Badge key={skill} variant="default" className="text-base px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white">
//                     {skill}
//                   </Badge>
//                 ))
//               ) : (
//                 <p className="text-gray-600">No skills listed yet.</p>
//               )}
//             </div>
//           </div>

//           {/* Testimonials Section */}
//           <div>
//             <h2 className="text-2xl font-semibold text-gray-800 mb-3">Testimonials</h2>
//             {enrichedUserRatings.length > 0 ? (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {enrichedUserRatings.map(testimonial => (
//                   <Card key={testimonial.id} className="p-4 bg-gray-50 border border-gray-200">
//                     <div className="flex items-center mb-2">
//                       {[...Array(testimonial.rating)].map((_, i) => (
//                         <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
//                       ))}
//                       {[...Array(5 - testimonial.rating)].map((_, i) => (
//                         <Star key={i} className="h-4 w-4 text-gray-300" />
//                       ))}
//                     </div>
//                     <p className="text-gray-800 italic mb-2">"{testimonial.testimonial_content}"</p>
//                     <p className="text-sm text-gray-500">- {testimonial.rater_profile?.full_name || testimonial.rater_profile?.username || 'Anonymous'}</p>
//                     <p className="text-xs text-gray-500 mt-1">on {new Date(testimonial.created_at).toLocaleDateString()}</p>
//                   </Card>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-gray-600">No testimonials yet.</p>
//             )}
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }









///////come back here......
// // app/profile/[username]/page.jsx
// // No "use client" here, this is a Server Component

// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { Separator } from "@/components/ui/separator";
// import { Star } from 'lucide-react';
// import { SendRequestButton } from '@/components/profile/SendRequestButton'; // Using SendRequestButton

// import { createServerSupabaseClient } from '@/lib/supabase/server';

// export default async function PublicProfilePage({ params }) {
//   const { username } = await params;

//   const supabase = await createServerSupabaseClient();

//   const { data: { user: currentUser } } = await supabase.auth.getUser();
//   const currentUserId = currentUser?.id || null;

//   const { data: userProfile, error: profileError } = await supabase
//     .from('profiles')
//     .select('*, user_skills(skills(name, slug))')
//     .eq('username', username)
//     .single();

//   if (profileError && profileError.code !== 'PGRST116') {
//     console.error("Error fetching user profile:", profileError);
//     return (
//       <div className="container mx-auto py-8 text-center">
//         <h1 className="text-3xl font-bold text-red-600 mb-4">Error Loading Profile</h1>
//         <p className="text-gray-600">An error occurred while trying to load the profile. Please try again later.</p>
//       </div>
//     );
//   }

//   if (!userProfile) {
//     return (
//       <div className="container mx-auto py-8 text-center">
//         <h1 className="text-3xl font-bold text-gray-900 mb-4">User Not Found</h1>
//         <p className="text-gray-600">The profile you are looking for does not exist.</p>
//       </div>
//     );
//   }

//   // Fetch ratings and testimonials for this user
//   const { data: rawUserRatings, error: ratingsError } = await supabase
//     .from('ratings')
//     .select(`
//       id,
//       rating,
//       testimonial_content,
//       created_at,
//       rater_id // Select rater_id directly, we'll fetch profile separately
//     `)
//     .eq('rated_user_id', userProfile.id)
//     .order('created_at', { ascending: false });

//   if (ratingsError) {
//     console.error("Error fetching raw user ratings:", ratingsError);
//   }

//   // --- FIX: Fetch rater profiles separately and enrich ratings ---
//   let enrichedUserRatings = [];
//   let averageRating = 0;
//   let totalRatingsCount = 0;

//   if (rawUserRatings && rawUserRatings.length > 0) {
//     const allRaterIds = new Set();
//     rawUserRatings.forEach(rating => {
//       allRaterIds.add(rating.rater_id);
//     });
//     const uniqueRaterIds = Array.from(allRaterIds).filter(Boolean);

//     let raterProfilesMap = new Map();
//     if (uniqueRaterIds.length > 0) {
//       const { data: raterProfiles, error: raterProfilesError } = await supabase
//         .from('profiles')
//         .select('id, full_name, username, profile_picture_url')
//         .in('id', uniqueRaterIds);

//       if (raterProfilesError) {
//         console.error("Error fetching rater profiles:", raterProfilesError);
//       } else if (raterProfiles) {
//         raterProfiles.forEach(profile => {
//           raterProfilesMap.set(profile.id, profile);
//         });
//       }
//     }

//     enrichedUserRatings = rawUserRatings.map(rating => ({
//       ...rating,
//       rater_profile: raterProfilesMap.get(rating.rater_id),
//     }));

//     const totalRatingSum = enrichedUserRatings.reduce((sum, r) => sum + r.rating, 0);
//     averageRating = totalRatingSum / enrichedUserRatings.length;
//     totalRatingsCount = enrichedUserRatings.length;
//   }

//   // Check for existing peer request status between current user and this profile user
//   let isConnected = false;
//   let requestStatus = null;

//   if (currentUserId && currentUserId !== userProfile.id) {
//     const { data: existingRequest, error: requestCheckError } = await supabase
//       .from('peer_requests')
//       .select('status')
//       .or(`and(sender_id.eq.${currentUserId},receiver_id.eq.${userProfile.id}),and(sender_id.eq.${userProfile.id},receiver_id.eq.${currentUserId})`)
//       .single();

//     if (requestCheckError && requestCheckError.code !== 'PGRST116') {
//       console.error("Error checking existing request status:", requestCheckError);
//     } else if (existingRequest) {
//       requestStatus = existingRequest.status;
//       if (requestStatus === 'accepted') {
//         isConnected = true;
//       }
//     }
//   }

//   const skillsForDisplay = userProfile.user_skills.map(us => us.skills.name);

//   return (
//     <div className="container mx-auto py-8 max-w-4xl">
//       <Card className="p-6">
//         <CardHeader className="flex flex-col md:flex-row items-center md:items-start gap-6 pb-4">
//           <Avatar className="h-28 w-28 border-4 border-blue-500 shadow-md">
//             <AvatarImage src={userProfile.profile_picture_url || `https://api.dicebear.com/7.x/lorelei/svg?seed=${userProfile.username}`} alt={`${userProfile.full_name}'s profile`} />
//             <AvatarFallback>{userProfile.full_name?.charAt(0) || userProfile.username?.charAt(0) || 'U'}</AvatarFallback>
//           </Avatar>
//           <div className="text-center md:text-left flex-1">
//             <CardTitle className="text-4xl font-bold text-gray-900 mb-2">{userProfile.full_name}</CardTitle>
//             <CardDescription className="text-xl text-gray-700 mb-2">@{userProfile.username}</CardDescription>
//             <div className="flex items-center justify-center md:justify-start text-lg text-gray-600 mb-2">
//               <Star className="h-5 w-5 text-yellow-500 mr-1 fill-current" />
//               <span>{averageRating.toFixed(1)} Average Rating ({totalRatingsCount} ratings)</span>
//             </div>
//             {currentUserId && (
//               <SendRequestButton
//                 recipientName={userProfile.full_name}
//                 recipientUsername={userProfile.username}
//                 recipientId={userProfile.id}
//                 currentUserId={currentUserId}
//                 isConnected={isConnected}
//                 requestStatus={requestStatus}
//               />
//             )}
//           </div>
//         </CardHeader>

//         <Separator className="my-6" />

//         <CardContent className="space-y-6">
//           {/* Bio Section */}
//           <div>
//             <h2 className="text-2xl font-semibold text-gray-800 mb-3">About {userProfile.full_name?.split(' ')[0] || userProfile.username}</h2>
//             <p className="text-gray-700 leading-relaxed">{userProfile.bio}</p>
//           </div>

//           {/* Skills Section */}
//           <div>
//             <h2 className="text-2xl font-semibold text-gray-800 mb-3">Expertise Badges</h2>
//             <div className="flex flex-wrap gap-2">
//               {skillsForDisplay.length > 0 ? (
//                 skillsForDisplay.map(skill => (
//                   <Badge key={skill} variant="default" className="text-base px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white">
//                     {skill}
//                   </Badge>
//                 ))
//               ) : (
//                 <p className="text-gray-600">No skills listed yet.</p>
//               )}
//             </div>
//           </div>

//           {/* Testimonials Section */}
//           <div>
//             <h2 className="text-2xl font-semibold text-gray-800 mb-3">Testimonials</h2>
//             {enrichedUserRatings.length > 0 ? ( // Use enrichedUserRatings here
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {enrichedUserRatings.map(testimonial => (
//                   <Card key={testimonial.id} className="p-4 bg-gray-50 border border-gray-200">
//                     <div className="flex items-center mb-2">
//                       {[...Array(testimonial.rating)].map((_, i) => (
//                         <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
//                       ))}
//                       {[...Array(5 - testimonial.rating)].map((_, i) => (
//                         <Star key={i} className="h-4 w-4 text-gray-300" />
//                       ))}
//                     </div>
//                     <p className="text-gray-800 italic mb-2">"{testimonial.testimonial_content}"</p>
//                     <p className="text-sm text-gray-500">- {testimonial.rater_profile?.full_name || testimonial.rater_profile?.username || 'Anonymous'}</p>
//                     <p className="text-xs text-gray-500 mt-1">on {new Date(testimonial.created_at).toLocaleDateString()}</p>
//                   </Card>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-gray-600">No testimonials yet.</p>
//             )}
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }






// app/profile/[username]/page.jsx
// No "use client" here, this is a Server Component

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Star } from 'lucide-react';
// The SendRequestModal import was commented out by you, so it remains commented out.
// import { SendRequestModal } from '@/components/profile/SendRequestModal';

import { SendRequestButton } from '@/components/profile/SendRequestButton'; // CORRECT: Import the SendRequestButton

import { createServerSupabaseClient } from '@/lib/supabase/server';

export default async function PublicProfilePage({ params }) {
  const { username } = await params; // Corrected from `await params` to `params`

  const supabase = await createServerSupabaseClient();

  const { data: { user: currentUser } } = await supabase.auth.getUser();
  const currentUserId = currentUser?.id || null;

  const { data: userProfile, error: profileError } = await supabase
    .from('profiles')
    .select('*, user_skills(skills(name, slug))')
    .eq('username', username)
    .single();

  if (profileError && profileError.code !== 'PGRST116') {
    console.error("Error fetching user profile:", profileError);
    return (
      <div className="container mx-auto py-8 text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Error Loading Profile</h1>
        <p className="text-gray-600">An error occurred while trying to load the profile. Please try again later.</p>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="container mx-auto py-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">User Not Found</h1>
        <p className="text-gray-600">The profile you are looking for does not exist.</p>
      </div>
    );
  }

  // Fetch ratings and testimonials for this user
  // FIX: Fetch ratings and rater profiles separately to avoid join issues
  const { data: rawUserRatings, error: ratingsError } = await supabase
    .from('ratings')
    .select('id, rating, testimonial_content, created_at, rater_id') // Select rater_id directly
    .eq('rated_user_id', userProfile.id)
    .order('created_at', { ascending: false });

  if (ratingsError) {
    console.error("Error fetching raw user ratings:", ratingsError);
    // Continue even if error, but ratings/testimonials won't show
  }

  let enrichedUserRatings = [];
  let averageRating = 0;
  let totalRatingsCount = 0;

  if (rawUserRatings && rawUserRatings.length > 0) {
    const allRaterIds = new Set();
    rawUserRatings.forEach(rating => {
      allRaterIds.add(rating.rater_id);
    });
    const uniqueRaterIds = Array.from(allRaterIds).filter(Boolean);

    let raterProfilesMap = new Map();
    if (uniqueRaterIds.length > 0) {
      const { data: raterProfiles, error: raterProfilesError } = await supabase
        .from('profiles')
        .select('id, full_name, username, profile_picture_url')
        .in('id', uniqueRaterIds);

      if (raterProfilesError) {
        console.error("Error fetching rater profiles:", raterProfilesError);
      } else if (raterProfiles) {
        raterProfiles.forEach(profile => {
          raterProfilesMap.set(profile.id, profile);
        });
      }
    }

    enrichedUserRatings = rawUserRatings.map(rating => ({
      ...rating,
      rater_profile: raterProfilesMap.get(rating.rater_id),
    }));

    const totalRatingSum = enrichedUserRatings.reduce((sum, r) => sum + r.rating, 0);
    averageRating = totalRatingSum / enrichedUserRatings.length;
    totalRatingsCount = enrichedUserRatings.length;
  }


  // Check for existing peer request status between current user and this profile user
  let isConnected = false;
  let requestStatus = null;

  if (currentUserId && currentUserId !== userProfile.id) {
    const { data: existingRequest, error: requestCheckError } = await supabase
      .from('peer_requests')
      .select('status')
      .or(`and(sender_id.eq.${currentUserId},receiver_id.eq.${userProfile.id}),and(sender_id.eq.${userProfile.id},receiver_id.eq.${currentUserId})`)
      .single();

    if (requestCheckError && requestCheckError.code !== 'PGRST116') {
      console.error("Error checking existing request status:", requestCheckError);
    } else if (existingRequest) {
      requestStatus = existingRequest.status;
      if (requestStatus === 'accepted') {
        isConnected = true;
      }
    }
  }

  const skillsForDisplay = userProfile.user_skills.map(us => us.skills.name);

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <Card className="p-6">
        <CardHeader className="flex flex-col md:flex-row items-center md:items-start gap-6 pb-4">
          <Avatar className="h-28 w-28 border-4 border-blue-500 shadow-md">
            <AvatarImage src={userProfile.profile_picture_url || `https://api.dicebear.com/7.x/lorelei/svg?seed=${userProfile.username}`} alt={`${userProfile.full_name}'s profile`} />
            <AvatarFallback>{userProfile.full_name?.charAt(0) || userProfile.username?.charAt(0) || 'U'}</AvatarFallback>
          </Avatar>
          <div className="text-center md:text-left flex-1">
            <CardTitle className="text-4xl font-bold text-gray-900 mb-2">{userProfile.full_name}</CardTitle>
            <CardDescription className="text-xl text-gray-700 mb-2">@{userProfile.username}</CardDescription>
            <div className="flex items-center justify-center md:justify-start text-lg text-gray-600 mb-2">
              <Star className="h-5 w-5 text-yellow-500 mr-1 fill-current" />
              <span>{averageRating.toFixed(1)} Average Rating ({totalRatingsCount} ratings)</span>
            </div>
            {currentUserId && ( // Only show button if a user is logged in
              <SendRequestButton
                recipientId={userProfile.id}
                currentUserId={currentUserId}
                isConnected={isConnected}
                requestStatus={requestStatus}
              />
            )}
          </div>
        </CardHeader>

        <Separator className="my-6" />

        <CardContent className="space-y-6">
          {/* Bio Section */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">About {userProfile.full_name?.split(' ')[0] || userProfile.username}</h2>
            <p className="text-gray-700 leading-relaxed">{userProfile.bio}</p>
          </div>

          {/* Skills Section */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">Expertise Badges</h2>
            <div className="flex flex-wrap gap-2">
              {skillsForDisplay.length > 0 ? (
                skillsForDisplay.map(skill => (
                  <Badge key={skill} variant="default" className="text-base px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white">
                    {skill}
                  </Badge>
                ))
              ) : (
                <p className="text-gray-600">No skills listed yet.</p>
              )}
            </div>
          </div>

          {/* Testimonials Section */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">Testimonials</h2>
            {enrichedUserRatings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {enrichedUserRatings.map(testimonial => (
                  <Card key={testimonial.id} className="p-4 bg-gray-50 border border-gray-200">
                    <div className="flex items-center mb-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                      ))}
                      {[...Array(5 - testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-gray-300" />
                      ))}
                    </div>
                    <p className="text-gray-800 italic mb-2">"{testimonial.testimonial_content}"</p>
                    <p className="text-sm text-gray-500">- {testimonial.rater_profile?.full_name || testimonial.rater_profile?.username || 'Anonymous'}</p>
                    <p className="text-xs text-gray-500 mt-1">on {new Date(testimonial.created_at).toLocaleDateString()}</p>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No testimonials yet.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}