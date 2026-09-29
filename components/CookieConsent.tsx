"use client";

import Link from "next/link";
import { useConsent } from "@/lib/consent-context";

export default function CookieConsent() {
  const { bannerOpen, choose } = useConsent();
  if (!bannerOpen) return null;

  const button =
    "flex-1 rounded-lg border border-primary bg-primary px-4 py-2.5 text-sm font-semibold text-bg md:flex-none md:px-6";

  return (
    <div
      role="dialog"
      aria-label="Cookie-Einstellungen"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-placeholder bg-bg px-6 py-5 shadow-[0_-4px_24px_rgba(17,24,39,0.12)] md:px-16"
    >
      <div className="mx-auto flex max-w-[1440px] flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-10">
        <p className="text-sm leading-relaxed text-muted">
          Wir nutzen notwendige Cookies für Login und Watchlist. Mit deiner Einwilligung setzen wir zusätzlich
          Affiliate-Tracking (Awin), damit wir uns finanzieren können. Mehr dazu in der{" "}
          <Link href="/cookies" className="underline">
            Cookie-Richtlinie
          </Link>{" "}
          und der{" "}
          <Link href="/datenschutz" className="underline">
            Datenschutzerklärung
          </Link>
          .
        </p>
        <div className="flex gap-3">
          <button type="button" onClick={() => choose("necessary")} className={button}>
            Nur notwendige
          </button>
          <button type="button" onClick={() => choose("all")} className={button}>
            Alle akzeptieren
          </button>
        </div>
      </div>
    </div>
  );
}

export function CookieSettingsButton({ className }: { className?: string }) {
  const { openBanner } = useConsent();
  return (
    <button type="button" onClick={openBanner} className={className}>
      Cookie-Einstellungen
    </button>
  );
}
