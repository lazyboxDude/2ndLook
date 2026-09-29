import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug, products, formatChf } from "@/lib/products";
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
    <div className="mx-auto max-w-[1440px] px-6 py-8 md:px-16">
      <nav aria-label="Brotkrumen" className="text-sm text-muted">
        <Link href="/feed">Feed</Link> / <Link href={`/feed?category=${product.category}`}>
          {product.category === "streetwear" ? "Streetwear" : "Düfte"}
        </Link>{" "}
        / <span aria-current="page" className="font-medium text-foreground">{product.name}</span>
      </nav>

      <div className="mt-6 flex flex-col gap-10 md:flex-row md:gap-14">
        <div className="flex flex-col gap-4 md:w-1/2">
          <div aria-hidden="true" className="aspect-square w-full rounded-xl bg-placeholder" />
          <div aria-hidden="true" className="grid grid-cols-4 gap-3">
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

          <div className="rounded-lg bg-white text-sm">
            {product.retailer && <Row label="Händler" value={product.retailer} mono />}
            <Row label="Zoll & MwSt." value="Laut Händler im Preis enthalten (DDP)" />
            <Row label="Versandkosten" value="Siehe Händler" last />
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <WatchlistButton slug={product.slug} />
          </div>

          <p className="text-xs text-muted">
            Beispielangaben: Preise sind noch nicht live und können vom Angebot des Händlers abweichen.
          </p>

          <PriceAlertWidget />
        </div>
      </div>

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
