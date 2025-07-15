// app/settings/page.jsx
// No "use client"; directive here, making this a Server Component by default

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserSettingsForm } from '@/components/settings/UserSettingsForm';

// Dummy data for user settings (remains the same)
const dummyUserSettings = {
  fullName: 'Simulated User',
  username: 'simulated_user',
  email: 'simulated@example.com',
  bio: 'This is a simulated bio for the user. I enjoy learning new skills and connecting with others.',
  notificationEmail: true,
  notificationPush: false,
  privacyProfilePublic: true,
  preferredLanguage: 'en',
  preferredTimezone: 'Asia/Kolkata', // IST
};

// Main Server Component for the Settings Page
export default async function SettingsPage() {
  const initialSettings = dummyUserSettings;

  return (
    // ADDED py-8 for vertical padding, and p-4 for horizontal padding
    // Removed h-full, flex, flex-col from here. Let main in layout manage height.
    <div className="container mx-auto py-8 max-w-3xl">
      {/* Card will now naturally take up space. No flex-1 needed here. */}
      <Card className="p-6">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-gray-900">Account Settings</CardTitle>
          <CardDescription className="text-gray-600">
            Manage your profile, preferences, and privacy settings.
          </CardDescription>
        </CardHeader>
        {/* CardContent will simply render its content.
            The main scrollbar will handle the page's overall content height.
            Removed flex-1 and overflow from here as main will handle it. */}
        <CardContent>
          <UserSettingsForm initialSettings={initialSettings} />
        </CardContent>
      </Card>
    </div>
  );
}