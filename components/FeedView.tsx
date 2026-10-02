"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  products,
  categoryIntros,
  categoryLabels,
  isProductCategory,
  type Product,
  type ProductStatus,
} from "@/lib/products";
import { blogPosts, postCategoryLabel } from "@/lib/blog";
import PriceCard from "@/components/PriceCard";
import FilterPills, { buildHref, type FeedParams } from "@/components/FilterPills";
import { JournalPost, ProductPost } from "@/components/FeedPost";

const statuses: { label: string; value: ProductStatus }[] = [
  { label: "Preis gefallen", value: "gefallen" },
  { label: "Bald verfügbar", value: "bald" },
  { label: "Vergriffen", value: "vergriffen" },
];

const sortOptions = [
  { label: "Empfohlen", value: undefined },
  { label: "Preis aufsteigend", value: "price-asc" },
  { label: "Preis absteigend", value: "price-desc" },
];

const tabs = [
  { label: "Für dich", tab: undefined },
  { label: "Preis gefallen", tab: "preisfall" },
  { label: "Journal", tab: "journal" },
];

function first(value: string | null): string | undefined {
  return value || undefined;
}

export default function FeedView() {
  const raw = useSearchParams();
  const params: FeedParams = {
    category: first(raw.get("category")),
    q: first(raw.get("q")),
    status: first(raw.get("status")),
    sale: first(raw.get("sale")),
    sort: first(raw.get("sort")),
    tab: first(raw.get("tab")),
  };
  const category = isProductCategory(params.category) ? params.category : undefined;
  const isGrid = Boolean(category || params.q);

  return isGrid ? (
    <CategoryView params={params} category={category} />
  ) : (
    <StreamView tab={params.tab} />
  );
}

