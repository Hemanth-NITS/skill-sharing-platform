// app/session/[sessionId]/feedback/page.jsx
"use client"; // This page is a Client Component for form interactivity

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Loader2 } from 'lucide-react'; // Star for rating, Loader2 for loading state

export default function FeedbackPage() {
  const router = useRouter();
  const params = useParams();
  const { sessionId } = params; // Get the session ID from the URL

  const [rating, setRating] = useState(0); // 0-5 star rating
  const [testimonial, setTestimonial] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  // Dummy data for the session participant (who you are rating)
  const dummySessionInfo = {
    'session-id-123': {
      otherParticipantName: 'Alice Johnson',
      otherParticipantRole: 'Teacher',
      profilePic: 'https://api.dicebear.com/7.x/lorelei/svg?seed=Alice',
    },
    'session-id-456': {
      otherParticipantName: 'Bob Smith',
      otherParticipantRole: 'Teacher',
      profilePic: 'https://api.dicebear.com/7.x/lorelei/svg?seed=Bob',
    },
  };

  const sessionDetails = dummySessionInfo[sessionId];

  if (!sessionDetails) {
    return (
      <div className="container mx-auto py-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Session Not Found</h1>
        <p className="text-gray-600">The session you are trying to give feedback for does not exist.</p>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (rating === 0) {
      setError("Please provide a star rating.");
      setLoading(false);
      return;
    }

    // --- Simulate Feedback Submission ---
    console.log(`Submitting feedback for session ${sessionId}:`, {
      rating,
      testimonial,
      ratedUser: sessionDetails.otherParticipantName,
    });
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API call

    setLoading(false);
    setSubmitted(true);
    // In a real app, you might show a success message then redirect after a delay
    // For now, we'll show a success message and then redirect to dashboard
    setTimeout(() => {
      router.push('/dashboard');
    }, 1500);
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-gray-100 p-4">
      <Card className="w-full max-w-md p-6">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-gray-900 mb-2">Session Feedback</CardTitle>
          <CardDescription className="text-gray-600">
            Please rate your session with{" "}
            <span className="font-semibold text-gray-800">{sessionDetails.otherParticipantName}</span> and leave a testimonial.
          </CardDescription>
          <div className="mt-4 flex justify-center">
            <img src={sessionDetails.profilePic} alt={sessionDetails.otherParticipantName} className="h-20 w-20 rounded-full border-2 border-blue-500" />
          </div>
        </CardHeader>
        <CardContent>
          {submitted ? (
            <div className="text-center text-green-600 font-semibold text-lg">
              Thank you for your feedback! Redirecting to Dashboard...
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Star Rating */}
              <div className="space-y-2 text-center">
                <Label htmlFor="rating" className="text-lg font-semibold">Your Rating</Label>
                <div className="flex justify-center space-x-1 mt-2">
                  {[1, 2, 3, 4, 5].map((starValue) => (
                    <Star
                      key={starValue}
                      className={`h-8 w-8 cursor-pointer transition-colors duration-200 ${
                        starValue <= rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
                      }`}
                      onClick={() => setRating(starValue)}
                    />
                  ))}
                </div>
                {rating === 0 && <p className="text-sm text-gray-500">Click a star to rate</p>}
              </div>

              {/* Testimonial */}
              <div className="space-y-2">
                <Label htmlFor="testimonial">Testimonial (Optional)</Label>
                <Textarea
                  id="testimonial"
                  placeholder="Share your experience..."
                  value={testimonial}
                  onChange={(e) => setTestimonial(e.target.value)}
                  rows={4}
                />
              </div>

              {error && <p className="text-red-500 text-sm text-center">{error}</p>}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
                  </>
                ) : (
                  "Submit Feedback"
                )}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}