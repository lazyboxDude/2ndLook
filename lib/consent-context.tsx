"use client";

import { createContext, useCallback, useContext, useMemo, useState, useSyncExternalStore, type ReactNode } from "react";

const STORAGE_KEY = "2ndlook.consent";

type Choice = "all" | "necessary";

const listeners = new Set<() => void>();
let memoryChoice: Choice | null = null; // Fallback, falls localStorage nicht verfügbar ist

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

// null = noch keine Auswahl, undefined = Server (Auswahl unbekannt)
function getSnapshot(): Choice | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "all" || stored === "necessary") return stored;
  } catch {
    // ignore inaccessible storage
  }
  return memoryChoice;
}

function getServerSnapshot(): undefined {
  return undefined;
}

function saveChoice(next: Choice) {
  memoryChoice = next;
  try {
    localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // ignore inaccessible storage
  }
  listeners.forEach((cb) => cb());
}

type ConsentContextValue = {
  /** Affiliate-/Marketing-Tracking (Awin) erlaubt */
  marketing: boolean;
  /** Banner sichtbar (noch keine Auswahl oder erneut geöffnet) */
  bannerOpen: boolean;
  choose: (choice: Choice) => void;
  openBanner: () => void;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

export function ConsentProvider({ children }: { children: ReactNode }) {
  const choice = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [reopened, setReopened] = useState(false);
  const bannerOpen = choice !== undefined && (choice === null || reopened);

  const choose = useCallback((next: Choice) => {
    saveChoice(next);
    setReopened(false);
  }, []);

  const openBanner = useCallback(() => setReopened(true), []);

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
