import LegalPageLayout from "@/components/LegalPageLayout";
import { agb } from "@/lib/legal-content";

export const metadata = { title: "AGB – 2ndLook" };

export default function AgbPage() {
  return <LegalPageLayout page={agb} />;
}
