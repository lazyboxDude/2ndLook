import type { Metadata } from "next";
import { Suspense } from "react";
import { Fira_Sans, Fira_Code } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "./globals.css";

const firaSans = Fira_Sans({
  variable: "--font-fira-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "2ndLook",
  description: "Preise für Streetwear, Sneaker und Nischendüfte im Blick.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="de" className={`${firaSans.variable} ${firaCode.variable}`}>
      <body className="flex min-h-screen flex-col font-sans text-foreground">
        <Suspense fallback={null}>
          <Nav />
        </Suspense>
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
