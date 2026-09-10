"use client";

import Link from "next/link";
import type { Product } from "@/lib/products";
import { formatChf } from "@/lib/products";
import StatusTag from "@/components/StatusTag";
import { DdpNote } from "@/components/DdpBadge";
import { useWatchlist } from "@/lib/watchlist-context";

export default function PriceCard({ product }: { product: Product }) {
  const { isWatched, toggle } = useWatchlist();
  const watched = isWatched(product.slug);

  return (
    <Link href={`/produkt/${product.slug}`} className="flex flex-col gap-2">
      <div className="relative aspect-square w-full rounded-lg bg-placeholder">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggle(product.slug);
          }}
          aria-pressed={watched}
          aria-label={watched ? "Von Watchlist entfernen" : "Zur Watchlist hinzufügen"}
          className={`absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full ${
            watched ? "bg-foreground text-bg" : "bg-white/85 text-foreground"
          }`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill={watched ? "currentColor" : "none"} aria-hidden="true">
            <path
              d="M12 21s-7.5-4.6-10-9.3C.5 8 2.2 4.5 5.6 4c2-.3 3.9.6 5 2.2C11.7 4.6 13.6 3.7 15.6 4c3.4.5 5.1 4 3.6 7.7C16.7 16.4 12 21 12 21z"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </button>
      </div>
      <StatusTag status={product.status} />
      <span className="text-sm font-semibold text-foreground">{product.name}</span>
      <span className="font-mono text-sm text-muted">{formatChf(product.price)}</span>
      <DdpNote />
    </Link>
  );
}
