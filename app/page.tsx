import Link from "next/link";
import { products, categoryLabels } from "@/lib/products";
import { getBlogPostBySlug, postCategoryLabel } from "@/lib/blog";
import PriceCard from "@/components/PriceCard";

const heroPostSlug = "die-besten-streetwear-marken-2026";
const dealSlugs = ["nightwalker-hoodie", "voltage-jacket", "ambre-nomade", "ghost-cargo-pants"];
const journalSlugs = [
  "restock-kalender-diese-drops-lohnen-sich",
  "so-liest-du-einen-preisverlauf-richtig",
  "herbst-ausblick-preise-im-vergleich",
];

export default function HomePage() {
  const heroPost = getBlogPostBySlug(heroPostSlug)!;
  const dealProducts = dealSlugs.map((slug) => products.find((p) => p.slug === slug)!);
  const journalPosts = journalSlugs.map((slug) => getBlogPostBySlug(slug)!);
  const heroLabel =
    heroPost.category === "streetwear" ? categoryLabels.streetwear : postCategoryLabel(heroPost);

  return (
    <>
      <section className="flex flex-col md:min-h-[620px] md:flex-row">
        <Link
          href={`/blog/${heroPost.slug}`}
          aria-label={heroPost.title}
          className="relative flex min-h-[320px] w-full items-end overflow-hidden bg-[#3a3835] p-6 md:w-[65%] md:p-14"
        >
          <span
            aria-hidden="true"
            className="font-mono text-5xl font-bold leading-none text-surface sm:text-7xl md:text-[104px]"
          >
            {heroLabel.toUpperCase()} 2026
          </span>
        </Link>
        <div className="flex w-full flex-col justify-center gap-5 bg-bg px-6 py-12 md:w-[35%] md:px-12">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground">
            {postCategoryLabel(heroPost)} · Journal
          </span>
          <h1 className="font-serif text-4xl font-medium leading-[1.1] tracking-tight text-foreground">
            {heroPost.title}
          </h1>
          <p className="max-w-[400px] text-[15px] leading-relaxed text-muted">{heroPost.excerpt}</p>
          <Link
            href={`/blog/${heroPost.slug}`}
            className="flex h-12 w-fit items-center rounded-sm bg-primary px-6 text-sm font-semibold text-bg"
          >
            Jetzt lesen
          </Link>
        </div>
      </section>

      <section className="px-4 pt-14 md:px-16 md:pt-16">
        <div className="mx-auto max-w-[1440px]">
          <h2 className="font-serif text-3xl font-medium tracking-tight text-foreground md:text-4xl">
            Diese Woche im Preis reduziert
          </h2>
          <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4 md:gap-x-5">
            {dealProducts.map((p) => (
              <PriceCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 pt-14 md:px-16 md:pt-16">
        <div className="mx-auto max-w-[1440px]">
          <div className="flex items-end justify-between">
            <h2 className="font-serif text-3xl font-medium tracking-tight text-foreground md:text-4xl">
              Aus dem Journal
            </h2>
            <Link href="/blog" className="flex min-h-11 items-center text-sm font-semibold text-foreground">
              Alle Artikel →
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
            {journalPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="flex flex-col gap-3">
                <div className="aspect-[3/2] w-full bg-placeholder" />
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground">
                  {postCategoryLabel(post)} · Journal
                </span>
                <span className="font-serif text-2xl font-bold leading-tight tracking-tight text-foreground">
                  {post.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
