import Link from "next/link";
import { postCategoryLabel, type BlogPost } from "@/lib/blog";
import { brands, criteria, picks } from "@/lib/slow-streetwear";
import BrandSection from "./BrandSection";
import BrandFinder from "./BrandFinder";
import BrandToc from "./BrandToc";

const h2Class =
  "mb-4 mt-14 font-serif text-[28px] font-medium leading-[1.15] tracking-tight text-foreground md:text-4xl";

export default function SlowStreetwearArticle({ post }: { post: BlogPost }) {
  const pickBrands = picks.map((p) => ({ ...p, brand: brands.find((b) => b.id === p.brandId)! }));

  return (
    <article className="mx-auto max-w-[1180px] px-6 py-10 md:px-16 md:py-14">
      <div className="max-w-[840px]">
        <nav className="flex flex-wrap gap-1.5 text-sm text-muted">
          <Link href="/blog">Journal</Link> / <span className="font-medium text-foreground">{post.title}</span>
        </nav>
        <span className="mt-6 block text-xs font-bold uppercase text-muted-light">
          {postCategoryLabel(post)} · {post.publishedAt}
          {post.readMinutes ? ` · ${post.readMinutes} Min Lesezeit` : ""}
        </span>
        <h1 className="mt-2 text-3xl font-bold text-balance text-foreground md:text-4xl">{post.title}</h1>
      </div>

      <div className="mt-2 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-14">
        <div className="min-w-0">
          <div className="mt-8 flex aspect-[19/9] w-full items-end bg-placeholder p-5">
            <span className="font-mono text-[clamp(28px,7vw,64px)] font-bold leading-[.95] text-surface">
              2WEAR
              <br />
              2026
            </span>
          </div>

          <p className="mt-8 text-[15px] leading-relaxed text-muted">{post.content[0]}</p>

          <dl className="mt-6 grid grid-cols-[repeat(auto-fit,minmax(170px,1fr))] border-l border-t border-line bg-surface">
            {criteria.map(([title, text]) => (
              <div key={title} className="border-b border-r border-line p-4">
                <dt className="font-mono text-xs font-semibold uppercase tracking-wider">{title}</dt>
                <dd className="mt-1.5 text-sm leading-snug text-muted">{text}</dd>
              </div>
            ))}
          </dl>

          {brands.map((b) => (
            <BrandSection key={b.id} brand={b} />
          ))}

          <h2 className={h2Class}>Welche Marke passt zu dir?</h2>
          <p className="mb-5 text-[15px] leading-relaxed text-muted">
            Wähle, was du suchst und was dir wichtig ist. Die Liste zeigt nur die Marken, die passen.
          </p>
          <BrandFinder />
          <p className="mt-2.5 text-xs text-muted">
            Nur belegte Angaben zählen: Wo wir z.B. keinen Reparatur-Service oder DDP-Versand nachweisen konnten,
            erscheint die Marke bei diesem Filter nicht.
          </p>

          <h2 className={h2Class}>Kaufen aus der Schweiz</h2>
          <ul className="grid gap-4 text-[15px] leading-relaxed text-muted">
            <li>
              <b className="font-semibold text-foreground">Keine Zölle auf Kleider und Schuhe.</b> Seit dem 1. Januar
              2024 hat die Schweiz die Industriezölle abgeschafft, auch für Textilien und Schuhe.
            </li>
            <li>
              <b className="font-semibold text-foreground">Die MwSt. bleibt.</b> Die Einfuhrsteuer fällt weiterhin an,
              dazu oft eine Bearbeitungsgebühr des Paketdienstes.
            </li>
            <li>
              <b className="font-semibold text-foreground">DDP oder DDU?</b> Bei DDP sind alle Abgaben schon bezahlt.
              Bei DDU zahlst du MwSt. und Gebühren bei der Zustellung. Auf 2ndLook ist jeder Deal gekennzeichnet.
            </li>
          </ul>

          <h2 className={h2Class}>Unser Fazit: Hier fängst du an</h2>
          <p className="text-[15px] leading-relaxed text-muted">
            Wenn du nur bei einer Marke bestellst, dann bei <strong className="font-semibold text-foreground">Asket</strong>.
            Sie ist die einzige in dieser Liste mit Preisen in CHF, Zoll und MwSt. inklusive und lebenslanger Reparatur.
          </p>
          <ul className="mt-6 border-t border-line">
            {pickBrands.map(({ label, brand, text }) => (
              <li
                key={brand.id}
                className="grid grid-cols-1 gap-x-6 gap-y-1 border-b border-line py-4 sm:grid-cols-[180px_minmax(0,1fr)]"
              >
                <span className="pt-0.5 font-mono text-xs font-semibold uppercase tracking-wider text-muted">{label}</span>
                <b className="text-base font-semibold">
                  <a href={`#brand-${brand.id}`} className="hover:underline">
                    {brand.name}
                  </a>
                </b>
                <p className="text-sm leading-normal text-muted sm:col-start-2">{text}</p>
              </li>
            ))}
          </ul>

          <section
            aria-label="Watchlist"
            className="mt-14 flex flex-wrap items-center justify-between gap-5 bg-surface-hero p-7"
          >
            <div>
              <b className="block font-serif text-2xl font-medium leading-tight tracking-tight">
                Du musst nicht heute kaufen.
              </b>
              <p className="mt-1.5 max-w-[44ch] text-sm text-muted">
                Setz die Marken auf deine Watchlist und schau später wieder vorbei, wenn du bereit bist.
              </p>
            </div>
            <Link href="/watchlist" className="flex h-12 items-center rounded-sm bg-primary px-6 text-sm font-semibold text-bg">
              Zur Watchlist
            </Link>
          </section>
        </div>

        <aside aria-label="Top-Marken" className="min-w-0 max-lg:order-first">
          <div className="lg:sticky lg:top-6">
            <BrandToc />
          </div>
        </aside>
      </div>
    </article>
  );
}
