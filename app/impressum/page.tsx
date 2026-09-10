import LegalPageLayout from "@/components/LegalPageLayout";
import { impressum } from "@/lib/legal-content";

export const metadata = { title: "Impressum – 2ndLook" };

export default function ImpressumPage() {
  return <LegalPageLayout page={impressum} />;
}
