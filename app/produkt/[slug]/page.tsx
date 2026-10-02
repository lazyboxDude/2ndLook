import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug, products, formatChf, categoryLabels } from "@/lib/products";
import StatusTag from "@/components/StatusTag";
import DdpBadge from "@/components/DdpBadge";
import PriceCard from "@/components/PriceCard";
import PriceAlertWidget from "@/components/PriceAlertWidget";
import WatchlistButton from "@/components/WatchlistButton";

export default async function ProductPage({ params }: PageProps<"/produkt/[slug]">) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = products.filter((p) => p.slug !== product.slug).slice(0, 4);

  return (
    <div className="mx-auto max-w-[1440px] px-4 pb-16 pt-6 md:px-16 md:pt-7">
      <nav aria-label="Brotkrumen" className="text-[13px] text-muted">
        <Link href="/">Home</Link> / <Link href="/feed">Feed</Link> /{" "}
        <Link href={`/feed?category=${product.category}`}>{categoryLabels[product.category]}</Link> /{" "}
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="mt-6 flex flex-col gap-8 md:flex-row md:gap-16">
        <div className="flex flex-col gap-4 md:w-1/2">
          <div className="relative aspect-square w-full border border-line bg-surface"><div className="absolute inset-[20%] rounded bg-placeholder" /></div>
          <div className="grid grid-cols-4 gap-3">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`aspect-square border bg-surface ${i === 0 ? "border-foreground" : "border-line"}`}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 md:w-1/2">
          <StatusTag status={product.status} />
          <h1 className="font-serif text-3xl font-medium leading-[1.1] tracking-tight text-foreground md:text-4xl">{product.name}</h1>

          <div className="flex flex-wrap items-center gap-3">
            {product.wasPrice && (
              <span className="font-mono text-lg text-muted line-through">
                {formatChf(product.wasPrice)}
              </span>
            )}
            <span className={`font-mono text-3xl font-semibold ${product.wasPrice ? "text-green" : "text-foreground"}`}>
              {formatChf(product.price)}
            </span>
            <DdpBadge />
          </div>

          {product.description && <p className="text-sm text-muted">{product.description}</p>}

          <div className="border border-line bg-surface text-sm">
            {product.material && (
              <Row label="Material" value={product.material} />
            )}
            {product.retailer && <Row label="Händler" value={product.retailer} mono />}
            <Row label="Zoll & MwSt." value="Laut Händler im Preis enthalten (DDP)" />
            <Row label="Versandkosten" value="Siehe Händler" last />
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button className="flex h-12 min-w-[220px] items-center justify-center rounded-sm bg-primary px-6 text-sm font-semibold text-bg">
              Zum Händler
            </button>
            <WatchlistButton slug={product.slug} />
            <span className="text-xs text-muted">Affiliate-Link über Awin</span>
          </div>

          <PriceAlertWidget />
        </div>
      </div>

      <section className="mt-14 pb-16">
        <h2 className="font-serif text-3xl font-medium tracking-tight text-foreground">Ähnliche Preise</h2>
        <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4 md:gap-x-5">
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
    <div className={`flex justify-between px-4 py-2.5 ${last ? "" : "border-b border-line"}`}>
      <span className="text-muted">{label}</span>
      <span className={`font-medium text-foreground ${mono ? "font-mono" : ""}`}>{value}</span>
    </div>
  );
}

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}
