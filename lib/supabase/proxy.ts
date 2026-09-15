import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  // Missing env vars (e.g. not configured on the deploy target) shouldn't
  // crash every request — skip the session refresh instead.
  if (!url || !key) return supabaseResponse;

  // With Fluid compute, don't put this client in a global environment
  // variable. Always create a new one on each request.
  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet, headers) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options),
        );
        Object.entries(headers).forEach(([key, value]) =>
          supabaseResponse.headers.set(key, value),
        );
      },
    },
  });

  // Do not run code between createServerClient and supabase.auth.getClaims().
  // A simple mistake could make it very hard to debug issues with users
  // being randomly logged out.
  const { data } = await supabase.auth.getClaims();

  // Everything is gated behind login except the landing page, the Journal
  // (blog), auth flows and the legal pages. Only these route prefixes are
  // reachable without a session.
  const publicPrefixes = [
    "/blog",
    "/login",
    "/registrierung",
    "/logout",
    "/impressum",
    "/datenschutz",
    "/agb",
    "/widerruf-affiliate",
  ];
  const { pathname } = request.nextUrl;
  const isPublic = pathname === "/" || publicPrefixes.some((prefix) => pathname.startsWith(prefix));

  if (!isPublic && !data?.claims) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
