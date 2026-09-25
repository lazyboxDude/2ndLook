"use client";

import { Suspense } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const tabs = [
  { href: "/feed", label: "Feed" },
  { href: "/feed?category=streetwear", label: "Streetwear" },
  { href: "/feed?category=duefte", label: "Düfte" },
  { href: "/watchlist", label: "Watchlist" },
];

export default function BottomTabBar() {
  return (
    <Suspense fallback={null}>
      <BottomTabBarInner />
    </Suspense>
  );
}

function BottomTabBarInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const category = searchParams?.get("category") ?? null;

  const isActive = (href: string) => {
    const [path, query] = href.split("?");
    if (path !== pathname) return false;
    const linkCategory = query?.split("=")[1];
    return linkCategory ? linkCategory === category : !category;
  };

  return (
    <nav className="fixed inset-x-0 bottom-0 flex border-t border-placeholder bg-bg md:hidden">
      {tabs.map((tab) => {
        const active = isActive(tab.href);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`relative flex flex-1 flex-col items-center gap-1 py-3 text-xs transition-transform duration-100 active:scale-95 ${
              active ? "font-semibold text-foreground" : "text-muted transition-colors duration-150 ease-out"
            }`}
          >
            <span
              aria-hidden="true"
              className={`absolute inset-x-6 top-0 h-0.5 rounded-full bg-foreground transition-transform duration-200 ease-out ${
                active ? "scale-x-100" : "scale-x-0"
              }`}
            />
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
