"use client";

import Link from "next/link";
import type { Product } from "@/lib/products";
import { formatChf } from "@/lib/products";
import StatusTag from "@/components/StatusTag";
import { DdpNote } from "@/components/DdpBadge";
import { BookmarkIcon, LinkIcon } from "@/components/icons";
import { useWatchlist } from "@/lib/watchlist-context";

export default function PriceCard({ product }: { product: Product }) {
  const { isWatched, toggle } = useWatchlist();
  const watched = isWatched(product.slug);
  const soldOut = product.status === "vergriffen";

  return (
    <div className="flex flex-col gap-2.5">
      <Link
        href={`/produkt/${product.slug}`}
        aria-label={product.name}
        className="relative block aspect-[1/1.05] w-full border border-line bg-surface"
      >
        <div className="absolute inset-[19%] rounded bg-placeholder" />
        {soldOut ? (
          <span className="absolute left-2.5 top-2.5 bg-foreground px-2 py-1 font-mono text-xs font-medium text-surface">
            VERGRIFFEN
          </span>
        ) : (
          product.wasPrice && (
            <span className="absolute left-2.5 top-2.5 border border-line bg-surface px-2 py-1 font-mono text-xs font-semibold text-accent">
              SALE
            </span>
          )
        )}
      </Link>

      <div className="flex items-center justify-between">
        <span className="flex items-baseline gap-2 font-mono">
          <span className="text-[15px] font-semibold text-foreground">{formatChf(product.price)}</span>
          {product.wasPrice && (
            <span className="text-xs text-muted line-through">{formatChf(product.wasPrice)}</span>
          )}
        </span>
        <button
          type="button"
          onClick={() => toggle(product.slug)}
          aria-pressed={watched}
          aria-label={watched ? "Von Watchlist entfernen" : "Zur Watchlist hinzufügen"}
          className="-mr-2.5 flex h-11 w-11 items-center justify-center text-foreground"
        >
          <BookmarkIcon filled={watched} />
        </button>
      </div>

      <Link href={`/produkt/${product.slug}`} className="-mt-3 flex flex-col gap-1.5">
        <span className="text-sm font-semibold text-foreground">{product.name}</span>
        {product.retailer && (
          <span className="flex items-center gap-1.5 font-mono text-xs text-muted">
            <LinkIcon />
            Von {product.retailer}
          </span>
        )}
        {product.status === "bald" && <StatusTag status={product.status} />}
        <DdpNote />
      </Link>
    </div>
  );
}
