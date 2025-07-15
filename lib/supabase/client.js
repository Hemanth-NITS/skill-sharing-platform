// lib/supabase/client.js
import { createBrowserClient } from '@supabase/ssr';

// This function creates a Supabase client instance for use in client-side code.
// It automatically picks up NEXT_PUBLIC_ environment variables.
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}