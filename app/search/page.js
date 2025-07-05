// app/search/page.jsx
// No "use client"; here, making it a Server Component by default

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { SubmitButton } from "@/components/little/SubmitButton";
import { searchPeersAction } from "@/serverActions/search/actions"; // <-- UPDATED: Import the Server Action with new name
import { ScrollArea } from "@/components/ui/scroll-area";

// Dummy data (moved here so the Server Component can directly access it)
const dummyPeers = [
  {
    id: "1",
    name: "Alice Johnson",
    headline: "Experienced React Developer & Mentor",
    skills: ["React", "JavaScript", "Node.js", "Mentoring", "Frontend"],
    rating: 4.8,
    profilePic: "https://api.dicebear.com/7.x/lorelei/svg?seed=Alice",
  },
  {
    id: "2",
    name: "Bob Smith",
    headline: "Python Enthusiast & Data Science Tutor",
    skills: ["Python", "Data Science", "Machine Learning", "SQL"],
    rating: 4.5,
    profilePic: "https://api.dicebear.com/7.x/lorelei/svg?seed=Bob",
  },
  {
    id: "3",
    name: "Charlie Brown",
    headline: "UI/UX Designer & Figma Expert",
    skills: ["UI/UX Design", "Figma", "Sketch", "Prototyping", "User Research"],
    rating: 4.9,
    profilePic: "https://api.dicebear.com/7.x/lorelei/svg?seed=Charlie",
  },
  {
    id: "4",
    name: "Diana Prince",
    headline: "Backend Developer & Database Administrator",
    skills: ["Java", "Spring Boot", "PostgreSQL", "Docker"],
    rating: 4.6,
    profilePic: "https://api.dicebear.com/7.x/lorelei/svg?seed=Diana",
  },
  {
    id: "5",
    name: "Eve Adams",
    headline: "Graphic Designer & Photoshop Master",
    skills: ["Graphic Design", "Photoshop", "Illustrator", "Branding"],
    rating: 4.7,
    profilePic: "https://api.dicebear.com/7.x/lorelei/svg?seed=Eve",
  },
  {
    id: "6",
    name: "Frank White",
    headline: "Full-stack Developer & Cybersecurity",
    skills: ["JavaScript", "Node.js", "React", "Cybersecurity", "Express"],
    rating: 4.4,
    profilePic: "https://api.dicebear.com/7.x/lorelei/svg?seed=Frank",
  },
  {
    id: "7",
    name: "Grace Lee",
    headline: "Mobile App Developer (iOS/Android)",
    skills: ["Swift", "Kotlin", "React Native", "Mobile Development"],
    rating: 4.9,
    profilePic: "https://api.dicebear.com/7.x/lorelei/svg?seed=Grace",
  },
];

export default async function SearchPage({
  searchParams, // Next.js automatically provides searchParams
}) {
  const currentSearchTerm =
    searchParams?.searchTerm?.toString().toLowerCase() || ""; // Safely get and convert

  let searchResults = [];

  if (currentSearchTerm) {
    // Perform filtering directly within the Server Component's render
    // This makes the component fully responsible for displaying results based on its props (searchParams)
    searchResults = dummyPeers.filter(
      (peer) =>
        peer.name.toLowerCase().includes(currentSearchTerm) ||
        peer.headline.toLowerCase().includes(currentSearchTerm) ||
        peer.skills.some((skill) =>
          skill.toLowerCase().includes(currentSearchTerm)
        )
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Find Your Peers</h1>

      {/* Form action now points to the redirecting server action */}
      <form
        action={searchPeersAction}
        className="flex w-full max-w-xl items-center space-x-2 mb-8"
      >
        <Input
          type="text"
          placeholder="Search for skills (e.g., React, Python) or names..."
          name="searchTerm"
          defaultValue={currentSearchTerm} // Set initial value from URL param
          className="flex-1"
        />
        <SubmitButton>Search</SubmitButton>
      </form>

      {/* Filters/Options (Placeholder) - remains the same */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Filters (Coming Soon)
        </h2>
        <div className="flex space-x-4">
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

      {/* Search Results Display - remains the same */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Results</h2>
        {searchResults.length === 0 && currentSearchTerm === "" && (
          <p className="text-gray-600">
            Start by typing in a skill or name and hit Search!
          </p>
        )}
        {searchResults.length === 0 && currentSearchTerm !== "" && (
          <p className="text-gray-600">
            No peers found for "{currentSearchTerm}". Try a different search
            term.
          </p>
        )}
        {searchResults.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.map((peer) => (
              <Card
                key={peer.id}
                className="hover:shadow-lg transition-shadow duration-200"
              >
                <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                  <Avatar className="h-16 w-16">
                    <AvatarImage
                      src={peer.profilePic}
                      alt={`${peer.name}'s profile`}
                    />
                    <AvatarFallback>{peer.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-xl">{peer.name}</CardTitle>
                    <CardDescription>{peer.headline}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <Star className="h-4 w-4 text-yellow-500 mr-1 fill-current" />
                    <span>{peer.rating.toFixed(1)}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {peer.skills.map((skill) => (
                      <span
                        key={skill}
                        className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  <Button className="mt-4 w-full">View Profile</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
