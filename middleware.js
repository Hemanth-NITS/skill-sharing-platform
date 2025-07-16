// middleware.js
import { updateSession } from '@/utils/supabase/middleware' // Import the utility function

// The main middleware function that calls our session updater
export async function middleware(request) {
  return await updateSession(request)
}

// Configuration for which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - Any files with extensions (e.g., .svg, .png)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}