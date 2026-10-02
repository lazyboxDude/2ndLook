"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { categoryLabels } from "@/lib/products";
import { BookmarkIcon, SearchIcon, UserIcon } from "@/components/icons";

const loggedInLinks = [
  { href: "/feed", label: "Feed" },
  { href: "/feed?category=streetwear", label: categoryLabels.streetwear },
  { href: "/feed?category=duefte", label: categoryLabels.duefte },
  { href: "/blog", label: "Journal" },
];

const loggedOutLinks = [{ href: "/blog", label: "Journal" }];

export default function Nav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const category = searchParams?.get("category") ?? null;
  const { user } = useAuth();
  const links = user ? loggedInLinks : loggedOutLinks;

  const isActive = (href: string) => {
    const [path, query] = href.split("?");
    if (path !== pathname) return false;
    const linkCategory = query?.split("=")[1];
    return linkCategory ? linkCategory === category : !category;
  };

  return (
    <header className="border-b border-line bg-bg">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center gap-3 px-4 md:h-20 md:gap-8 md:px-16">
        <Link href="/" className="text-xl font-bold tracking-tight text-foreground md:text-3xl">
          2ndLook
        </Link>

        {user ? (
          <form action="/feed" role="search" className="min-w-0 flex-1 md:max-w-[560px]">
            <label className="flex h-10 items-center gap-2.5 rounded-sm border border-foreground bg-bg px-3">
              <SearchIcon />
              <span className="sr-only">Suche</span>
              <input
                type="search"
                name="q"
                placeholder="Suche (z. B. Nightwalker Hoodie)"
                className="min-w-0 flex-1 bg-transparent text-sm text-foreground placeholder:text-muted focus:outline-none"
              />
            </label>
          </form>
        ) : (
          <div className="flex-1" />
        )}

        <div className="flex items-center gap-1 md:gap-3">
          <Link
            href="/watchlist"
            aria-label="Watchlist"
            className="flex h-11 w-11 items-center justify-center text-foreground"
          >
            <BookmarkIcon />
          </Link>
          {user ? (
            <>
              <Link
                href="/mein-feed"
                aria-label="Mein Feed"
                className="flex h-11 w-11 items-center justify-center text-foreground"
              >
                <UserIcon />
              </Link>
              <form action="/logout" method="post" className="hidden md:block">
                <button type="submit" className="px-2 text-sm text-muted hover:text-foreground">
                  Abmelden
                </button>
              </form>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/login" className="text-sm font-semibold text-foreground">
                Login
              </Link>
              <Link
                href="/registrierung"
                className="hidden rounded-sm bg-primary px-5 py-2.5 text-sm font-semibold text-bg md:block"
              >
                Registrieren
              </Link>
            </div>
          )}
          <span className="ml-2 hidden font-mono text-xs text-foreground md:block">CH · CHF</span>
        </div>
      </div>

      <nav
        aria-label="Kategorien"
        className="mx-auto flex max-w-[1440px] gap-6 overflow-x-auto px-4 md:px-16"
      >
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            aria-current={isActive(link.href) ? "page" : undefined}
            className={`whitespace-nowrap border-b-2 py-3 text-sm ${
              isActive(link.href)
                ? "border-foreground font-semibold text-foreground"
                : "border-transparent text-foreground hover:border-line"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
