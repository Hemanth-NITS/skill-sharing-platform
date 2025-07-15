// // app/(auth)/signin/page.jsx
// "use client"; // This page is a Client Component for form interactivity

// import { useState } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Loader2 } from 'lucide-react'; // For a loading spinner

// export default function SignInPage() {
//   const router = useRouter();
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
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

//     // --- Simulate Sign-In Process ---
//     console.log("Simulating sign-in with:", formData.email, formData.password);
//     await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API call

//     // Basic simulated validation
//     if (formData.email === "user@example.com" && formData.password === "password123") {
//       setLoading(false);
//       alert("Sign-in successful! (Simulated)");
//       router.push('/dashboard'); // Redirect to dashboard after successful sign-in
//     } else {
//       setError("Invalid email or password.");
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-gray-100 p-4">
//       <Card className="w-full max-w-md p-6">
//         <CardHeader className="text-center">
//           <CardTitle className="text-3xl font-bold text-gray-900">Log In</CardTitle>
//           <CardDescription className="text-gray-600">
//             Access your account to continue your learning journey.
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

//             {error && <p className="text-red-500 text-sm text-center">{error}</p>}

//             <Button type="submit" className="w-full" disabled={loading}>
//               {loading ? (
//                 <>
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Logging In...
//                 </>
//               ) : (
//                 "Log In"
//               )}
//             </Button>
//           </form>
//           <p className="text-center text-sm text-gray-600 mt-6">
//             <Link href="/reset-password" className="text-blue-600 hover:underline"> {/* <-- CORRECTED LINK */}
//               Forgot your password?
//             </Link>
//           </p>
//           <p className="text-center text-sm text-gray-600 mt-2">
//             Don't have an account?{" "}
//             <Link href="/signup" className="text-blue-600 hover:underline"> {/* <-- CORRECTED LINK */}
//               Sign Up
//             </Link>
//           </p>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }











// // app/(auth)/signin/page.jsx
// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Loader2 } from "lucide-react";
// import { createClient } from "@/lib/supabase/client"; // Import client-side supabase

// export default function SignInPage() {
//   const router = useRouter();
//   const supabase = createClient(); // Use client-side supabase

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     const { id, value } = e.target;
//     setFormData((prev) => ({ ...prev, [id]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     // --- REAL SUPABASE SIGN-IN PROCESS ---
//     const { data, error } = await supabase.auth.signInWithPassword({
//       email: formData.email,
//       password: formData.password,
//     });

//     if (error) {
//       console.error("Supabase Sign In Error:", error);
//       setError(error.message);
//     } else if (data.user) {
//       console.log("Successfully logged in:", data.user);
//       router.refresh(); // Crucial: Re-fetch layout to show logged-in state
//       router.push("/dashboard"); // Redirect to dashboard
//     } else {
//       setError("An unexpected error occurred during sign in.");
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-gray-100 p-4">
//       <Card className="w-full max-w-md p-6">
//         <CardHeader className="text-center">
//           <CardTitle className="text-3xl font-bold text-gray-900">
//             Log In
//           </CardTitle>
//           <CardDescription className="text-gray-600">
//             Access your account to continue your learning journey.
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

//             {error && (
//               <p className="text-red-500 text-sm text-center">{error}</p>
//             )}

//             <Button type="submit" className="w-full" disabled={loading}>
//               {loading ? (
//                 <>
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Logging
//                   In...
//                 </>
//               ) : (
//                 "Log In"
//               )}
//             </Button>
//           </form>
//           <p className="text-center text-sm text-gray-600 mt-6">
//             <Link
//               href="/reset-password"
//               className="text-blue-600 hover:underline"
//             >
//               Forgot your password?
//             </Link>
//           </p>
//           <p className="text-center text-sm text-gray-600 mt-2">
//             Don't have an account?{" "}
//             <Link href="/signup" className="text-blue-600 hover:underline">
//               Sign Up
//             </Link>
//           </p>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }












// app/(auth)/signin/page.jsx
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function SignInPage() {
  const router = useRouter();
  const supabase = createClient();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      console.error("Supabase Sign In Error:", error);
      setError(error.message);
    } else if (data.user) {
      console.log("Successfully logged in:", data.user);
      router.refresh(); // Invalidate cache and re-fetch data for current route

      // FIX: Add a small delay before pushing to the dashboard
      setTimeout(() => {
        router.push('/dashboard'); // Redirect to dashboard
      }, 500); // 500ms delay

    } else {
      setError("An unexpected error occurred during sign in.");
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-gray-100 p-4">
      <Card className="w-full max-w-md p-6">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-gray-900">Log In</CardTitle>
          <CardDescription className="text-gray-600">
            Access your account to continue your learning journey.
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

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Logging In...
                </>
              ) : (
                "Log In"
              )}
            </Button>
          </form>
          <p className="text-center text-sm text-gray-600 mt-6">
            <Link href="/reset-password" className="text-blue-600 hover:underline">
              Forgot your password?
            </Link>
          </p>
          <p className="text-center text-sm text-gray-600 mt-2">
            Don't have an account?{" "}
            <Link href="/signup" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}