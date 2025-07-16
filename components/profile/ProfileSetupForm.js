// // components/profile/ProfileSetupForm.jsx
// "use client"; // This MUST be the very first line

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import  MultiSelect  from '@/components/little/MultiSelect'; 
// import { Loader2, UserCircle2 } from 'lucide-react'; // Icons

// // Import the saveProfile Server Action
// import { saveProfile } from '@/actions/profile';

// // Dummy data for available skills (if not passed as props, for fallback/initial structure)
// // This will be replaced by actual data fetched from Supabase via props
// const dummyAvailableSkills = [
//   { value: 'react-js', label: 'React.js' },
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
//   { value: 'frontend-development', label: 'Frontend Development' },
//   { value: 'backend-development', label: 'Backend Development' },
//   { value: 'mobile-development', label: 'Mobile Development' },
//   { value: 'cybersecurity', label: 'Cybersecurity' },
//   { value: 'graphic-design', label: 'Graphic Design' },
// ];

// // ProfileSetupForm now accepts initialProfile and initialSkills as props
// export function ProfileSetupForm({ initialProfile, initialSkills, availableSkills }) {
//   const router = useRouter();

//   const [fullName, setFullName] = useState(initialProfile?.full_name || '');
//   const [username, setUsername] = useState(initialProfile?.username || '');
//   const [bio, setBio] = useState(initialProfile?.bio || '');
//   const [selectedSkills, setSelectedSkills] = useState(initialSkills || []); // Use initialSkills
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');

//   // Effect to update state if initialProfile/initialSkills props change (e.g., after a refresh)
//   useEffect(() => {
//     setFullName(initialProfile?.full_name || '');
//     setUsername(initialProfile?.username || '');
//     setBio(initialProfile?.bio || '');
//     setSelectedSkills(initialSkills || []);
//   }, [initialProfile, initialSkills]);


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccessMessage('');
//     setLoading(true);

//     // Create FormData object
//     const formData = new FormData();
//     formData.append('fullName', fullName);
//     formData.append('username', username);
//     formData.append('bio', bio);
//     // Stringify selectedSkills as Server Actions expect FormData, not direct objects
//     formData.append('selectedSkills', JSON.stringify(selectedSkills));

//     // Call the Server Action
//     const { success, error: saveError, username: savedUsername } = await saveProfile(formData);

//     if (saveError) {
//       console.error("Error saving profile:", saveError);
//       setError(saveError);
//     } else if (success) {
//       setSuccessMessage("Profile saved successfully!");
//       // router.refresh() is handled by the Server Action's revalidatePath
//       // Redirect to the public profile page using the saved username
//       router.push(`/profile/${savedUsername}`);
//     } else {
//       setError("An unexpected error occurred.");
//     }

//     setLoading(false);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       {/* Profile Picture Upload (UI only for now) */}
//       <div className="flex flex-col items-center space-y-4">
//         <div className="relative w-24 h-24 rounded-full border-2 border-fuchsia-500 flex items-center justify-center overflow-hidden bg-gray-200">
//           {/* Placeholder for profile picture */}
//           <UserCircle2 className="w-16 h-16 text-gray-500" />
//           {/* <img src={profilePictureUrl} alt="Profile" className="w-full h-full object-cover" /> */}
//         </div>
//         <Button variant="outline" type="button" disabled={loading}>
//           Upload Profile Picture (Coming Soon)
//         </Button>
//       </div>

//       {/* Full Name */}
//       <div className="space-y-2">
//         <Label htmlFor="fullName">Full Name</Label>
//         <Input
//           id="fullName"
//           type="text"
//           placeholder="John Doe"
//           value={fullName}
//           onChange={(e) => setFullName(e.target.value)}
//           required
//           disabled={loading}
//         />
//       </div>

//       {/* Username */}
//       <div className="space-y-2">
//         <Label htmlFor="username">Username</Label>
//         <Input
//           id="username"
//           type="text"
//           placeholder="john_doe"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           required
//           disabled={loading}
//         />
//       </div>

//       {/* Bio */}
//       <div className="space-y-2">
//         <Label htmlFor="bio">Bio</Label>
//         <Textarea
//           id="bio"
//           placeholder="Tell us about yourself..."
//           value={bio}
//           onChange={(e) => setBio(e.target.value)}
//           rows={4}
//           disabled={loading}
//         />
//       </div>

