import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug, products, formatChf } from "@/lib/products";
import StatusTag from "@/components/StatusTag";
import DdpBadge from "@/components/DdpBadge";
import PriceCard from "@/components/PriceCard";
import PriceAlertWidget from "@/components/PriceAlertWidget";
import PriceHistoryChart from "@/components/PriceHistoryChart";
import WatchlistButton from "@/components/WatchlistButton";

export default async function ProductPage({ params }: PageProps<"/produkt/[slug]">) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = products.filter((p) => p.slug !== product.slug).slice(0, 4);
  const fxEstimate = (product.price * 1.0526).toFixed(2);

  return (
    <div className="mx-auto max-w-[1440px] px-6 py-8 md:px-16">
      <nav className="text-sm text-muted">
        <Link href="/feed">Feed</Link> / <Link href={`/feed?category=${product.category}`}>
          {product.category === "streetwear" ? "Streetwear" : "Düfte"}
        </Link>{" "}
        / <span className="font-medium text-foreground">{product.name}</span>
      </nav>

      <div className="mt-6 flex flex-col gap-10 md:flex-row md:gap-14">
        <div className="flex flex-col gap-4 md:w-1/2">
          <div className="aspect-square w-full rounded-xl bg-placeholder" />
          <div className="grid grid-cols-4 gap-3">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`aspect-square rounded-lg ${i === 0 ? "bg-foreground/70" : "bg-placeholder"}`}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 md:w-1/2">
          <StatusTag status={product.status} />
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">{product.name}</h1>

          <div className="flex flex-wrap items-center gap-3">
            {product.wasPrice && (
              <span className="font-mono text-lg text-muted line-through">
                {formatChf(product.wasPrice)}
              </span>
            )}
            <span className="font-mono text-2xl font-bold text-green">
              {formatChf(product.price)}
            </span>
            <DdpBadge />
          </div>
          <p className="font-mono text-sm text-muted">≈ € {fxEstimate} · Live-Kurs</p>

          {product.description && <p className="text-sm text-muted">{product.description}</p>}

          <div className="rounded-lg bg-white text-sm">
            {product.material && (
              <Row label="Material" value={product.material} />
            )}
            {product.retailer && <Row label="Händler" value={product.retailer} mono />}
            {product.lastChecked && (
              <Row label="Zuletzt geprüft" value={product.lastChecked} mono />
            )}
            {product.wasPrice && (
              <Row label="Tiefstpreis (90 Tage)" value={formatChf(product.price)} mono />
            )}
            <Row label="Versand" value="DDP, Zoll & MwSt. bereits im Preis enthalten" last />
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-bg">
              Zum Händler
            </button>
            <WatchlistButton slug={product.slug} />
            <span className="text-xs text-muted">Über Awin, geprüfter Partner</span>
          </div>

          <PriceAlertWidget currentPrice={product.price} />
        </div>
      </div>

      {product.wasPrice && (
        <section className="mt-14 rounded-xl bg-surface-hero p-6 md:p-8">
          <h2 className="text-lg font-bold text-foreground">Preisverlauf der letzten 90 Tage</h2>
          <div className="mt-4">
            <PriceHistoryChart lowLabel={`Tiefstpreis: ${formatChf(product.price)} (heute)`} />
          </div>
        </section>
      )}

      <section className="mt-14">
        <span className="text-xs font-semibold text-muted">Aus der Community</span>
        <blockquote className="mt-3 max-w-[640px] text-xl font-medium leading-snug text-foreground">
          „Der Preisverlauf hat genau gestimmt — ich habe drei Wochen gewartet und tatsächlich den
          Tiefstpreis erwischt.“
        </blockquote>
        <p className="mt-2 text-sm text-muted">— Nutzer, Zürich</p>
      </section>

      <section className="mt-14 pb-16">
        <h2 className="text-xl font-bold text-foreground md:text-2xl">Ähnliche Preise</h2>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
          {related.map((p) => (
            <PriceCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}

function Row({
  label,
  value,
  mono,
  last,
}: {
  label: string;
  value: string;
  mono?: boolean;
  last?: boolean;
}) {
  return (
    <div className={`flex justify-between px-4 py-2.5 ${last ? "" : "border-b border-placeholder"}`}>
      <span className="text-muted">{label}</span>
      <span className={`font-medium text-foreground ${mono ? "font-mono" : ""}`}>{value}</span>
    </div>
  );
}

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}
