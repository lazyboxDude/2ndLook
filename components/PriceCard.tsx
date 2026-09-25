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
      <div className="relative aspect-square w-full rounded-card bg-placeholder">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggle(product.slug);
          }}
          aria-pressed={watched}
          aria-label={watched ? "Von Watchlist entfernen" : "Zur Watchlist hinzufügen"}
          className={`absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full text-sm transition-transform duration-100 active:scale-90 ${
            watched ? "bg-foreground text-bg" : "bg-white/85 text-foreground"
          }`}
        >
          <span key={watched ? "on" : "off"} aria-hidden="true" className="inline-block animate-[heart-pop_240ms_ease-out]">
            {watched ? "♥" : "♡"}
          </span>
        </button>
      </div>
      <StatusTag status={product.status} />
      <span className="text-sm font-semibold text-foreground">{product.name}</span>
      {product.wasPrice ? (
        <span className="flex items-baseline gap-2 font-mono text-sm">
          <span className="font-bold text-green">{formatChf(product.price)}</span>
          <span className="text-muted line-through">{formatChf(product.wasPrice)}</span>
        </span>
      ) : (
        <span className="font-mono text-sm text-muted">{formatChf(product.price)}</span>
      )}
      <DdpNote />
    </Link>
  );
}
