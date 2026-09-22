import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// For public, session-independent reads (e.g. the product catalog). Unlike
// lib/supabase/client.ts and lib/supabase/server.ts, this carries no cookie
// handling, so it works anywhere: Server Components, generateStaticParams
// at build time, and Route Handlers alike.
export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  // Missing env vars (e.g. not configured on the deploy target) shouldn't
  // crash the request — callers degrade to a fallback instead.
  if (!url || !key) return null;

  return createSupabaseClient(url, key);
}
