import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token") ?? "";
  const home = new URL("/", request.url);

  const supabase = UUID_RE.test(token) ? await createClient() : null;
  const { data } = supabase
    ? await supabase.rpc("confirm_newsletter", { p_token: token })
    : { data: false };

  home.searchParams.set("newsletter", data ? "bestaetigt" : "ungueltig");
  home.hash = "newsletter";
  return NextResponse.redirect(home);
}
