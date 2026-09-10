"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const links = [
  { href: "/feed", label: "Feed" },
  { href: "/feed?category=streetwear", label: "Streetwear" },
  { href: "/feed?category=duefte", label: "Düfte" },
  { href: "/watchlist", label: "Watchlist" },
];

export default function Nav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

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
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                isActive(link.href)
                  ? "text-sm font-semibold text-foreground"
                  : "text-sm text-muted hover:text-foreground"
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/watchlist"
          aria-label="Watchlist"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-foreground"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M12 21s-7.5-4.6-10-9.3C.5 8 2.2 4.5 5.6 4c2-.3 3.9.6 5 2.2C11.7 4.6 13.6 3.7 15.6 4c3.4.5 5.1 4 3.6 7.7C16.7 16.4 12 21 12 21z"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </Link>
      </div>
    </header>
  );
}
