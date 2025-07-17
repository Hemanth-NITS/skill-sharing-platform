// // app/leaderboard/page.jsx
// // No "use client"; directive here, making this a Server Component by default

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table"; // Shadcn UI Table components
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Shadcn UI Avatar
// import Link from 'next/link'; // For linking to user profiles
// import { Star } from 'lucide-react';

// // --- Dummy Data for Leaderboard ---
// const dummyLeaderboard = [
//   {
//     rank: 1,
//     username: 'charlie-brown',
//     fullName: 'Charlie Brown',
//     profilePic: 'https://api.dicebear.com/7.x/lorelei/svg?seed=Charlie',
//     points: 1500,
//     averageRating: 4.9,
//   },
//   {
//     rank: 2,
//     username: 'alice-johnson',
//     fullName: 'Alice Johnson',
//     profilePic: 'https://api.dicebear.com/7.x/lorelei/svg?seed=Alice',
//     points: 1350,
//     averageRating: 4.8,
//   },
//   {
//     rank: 3,
//     username: 'eve-adams',
//     fullName: 'Eve Adams',
//     profilePic: 'https://api.dicebear.com/7.x/lorelei/svg?seed=Eve',
//     points: 1200,
//     averageRating: 4.7,
//   },
//   {
//     rank: 4,
//     username: 'grace-lee',
//     fullName: 'Grace Lee',
//     profilePic: 'https://api.dicebear.com/7.x/lorelei/svg?seed=Grace',
//     points: 1100,
//     averageRating: 4.9,
//   },
//   {
//     rank: 5,
//     username: 'bob-smith',
//     fullName: 'Bob Smith',
//     profilePic: 'https://api.dicebear.com/7.x/lorelei/svg?seed=Bob',
//     points: 980,
//     averageRating: 4.5,
//   },
//   {
//     rank: 6,
//     username: 'frank-white',
//     fullName: 'Frank White',
//     profilePic: 'https://api.dicebear.com/7.x/lorelei/svg?seed=Frank',
//     points: 850,
//     averageRating: 4.4,
//   },
// ];
// // --- End Dummy Data ---

// export default async function LeaderboardPage() {
//   // In a real application, you would fetch this data from Supabase
//   // For now, we're just using our dummy data.

//   return (
//     <div className="container mx-auto py-8 max-w-4xl">
//       <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">Top Teachers Leaderboard</h1>
//       <p className="text-gray-700 text-lg mb-8 text-center">
//         See who's leading the way in skill sharing! Points are based on session duration, number of sessions, and ratings.
//       </p>

//       <div className="bg-white rounded-lg shadow-md overflow-hidden">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead className="w-[80px]">Rank</TableHead>
//               <TableHead>Teacher</TableHead>
//               <TableHead className="text-right">Points</TableHead>
//               <TableHead className="text-right">Rating</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {dummyLeaderboard.map((teacher) => (
//               <TableRow key={teacher.username}>
//                 <TableCell className="font-medium text-lg">{teacher.rank}</TableCell>
//                 <TableCell>
//                   <Link href={`/profile/${teacher.username}`} className="flex items-center space-x-3 hover:underline">
//                     <Avatar className="h-10 w-10">
//                       <AvatarImage src={teacher.profilePic} alt={`${teacher.fullName}'s profile`} />
//                       <AvatarFallback>{teacher.fullName.charAt(0)}</AvatarFallback>
//                     </Avatar>
//                     <div>
//                       <div className="font-semibold">{teacher.fullName}</div>
//                       <div className="text-sm text-gray-500">@{teacher.username}</div>
//                     </div>
//                   </Link>
//                 </TableCell>
//                 <TableCell className="text-right font-semibold text-blue-600">{teacher.points}</TableCell>
//                 <TableCell className="text-right flex items-center justify-end">
//                   <Star className="h-4 w-4 text-yellow-500 mr-1 fill-current" />
//                   <span>{teacher.averageRating.toFixed(1)}</span>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>
//     </div>
//   );
// }








// app/leaderboard/page.jsx
// No "use client"; directive here, making this a Server Component by default

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from 'next/link';
import { Star } from 'lucide-react';

