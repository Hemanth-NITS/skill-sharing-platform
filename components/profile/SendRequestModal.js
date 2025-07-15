// components/profile/SendRequestModal.jsx
"use client"; // This is a Client Component for form interactivity and dialog state

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // For navigation
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input"; // For requested skill input
import { Loader2, Send } from 'lucide-react'; // Icons

// Dummy data for available skills (can be imported from common source if needed)
const availableSkills = [
  { value: 'react', label: 'React.js' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'nodejs', label: 'Node.js' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'sql', label: 'SQL' },
  { value: 'figma', label: 'Figma' },
  { value: 'ui-ux-design', label: 'UI/UX Design' },
  { value: 'machine-learning', label: 'Machine Learning' },
  { value: 'data-science', label: 'Data Science' },
  { value: 'mentoring', label: 'Mentoring' },
  { value: 'frontend', label: 'Frontend Development' },
  { value: 'backend', label: 'Backend Development' },
  { value: 'mobile-dev', label: 'Mobile Development' },
  { value: 'cybersecurity', label: 'Cybersecurity' },
  { value: 'graphic-design', label: 'Graphic Design' },
];

export function SendRequestModal({ recipientName, recipientUsername }) {
  const router = useRouter();
  const [open, setOpen] = useState(false); // State to control modal visibility
  const [requestedSkill, setRequestedSkill] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setLoading(true);

    if (!requestedSkill.trim()) {
      setError("Please specify the skill you need help with.");
      setLoading(false);
      return;
    }

    // --- Simulate Sending Request ---
    console.log(`Simulating sending request to ${recipientName} (${recipientUsername}):`, {
      requestedSkill,
      message,
    });
    await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate API call

    setLoading(false);
    setSuccessMessage("Your request has been sent successfully!");
    setRequestedSkill(''); // Clear form
    setMessage(''); // Clear form

    // Optionally close modal after success and redirect to My Requests
    setTimeout(() => {
      setOpen(false); // Close the modal
      router.push('/my-requests'); // Redirect to My Requests page
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mt-4">
          <Send className="h-5 w-5 mr-2" /> Send Teaching Request
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Send Request to {recipientName}</DialogTitle>
          <DialogDescription>
            Specify the skill you need help with and send a message.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="requestedSkill" className="text-right">
              Skill
            </Label>
            <Input
              id="requestedSkill"
              value={requestedSkill}
              onChange={(e) => setRequestedSkill(e.target.value)}
              className="col-span-3"
              placeholder="e.g., React Hooks, Python Data Analysis"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="message" className="text-right">
              Message
            </Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="col-span-3"
              placeholder="Hi, I'd love to learn about..."
              rows={4}
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center col-span-4">{error}</p>}
          {successMessage && <p className="text-green-600 text-sm text-center col-span-4">{successMessage}</p>}

          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" /> Send Request
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}