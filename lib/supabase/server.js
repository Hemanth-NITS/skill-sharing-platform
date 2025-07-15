// lib/supabase/server.js
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

// IMPORTANT: This function is now async, and it awaits cookies()
export async function createServerSupabaseClient() {
  const cookieStore = await cookies() // This is now awaited implicitly by the async function

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL, // No '!' needed in JS
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, // No '!' needed in JS
    {
      cookies: {
        getAll() {
          return cookieStore.getAll() // Uses the awaited cookieStore
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch (error) {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
            // We'll keep the try-catch for now as it's in the docs and handles potential warnings.
            // console.warn('Could not set cookie in Server Component:', error);
          }
        },
      },
    }
  )
}










