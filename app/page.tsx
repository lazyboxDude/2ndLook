import Link from "next/link";
import { products } from "@/lib/products";
import { getBlogPostBySlug } from "@/lib/blog";
import PriceCard from "@/components/PriceCard";

const heroPostSlug = "die-besten-streetwear-marken-2026";
const dealSlugs = ["nightwalker-hoodie", "voltage-jacket", "ambre-nomade"];
const journalSlugs = [
  "restock-kalender-diese-drops-lohnen-sich",
  "so-liest-du-einen-preisverlauf-richtig",
  "herbst-ausblick-preise-im-vergleich",
];

export default function HomePage() {
  const heroPost = getBlogPostBySlug(heroPostSlug)!;
  const dealProducts = dealSlugs.map((slug) => products.find((p) => p.slug === slug)!);
  const journalPosts = journalSlugs.map((slug) => getBlogPostBySlug(slug)!);

  return (
    <>
      <section className="flex flex-col md:flex-row">
        <Link
          href={`/blog/${heroPost.slug}`}
          className="relative block min-h-[360px] w-full overflow-hidden bg-slate-800 md:min-h-[640px] md:w-[65%]"
        >
          <span className="absolute left-7 top-7 h-5 w-5 border-l-2 border-t-2 border-white/80" />
          <span className="absolute bottom-7 right-7 h-5 w-5 border-b-2 border-r-2 border-white/80" />
        </Link>
        <div className="flex w-full flex-col justify-center gap-5 bg-white px-8 py-14 md:w-[35%] md:px-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-foreground">
            {heroPost.categoryLabel} · Journal
          </span>
          <h1 className="font-serif text-3xl font-bold leading-tight text-foreground md:text-4xl">
            {heroPost.title}
          </h1>
          <p className="max-w-[380px] text-sm text-muted">{heroPost.excerpt}</p>
          <Link
            href={`/blog/${heroPost.slug}`}
            className="w-fit rounded-full bg-primary px-6 py-3 text-sm font-semibold text-bg"
          >
            Jetzt lesen
          </Link>
        </div>
      </section>

      <section className="px-6 py-14 md:px-16 md:py-20">
        <div className="mx-auto max-w-[1440px]">
          <h2 className="font-serif text-2xl font-bold text-foreground md:text-3xl">
            Diese Woche im Preis reduziert
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {dealProducts.map((p) => (
              <PriceCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-20 md:px-16 md:pb-24">
        <div className="mx-auto max-w-[1440px]">
          <h2 className="font-serif text-2xl font-bold text-foreground md:text-3xl">
            Aus dem Journal
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {journalPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="flex flex-col gap-3">
                <div className="aspect-[4/3] w-full rounded bg-slate-800 shadow-lg shadow-slate-900/10" />
                <span className="text-xs font-semibold uppercase tracking-wider text-foreground">
                  {post.categoryLabel}
                </span>
                <span className="font-serif text-lg font-bold text-foreground">{post.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
