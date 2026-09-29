import { headers } from "next/headers";

async function siteUrl(): Promise<string> {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host");
  const proto = h.get("x-forwarded-proto") ?? "https";
  return `${proto}://${host}`;
}

// Sends the double-opt-in mail via Resend's REST API. Returns false on any failure.
export async function sendConfirmationEmail(email: string, token: string): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.NEWSLETTER_FROM;
  if (!apiKey || !from) return false;

  const link = `${await siteUrl()}/newsletter/bestaetigen?token=${token}`;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: email,
      subject: "Bitte bestätige deine Newsletter-Anmeldung",
      html: `<p>Hallo</p><p>Bitte bestätige deine Anmeldung zum 2ndLook-Newsletter:</p><p><a href="${link}">Anmeldung bestätigen</a></p><p>Wenn du dich nicht angemeldet hast, kannst du diese Mail ignorieren.</p>`,
      text: `Bitte bestätige deine Anmeldung zum 2ndLook-Newsletter: ${link}\n\nWenn du dich nicht angemeldet hast, kannst du diese Mail ignorieren.`,
    }),
  });
  return res.ok;
}
