import Link from "next/link";
import { products, formatChf } from "@/lib/products";
import PriceCard from "@/components/PriceCard";
import DdpBadge from "@/components/DdpBadge";

const featured = ["wool-overshirt", "nightwalker-hoodie", "ambre-nomade", "ghost-cargo-pants"];
const deals = ["nightwalker-hoodie", "voltage-jacket", "ambre-nomade"];
const categories = [
  { label: "Streetwear", href: "/feed?category=streetwear" },
  { label: "Sneaker", href: "/feed" },
  { label: "Accessoires", href: "/feed" },
  { label: "Düfte", href: "/feed?category=duefte" },
];

export default function HomePage() {
  const featuredProducts = featured.map((slug) => products.find((p) => p.slug === slug)!);
  const dealProducts = deals.map((slug) => products.find((p) => p.slug === slug)!);

  return (
    <>
      <section className="bg-surface-hero px-6 py-12 md:px-16 md:py-20">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-8 md:flex-row md:items-center md:gap-16">
          <div className="flex flex-col gap-4 md:max-w-[480px]">
            <h1 className="text-3xl font-bold leading-tight text-foreground md:text-5xl">
              Bevor du kaufst, ein zweiter Blick auf den Preis.
            </h1>
            <p className="text-sm text-muted md:text-base">
              Wir verfolgen Preise für Streetwear, Sneaker und Nischendüfte über mehrere Händler
              hinweg und melden dir, wenn ein Preis wirklich fällt.
            </p>
            <Link
              href="/feed"
              className="w-fit rounded-full border border-foreground px-6 py-3 text-sm font-semibold text-foreground"
            >
              Preisverlauf ansehen
            </Link>
          </div>
          <div className="aspect-[4/3] w-full rounded-xl bg-placeholder md:flex-1" />
        </div>
      </section>

      <section className="px-6 py-12 md:px-16 md:py-16">
        <div className="mx-auto max-w-[1440px]">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-foreground md:text-2xl">Zuletzt aktualisiert</h2>
            <Link href="/feed" className="text-sm font-medium text-primary">
              Alle ansehen
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
            {featuredProducts.map((p) => (
              <PriceCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-foreground px-6 py-12 md:px-16 md:py-16">
        <div className="mx-auto max-w-[1440px]">
          <h2 className="text-xl font-bold text-bg md:text-2xl">Diese Woche im Preis reduziert</h2>
          <div className="mt-6 flex flex-col gap-6">
            {dealProducts.map((p) => (
              <div
                key={p.slug}
                className="flex flex-col gap-2 border-b border-white/10 pb-6 last:border-0 md:flex-row md:items-center md:justify-between md:gap-4 md:pb-4"
              >
                <span className="font-semibold text-bg">{p.name}</span>
                <span className="text-sm text-muted-light">
                  Bei {p.retailer} · Zuletzt geprüft: heute
                </span>
                <div className="flex items-center gap-3">
                  {p.wasPrice && (
                    <span className="font-mono text-sm text-muted-light line-through">
                      {formatChf(p.wasPrice)}
                    </span>
                  )}
                  <span className="font-mono text-sm font-bold text-green-bright">
                    {formatChf(p.price)}
                  </span>
                  <DdpBadge variant="dark" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-12 md:px-16 md:py-16">
        <div className="mx-auto max-w-[1440px]">
          <h2 className="text-xl font-bold text-foreground md:text-2xl">Kategorien verfolgen</h2>
          <div className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-4">
            {categories.map((c) => (
              <Link key={c.label} href={c.href} className="flex flex-col gap-3">
                <div className="aspect-square w-full rounded-lg bg-placeholder" />
                <span className="text-sm font-semibold text-foreground">{c.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
