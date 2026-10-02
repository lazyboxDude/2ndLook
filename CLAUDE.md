# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the dev server (http://localhost:3000)
- `npm run build` — production build (also type-checks via `tsc`)
- `npm run lint` — ESLint (flat config, `eslint-config-next`)
- No test suite exists yet.

## Architecture

Next.js (App Router) + TypeScript + Tailwind CSS v4. Tailwind is configured CSS-first: design tokens (colors, fonts) live in `app/globals.css` under `@theme inline`, not in a `tailwind.config.ts` (v4 has none). Fonts are Fira Sans (`font-sans`), Fira Code (`font-mono`, reserved for all numeric/data values — prices, dates, retailer codes) and Playfair Display (`font-serif`, page titles) loaded via `next/font/google` in `app/layout.tsx`. The look follows the approved Lyst-style redesign (Penpot page "Redesign — Lyst-Stil"): warm grey background, white cards, black rectangular buttons (`rounded-sm`), serif titles with `tracking-tight`.

- Categories are branded **2Wear** (slug `streetwear`) and **2Scent** (slug `duefte`). Only the visible labels changed; URL params and product data keep the old slugs. Labels live in `categoryLabels` in `lib/products.ts` (and `postCategoryLabel` in `lib/blog.ts` for journal posts).
- `app/` — routes: `/` (Homepage), `/feed` (two views: without params a social-style stream of product posts and journal posts via `components/FeedPost.tsx`, tabs `?tab=preisfall|journal`; with `?category=…` or `?q=…` a filterable product grid, filters `?status=`, `?sale=1`, `?sort=`), `/watchlist`, `/produkt/[slug]`, and the four legal pages (`/impressum`, `/datenschutz`, `/agb`, `/widerruf-affiliate`). Each page is a single responsive component (Tailwind `md:` breakpoint), not separate desktop/mobile routes.
- `components/` — `Nav` and `Footer` are shared via `app/layout.tsx` and responsive (Nav shows full links on desktop, logo+icon only on mobile). `Nav` is two-row (logo, search, watchlist/account icons; below it a category bar that scrolls horizontally on mobile), so there is no bottom tab bar anymore. `FilterPills` builds link-based filters from the URL params. `PriceCard`, `StatusTag`, `DdpBadge` implement the shared product-card visual language. `PriceAlertWidget` is a client component with local state for the idle/confirmed/editing states of the price-alert flow.
- `lib/products.ts` — single source of truth for product data (name, price, wasPrice, retailer, status, category) used by Homepage, Feed, Produktdetail and Watchlist, instead of duplicating data per page.
- `lib/legal-content.ts` — the four legal pages' text as data, rendered by `components/LegalPageLayout.tsx`. All company/contact details are placeholders in `[Brackets]` — not reviewed by a lawyer, must be filled in before launch.
- Prices are CHF-only (see 2NDLOOK-42): a DDP badge ("Inkl. Zoll & MwSt.") appears wherever a price is shown, and the product page shows a live EUR conversion hint alongside the CHF price.
- Only data-backed UI ships (compliance audit): no like/comment counts, no invented price history, no sample ads. `ProductPost` already supports a `sponsored` prop ("Anzeige" label) for real paid posts later; wording must be reviewed legally before use.

## Workflow

Für jede neue Aufgabe in diesem Repository gilt dieser Ablauf:

1. **Planen** – Zuerst die Aufgabe analysieren und in den Plan-Modus gehen, bevor Änderungen vorgenommen werden.
2. **Design-Aufgaben zuerst in Penpot umsetzen** – Wenn es sich um eine Design-/UI-Aufgabe handelt, diese zuerst im verbundenen Penpot-Projekt umsetzen, nicht direkt als Code.
3. **Review einholen, bevor etwas als erledigt gilt** – Das Ergebnis (z. B. per Screenshot/Export) dem Nutzer vorlegen und auf dessen Freigabe warten, bevor die Aufgabe abgeschlossen wird.
4. **Erst danach als Code umsetzen** – Erst nach Freigabe des Designs die Website als Code implementieren.
