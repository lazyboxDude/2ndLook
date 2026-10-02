"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useWatchlist } from "@/lib/watchlist-context";
import { brands, brandWatchKey } from "@/lib/slow-streetwear";
import { BookmarkIcon } from "@/components/icons";

export default function BrandToc() {
  const { isWatched } = useWatchlist();
  const [active, setActive] = useState<string | null>(null);
  const watchedCount = brands.filter((b) => isWatched(brandWatchKey(b.id))).length;

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length) setActive(visible[0].target.id);
      },
      { rootMargin: "-150px 0px -55% 0px" },
    );
    document.querySelectorAll("section[id^='brand-']").forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <nav aria-label={`Die ${brands.length} Marken`} className="border border-line bg-surface">
      <div className="flex items-baseline justify-between border-b border-line px-[18px] py-4">
        <b className="font-mono text-xs font-semibold uppercase tracking-wider">Top-Marken 2026</b>
        <span className="font-mono text-xs text-muted">{brands.length}</span>
      </div>
      <ol className="grid py-1.5 sm:grid-cols-2 lg:grid-cols-1">
        {brands.map((b, i) => {
          const isActive = active === `brand-${b.id}`;
          return (
            <li key={b.id}>
              <a
                href={`#brand-${b.id}`}
                aria-current={isActive ? "location" : undefined}
                className={`grid grid-cols-[28px_minmax(0,1fr)_auto] items-center gap-1 border-l-2 px-[18px] py-2.5 text-sm transition-colors hover:bg-bg/60 ${
                  isActive ? "border-foreground bg-bg/60 font-semibold" : "border-transparent"
                }`}
              >
                <span className={`font-mono text-xs ${isActive ? "text-foreground" : "text-muted-light"}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex items-center gap-1.5 truncate">
                  <span className="truncate">{b.name}</span>
                  {isWatched(brandWatchKey(b.id)) && <BookmarkIcon filled size={12} className="shrink-0" />}
                </span>
                <span className={`font-mono text-[10px] font-semibold ${b.ddp ? "text-green" : "text-accent"}`}>
                  {b.ddp ? "DDP" : "●"}
                </span>
              </a>
            </li>
          );
        })}
      </ol>
      <div className="grid gap-2.5 border-t border-line px-[18px] py-4">
        <div className="flex gap-3.5 font-mono text-[11px]">
          <span className="text-green">● DDP</span>
          <span className="text-accent">● Versand prüfen</span>
        </div>
        <p className="text-xs leading-normal text-muted">
          {watchedCount
            ? `${watchedCount} von ${brands.length} Marken beobachtet.`
            : "Noch keine Marke beobachtet. Tipp auf «Marke beobachten», um sie dir zu merken."}
        </p>
        <Link
          href="/watchlist"
          className="flex h-10 items-center justify-center rounded-sm bg-primary text-sm font-semibold text-surface"
        >
          Zur Watchlist
        </Link>
      </div>
    </nav>
  );
}
