"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

const STORAGE_KEY = "2ndlook.consent";

type Choice = "all" | "necessary";

type ConsentContextValue = {
  /** Affiliate-/Marketing-Tracking (Awin) erlaubt */
  marketing: boolean;
  /** Banner sichtbar (noch keine Auswahl oder erneut geöffnet) */
  bannerOpen: boolean;
  choose: (choice: Choice) => void;
  openBanner: () => void;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

function readChoice(): Choice | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === "all" || stored === "necessary" ? stored : null;
  } catch {
    return null;
  }
}

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [choice, setChoice] = useState<Choice | null>(null);
  const [bannerOpen, setBannerOpen] = useState(false);

  useEffect(() => {
    const stored = readChoice();
    setChoice(stored);
    setBannerOpen(stored === null);
  }, []);

  const choose = useCallback((next: Choice) => {
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore inaccessible storage
    }
    setChoice(next);
    setBannerOpen(false);
  }, []);

  const openBanner = useCallback(() => setBannerOpen(true), []);

  const value = useMemo(
    () => ({ marketing: choice === "all", bannerOpen, choose, openBanner }),
    [choice, bannerOpen, choose, openBanner],
  );

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
}

export function useConsent() {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error("useConsent must be used within ConsentProvider");
  return ctx;
}