//       {/* Skills MultiSelect */}
//       <div className="space-y-2">
//         <Label htmlFor="skills">Skills</Label>
//         <MultiSelect
//           options={availableSkills || dummyAvailableSkills} // Use availableSkills prop, fallback to dummy
//           selected={selectedSkills}
//           onChange={setSelectedSkills}
//           placeholder="Select your skills..."
//           disabled={loading}
//         />
//       </div>

//       {error && <p className="text-red-500 text-sm text-center">{error}</p>}
//       {successMessage && <p className="text-green-600 text-sm text-center">{successMessage}</p>}

//       <Button type="submit" className="w-full" disabled={loading}>
//         {loading ? (
//           <>
//             <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
//           </>
//         ) : (
//           "Save Profile"
//         )}
//       </Button>
//     </form>
//   );
// }


// // components/profile/ProfileSetupForm.jsx
// "use client"; // This MUST be the very first line

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import MultiSelect from '@/components/little/MultiSelect'; // Corrected path to your MultiSelect
// import { Loader2, UserCircle2 } from 'lucide-react'; // Icons

// // Import the saveProfile Server Action
// import { saveProfile } from '@/actions/profile';

// // ProfileSetupForm now accepts initialProfile, initialSkills, and all availableSkills as props
// export function ProfileSetupForm({ initialProfile, initialSkills, availableSkills }) {
//   const router = useRouter();

//   const [fullName, setFullName] = useState(initialProfile?.full_name || '');
//   const [username, setUsername] = useState(initialProfile?.username || '');
//   const [bio, setBio] = useState(initialProfile?.bio || '');
//   // State to hold selected skills as a list of full objects { value, label }
//   // initialSkills are already in { value, label } format from getProfileAndSkills
//   const [selectedSkills, setSelectedSkills] = useState(initialSkills || []);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');

//   // Effect to update state if initialProfile/initialSkills props change (e.g., after a refresh)
//   useEffect(() => {
//     setFullName(initialProfile?.full_name || '');
//     setUsername(initialProfile?.username || '');
//     setBio(initialProfile?.bio || '');
//     // Ensure initialSkills are correctly set when props update
//     setSelectedSkills(initialSkills || []);
//   }, [initialProfile, initialSkills]);

//   // Handler for MultiSelect's onChange event.
//   // It receives an array of selected `value` (slugs) from MultiSelect.
//   // We need to convert these slugs back to full `{ value, label }` objects for our state.
//   const handleSkillsChange = (selectedSlugs) => {
//     const newSelectedObjects = selectedSlugs.map(slug => {
//       // Find the corresponding full skill object from the `availableSkills` prop
//       return availableSkills.find(skill => skill.value === slug);
//     }).filter(Boolean); // Filter out any undefined results if a slug isn't found

//     setSelectedSkills(newSelectedObjects);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccessMessage('');
//     setLoading(true);

//     if (fullName.trim() === '' || username.trim() === '') {
//       setError("Full Name and Username are required.");
//       setLoading(false);
//       return;
//     }

//     // Create FormData object to send to the Server Action
//     const formData = new FormData();
//     formData.append('fullName', fullName);
//     formData.append('username', username);
//     formData.append('bio', bio);
//     // Stringify the array of selected skill objects.
//     // The Server Action will parse this JSON string.
//     formData.append('selectedSkills', JSON.stringify(selectedSkills));

//     // Call the Server Action to save the profile
//     const { success, error: saveError, username: savedUsername } = await saveProfile(formData);

//     if (saveError) {
//       console.error("Error saving profile:", saveError);
//       setError(saveError);
//     } else if (success) {
//       setSuccessMessage("Profile saved successfully!");
//       // Redirect to the public profile page using the saved username
//       router.push(`/profile/${savedUsername}`);
//     } else {
//       setError("An unexpected error occurred.");
//     }

//     setLoading(false);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       {/* Profile Picture Upload (UI only for now) */}
//       <div className="flex flex-col items-center space-y-4">
//         <div className="relative w-24 h-24 rounded-full border-2 border-fuchsia-500 flex items-center justify-center overflow-hidden bg-gray-200">
//           {/* Placeholder for profile picture */}
//           <UserCircle2 className="w-16 h-16 text-gray-500" />
//           {/* <img src={profilePictureUrl} alt="Profile" className="w-full h-full object-cover" /> */}
//         </div>
//         <Button variant="outline" type="button" disabled={loading}>
//           Upload Profile Picture (Coming Soon)
//         </Button>
//       </div>

