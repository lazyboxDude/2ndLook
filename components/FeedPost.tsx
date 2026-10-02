import Link from "next/link";
import { categoryLabels, formatChf, type Product } from "@/lib/products";
import { postCategoryLabel, type BlogPost } from "@/lib/blog";
import { DdpNote } from "@/components/DdpBadge";
import StatusTag from "@/components/StatusTag";
import WatchlistButton from "@/components/WatchlistButton";

function initials(name: string): string {
  return name
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function PostHeader({
  name,
  meta,
  dark = false,
  sponsored = false,
}: {
  name: string;
  meta: string;
  dark?: boolean;
  sponsored?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 px-4 py-4 md:px-5">
      <span
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-mono text-sm font-semibold ${
          dark ? "bg-foreground text-surface" : "bg-placeholder text-foreground"
        }`}
        aria-hidden="true"
      >
        {initials(name)}
      </span>
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-[15px] font-semibold text-foreground">{name}</span>
        <span className="truncate font-mono text-xs uppercase text-muted">{meta}</span>
      </div>
      {sponsored && (
        <span className="rounded-sm border border-accent bg-accent-pale px-3 py-1.5 text-[13px] font-semibold text-[#6b4a00]">
          Anzeige
        </span>
      )}
    </div>
  );
}

export function ProductPost({ product, sponsored = false }: { product: Product; sponsored?: boolean }) {
  const author = product.retailer ?? "2ndLook";
  const meta = [
    sponsored ? "Gesponsert" : categoryLabels[product.category],
    product.lastChecked && `Zuletzt geprüft ${product.lastChecked}`,
  ]
    .filter(Boolean)
    .join(" · ");
  const drop = product.wasPrice
    ? Math.round((1 - product.price / product.wasPrice) * 100)
    : null;

  return (
    <article
      className={`border bg-surface ${sponsored ? "border-accent" : "border-line"}`}
      aria-label={product.name}
    >
      <PostHeader name={author} meta={meta} sponsored={sponsored} />
      <Link
        href={`/produkt/${product.slug}`}
        aria-label={product.name}
        className="relative block aspect-[4/3] w-full bg-surface-hero"
      >
        <div className="absolute inset-[16%] bg-placeholder" />
        {product.status === "vergriffen" ? (
          <span className="absolute left-4 top-4 bg-foreground px-2 py-1 font-mono text-xs font-medium text-surface">
            VERGRIFFEN
          </span>
        ) : (
          product.wasPrice && (
            <span className="absolute left-4 top-4 border border-line bg-surface px-2 py-1 font-mono text-xs font-semibold text-accent">
              SALE
            </span>
          )
        )}
      </Link>
      <div className="flex flex-col gap-2.5 px-4 pb-2 pt-4 md:px-5">
        <div className="flex flex-wrap items-center gap-3 font-mono">
          <span className="text-2xl font-semibold text-foreground">{formatChf(product.price)}</span>
          {product.wasPrice && (
            <span className="text-[15px] text-muted line-through">{formatChf(product.wasPrice)}</span>
          )}
          {drop !== null && drop > 0 && (
            <span className="bg-green-pale px-2 py-1 text-xs font-semibold text-green">−{drop}%</span>
          )}
        </div>
        <h2 className="text-[17px] font-medium text-foreground">{product.name}</h2>
        {(product.description ?? product.spec) && (
          <p className="text-sm leading-relaxed text-muted">{product.description ?? product.spec}</p>
        )}
        {product.status === "bald" && <StatusTag status={product.status} />}
        <DdpNote />
      </div>
      <div className="flex items-center justify-end gap-3 px-4 pb-4 pt-2 md:px-5">
        <WatchlistButton slug={product.slug} />
        <Link
          href={`/produkt/${product.slug}`}
          className="flex h-11 items-center rounded-sm bg-primary px-5 text-sm font-semibold text-bg"
        >
          Zum Händler
        </Link>
      </div>
    </article>
  );
}

export function JournalPost({ post }: { post: BlogPost }) {
  const label = postCategoryLabel(post);
  return (
    <article className="border border-line bg-surface" aria-label={post.title}>
      <PostHeader name="2ndLook Journal" meta={`${label} · ${post.publishedAt}`} dark />
      <Link
        href={`/blog/${post.slug}`}
        aria-label={post.title}
        className="relative block aspect-[16/9] w-full bg-surface-hero"
      >
        <div className="absolute inset-[16%] bg-placeholder" />
        <span className="absolute left-4 top-4 bg-foreground px-2 py-1 font-mono text-xs font-medium text-surface">
          JOURNAL
        </span>
      </Link>
      <div className="flex flex-col gap-2.5 px-4 pb-2 pt-4 md:px-5">
        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground">
          {label} · Journal
        </span>
        <h2 className="font-serif text-2xl font-bold leading-tight tracking-tight text-foreground md:text-3xl">
          {post.title}
        </h2>
        <p className="text-[15px] leading-relaxed text-muted">{post.excerpt}</p>
      </div>
      <div className="flex justify-end px-4 pb-4 pt-2 md:px-5">
        <Link
          href={`/blog/${post.slug}`}
          className="flex h-11 items-center rounded-sm bg-primary px-5 text-sm font-semibold text-bg"
        >
          Lesen →
        </Link>
      </div>
    </article>
  );
}
