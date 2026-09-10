import LegalPageLayout from "@/components/LegalPageLayout";
import { widerruf } from "@/lib/legal-content";

export const metadata = { title: "Widerruf & Affiliate-Hinweis – 2ndLook" };

export default function WiderrufPage() {
  return <LegalPageLayout page={widerruf} />;
}