//       {/* Full Name */}
//       <div className="space-y-2">
//         <Label htmlFor="fullName">Full Name</Label>
//         <Input
//           id="fullName"
//           type="text"
//           placeholder="John Doe"
//           value={fullName}
//           onChange={(e) => setFullName(e.target.value)}
//           required
//           disabled={loading}
//         />
//       </div>

//       {/* Username */}
//       <div className="space-y-2">
//         <Label htmlFor="username">Username</Label>
//         <Input
//           id="username"
//           type="text"
//           placeholder="john_doe"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           required
//           disabled={loading}
//         />
//       </div>

//       {/* Bio */}
//       <div className="space-y-2">
//         <Label htmlFor="bio">Bio</Label>
//         <Textarea
//           id="bio"
//           placeholder="Tell us about yourself..."
//           value={bio}
//           onChange={(e) => setBio(e.target.value)}
//           rows={4}
//           disabled={loading}
//         />
//       </div>

//       {/* Skills MultiSelect */}
//       <div className="space-y-2">
//         <Label htmlFor="skills">Skills</Label>
//         <MultiSelect
//           options={availableSkills} // All available options from DB
//           selected={selectedSkills.map(s => s.value)} // Pass only the values (slugs) to MultiSelect
//           onChange={handleSkillsChange} // Use the new handler
//           placeholder="Select your skills..."
//           disabled={loading}
//         />
//       </div>

//       {error && <p className="text-red-500 text-sm text-center">{error}</p>}
//       {successMessage && <p className="text-green-600 text-sm text-center">{successMessage}</p>}

//       <Button type="submit" className="w-full" disabled={loading}>
//         {loading ? (
//           <>
//             <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
//           </>
//         ) : (
//           "Save Profile"
//         )}
//       </Button>
//     </form>
//   );
// }






// components/profile/ProfileSetupForm.jsx
// "use client";

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import MultiSelect from '@/components/little/MultiSelect';
// import { Loader2, UserCircle2 } from 'lucide-react';

// import { saveProfile } from '@/actions/profile';

// export function ProfileSetupForm({ initialProfile, initialSkills, availableSkills }) {
//   const router = useRouter();

//   const [fullName, setFullName] = useState(initialProfile?.full_name || '');
//   const [username, setUsername] = useState(initialProfile?.username || '');
//   const [bio, setBio] = useState(initialProfile?.bio || '');
//   const [selectedSkills, setSelectedSkills] = useState(initialSkills || []);
//   const [profilePictureFile, setProfilePictureFile] = useState(null); // State for the selected file
//   const [profilePicturePreviewUrl, setProfilePicturePreviewUrl] = useState(initialProfile?.profile_picture_url || null); // State for preview URL

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');

//   // Effect to update state if initialProfile/initialSkills props change
//   useEffect(() => {
//     setFullName(initialProfile?.full_name || '');
//     setUsername(initialProfile?.username || '');
//     setBio(initialProfile?.bio || '');
//     setSelectedSkills(initialSkills || []);
//     setProfilePicturePreviewUrl(initialProfile?.profile_picture_url || null); // Update preview on prop change
//   }, [initialProfile, initialSkills]);

//   // Handler for MultiSelect's onChange event
//   const handleSkillsChange = (selectedSlugs) => {
//     const newSelectedObjects = selectedSlugs.map(slug => {
//       return availableSkills.find(skill => skill.value === slug);
//     }).filter(Boolean);

//     setSelectedSkills(newSelectedObjects);
//   };

//   // Handler for file input change
//   const handleFileChange = (e) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setProfilePictureFile(file);
//       setProfilePicturePreviewUrl(URL.createObjectURL(file)); // Create a temporary URL for preview
//     } else {
//       setProfilePictureFile(null);
//       // If no file selected, revert to initial URL or null if no initial URL
//       setProfilePicturePreviewUrl(initialProfile?.profile_picture_url || null);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccessMessage('');
//     setLoading(true);

//     if (fullName.trim() === '' || username.trim() === '') {
//       setError("Full Name and Username are required.");
//       setLoading(false);
//       return;
//     }

