// app/profile/[username]/page.jsx
// No "use client"; directive here, making this a Server Component by default

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Star } from 'lucide-react'; // Only Star icon needed here
import { SendRequestButton } from '@/components/profile/SendRequestButton'; // <-- NEW: Import the client button

// --- Dummy Data (Remains the same, now directly accessible by Server Component) ---
const dummyUsers = [
  {
    id: 'user1',
    username: 'alice-johnson',
    fullName: 'Alice Johnson',
    headline: 'Experienced React Developer & Mentor',
    bio: 'Passionate about teaching modern web development. I specialize in React, Next.js, and state management. Love helping others grow!',
    profilePic: 'https://api.dicebear.com/7.x/lorelei/svg?seed=Alice',
    skills: ['React.js', 'JavaScript', 'Node.js', 'Mentoring', 'Frontend Development', 'Next.js'],
    averageRating: 4.8,
    totalSessions: 120,
    testimonials: [
      { id: 't1', author: 'Student A', rating: 5, comment: 'Alice is an amazing teacher! Very clear explanations and patient.' },
      { id: 't2', author: 'Student B', rating: 5, comment: 'Learned so much about React hooks. Highly recommend!' },
      { id: 't3', author: 'Student C', rating: 4, comment: 'Good session, a bit fast-paced but very knowledgeable.' },
    ],
  },
  {
    id: 'user2',
    username: 'bob-smith',
    fullName: 'Bob Smith',
    headline: 'Python Enthusiast & Data Science Tutor',
    bio: 'I enjoy breaking down complex data science concepts into easy-to-understand lessons. From Pandas to Machine Learning, let\'s learn together!',
    profilePic: 'https://api.dicebear.com/7.x/lorelei/svg?seed=Bob',
    skills: ['Python', 'Data Science', 'Machine Learning', 'SQL', 'Pandas', 'Jupyter Notebooks'],
    averageRating: 4.5,
    totalSessions: 85,
    testimonials: [
      { id: 't4', author: 'Student D', rating: 4, comment: 'Bob helped me understand SQL joins better. Very helpful!' },
      { id: 't5', author: 'Student E', rating: 5, comment: 'Excellent tutor for Python. Patient and encouraging.' },
    ],
  },
  {
    id: 'user3',
    username: 'charlie-brown',
    fullName: 'Charlie Brown',
    headline: 'UI/UX Designer & Figma Expert',
    bio: 'Bringing ideas to life through intuitive and beautiful design. I can guide you through Figma, design principles, and user research methodologies.',
    profilePic: 'https://api.dicebear.com/7.x/lorelei/svg?seed=Charlie',
    skills: ['UI/UX Design', 'Figma', 'Sketch', 'Prototyping', 'User Research', 'Design Systems'],
    averageRating: 4.9,
    totalSessions: 150,
    testimonials: [
      { id: 't6', author: 'Student F', rating: 5, comment: 'Charlie is a design guru! My Figma skills improved dramatically.' },
      { id: 't7', author: 'Student G', rating: 5, comment: 'Incredible insights into user psychology. Highly recommend for aspiring designers.' },
    ],
  },
];
// --- End Dummy Data ---

// PublicProfilePage is now an async Server Component
export default async function PublicProfilePage({ params }) { // Receive params directly as a prop
  const { username } = params; // Extract username from parameters

  // In a real app, you'd fetch data from Supabase here
  // const { data: userProfile, error } = await supabase.from('profiles').select('*').eq('username', username).single();

  // For now, find the dummy user based on the username from the URL
  const userProfile = dummyUsers.find(user => user.username === username);

  if (!userProfile) {
    // Handle case where user is not found (e.g., show a 404 message)
    // In a Server Component, you might want to use notFound() from next/navigation
    // or return a specific 404 UI. For now, a simple message.
    return (
      <div className="container mx-auto py-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">User Not Found</h1>
        <p className="text-gray-600">The profile you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <Card className="p-6">
        <CardHeader className="flex flex-col md:flex-row items-center md:items-start gap-6 pb-4">
          <Avatar className="h-28 w-28 border-4 border-blue-500 shadow-md">
            <AvatarImage src={userProfile.profilePic} alt={`${userProfile.fullName}'s profile`} />
            <AvatarFallback>{userProfile.fullName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="text-center md:text-left flex-1">
            <CardTitle className="text-4xl font-bold text-gray-900 mb-2">{userProfile.fullName}</CardTitle>
            <CardDescription className="text-xl text-gray-700 mb-2">{userProfile.headline}</CardDescription>
            <div className="flex items-center justify-center md:justify-start text-lg text-gray-600 mb-2">
              <Star className="h-5 w-5 text-yellow-500 mr-1 fill-current" />
              <span>{userProfile.averageRating.toFixed(1)} Average Rating ({userProfile.totalSessions} sessions)</span>
            </div>
            {/* Render the client-side SendRequestButton */}
            <SendRequestButton userFullName={userProfile.fullName} />
          </div>
        </CardHeader>

        <Separator className="my-6" />

        <CardContent className="space-y-6">
          {/* Bio Section */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">About {userProfile.fullName.split(' ')[0]}</h2>
            <p className="text-gray-700 leading-relaxed">{userProfile.bio}</p>
          </div>

          {/* Skills Section */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">Expertise Badges</h2>
            <div className="flex flex-wrap gap-2">
              {userProfile.skills.map(skill => (
                <Badge key={skill} variant="default" className="text-base px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Testimonials Section */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">Testimonials</h2>
            {userProfile.testimonials.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {userProfile.testimonials.map(testimonial => (
                  <Card key={testimonial.id} className="p-4 bg-gray-50 border border-gray-200">
                    <div className="flex items-center mb-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                      ))}
                      {[...Array(5 - testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-gray-300" />
                      ))}
                    </div>
                    <p className="text-gray-800 italic mb-2">"{testimonial.comment}"</p>
                    <p className="text-sm text-gray-500">- {testimonial.author}</p>
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