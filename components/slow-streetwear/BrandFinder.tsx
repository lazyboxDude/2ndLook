"use client";

import { useState } from "react";
import {
  brands,
  mustOptions,
  needOptions,
  type BrandMust,
  type BrandNeed,
} from "@/lib/slow-streetwear";

function chipClass(pressed: boolean) {
  return `rounded-sm border px-3.5 py-2 text-sm font-medium transition-colors ${
    pressed
      ? "border-foreground bg-foreground text-bg"
      : "border-line bg-surface text-foreground hover:border-foreground"
  }`;
}

function scrollToBrand(hash: string) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.querySelector(hash)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
}

export default function BrandFinder() {
  const [need, setNeed] = useState<BrandNeed | "all">("all");
  const [musts, setMusts] = useState<Set<BrandMust>>(() => new Set());

  const list = brands.filter(
    (b) => (need === "all" || b.needs.includes(need)) && [...musts].every((m) => (m === "ddp" ? b.ddp : b[m])),
  );
  const pristine = need === "all" && musts.size === 0;
  const activeMust = mustOptions.find(([k]) => musts.has(k))?.[1] ?? "Inkl. Zoll & MwSt.";

  const toggleMust = (k: BrandMust) =>
    setMusts((prev) => {
      const next = new Set(prev);
      if (next.has(k)) next.delete(k);
      else next.add(k);
      return next;
    });

  return (
    <div className="border border-line bg-surface">
      <div className="grid gap-4 bg-bg/60 p-5">
        <div>
          <span id="lbl-need" className="mb-2 block font-mono text-xs font-semibold uppercase tracking-wider">
            Ich suche
          </span>
          <div role="group" aria-labelledby="lbl-need" className="flex flex-wrap gap-2">
            {needOptions.map(([k, label]) => (
              <button key={k} type="button" aria-pressed={need === k} onClick={() => setNeed(k)} className={chipClass(need === k)}>
                {label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <span id="lbl-must" className="mb-2 block font-mono text-xs font-semibold uppercase tracking-wider">
            Mir ist wichtig
          </span>
          <div role="group" aria-labelledby="lbl-must" className="flex flex-wrap gap-2">
            {mustOptions.map(([k, label]) => (
              <button key={k} type="button" aria-pressed={musts.has(k)} onClick={() => toggleMust(k)} className={chipClass(musts.has(k))}>
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div
        aria-live="polite"
        className="flex flex-wrap items-center justify-between gap-3 border-y border-line px-5 py-3.5 font-mono text-xs text-muted"
      >
        <span>
          <b className="text-foreground">{list.length}</b> von {brands.length} Marken passen
        </span>
        {!pristine && (
          <button
            type="button"
            className="underline"
            onClick={() => {
              setNeed("all");
              setMusts(new Set());
            }}
          >
            Filter zurücksetzen
          </button>
        )}
      </div>

      <ul>
        {list.length ? (
          list.map((b) => (
            <li key={b.id} className="border-line not-first:border-t">
              <a
                href={`#brand-${b.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToBrand(`#brand-${b.id}`);
                }}
                className="grid grid-cols-1 items-center gap-x-5 gap-y-1.5 px-5 py-4 hover:bg-bg/60 sm:grid-cols-[1fr_auto]"
              >
                <b className="text-base font-semibold">{b.name}</b>
                <span className="text-sm leading-snug text-muted sm:col-start-1">{b.why}</span>
                <span className="flex flex-wrap gap-x-3.5 gap-y-1.5 font-mono text-[11px] text-muted sm:col-start-1">
                  <span>{b.key}</span>
                  {b.repair && <span>Reparatur</span>}
                  {b.europe && <span>Made in Europe</span>}
                  <span className={`font-semibold ${b.ddp ? "text-green" : "text-accent"}`}>
                    ● {b.ddp ? "Inkl. Zoll & MwSt." : "Versand prüfen"}
                  </span>
                </span>
                <span className="whitespace-nowrap text-sm font-semibold sm:col-start-2 sm:row-span-3 sm:row-start-1">
                  Zum Porträt →
                </span>
              </a>
            </li>
          ))
        ) : (
          <li className="px-5 py-6 text-sm text-muted">
            Keine Marke erfüllt alle Kriterien. Entferne einen Filter, zum Beispiel «{activeMust}».
          </li>
        )}
      </ul>
    </div>
  );
}
