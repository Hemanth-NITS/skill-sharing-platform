// app/dashboard/page.jsx
"use client"; // This page will be a Client Component for now, as dashboards are often interactive

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
// import { createClient } from '@/lib/supabase/client'; // Your client-side Supabase instance

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
//   const supabase = createClient();

//   useEffect(() => {
//     async function getUser() {
//       const { data: { user } } = await supabase.auth.getUser();
//       if (user) {
//         setUser(user);
//       } else {
//         // If no user is logged in, redirect to the login page
//         router.push('/auth/signin');
//       }
//       setLoading(false);
//     }

//     getUser();
//   }, [router, supabase]); // Re-run if router or supabase instance changes

//   if (loading) {
//     // You can replace this with a nice spinner or skeleton loader
//     return (
//       <div className="flex justify-center items-center h-full">
//         <p className="text-lg text-gray-700">Loading dashboard...</p>
//       </div>
//     );
//   }

  // Display dashboard content only if user is logged in
//   if (!user) {
//     return null; // Or some fallback for non-logged-in users if direct access is blocked by middleware
//   }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">
        Welcome to your Dashboard, 
      </h1>

      <p className="text-gray-700 text-lg mb-8">
        This is your central hub. Here you can see your recent activity, manage your sessions, and more.
      </p>

      {/* Placeholder sections - we'll fill these out later */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Upcoming Sessions</h2>
          <p className="text-gray-600">No upcoming sessions. <Link href="/search" className="text-blue-600 hover:underline">Find a peer!</Link></p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Pending Requests</h2>
          <p className="text-gray-600">You have no pending requests.</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li><Link href="/profile/edit" className="text-blue-600 hover:underline">Update your Profile</Link></li>
            <li><Link href="/my-sessions" className="text-blue-600 hover:underline">View My Sessions</Link></li>
            <li><Link href="/leaderboard" className="text-blue-600 hover:underline">Check the Leaderboard</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
}