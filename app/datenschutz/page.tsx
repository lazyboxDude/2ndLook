import LegalPageLayout from "@/components/LegalPageLayout";
import { datenschutz } from "@/lib/legal-content";

export const metadata = { title: "Datenschutzerklärung – 2ndLook" };

export default function DatenschutzPage() {
  return <LegalPageLayout page={datenschutz} />;
}
