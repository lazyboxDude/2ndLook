"use client";

import { useWatchlist } from "@/lib/watchlist-context";

export default function WatchlistButton({ slug }: { slug: string }) {
  const { isWatched, toggle } = useWatchlist();
  const watched = isWatched(slug);

  return (
    <button
      type="button"
      onClick={() => toggle(slug)}
      aria-pressed={watched}
      className="rounded-full border border-foreground px-5 py-2.5 text-sm font-semibold text-foreground"
    >
      {watched ? "♥ Auf der Watchlist" : "♡ Zur Watchlist"}
    </button>
  );
}
