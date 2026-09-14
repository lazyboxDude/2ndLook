"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/lib/auth-context";

const STORAGE_KEY = "2ndlook.watchlist";
const DEFAULT_WATCHED = ["nightwalker-hoodie", "voltage-jacket"];

function readLocal(): Set<string> {
  if (typeof window === "undefined") return new Set(DEFAULT_WATCHED);
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? new Set(JSON.parse(stored)) : new Set(DEFAULT_WATCHED);
  } catch {
    return new Set(DEFAULT_WATCHED);
  }
}

function writeLocal(watched: Set<string>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...watched]));
  } catch {
    // ignore inaccessible storage
  }
}

type WatchlistContextValue = {
  isWatched: (slug: string) => boolean;
  toggle: (slug: string) => void;
};

const WatchlistContext = createContext<WatchlistContextValue | null>(null);

export function WatchlistProvider({ children }: { children: ReactNode }) {
  const supabase = useMemo(() => createClient(), []);
  const { user, loading: authLoading } = useAuth();
  const [watched, setWatched] = useState<Set<string>>(() => new Set());

  useEffect(() => {
    if (authLoading) return;
    let active = true;

    async function load() {
      if (user) {
        const { data } = await supabase
          .from("watchlist")
          .select("product_slug")
          .eq("user_id", user.id);
        if (active) setWatched(new Set((data ?? []).map((r) => r.product_slug as string)));
      } else if (active) {
        setWatched(readLocal());
      }
    }

    load();

    return () => {
      active = false;
    };
  }, [user, authLoading, supabase]);

  const isWatched = useCallback((slug: string) => watched.has(slug), [watched]);

  const toggle = useCallback(
    (slug: string) => {
      const wasWatched = watched.has(slug);
      const next = new Set(watched);
      if (wasWatched) next.delete(slug);
      else next.add(slug);
      setWatched(next);

      if (user) {
        const query = wasWatched
          ? supabase.from("watchlist").delete().eq("user_id", user.id).eq("product_slug", slug)
          : supabase.from("watchlist").insert({ user_id: user.id, product_slug: slug });
        query.then(({ error }) => {
          if (error) console.error("Watchlist sync failed", error);
        });
      } else {
        writeLocal(next);
      }
    },
    [user, watched, supabase],
  );

  return (
    <WatchlistContext.Provider value={{ isWatched, toggle }}>
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist() {
  const ctx = useContext(WatchlistContext);
  if (!ctx) throw new Error("useWatchlist must be used within WatchlistProvider");
  return ctx;
}
