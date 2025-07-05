// app/leaderboard/page.jsx
// No "use client"; directive here, making this a Server Component by default

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // Shadcn UI Table components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Shadcn UI Avatar
import Link from 'next/link'; // For linking to user profiles
import { Star } from 'lucide-react';

// --- Dummy Data for Leaderboard ---
const dummyLeaderboard = [
  {
    rank: 1,
    username: 'charlie-brown',
    fullName: 'Charlie Brown',
    profilePic: 'https://api.dicebear.com/7.x/lorelei/svg?seed=Charlie',
    points: 1500,
    averageRating: 4.9,
  },
  {
    rank: 2,
    username: 'alice-johnson',
    fullName: 'Alice Johnson',
    profilePic: 'https://api.dicebear.com/7.x/lorelei/svg?seed=Alice',
    points: 1350,
    averageRating: 4.8,
  },
  {
    rank: 3,
    username: 'eve-adams',
    fullName: 'Eve Adams',
    profilePic: 'https://api.dicebear.com/7.x/lorelei/svg?seed=Eve',
    points: 1200,
    averageRating: 4.7,
  },
  {
    rank: 4,
    username: 'grace-lee',
    fullName: 'Grace Lee',
    profilePic: 'https://api.dicebear.com/7.x/lorelei/svg?seed=Grace',
    points: 1100,
    averageRating: 4.9,
  },
  {
    rank: 5,
    username: 'bob-smith',
    fullName: 'Bob Smith',
    profilePic: 'https://api.dicebear.com/7.x/lorelei/svg?seed=Bob',
    points: 980,
    averageRating: 4.5,
  },
  {
    rank: 6,
    username: 'frank-white',
    fullName: 'Frank White',
    profilePic: 'https://api.dicebear.com/7.x/lorelei/svg?seed=Frank',
    points: 850,
    averageRating: 4.4,
  },
];
// --- End Dummy Data ---

export default async function LeaderboardPage() {
  // In a real application, you would fetch this data from Supabase
  // For now, we're just using our dummy data.

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">Top Teachers Leaderboard</h1>
      <p className="text-gray-700 text-lg mb-8 text-center">
        See who's leading the way in skill sharing! Points are based on session duration, number of sessions, and ratings.
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
            {dummyLeaderboard.map((teacher) => (
              <TableRow key={teacher.username}>
                <TableCell className="font-medium text-lg">{teacher.rank}</TableCell>
                <TableCell>
                  <Link href={`/profile/${teacher.username}`} className="flex items-center space-x-3 hover:underline">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={teacher.profilePic} alt={`${teacher.fullName}'s profile`} />
                      <AvatarFallback>{teacher.fullName.charAt(0)}</AvatarFallback>
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
                  <span>{teacher.averageRating.toFixed(1)}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}