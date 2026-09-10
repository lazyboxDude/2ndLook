"use client";

import { createContext, useContext, useSyncExternalStore, type ReactNode } from "react";

const STORAGE_KEY = "2ndlook.watchlist";
const DEFAULT_WATCHED = ["nightwalker-hoodie", "voltage-jacket"];

let watched = new Set<string>(DEFAULT_WATCHED);
let hydrated = false;
const listeners = new Set<() => void>();

function hydrate() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) watched = new Set(JSON.parse(stored));
  } catch {
    // ignore invalid/inaccessible storage
  }
}

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...watched]));
  } catch {
    // ignore inaccessible storage
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  hydrate();
  return watched;
}

function getServerSnapshot() {
  return watched;
}

function toggle(slug: string) {
  const next = new Set(watched);
  if (next.has(slug)) {
    next.delete(slug);
  } else {
    next.add(slug);
  }
  watched = next;
  persist();
  listeners.forEach((listener) => listener());
}

type WatchlistContextValue = {
  isWatched: (slug: string) => boolean;
  toggle: (slug: string) => void;
};

const WatchlistContext = createContext<WatchlistContextValue | null>(null);

export function WatchlistProvider({ children }: { children: ReactNode }) {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return (
    <WatchlistContext.Provider value={{ isWatched: (slug) => snapshot.has(slug), toggle }}>
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist(): WatchlistContextValue {
  const ctx = useContext(WatchlistContext);
  if (!ctx) throw new Error("useWatchlist must be used within a WatchlistProvider");
  return ctx;
}
