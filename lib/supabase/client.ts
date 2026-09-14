import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  // Missing during static prerendering (or a misconfigured deploy) shouldn't
  // crash the whole build/page — auth features degrade to logged-out instead.
  if (!url || !key) return null;

  return createBrowserClient(url, key);
}
