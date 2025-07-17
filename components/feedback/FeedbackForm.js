// components/feedback/FeedbackForm.jsx
"use client"; // This MUST be the very first line

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Star, Loader2 } from 'lucide-react';
import { CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast"; // Use the custom toast hook

// Import the submitFeedback Server Action
import { submitFeedback } from '@/serverActions/sessions/actions';

export function FeedbackForm({ sessionId, otherParticipantProfile }) {
  const router = useRouter();
  const { toast } = useToast();

  const [rating, setRating] = useState(0);
  const [testimonial, setTestimonial] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitted(false);
    setLoading(true);

    if (rating === 0) {
      setError("Please provide a star rating.");
      setLoading(false);
      return;
    }

    // Call the Server Action to submit feedback
    const { success, error: submitError } = await submitFeedback(
      sessionId,
      otherParticipantProfile.id, // The user who is being rated
      rating,
      testimonial
    );

    setLoading(false);

    if (submitError) {
      console.error("Error submitting feedback:", submitError);
      setError(submitError);
      toast({
        title: "Failed to Submit Feedback",
        description: submitError,
        variant: "destructive",
      });
    } else if (success) {
      setSubmitted(true);
      toast({
        title: "Feedback Submitted!",
        description: "Thank you for your valuable feedback.",
        variant: "default",
      });
      // Redirect to dashboard after success
      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);
    } else {
      setError("An unexpected error occurred.");
    }
  };

  return (
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
  );
}