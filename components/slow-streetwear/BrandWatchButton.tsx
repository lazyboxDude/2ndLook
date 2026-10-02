"use client";

import { useWatchlist } from "@/lib/watchlist-context";
import { brandWatchKey } from "@/lib/slow-streetwear";
import { BookmarkIcon } from "@/components/icons";

export default function BrandWatchButton({ id }: { id: string }) {
  const { isWatched, toggle } = useWatchlist();
  const watched = isWatched(brandWatchKey(id));

  return (
    <button
      type="button"
      onClick={() => toggle(brandWatchKey(id))}
      aria-pressed={watched}
      className={`flex h-12 items-center gap-2 rounded-sm border border-foreground px-6 text-sm font-semibold ${
        watched ? "bg-foreground text-surface" : "text-foreground"
      }`}
    >
      <BookmarkIcon filled={watched} size={16} />
      {watched ? "Auf der Watchlist" : "Marke beobachten"}
    </button>
  );
}
