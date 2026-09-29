"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { sendConfirmationEmail } from "@/lib/newsletter-email";

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

  const supabase = createAdminClient();
  if (!supabase) return { error: "Die Anmeldung ist derzeit nicht verfügbar." };

  const { data: token, error } = await supabase.rpc("subscribe_newsletter", { p_email: email });
  if (error) return { error: "Anmeldung fehlgeschlagen. Bitte versuche es später erneut." };

  // A token comes back only for new or unconfirmed addresses that weren't mailed in the last
  // 10 minutes. Everyone else gets the same success message, so the form can't be used to
  // probe for addresses or to spam an inbox.
  if (token && !(await sendConfirmationEmail(email, token as string))) {
    return { error: "Die Bestätigungsmail konnte nicht gesendet werden. Bitte versuche es später erneut." };
  }
  return { success: true };
}
