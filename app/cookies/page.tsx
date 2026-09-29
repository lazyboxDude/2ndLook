import LegalPageLayout from "@/components/LegalPageLayout";
import { cookies } from "@/lib/legal-content";

export const metadata = { title: "Cookie-Richtlinie – 2ndLook" };

export default function CookiesPage() {
  return <LegalPageLayout page={cookies} />;
}