//     const formData = new FormData();
//     formData.append('fullName', fullName);
//     formData.append('username', username);
//     formData.append('bio', bio);
//     formData.append('selectedSkills', JSON.stringify(selectedSkills));
    
//     // Append the file if selected
//     if (profilePictureFile) {
//       formData.append('profilePicture', profilePictureFile);
//     } else if (initialProfile?.profile_picture_url) {
//       // If no new file is selected but there's an existing one, pass its URL
//       formData.append('currentProfilePictureUrl', initialProfile.profile_picture_url);
//     }

//     const { success, error: saveError, username: savedUsername } = await saveProfile(formData);

//     if (saveError) {
//       console.error("Error saving profile:", saveError);
//       setError(saveError);
//     } else if (success) {
//       setSuccessMessage("Profile saved successfully!");
//       // Revoke the object URL after successful upload to prevent memory leaks
//       if (profilePicturePreviewUrl && profilePicturePreviewUrl.startsWith('blob:')) {
//         URL.revokeObjectURL(profilePicturePreviewUrl);
//       }
//       router.push(`/profile/${savedUsername}`);
//     } else {
//       setError("An unexpected error occurred.");
//     }

//     setLoading(false);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       {/* Profile Picture Upload Section */}
//       <div className="flex flex-col items-center space-y-4">
//         <div className="relative w-24 h-24 rounded-full border-2 border-fuchsia-500 flex items-center justify-center overflow-hidden bg-gray-200">
//           {profilePicturePreviewUrl ? (
//             <img src={profilePicturePreviewUrl} alt="Profile Preview" className="w-full h-full object-cover" />
//           ) : (
//             <UserCircle2 className="w-16 h-16 text-gray-500" />
//           )}
//         </div>
//         <Label htmlFor="profilePicture" className="cursor-pointer">
//           <Button variant="outline" type="button" asChild disabled={loading}>
//             <input
//               id="profilePicture"
//               type="file"
//               accept="image/*"
//               onChange={handleFileChange}
//               className="hidden" // Hide the default file input
//               disabled={loading}
//             />
//             {profilePicturePreviewUrl ? "Change Profile Picture" : "Upload Profile Picture"}
//           </Button>
//         </Label>
//       </div>

//       {/* Full Name */}
//       <div className="space-y-2">
//         <Label htmlFor="fullName">Full Name</Label>
//         <Input
//           id="fullName"
//           type="text"
//           placeholder="John Doe"
//           value={fullName}
//           onChange={(e) => setFullName(e.target.value)}
//           required
//           disabled={loading}
//         />
//       </div>

//       {/* Username */}
//       <div className="space-y-2">
//         <Label htmlFor="username">Username</Label>
//         <Input
//           id="username"
//           type="text"
//           placeholder="john_doe"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           required
//           disabled={loading}
//         />
//       </div>

//       {/* Bio */}
//       <div className="space-y-2">
//         <Label htmlFor="bio">Bio</Label>
//         <Textarea
//           id="bio"
//           placeholder="Tell us about yourself..."
//           value={bio}
//           onChange={(e) => setBio(e.target.value)}
//           rows={4}
//           disabled={loading}
//         />
//       </div>

//       {/* Skills MultiSelect */}
//       <div className="space-y-2">
//         <Label htmlFor="skills">Skills</Label>
//         <MultiSelect
//           options={availableSkills}
//           selected={selectedSkills.map(s => s.value)}
//           onChange={handleSkillsChange}
//           placeholder="Select your skills..."
//           disabled={loading}
//         />
//       </div>

//       {error && <p className="text-red-500 text-sm text-center">{error}</p>}
//       {successMessage && <p className="text-green-600 text-sm text-center">{successMessage}</p>}

//       <Button type="submit" className="w-full" disabled={loading}>
//         {loading ? (
//           <>
//             <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
//           </>
//         ) : (
//           "Save Profile"
//         )}
//       </Button>
//     </form>
//   );
// }


// components/profile/ProfileSetupForm.jsx
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import MultiSelect from '@/components/little/MultiSelect';
import { Loader2, UserCircle2 } from 'lucide-react';

import { saveProfile } from '@/actions/profile';

