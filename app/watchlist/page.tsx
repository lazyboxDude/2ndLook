"use client";

import Link from "next/link";
import { products } from "@/lib/products";
import PriceCard from "@/components/PriceCard";
import { useWatchlist } from "@/lib/watchlist-context";

export default function WatchlistPage() {
  const { isWatched } = useWatchlist();
  const items = products.filter((p) => isWatched(p.slug));
  const drops = items.filter((p) => p.status === "gefallen").length;

  return (
    <div className="mx-auto max-w-[1440px] px-4 pb-20 pt-6 md:px-16 md:pt-7">
      <nav aria-label="Brotkrumen" className="text-[13px] text-muted">
        <Link href="/">Home</Link> / <span className="text-foreground">Watchlist</span>
      </nav>

      <div className="mt-6 flex flex-col justify-between gap-3 md:flex-row md:items-end">
        <h1 className="font-serif text-4xl font-medium leading-[1.05] tracking-tight text-foreground md:text-[52px]">
          Watchlist
        </h1>
        {items.length > 0 && (
          <p className="font-serif text-xl text-foreground md:text-2xl">
            {items.length} {items.length === 1 ? "Produkt" : "Produkte"}
            {drops > 0 && ` · ${drops} mit Preisfall`}
          </p>
        )}
      </div>

      {items.length > 0 ? (
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4 md:gap-x-5">
          {items.map((p) => (
            <PriceCard key={p.slug} product={p} />
          ))}
        </div>
      ) : (
        <p className="mt-8 text-sm text-muted">
          Noch nichts auf der Watchlist. Merke dir Preise aus dem{" "}
          <Link href="/feed" className="text-foreground underline">
            Feed
          </Link>
          .
        </p>
      )}
    </div>
  );
}
