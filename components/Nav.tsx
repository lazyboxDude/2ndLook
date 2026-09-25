"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

const loggedInLinks = [
  { href: "/feed", label: "Feed" },
  { href: "/feed?category=streetwear", label: "Streetwear" },
  { href: "/feed?category=duefte", label: "Düfte" },
  { href: "/watchlist", label: "Watchlist" },
];

const loggedOutLinks = [{ href: "/blog", label: "Journal" }];

export default function Nav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const category = searchParams?.get("category") ?? null;
  const { user } = useAuth();
  const userInitial = user
    ? ((user.user_metadata?.full_name as string | undefined)?.[0] ?? user.email?.[0] ?? "?").toUpperCase()
    : null;
  const links = user ? loggedInLinks : loggedOutLinks;

  const isActive = (href: string) => {
    const [path, query] = href.split("?");
    if (path !== pathname) return false;
    const linkCategory = query?.split("=")[1];
    return linkCategory ? linkCategory === category : !category;
  };

  return (
    <header className="border-b border-placeholder bg-bg">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-6 md:px-16">
        <Link href="/" className="text-lg font-bold text-foreground">
          2ndLook
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative pb-1 text-sm ${
                  active ? "font-semibold text-foreground" : "text-muted transition-colors duration-150 ease-out hover:text-foreground"
                }`}
              >
                {link.label}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-foreground transition-transform duration-200 ease-out ${
                    active ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-3">
          {userInitial ? (
            <>
              <Link
                href="/watchlist"
                aria-label="Watchlist"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-foreground text-sm transition-transform duration-100 active:scale-90"
              >
                <span aria-hidden="true">♡</span>
              </Link>
              <div className="hidden items-center gap-2 md:flex">
                <Link
                  href="/mein-feed"
                  aria-label="Mein Feed"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground text-xs font-semibold text-bg"
                >
                  {userInitial}
                </Link>
                <form action="/logout" method="post">
                  <button
                    type="submit"
                    className="text-sm text-muted transition-colors duration-150 ease-out hover:text-foreground active:scale-95"
                  >
                    Abmelden
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="hidden items-center gap-4 md:flex">
              <Link href="/login" className="text-sm font-semibold text-foreground">
                Login
              </Link>
              <Link
                href="/registrierung"
                className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-bg transition-transform duration-100 active:scale-95"
              >
                Registrieren
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
