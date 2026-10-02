"use client";

import { useWatchlist } from "@/lib/watchlist-context";
import { BookmarkIcon } from "@/components/icons";

export default function WatchlistButton({ slug }: { slug: string }) {
  const { isWatched, toggle } = useWatchlist();
  const watched = isWatched(slug);

  return (
    <button
      type="button"
      onClick={() => toggle(slug)}
      aria-pressed={watched}
      className="flex h-11 items-center gap-2 rounded-sm border border-foreground px-5 text-sm font-semibold text-foreground"
    >
      <BookmarkIcon filled={watched} size={18} />
      {watched ? "Gemerkt" : "Merken"}
    </button>
  );
}
