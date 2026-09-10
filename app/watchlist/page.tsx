import { products, formatChf } from "@/lib/products";
import { DdpNote } from "@/components/DdpBadge";
import BottomTabBar from "@/components/BottomTabBar";
import Link from "next/link";

const watched = ["nightwalker-hoodie", "voltage-jacket"];

export default function WatchlistPage() {
  const items = watched.map((slug) => products.find((p) => p.slug === slug)!);

  return (
    <>
      <div className="mx-auto max-w-[720px] px-6 py-10 pb-24 md:py-14">
        <h1 className="text-2xl font-bold text-foreground md:text-3xl">Watchlist</h1>
        <div className="mt-6 flex flex-col gap-8">
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
                <span className="font-mono text-sm font-bold text-green">
                  {formatChf(p.price)}
                </span>
              </div>
              <DdpNote />
            </Link>
          ))}
          {items.length === 0 && (
            <p className="text-sm text-muted">
              Noch nichts auf der Watchlist. Füge Preise aus dem{" "}
              <Link href="/feed" className="text-primary underline">
                Feed
              </Link>{" "}
              hinzu.
            </p>
          )}
        </div>
      </div>
      <BottomTabBar />
    </>
  );
}
