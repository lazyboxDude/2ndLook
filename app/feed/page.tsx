import { products, formatChf } from "@/lib/products";
import PriceCard from "@/components/PriceCard";
import DdpBadge from "@/components/DdpBadge";
import BottomTabBar from "@/components/BottomTabBar";
import StatusTag from "@/components/StatusTag";
import Link from "next/link";

const chips = ["Alle", "Geprüft", "Bald verfügbar", "Vergriffen", "Auf Watchlist"];

const titles: Record<string, string> = {
  streetwear: "Streetwear",
  duefte: "Düfte",
};

export default async function FeedPage({ searchParams }: PageProps<"/feed">) {
  const { category } = await searchParams;
  const cat = typeof category === "string" ? category : undefined;
  const list = cat ? products.filter((p) => p.category === cat) : products;
  const spotlight = list.find((p) => p.status === "gefallen") ?? list[0];
  const rest = list.filter((p) => p.slug !== spotlight?.slug);

  return (
    <>
      <section className="bg-surface-hero px-6 py-10 md:px-16 md:py-14">
        <div className="mx-auto max-w-[1440px]">
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">
            {cat ? titles[cat] : "Neu im Feed"}
          </h1>
          <p className="mt-2 max-w-[520px] text-sm text-muted">
            Frisch erfasste Preise für Streetwear, Sneaker und Düfte. Auf die Watchlist setzen und
            benachrichtigt werden, sobald der Preis fällt.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            {chips.map((chip, i) => (
              <span
                key={chip}
                className={`rounded-full px-4 py-2 text-sm font-medium ${
                  i === 0 ? "bg-foreground text-bg" : "border border-placeholder bg-white text-muted"
                }`}
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      </section>

      {spotlight && (
        <section className="px-6 py-10 md:px-16 md:py-14">
          <div className="mx-auto flex max-w-[1440px] flex-col gap-6 rounded-xl bg-surface-hero p-6 md:flex-row md:p-8">
            <div className="aspect-square w-full rounded-lg bg-placeholder md:w-[400px]" />
            <div className="flex flex-col gap-3">
              <StatusTag status={spotlight.status} />
              <h2 className="text-2xl font-bold text-foreground">{spotlight.name}</h2>
              {spotlight.description && (
                <p className="text-sm text-muted">{spotlight.description}</p>
              )}
              {(spotlight.material || spotlight.retailer || spotlight.lastChecked) && (
                <div className="mt-2 rounded-lg bg-white text-sm">
                  {spotlight.material && (
                    <div className="flex justify-between border-b border-placeholder px-4 py-2.5">
                      <span className="text-muted">Material</span>
                      <span className="font-medium text-foreground">{spotlight.material}</span>
                    </div>
                  )}
                  {spotlight.retailer && (
                    <div className="flex justify-between border-b border-placeholder px-4 py-2.5">
                      <span className="text-muted">Händler</span>
                      <span className="font-mono font-medium text-foreground">
                        {spotlight.retailer}
                      </span>
                    </div>
                  )}
                  {spotlight.lastChecked && (
                    <div className="flex justify-between px-4 py-2.5">
                      <span className="text-muted">Zuletzt geprüft</span>
                      <span className="font-mono font-medium text-foreground">
                        {spotlight.lastChecked}
                      </span>
                    </div>
                  )}
                </div>
              )}
              <div className="mt-2 flex items-center gap-3">
                <span className="font-mono text-2xl font-bold text-foreground">
                  {formatChf(spotlight.price)}
                </span>
                <DdpBadge />
                <Link
                  href={`/produkt/${spotlight.slug}`}
                  className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-bg"
                >
                  Zum Händler
                </Link>
                <button className="rounded-full border border-foreground px-5 py-2.5 text-sm font-semibold text-foreground">
                  ♥ Zur Watchlist
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="px-6 pb-24 md:px-16 md:pb-16">
        <div className="mx-auto max-w-[1440px]">
          <h2 className="text-xl font-bold text-foreground md:text-2xl">Ähnliche Preise</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
            {rest.map((p) => (
              <PriceCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      <BottomTabBar />
    </>
  );
}
