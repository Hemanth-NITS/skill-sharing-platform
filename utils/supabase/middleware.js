// utils/supabase/middleware.js
import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server' // Import NextResponse

// This function updates the Supabase session on every request.
// It's designed to be called from your root middleware.js.
export async function updateSession(request) {
  // Initialize a NextResponse object. This will be modified to include updated cookies.
  let supabaseResponse = NextResponse.next({
    request,
  })

  // Create a Supabase client configured to read and write cookies from the request/response.
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll() // Get cookies from the incoming request
        },
        setAll(cookiesToSet) {
          // Iterate over cookies to set them on both the request (for immediate use)
          // and the response (to send back to the browser).
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))

          // Create a new response to set cookies that will be sent back to the client.
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getClaims(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  // Attempt to get user claims. This will refresh the session if needed
  // and trigger the `setAll` cookie handler if new cookies are generated.
  const { data } = await supabase.auth.getClaims()

  const user = data?.claims

  // Basic route protection: If no user and not on login/auth pages, redirect to login.
  if (
    !user &&
    !request.nextUrl.pathname.startsWith('/signin') && // Changed from /login to /signin
    !request.nextUrl.pathname.startsWith('/signup') && // Added signup
    !request.nextUrl.pathname.startsWith('/reset-password') && // Added reset-password
    !request.nextUrl.pathname.startsWith('/update-password') && // Added update-password
    !request.nextUrl.pathname.startsWith('/auth') // Keep /auth for general auth routes
  ) {
    const url = request.nextUrl.clone()
    url.pathname = '/signin' // Redirect to our /signin page
    return NextResponse.redirect(url)
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is.
  // This ensures all updated cookies are sent back to the browser.
  return supabaseResponse
}