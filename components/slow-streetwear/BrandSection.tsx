import Link from "next/link";
import type { Brand } from "@/lib/slow-streetwear";
import BrandWatchButton from "./BrandWatchButton";

export default function BrandSection({ brand }: { brand: Brand }) {
  return (
    <section id={`brand-${brand.id}`} className="mt-16 scroll-mt-36">
      <span className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground">
        {brand.origin} · {brand.since}
      </span>
      <h2 className="mt-2 font-serif text-[28px] font-medium leading-[1.15] tracking-tight text-foreground md:text-4xl">
        {brand.name}: {brand.focus}
      </h2>

      <div className="relative mt-4 aspect-[3/2] w-full bg-placeholder">
        <span className="absolute bottom-3.5 left-4 font-mono text-xs text-muted">Bild: {brand.name}</span>
      </div>

      <p className="mt-5 text-[15px] leading-relaxed text-muted">{brand.text}</p>

      <div className="my-5 grid grid-cols-1 border border-line bg-surface sm:grid-cols-3">
        {brand.facts.map(([value, label]) => (
          <div key={label} className="min-w-0 border-line p-4 not-first:border-t sm:not-first:border-l sm:not-first:border-t-0">
            <b className="block break-words font-mono text-[15px] font-semibold">{value}</b>
            <small className="mt-0.5 block text-xs text-muted">{label}</small>
          </div>
        ))}
        <div className="min-w-0 border-t border-line p-4 sm:border-l sm:border-t-0">
          <span
            className={`inline-flex items-center gap-1.5 font-mono text-xs font-semibold ${
              brand.ddp ? "text-green" : "text-accent"
            }`}
          >
            <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
            {brand.ddp ? "DDP" : "DDU?"}
          </span>
          <small className="mt-0.5 block text-xs text-muted">{brand.shipNote}</small>
        </div>
      </div>

      <p className="mb-5 text-sm">
        <b className="mr-2 font-mono text-xs font-semibold uppercase tracking-wider">Für wen</b>
        {brand.who}
      </p>

      <div className="flex flex-wrap items-center gap-3">
        <Link
          href={`/feed?q=${encodeURIComponent(brand.name)}`}
          className="flex h-12 items-center rounded-sm bg-primary px-6 text-sm font-semibold text-surface"
        >
          Deals ansehen
        </Link>
        <BrandWatchButton id={brand.id} />
        <span className="text-xs text-muted md:ml-auto">
          Quelle:{" "}
          <a
            href={brand.source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-line underline-offset-[3px]"
          >
            {brand.source.label}
          </a>
        </span>
      </div>
    </section>
  );
}
