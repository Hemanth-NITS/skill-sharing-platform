// // app/profile/setup/page.jsx
// "use client"; // This page will be a Client Component for form interactivity

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label"; // Shadcn UI Label
// import { Textarea } from "@/components/ui/textarea"; // Shadcn UI Textarea
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // For profile picture preview
// import  MultiSelect  from '@/components/little/MultiSelect'; // <-- NEW: Our custom MultiSelect component for skills
// import { SendHorizonal } from 'lucide-react'; // Example icon for submit button

// // Dummy data for available skills
// const availableSkills = [
//   { value: 'react', label: 'React.js' },
//   { value: 'javascript', label: 'JavaScript' },
//   { value: 'nodejs', label: 'Node.js' },
//   { value: 'python', label: 'Python' },
//   { value: 'java', label: 'Java' },
//   { value: 'sql', label: 'SQL' },
//   { value: 'figma', label: 'Figma' },
//   { value: 'ui-ux-design', label: 'UI/UX Design' },
//   { value: 'machine-learning', label: 'Machine Learning' },
//   { value: 'data-science', label: 'Data Science' },
//   { value: 'mentoring', label: 'Mentoring' },
//   { value: 'frontend', label: 'Frontend Development' },
//   { value: 'backend', label: 'Backend Development' },
//   { value: 'mobile-dev', label: 'Mobile Development' },
//   { value: 'cybersecurity', label: 'Cybersecurity' },
//   { value: 'graphic-design', label: 'Graphic Design' },
// ];

// export default function ProfileSetupPage() {
//   const router = useRouter();
//   const [formData, setFormData] = useState({
//     fullName: '',
//     username: '',
//     mobile: '',
//     email: '', // Will be pre-filled with auth later
//     bio: '',
//     profilePicture: null, // For file object or URL
//     selectedSkills: [],
//   });
//   const [loading, setLoading] = useState(false);
//   const [profilePicPreview, setProfilePicPreview] = useState(null); // For image preview

//   const handleChange = (e) => {
//     const { id, value } = e.target;
//     setFormData((prev) => ({ ...prev, [id]: value }));
//   };

//   const handleSkillsChange = (selectedValues) => {
//     setFormData((prev) => ({ ...prev, selectedSkills: selectedValues }));
//   };

//   const handleProfilePicChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFormData((prev) => ({ ...prev, profilePicture: file }));
//       setProfilePicPreview(URL.createObjectURL(file)); // Create a URL for preview
//     } else {
//       setFormData((prev) => ({ ...prev, profilePicture: null }));
//       setProfilePicPreview(null);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault(); // Prevent default form submission
//     setLoading(true);

//     console.log("Profile Data Submitted:", formData);

//     // Simulate API call for profile creation
//     await new Promise((resolve) => setTimeout(resolve, 2000));

//     setLoading(false);
//     alert("Profile setup complete! (Simulated)");
//     router.push('/dashboard'); // Redirect to dashboard after setup
//   };

//   return (
//     <div className="container mx-auto py-8 max-w-3xl">
//       <Card className="p-6">
//         <CardHeader>
//           <CardTitle className="text-3xl font-bold text-gray-900">Complete Your Profile</CardTitle>
//           <CardDescription className="text-gray-600">
//             Tell us a bit about yourself and your skills to get started.
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Profile Picture Upload */}
//             <div className="flex flex-col items-center gap-4">
//               <Label htmlFor="profilePicture" className="text-lg font-semibold">Profile Picture</Label>
//               <Avatar className="h-24 w-24 border-2 border-gray-300">
//                 <AvatarImage src={profilePicPreview || "https://api.dicebear.com/7.x/lorelei/svg?seed=placeholder"} alt="Profile Preview" />
//                 <AvatarFallback>CN</AvatarFallback>
//               </Avatar>
//               <Input
//                 id="profilePicture"
//                 type="file"
//                 accept="image/*"
//                 onChange={handleProfilePicChange}
//                 className="w-full max-w-xs cursor-pointer"
//               />
//             </div>

