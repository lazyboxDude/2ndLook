"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type SignupState = { error: string } | { success: true } | null;

export async function signup(_prevState: SignupState, formData: FormData): Promise<SignupState> {
  const name = String(formData.get("name") ?? "");
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const acceptedTerms = formData.get("terms") === "on";

  if (!acceptedTerms) {
    return { error: "Bitte akzeptiere die AGB und die Datenschutzerklärung." };
  }
  if (password.length < 8) {
    return { error: "Das Passwort muss mindestens 8 Zeichen haben." };
  }

  const supabase = await createClient();
  if (!supabase) {
    return { error: "Registrierung ist derzeit nicht verfügbar." };
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: name } },
  });

  if (error) {
    return { error: "Konto konnte nicht erstellt werden. Ist die E-Mail schon registriert?" };
  }

  if (!data.session) {
    return { success: true };
  }

  redirect("/mein-feed");
}
