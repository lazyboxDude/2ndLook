"use server";

import { createClient } from "@/lib/supabase/server";

export type NewsletterState = { error: string } | { success: true } | null;

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export async function subscribe(
  _prevState: NewsletterState,
  formData: FormData,
): Promise<NewsletterState> {
  // Honeypot: real users never fill this hidden field.
  if (String(formData.get("website") ?? "") !== "") return { success: true };

  const email = String(formData.get("email") ?? "").trim();
  if (!EMAIL_RE.test(email) || email.length > 254) {
    return { error: "Bitte gib eine gültige E-Mail-Adresse ein." };
  }
  if (formData.get("consent") !== "on") {
    return { error: "Bitte stimme der Datenschutzerklärung zu." };
  }

  const supabase = await createClient();
  if (!supabase) return { error: "Die Anmeldung ist derzeit nicht verfügbar." };

  const { error } = await supabase.rpc("subscribe_newsletter", { p_email: email });
  if (error) return { error: "Anmeldung fehlgeschlagen. Bitte versuche es später erneut." };

  // Duplicates are treated as success so the form can't be used to probe for addresses.
  return { success: true };
}