import { createServerSupabaseClient } from '@/lib/supabase/server'; // Server-side Supabase client

export default async function LeaderboardPage() {
  const supabase = await createServerSupabaseClient();

  // Fetch all profiles
  const { data: allProfiles, error: profilesError } = await supabase
    .from('profiles')
    .select('id, full_name, username, profile_picture_url');

  if (profilesError) {
    console.error("Error fetching profiles for leaderboard:", profilesError);
    return (
      <div className="container mx-auto py-8 text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Error Loading Leaderboard</h1>
        <p className="text-gray-600">An error occurred while trying to load the leaderboard. Please try again later.</p>
      </div>
    );
  }

  // Fetch all ratings
  const { data: allRatings, error: ratingsError } = await supabase
    .from('ratings')
    .select('rating, rated_user_id'); // Only need rating and who was rated

  if (ratingsError) {
    console.error("Error fetching ratings for leaderboard:", ratingsError);
    // Continue even if error, as we can still display profiles without ratings
  }

  // Calculate average rating and total ratings for each user
  const userRatingsMap = new Map(); // userId -> { totalRating: number, count: number }
  if (allRatings) {
    allRatings.forEach(rating => {
      const current = userRatingsMap.get(rating.rated_user_id) || { totalRating: 0, count: 0 };
      userRatingsMap.set(rating.rated_user_id, {
        totalRating: current.totalRating + rating.rating,
        count: current.count + 1,
      });
    });
  }

  // Prepare leaderboard data
  const leaderboardData = allProfiles.map(profile => {
    const ratingsInfo = userRatingsMap.get(profile.id);
    const averageRating = ratingsInfo ? (ratingsInfo.totalRating / ratingsInfo.count) : 0;
    const totalRatingsCount = ratingsInfo ? ratingsInfo.count : 0;

    // Simulate points: higher rating, more sessions (represented by ratings count) means more points
    const points = Math.round(averageRating * 100 + totalRatingsCount * 10); // Simple point calculation

    return {
      id: profile.id,
      username: profile.username,
      fullName: profile.full_name,
      profilePic: profile.profile_picture_url,
      averageRating: averageRating,
      totalRatingsCount: totalRatingsCount,
      points: points,
    };
  });

  // Sort leaderboard data by points (descending)
  leaderboardData.sort((a, b) => b.points - a.points);

  // Assign ranks
  const rankedLeaderboard = leaderboardData.map((entry, index) => ({
    ...entry,
    rank: index + 1,
  }));


  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">Top Teachers Leaderboard</h1>
      <p className="text-gray-700 text-lg mb-8 text-center">
        See who's leading the way in skill sharing! Points are calculated based on ratings and sessions.
      </p>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Rank</TableHead>
              <TableHead>Teacher</TableHead>
              <TableHead className="text-right">Points</TableHead>
              <TableHead className="text-right">Rating</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rankedLeaderboard.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-4 text-gray-600">
                  No teachers on the leaderboard yet.
                </TableCell>
              </TableRow>
            ) : (
              rankedLeaderboard.map((teacher) => (
                <TableRow key={teacher.id}>
                  <TableCell className="font-medium text-lg">{teacher.rank}</TableCell>
                  <TableCell>
                    <Link href={`/profile/${teacher.username}`} className="flex items-center space-x-3 hover:underline">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={teacher.profilePic || `https://api.dicebear.com/7.x/lorelei/svg?seed=${teacher.username}`} alt={teacher.fullName} />
                        <AvatarFallback>{teacher.fullName?.charAt(0) || teacher.username?.charAt(0) || '?'}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold">{teacher.fullName}</div>
                        <div className="text-sm text-gray-500">@{teacher.username}</div>
                      </div>
                    </Link>
                  </TableCell>
                  <TableCell className="text-right font-semibold text-blue-600">{teacher.points}</TableCell>
                  <TableCell className="text-right flex items-center justify-end">
                    <Star className="h-4 w-4 text-yellow-500 mr-1 fill-current" />
                    <span>{teacher.averageRating.toFixed(1)} ({teacher.totalRatingsCount})</span>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}