export function ProfileSetupForm({ initialProfile, initialSkills, availableSkills }) {
  const router = useRouter();

  const [fullName, setFullName] = useState(initialProfile?.full_name || '');
  const [username, setUsername] = useState(initialProfile?.username || '');
  const [bio, setBio] = useState(initialProfile?.bio || '');
  const [selectedSkills, setSelectedSkills] = useState(initialSkills || []);
  const [profilePictureFile, setProfilePictureFile] = useState(null);
  const [profilePicturePreviewUrl, setProfilePicturePreviewUrl] = useState(initialProfile?.profile_picture_url || null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    setFullName(initialProfile?.full_name || '');
    setUsername(initialProfile?.username || '');
    setBio(initialProfile?.bio || '');
    setSelectedSkills(initialSkills || []);
    setProfilePicturePreviewUrl(initialProfile?.profile_picture_url || null);
  }, [initialProfile, initialSkills]);

  const handleSkillsChange = (selectedSlugs) => {
    const newSelectedObjects = selectedSlugs.map(slug => {
      return availableSkills.find(skill => skill.value === slug);
    }).filter(Boolean);

    setSelectedSkills(newSelectedObjects);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePictureFile(file);
      setProfilePicturePreviewUrl(URL.createObjectURL(file));
    } else {
      setProfilePictureFile(null);
      setProfilePicturePreviewUrl(initialProfile?.profile_picture_url || null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setLoading(true);

    if (fullName.trim() === '' || username.trim() === '') {
      setError("Full Name and Username are required.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('fullName', fullName);
    formData.append('username', username);
    formData.append('bio', bio);
    formData.append('selectedSkills', JSON.stringify(selectedSkills));
    
    if (profilePictureFile) {
      formData.append('profilePicture', profilePictureFile);
    } else if (initialProfile?.profile_picture_url) {
      formData.append('currentProfilePictureUrl', initialProfile.profile_picture_url);
    }

    const { success, error: saveError, username: savedUsername } = await saveProfile(formData);

    if (saveError) {
      console.error("Error saving profile:", saveError);
      setError(saveError);
    } else if (success) {
      setSuccessMessage("Profile saved successfully!");
      if (profilePicturePreviewUrl && profilePicturePreviewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(profilePicturePreviewUrl);
      }
      router.push(`/profile/${savedUsername}`);
    } else {
      setError("An unexpected error occurred.");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Profile Picture Upload Section */}
      <div className="flex flex-col items-center space-y-4">
        <div className="relative w-24 h-24 rounded-full border-2 border-fuchsia-500 flex items-center justify-center overflow-hidden bg-gray-200">
          {profilePicturePreviewUrl ? (
            <img src={profilePicturePreviewUrl} alt="Profile Preview" className="w-full h-full object-cover" />
          ) : (
            <UserCircle2 className="w-16 h-16 text-gray-500" />
          )}
        </div>
        <Label htmlFor="profilePicture" className="cursor-pointer">
          <Button variant="outline" type="button" asChild disabled={loading}>
            {/* FIX: Wrap both the input and the text in a single span or div */}
            <span>
              <input
                id="profilePicture"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden" // Hide the default file input
                disabled={loading}
              />
              {profilePicturePreviewUrl ? "Change Profile Picture" : "Upload Profile Picture"}
            </span>
          </Button>
        </Label>
      </div>

      {/* Full Name */}
      <div className="space-y-2">
        <Label htmlFor="fullName">Full Name</Label>
        <Input
          id="fullName"
          type="text"
          placeholder="John Doe"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          disabled={loading}
        />
      </div>

      {/* Username */}
      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          type="text"
          placeholder="john_doe"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          disabled={loading}
        />
      </div>

      {/* Bio */}
      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          placeholder="Tell us about yourself..."
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows={4}
          disabled={loading}
        />
      </div>

      {/* Skills MultiSelect */}
      <div className="space-y-2">
        <Label htmlFor="skills">Skills</Label>
        <MultiSelect
          options={availableSkills}
          selected={selectedSkills.map(s => s.value)}
          onChange={handleSkillsChange}
          placeholder="Select your skills..."
          disabled={loading}
        />
      </div>

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      {successMessage && <p className="text-green-600 text-sm text-center">{successMessage}</p>}

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
          </>
        ) : (
          "Save Profile"
        )}
      </Button>
    </form>
  );
}