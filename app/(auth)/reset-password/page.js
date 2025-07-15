// // app/(auth)/reset-password/page.jsx
// "use client"; // This page is a Client Component for form interactivity

// import { useState } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Loader2 } from 'lucide-react'; // For a loading spinner

// export default function ResetPasswordPage() {
//   const router = useRouter();
//   const [email, setEmail] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage('');
//     setError('');
//     setLoading(true);

//     // --- Simulate Password Reset Process ---
//     console.log("Simulating password reset for:", email);
//     await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API call

//     if (email === "nonexistent@example.com") { // Simulate user not found
//       setError("No account found with that email address.");
//       setLoading(false);
//       return;
//     }

//     setLoading(false);
//     setMessage("If an account with that email exists, a password reset link has been sent. (Simulated)");
//     // In a real app, you might redirect to a confirmation page or back to login
//     // router.push('/signin');
//   };

//   return (
//     <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-gray-100 p-4">
//       <Card className="w-full max-w-md p-6">
//         <CardHeader className="text-center">
//           <CardTitle className="text-3xl font-bold text-gray-900">Reset Password</CardTitle>
//           <CardDescription className="text-gray-600">
//             Enter your email to receive a password reset link.
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
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>

//             {error && <p className="text-red-500 text-sm text-center">{error}</p>}
//             {message && <p className="text-green-600 text-sm text-center">{message}</p>}

//             <Button type="submit" className="w-full" disabled={loading}>
//               {loading ? (
//                 <>
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending Link...
//                 </>
//               ) : (
//                 "Send Reset Link"
//               )}
//             </Button>
//           </form>
//           <p className="text-center text-sm text-gray-600 mt-6">
//             Remember your password?{" "}
//             <Link href="/signin" className="text-blue-600 hover:underline">
//               Log In
//             </Link>
//           </p>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// app/(auth)/reset-password/page.jsx
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

export default function ResetPasswordPage() {
  const router = useRouter();
  const supabase = createClient(); // Use client-side supabase

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    // --- REAL SUPABASE PASSWORD RESET PROCESS ---
    // Note: Supabase reset password still sends an email.
    // The user will click a link in the email to set a new password.
    // The redirect URL for this email is set in Supabase dashboard under Auth -> URL Configuration.
    // We'll set it to a new page: /update-password
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/update-password`, // Redirect to a page where user sets new password
    });

    if (error) {
      console.error("Supabase Reset Password Error:", error);
      setError(error.message);
    } else {
      setMessage(
        "If an account with that email exists, a password reset link has been sent to your inbox."
      );
      // No immediate redirect here, user needs to check email
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-gray-100 p-4">
      <Card className="w-full max-w-md p-6">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-gray-900">
            Reset Password
          </CardTitle>
          <CardDescription className="text-gray-600">
            Enter your email to receive a password reset link.
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            {message && (
              <p className="text-green-600 text-sm text-center">{message}</p>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending
                  Link...
                </>
              ) : (
                "Send Reset Link"
              )}
            </Button>
          </form>
          <p className="text-center text-sm text-gray-600 mt-6">
            Remember your password?{" "}
            <Link href="/signin" className="text-blue-600 hover:underline">
              Log In
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
