// // app/(auth)/signup/page.jsx
// "use client"; // This page is a Client Component for form interactivity

// import { useState } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Loader2 } from 'lucide-react'; // For a loading spinner

// export default function SignUpPage() {
//   const router = useRouter();
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     confirmPassword: '',
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleChange = (e) => {
//     const { id, value } = e.target;
//     setFormData((prev) => ({ ...prev, [id]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match.");
//       setLoading(false);
//       return;
//     }

//     // --- Simulate Sign-Up Process ---
//     console.log("Simulating sign-up with:", formData.email, formData.password);
//     await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API call

//     if (formData.email === "test@example.com") { // Simulate a registration error
//       setError("This email is already registered. Please use a different one.");
//       setLoading(false);
//       return;
//     }

//     setLoading(false);
//     alert("Sign-up successful! Please complete your profile. (Simulated)");
//     router.push('/profile/setup'); // Redirect to profile setup after successful sign-up
//   };

//   return (
//     <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-gray-100 p-4">
//       <Card className="w-full max-w-md p-6">
//         <CardHeader className="text-center">
//           <CardTitle className="text-3xl font-bold text-gray-900">Sign Up</CardTitle>
//           <CardDescription className="text-gray-600">
//             Create your account to start sharing skills.
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="space-y-2">
//               <Label htmlFor="email">Email</Label>
//               <Input
//                 id="email"
//                 type="email"
//                 placeholder="you@example.com"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="password">Password</Label>
//               <Input
//                 id="password"
//                 type="password"
//                 placeholder="••••••••"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="confirmPassword">Confirm Password</Label>
//               <Input
//                 id="confirmPassword"
//                 type="password"
//                 placeholder="••••••••"
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             {error && <p className="text-red-500 text-sm text-center">{error}</p>}

//             <Button type="submit" className="w-full" disabled={loading}>
//               {loading ? (
//                 <>
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing Up...
//                 </>
//               ) : (
//                 "Sign Up"
//               )}
//             </Button>
//           </form>
//           <p className="text-center text-sm text-gray-600 mt-6">
//             Already have an account?{" "}
//             <Link href="/signin" className="text-blue-600 hover:underline"> {/* <-- CORRECTED LINK */}
//               Log In
//             </Link>
//           </p>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// // app/(auth)/signup/page.jsx
// "use client"; // This page is a Client Component for form interactivity

// import { useState } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Loader2 } from 'lucide-react';

// // NEW: Import the client-side Supabase client creator
// import { createClient } from '@/lib/supabase/client';

// export default function SignUpPage() {
//   const router = useRouter();
//   // NEW: Initialize Supabase client
//   const supabase = createClient();

//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     confirmPassword: '',
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [successMessage, setSuccessMessage] = useState(''); // NEW: For success messages

//   const handleChange = (e) => {
//     const { id, value } = e.target;
//     setFormData((prev) => ({ ...prev, [id]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccessMessage(''); // Clear previous messages
//     setLoading(true);

//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match.");
//       setLoading(false);
//       return;
//     }

//     // --- REAL SUPABASE SIGN-UP PROCESS ---
//     const { data, error } = await supabase.auth.signUp({
//       email: formData.email,
//       password: formData.password,
//       options: {
//         // You can add user metadata here if you collect it during signup
//         // For example, if you wanted to store full_name directly on auth.users table
//         // data: { full_name: 'User Name' }
//       }
//     });

//     if (error) {
//       console.error("Supabase Sign Up Error:", error);
//       setError(error.message); // Display error message from Supabase
//     } else if (data.user) {
//       // User signed up, but might need email confirmation
//       setSuccessMessage("Sign up successful! Please check your email to confirm your account.");
//       // Do NOT immediately redirect to dashboard. User needs to confirm email first.
//       // After email confirmation, Supabase will redirect them to a configured URL (e.g., /dashboard).
//     } else {
//       // This case might happen if email confirmation is required and no user object is returned immediately
//       setSuccessMessage("Sign up successful! Please check your email to confirm your account.");
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-gray-100 p-4">
//       <Card className="w-full max-w-md p-6">
//         <CardHeader className="text-center">
//           <CardTitle className="text-3xl font-bold text-gray-900">Sign Up</CardTitle>
//           <CardDescription className="text-gray-600">
//             Create your account to start sharing skills.
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="space-y-2">
//               <Label htmlFor="email">Email</Label>
//               <Input
//                 id="email"
//                 type="email"
//                 placeholder="you@example.com"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="password">Password</Label>
//               <Input
//                 id="password"
//                 type="password"
//                 placeholder="••••••••"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="confirmPassword">Confirm Password</Label>
//               <Input
//                 id="confirmPassword"
//                 type="password"
//                 placeholder="••••••••"
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             {error && <p className="text-red-500 text-sm text-center">{error}</p>}
//             {successMessage && <p className="text-green-600 text-sm text-center">{successMessage}</p>} {/* Display success */}

//             <Button type="submit" className="w-full" disabled={loading}>
//               {loading ? (
//                 <>
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing Up...
//                 </>
//               ) : (
//                 "Sign Up"
//               )}
//             </Button>
//           </form>
//           <p className="text-center text-sm text-gray-600 mt-6">
//             Already have an account?{" "}
//             <Link href="/signin" className="text-blue-600 hover:underline">
//               Log In
//             </Link>
//           </p>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// // app/(auth)/signup/page.jsx
// "use client"; // This page is a Client Component for form interactivity

// import { useState } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Loader2 } from 'lucide-react';

// // Import the client-side Supabase client creator
// import { createClient } from '@/lib/supabase/client';

// export default function SignUpPage() {
//   const router = useRouter();
//   // Initialize Supabase client
//   const supabase = createClient();

//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     confirmPassword: '',
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');

//   const handleChange = (e) => {
//     const { id, value } = e.target;
//     setFormData((prev) => ({ ...prev, [id]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccessMessage('');
//     setLoading(true);

//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match.");
//       setLoading(false);
//       return;
//     }

//     // --- REAL SUPABASE SIGN-UP PROCESS (NO EMAIL CONFIRMATION) ---
//     const { data, error } = await supabase.auth.signUp({
//       email: formData.email,
//       password: formData.password,
//       options: {
//         // IMPORTANT: Set emailRedirectTo to null to disable email confirmation flow
//         emailRedirectTo: null
//       }
//     });

//     if (error) {
//       console.error("Supabase Sign Up Error:", error);
//       setError(error.message); // Display error message from Supabase
//     } else if (data.user) {
//       // User is immediately signed in after signup if email confirmation is OFF
//       setSuccessMessage("Sign up successful! You are now logged in.");
//       router.refresh(); // Refresh layout to show logged-in state in header
//       router.push('/dashboard'); // Redirect to dashboard
//     } else {
//       // This case should ideally not be hit if email confirmation is OFF and no error
//       setError("An unexpected error occurred during sign up.");
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-gray-100 p-4">
//       <Card className="w-full max-w-md p-6">
//         <CardHeader className="text-center">
//           <CardTitle className="text-3xl font-bold text-gray-900">Sign Up</CardTitle>
//           <CardDescription className="text-gray-600">
//             Create your account to start sharing skills.
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="space-y-2">
//               <Label htmlFor="email">Email</Label>
//               <Input
//                 id="email"
//                 type="email"
//                 placeholder="you@example.com"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="password">Password</Label>
//               <Input
//                 id="password"
//                 type="password"
//                 placeholder="••••••••"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="confirmPassword">Confirm Password</Label>
//               <Input
//                 id="confirmPassword"
//                 type="password"
//                 placeholder="••••••••"
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             {error && <p className="text-red-500 text-sm text-center">{error}</p>}
//             {successMessage && <p className="text-green-600 text-sm text-center">{successMessage}</p>}

//             <Button type="submit" className="w-full" disabled={loading}>
//               {loading ? (
//                 <>
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing Up...
//                 </>
//               ) : (
//                 "Sign Up"
//               )}
//             </Button>
//           </form>
//           <p className="text-center text-sm text-gray-600 mt-6">
//             Already have an account?{" "}
//             <Link href="/signin" className="text-blue-600 hover:underline">
//               Log In
//             </Link>
//           </p>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// app/(auth)/signup/page.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client"; // Import client-side supabase

export default function SignUpPage() {
  const router = useRouter();
  const supabase = createClient(); // Use client-side supabase

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    // --- REAL SUPABASE SIGN-UP PROCESS (NO EMAIL CONFIRMATION) ---
    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        emailRedirectTo: null, // Explicitly disable email confirmation
      },
    });

    if (error) {
      console.error("Supabase Sign Up Error:", error);
      setError(error.message);
    } else if (data.user) {
      setSuccessMessage("Sign up successful! You are now logged in.");
      router.refresh(); // Crucial: Re-fetch layout to show logged-in state
      // router.push("/dashboard"); // Redirect to dashboard
      setTimeout(() => {
        router.push("/dashboard"); // Redirect to dashboard
      }, 500);
    } else {
      setError("An unexpected error occurred during sign up.");
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-gray-100 p-4">
      <Card className="w-full max-w-md p-6">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-gray-900">
            Sign Up
          </CardTitle>
          <CardDescription className="text-gray-600">
            Create your account to start sharing skills.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            {successMessage && (
              <p className="text-green-600 text-sm text-center">
                {successMessage}
              </p>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing
                  Up...
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{" "}
            <Link href="/signin" className="text-blue-600 hover:underline">
              Log In
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
