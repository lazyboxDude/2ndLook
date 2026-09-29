# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the dev server (http://localhost:3000)
- `npm run build` — production build (also type-checks via `tsc`)
- `npm run lint` — ESLint (flat config, `eslint-config-next`)
- No test suite exists yet.

## Architecture

Next.js (App Router) + TypeScript + Tailwind CSS v4. Tailwind is configured CSS-first: design tokens (colors, fonts) live in `app/globals.css` under `@theme inline`, not in a `tailwind.config.ts` (v4 has none). Fonts are Fira Sans (`font-sans`) and Fira Code (`font-mono`, reserved for all numeric/data values — prices, dates, retailer codes) loaded via `next/font/google` in `app/layout.tsx`.

- `app/` — routes: `/` (Homepage), `/feed` (Drops, filtered by `?category=streetwear|duefte`), `/watchlist`, `/produkt/[slug]`, and the four legal pages (`/impressum`, `/datenschutz`, `/agb`, `/widerruf-affiliate`). Each page is a single responsive component (Tailwind `md:` breakpoint), not separate desktop/mobile routes.
- `components/` — `Nav` and `Footer` are shared via `app/layout.tsx` and responsive (Nav shows full links on desktop, logo+icon only on mobile). `BottomTabBar` is mobile-only and rendered by `/feed` and `/watchlist` specifically (it mirrors the Nav's category links for small screens, not used on Homepage/Produktdetail/Legal). `PriceCard`, `StatusTag`, `DdpBadge` implement the shared product-card visual language. `PriceAlertWidget` is a client component with local state for the idle/confirmed/editing states of the price-alert flow.
- `lib/products.ts` — single source of truth for product data (name, price, wasPrice, retailer, status, category) used by Homepage, Feed, Produktdetail and Watchlist, instead of duplicating data per page.
- `lib/legal-content.ts` — the four legal pages' text as data, rendered by `components/LegalPageLayout.tsx`. All company/contact details are placeholders in `[Brackets]` — not reviewed by a lawyer, must be filled in before launch.
- Prices are CHF-only (see 2NDLOOK-42): a DDP badge ("Inkl. Zoll & MwSt.") appears wherever a price is shown, and the product page shows a live EUR conversion hint alongside the CHF price.
- Known gap, carried over from the approved design: on mobile, Homepage/Produktdetail/Legal pages have no bottom tab bar and no nav links (logo + watchlist icon only) — Feed/Watchlist are only reachable via the footer. This is a product decision baked into the reviewed mockup, not an oversight.

## Compliance & Accessibility notes

- Business/contact details live in `lib/business.ts` (placeholders — fill before launch, Plane 2NDLOOK-34). Minimum signup age is 16 (`MIN_AGE`), enforced by checkbox + server action.
- `/datenloeschung` is the data-deletion request page (email-based; self-service deletion tracked in Plane 2NDLOOK-36). The app sends no marketing emails yet; unsubscribe links are tracked in 2NDLOOK-35.
- Fonts (Fira Sans, Fira Code, Playfair Display) are all SIL OFL 1.1 — free for commercial use, self-hosted by `next/font/google`. No change needed.
- Color tokens were adjusted for WCAG AA; `muted-light` is only for dark backgrounds (footer). Don't claim price checks, freshness or "reduced" prices without real data.
- Decorative placeholder boxes use `aria-hidden`; add real `alt` text when real product images are added.

## Workflow

Für jede neue Aufgabe in diesem Repository gilt dieser Ablauf:

1. **Planen** – Zuerst die Aufgabe analysieren und einen kurzen Plan machen, bevor Änderungen vorgenommen werden.
2. **Direkt im Code umsetzen** – Auch Design-/UI-Aufgaben werden direkt als Code umgesetzt (kein Penpot-Schritt).
3. **Review einholen, bevor etwas als erledigt gilt** – Das Ergebnis (z. B. per Screenshot) dem Nutzer vorlegen, bevor die Aufgabe als abgeschlossen gilt.