//             {/* Basic Details */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="fullName">Full Name</Label>
//                 <Input
//                   id="fullName"
//                   type="text"
//                   placeholder="Your full Name"
//                   value={formData.fullName}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="username">Username</Label>
//                 <Input
//                   id="username"
//                   type="text"
//                   placeholder="@username"
//                   value={formData.username}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="mobile">Mobile Number</Label>
//                 <Input
//                   id="mobile"
//                   type="tel" // Use type="tel" for phone numbers
//                   placeholder="+91 9874563210"
//                   value={formData.mobile}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="email">Email</Label>
//                 <Input
//                   id="email"
//                   type="email"
//                   placeholder="user@example.com"
//                   value={formData.email}
//                   onChange={handleChange}
//                   disabled // Will be pre-filled and disabled after auth
//                 />
//               </div>
//             </div>

//             {/* Bio */}
//             <div className="space-y-2">
//               <Label htmlFor="bio">Bio (Optional)</Label>
//               <Textarea
//                 id="bio"
//                 placeholder="Tell us a little about yourself and what you're looking for."
//                 value={formData.bio}
//                 onChange={handleChange}
//                 rows={4}
//               />
//             </div>

//             {/* Expertise Badges / Talent Tags */}
//             <div className="space-y-2">
//               <Label htmlFor="skills">Expertise Badges / Talent Tags</Label>
//               <MultiSelect
//                 options={availableSkills}
//                 selected={formData.selectedSkills}
//                 onChange={handleSkillsChange}
//                 placeholder="Select your skills..."
//               />
//             </div>

//             {/* Submit Button */}
//             <Button type="submit" className="w-full" disabled={loading}>
//               {loading ? (
//                 <>
//                   <SendHorizonal className="mr-2 h-4 w-4 animate-pulse" /> Saving Profile...
//                 </>
//               ) : (
//                 "Complete Profile"
//               )}
//             </Button>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }







// app/profile/setup/page.jsx
// No "use client" here, this is a Server Component

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ProfileSetupForm } from '@/components/profile/ProfileSetupForm'; // Import the new Client Component
import { getProfileAndSkills } from '@/actions/profile'; // Import the Server Action to fetch data
import { createServerSupabaseClient } from '@/lib/supabase/server'; // Needed to get the user ID

export default async function ProfileSetupPage() {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    // This page should ideally be protected by middleware,
    // but as a fallback, if no user, redirect to login.
    // In a real app, middleware would handle this before the page even loads.
    // For now, we'll let it render with empty data if no user.
    console.warn("ProfileSetupPage accessed without an authenticated user.");
    // Consider adding a redirect here if you want strict protection before middleware
    // redirect('/signin');
  }

  // Fetch initial profile data and skills using the Server Action
  const { profile, skills: initialSkills } = await getProfileAndSkills();

  // Fetch all available skills from the database for the MultiSelect options
  const { data: availableSkills, error: skillsError } = await supabase
    .from('skills')
    .select('name, slug');

  if (skillsError) {
    console.error("Error fetching all available skills:", skillsError);
    // Handle error, perhaps return an empty array or a specific error state
  }

  // Format available skills for MultiSelect (value: slug, label: name)
  const formattedAvailableSkills = availableSkills ? availableSkills.map(s => ({
    value: s.slug,
    label: s.name,
  })) : [];


  return (
    <div className="container mx-auto py-8 max-w-3xl">
      <Card className="p-6">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-gray-900">
            {profile?.full_name ? 'Update Your Profile' : 'Complete Your Profile'}
          </CardTitle>
          <CardDescription className="text-gray-600">
            {profile?.full_name ? 'Update your personal details and skills.' : 'Tell us about yourself and your skills to get started.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Pass fetched data as props to the client component */}
          <ProfileSetupForm
            initialProfile={profile}
            initialSkills={initialSkills}
            availableSkills={formattedAvailableSkills}
          />
        </CardContent>
      </Card>
    </div>
  );
}