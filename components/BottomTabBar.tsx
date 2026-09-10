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
  const category = searchParams.get("category");

  const isActive = (href: string) => {
    const [path, query] = href.split("?");
    if (path !== pathname) return false;
    const linkCategory = query?.split("=")[1];
    return linkCategory ? linkCategory === category : !category;
  };

  return (
    <nav className="fixed inset-x-0 bottom-0 flex border-t border-placeholder bg-bg md:hidden">
      {tabs.map((tab) => (
        <Link
          key={tab.href}
          href={tab.href}
          className={`flex flex-1 flex-col items-center gap-1 py-3 text-xs ${
            isActive(tab.href) ? "font-semibold text-foreground" : "text-muted"
          }`}
        >
          {tab.label}
        </Link>
      ))}
    </nav>
  );
}
