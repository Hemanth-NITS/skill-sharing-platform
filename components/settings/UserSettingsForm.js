// components/settings/UserSettingsForm.jsx
"use client"; // <-- IMPORTANT: This MUST be the very first line

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Loader2, Save } from 'lucide-react'; // Loader2 for loading, Save for button icon

// Dummy data for user settings (can be moved or passed as props later)
// For now, it's defined here as it's part of the client component's initial state
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


export function UserSettingsForm({ initialSettings = dummyUserSettings }) { // Accept initialSettings as prop
  const router = useRouter();
  const [settings, setSettings] = useState(initialSettings);
  const [loading, setLoading] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setSettings((prev) => ({ ...prev, [id]: value }));
  };

  const handleSwitchChange = (id, checked) => {
    setSettings((prev) => ({ ...prev, [id]: checked }));
  };

  const handleSelectChange = (id, value) => {
    setSettings((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSaveMessage('');

    console.log("Saving settings (simulated):", settings);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setLoading(false);
    setSaveMessage("Settings saved successfully!");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Profile Information Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Profile Information</h2>
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input id="fullName" type="text" value={settings.fullName} onChange={handleChange} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input id="username" type="text" value={settings.username} onChange={handleChange} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={settings.email} disabled />
        </div>
        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea id="bio" value={settings.bio} onChange={handleChange} rows={4} />
        </div>
      </div>

      {/* Notification Preferences Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Notification Preferences</h2>
        <div className="flex items-center justify-between">
          <Label htmlFor="notificationEmail">Email Notifications</Label>
          <Switch
            id="notificationEmail"
            checked={settings.notificationEmail}
            onCheckedChange={(checked) => handleSwitchChange('notificationEmail', checked)}
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="notificationPush">Push Notifications</Label>
          <Switch
            id="notificationPush"
            checked={settings.notificationPush}
            onCheckedChange={(checked) => handleSwitchChange('notificationPush', checked)}
          />
        </div>
      </div>

      {/* Privacy Settings Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Privacy Settings</h2>
        <div className="flex items-center justify-between">
          <Label htmlFor="privacyProfilePublic">Make Profile Public</Label>
          <Switch
            id="privacyProfilePublic"
            checked={settings.privacyProfilePublic}
            onCheckedChange={(checked) => handleSwitchChange('privacyProfilePublic', checked)}
          />
        </div>
      </div>

      {/* General Preferences Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">General Preferences</h2>
        <div className="space-y-2">
          <Label htmlFor="preferredLanguage">Preferred Language</Label>
          <Select
            value={settings.preferredLanguage}
            onValueChange={(value) => handleSelectChange('preferredLanguage', value)}
          >
            <SelectTrigger id="preferredLanguage" className="w-full">
              <SelectValue placeholder="Select a language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="hi">Hindi</SelectItem>
              <SelectItem value="es">Spanish</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="preferredTimezone">Preferred Timezone</Label>
          <Select
            value={settings.preferredTimezone}
            onValueChange={(value) => handleSelectChange('preferredTimezone', value)}
          >
            <SelectTrigger id="preferredTimezone" className="w-full">
              <SelectValue placeholder="Select a timezone" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="Asia/Kolkata">IST (Asia/Kolkata)</SelectItem>
                <SelectItem value="America/New_York">EST (America/New_York)</SelectItem>
                <SelectItem value="Europe/London">GMT (Europe/London)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {saveMessage && <p className={`text-sm text-center ${saveMessage.includes('successfully') ? 'text-green-600' : 'text-red-500'}`}>{saveMessage}</p>}

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
          </>
        ) : (
          <>
            <Save className="mr-2 h-4 w-4" /> Save Changes
          </>
        )}
      </Button>
    </form>
  );
}