function CategoryView({
  params,
  category,
}: {
  params: FeedParams;
  category: Product["category"] | undefined;
}) {
  const q = params.q?.toLowerCase();
  let list: Product[] = products.filter(
    (p) =>
      (!category || p.category === category) &&
      (!q || p.name.toLowerCase().includes(q) || p.retailer?.toLowerCase().includes(q)) &&
      (!params.status || p.status === params.status) &&
      (!params.sale || p.wasPrice),
  );
  if (params.sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
  if (params.sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);

  const title = category ? categoryLabels[category] : `Suche: „${params.q}“`;
  const base = "/feed";

  return (
    <div className="mx-auto max-w-[1440px] px-4 pb-20 pt-6 md:px-16 md:pt-7">
      <nav aria-label="Brotkrumen" className="text-[13px] text-muted">
        <Link href="/">Home</Link> / <Link href="/feed">Feed</Link> /{" "}
        <span className="text-foreground">{category ? categoryLabels[category] : "Suche"}</span>
      </nav>

      <div className="mt-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div className="flex flex-col gap-2.5">
          <h1 className="font-serif text-4xl font-medium leading-[1.05] tracking-tight text-foreground md:text-[52px]">
            {title}
          </h1>
          {category && <p className="max-w-[560px] text-[15px] text-muted">{categoryIntros[category]}</p>}
        </div>
        <p className="font-serif text-xl text-foreground md:text-right md:text-2xl">
          {list.length} {list.length === 1 ? "Preis" : "Preise"}
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-4">
        <FilterPills
          base={base}
          params={params}
          options={[
            { label: "Sale", patch: { sale: params.sale ? undefined : "1" }, active: Boolean(params.sale) },
            ...statuses.map((s) => ({
              label: s.label,
              patch: { status: params.status === s.value ? undefined : s.value },
              active: params.status === s.value,
            })),
          ]}
        />
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="text-muted">Sortieren nach:</span>
            {sortOptions.map((option) => (
              <Link
                key={option.label}
                href={buildHref(base, params, { sort: option.value })}
                aria-current={params.sort === option.value ? "true" : undefined}
                className={`py-2.5 ${
                  params.sort === option.value ? "font-semibold text-foreground underline" : "text-foreground"
                }`}
              >
                {option.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {list.length === 0 ? (
        <p className="mt-10 text-sm text-muted">Keine Preise gefunden. Passe die Filter an oder suche etwas anderes.</p>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4 md:gap-x-5">
          {list.map((p) => (
            <PriceCard key={p.slug} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}

function StreamView({ tab }: { tab: string | undefined }) {
  const productPosts = [...products]
    .filter((p) => tab !== "preisfall" || p.status === "gefallen")
    .sort((a, b) => Number(b.status === "gefallen") - Number(a.status === "gefallen"));
  const journalPosts = blogPosts;

  type Item = { kind: "product"; product: Product } | { kind: "journal"; post: (typeof blogPosts)[number] };
  const items: Item[] = [];
  if (tab === "journal") {
    journalPosts.forEach((post) => items.push({ kind: "journal", post }));
  } else {
    // Ein Journal-Artikel nach jeweils zwei Preis-Posts.
    let j = 0;
    productPosts.forEach((product, i) => {
      items.push({ kind: "product", product });
      if (tab !== "preisfall" && (i + 1) % 2 === 0 && j < journalPosts.length) {
        items.push({ kind: "journal", post: journalPosts[j++] });
      }
    });
  }

  return (
    <div className="mx-auto max-w-[1120px] px-4 pb-20 pt-6 md:px-8">
      <nav aria-label="Feed-Ansicht" className="flex gap-6 overflow-x-auto border-b border-line">
        {tabs.map((t) => {
          const active = t.tab === tab;
          return (
            <Link
              key={t.label}
              href={buildHref("/feed", {}, { tab: t.tab })}
              aria-current={active ? "page" : undefined}
              className={`whitespace-nowrap border-b-2 py-3.5 text-[15px] ${
                active
                  ? "border-foreground font-semibold text-foreground"
                  : "border-transparent text-muted hover:text-foreground"
              }`}
            >
              {t.label}
            </Link>
          );
        })}
        <Link
          href="/mein-feed"
          className="whitespace-nowrap border-b-2 border-transparent py-3.5 text-[15px] text-muted hover:text-foreground"
        >
          Gefolgt
        </Link>
      </nav>

      <div className="mt-8 flex flex-col gap-10 lg:flex-row lg:items-start">
        <div className="flex w-full max-w-[720px] flex-col gap-7">
          {items.length === 0 && <p className="text-sm text-muted">Noch keine Beiträge in dieser Ansicht.</p>}
          {items.map((item) =>
            item.kind === "product" ? (
              <ProductPost key={`p-${item.product.slug}`} product={item.product} />
            ) : (
              <JournalPost key={`j-${item.post.slug}`} post={item.post} />
            ),
          )}
        </div>

        <aside className="flex w-full flex-col gap-5 lg:w-[340px] lg:shrink-0">
          <section className="border border-line bg-surface p-5">
            <h2 className="font-serif text-xl font-bold text-foreground">Neu im Journal</h2>
            <ul className="mt-3 flex flex-col">
              {blogPosts.slice(0, 3).map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="flex min-h-11 flex-col justify-center py-2 text-sm text-foreground hover:underline"
                  >
                    <span className="font-mono text-xs uppercase text-muted">{postCategoryLabel(post)}</span>
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/blog" className="mt-2 inline-flex min-h-11 items-center text-sm font-semibold text-foreground">
              Alle Artikel →
            </Link>
          </section>
          <section className="border border-line bg-surface p-5">
            <h2 className="font-serif text-xl font-bold text-foreground">Deine Watchlist</h2>
            <p className="mt-2 text-sm text-muted">Merke dir Preise und behalte sie im Blick.</p>
            <Link href="/watchlist" className="mt-2 inline-flex min-h-11 items-center text-sm font-semibold text-foreground">
              Zur Watchlist →
            </Link>
          </section>
        </aside>
      </div>
    </div>
  );
}
