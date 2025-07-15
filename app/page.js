// "use client";
// import { Button } from "@/components/ui/button";

// export default function Home() {
//   return (
//     <main >
//       Home pages
//     </main>
//   );
// }

// app/page.jsx
// This is a Server Component by default

// Import the server-side Supabase client creator
import { createServerSupabaseClient } from "@/lib/supabase/server";

export default async function HomePage() {
  // // --- Supabase Connection Test ---
  // // This will run on the server when the page is requested.
  // const supabase = createServerSupabaseClient();

  // // Attempt a simple query on a non-existent table.
  // // We expect an error about the table not existing, NOT a connection error.
  // const { data, error } = await supabase.from('test_connection_table').select('*');

  // if (error) {
  //   console.log('Supabase Connection Test Result (Expected Error for non-existent table):');
  //   console.error('Error code:', error.code);
  //   console.error('Error message:', error.message);
  //   console.error('Hint:', error.hint);
  //   // If you see "relation "public.test_connection_table" does not exist", your connection is good!
  //   // If you see network errors or authentication errors, something is wrong with your URL/Key.
  // } else {
  //   console.log('Supabase Connection Test Result (Unexpected Success - check your table name):', data);
  // }
  // // --- End Supabase Connection Test ---

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] text-center p-4">
      <h1 className="text-5xl font-extrabold text-gray-900 mb-4 animate-fade-in">
        Welcome to <span className="text-fuchsia-600">PeerFlow</span>!
      </h1>
      <p className="text-xl text-gray-700 mb-8 animate-fade-in animation-delay-200">
        Connect, learn, and grow with peers.
      </p>
      <div className="space-x-4 animate-fade-in animation-delay-400">
        {/* These buttons will be visible if not logged in */}
        {/* <Link href="/signup">
          <Button size="lg" className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white">Get Started</Button>
        </Link>
        <Link href="/search">
          <Button size="lg" variant="outline" className="text-gray-800 border-gray-300 hover:bg-gray-200">Find Peers</Button>
        </Link> */}
      </div>
      <p className="mt-8 text-gray-500 text-sm">
        (Check your server terminal for Supabase connection test results)
      </p>
    </div>
  );
}
