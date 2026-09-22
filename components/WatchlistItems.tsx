"use client";

import Link from "next/link";
import { formatChf, type Product } from "@/lib/products";
import { DdpNote } from "@/components/DdpBadge";
import { useWatchlist } from "@/lib/watchlist-context";

export default function WatchlistItems({ products }: { products: Product[] }) {
  const { isWatched } = useWatchlist();
  const items = products.filter((p) => isWatched(p.slug));

  if (items.length === 0) {
    return (
      <p className="text-sm text-muted">
        Noch nichts auf der Watchlist. Füge Preise aus dem{" "}
        <Link href="/feed" className="text-primary underline">
          Feed
        </Link>{" "}
        hinzu.
      </p>
    );
  }

  return (
    <>
      {items.map((p) => (
        <Link key={p.slug} href={`/produkt/${p.slug}`} className="flex flex-col gap-2">
          <div className="relative aspect-[4/3] w-full rounded-xl bg-placeholder">
            {p.status === "gefallen" && (
              <span className="absolute left-3 top-3 rounded-full bg-green-pale px-3 py-1 text-xs font-semibold text-green">
                Preis gefallen
              </span>
            )}
          </div>
          <span className="font-semibold text-foreground">{p.name}</span>
          <div className="flex items-center gap-2">
            {p.wasPrice && (
              <span className="font-mono text-sm text-muted line-through">
                {formatChf(p.wasPrice)}
              </span>
            )}
            <span className="font-mono text-sm font-bold text-green">{formatChf(p.price)}</span>
          </div>
          <DdpNote />
        </Link>
      ))}
    </>
  );
}
