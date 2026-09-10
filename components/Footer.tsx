import Link from "next/link";

const columns = [
  {
    title: "Unternehmen",
    links: [
      { href: "/", label: "Über uns" },
      { href: "/", label: "Kontakt" },
    ],
  },
  {
    title: "Kategorien",
    links: [
      { href: "/feed?category=streetwear", label: "Streetwear" },
      { href: "/feed?category=duefte", label: "Düfte" },
      { href: "/watchlist", label: "Watchlist" },
    ],
  },
  {
    title: "Community",
    links: [
      { href: "/", label: "Newsletter" },
      { href: "/", label: "Instagram" },
    ],
  },
];

const legalLinks = [
  { href: "/impressum", label: "Impressum" },
  { href: "/datenschutz", label: "Datenschutz" },
  { href: "/agb", label: "AGB" },
  { href: "/widerruf-affiliate", label: "Widerruf & Affiliate" },
];

export default function Footer() {
  return (
    <footer className="bg-foreground px-6 py-10 md:px-16 md:py-16">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-10 md:flex-row md:gap-16">
        {columns.map((col) => (
          <div key={col.title} className="flex flex-col gap-3.5">
            <span className="text-sm font-bold text-bg">{col.title}</span>
            {col.links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-muted-light hover:text-bg"
              >
                {link.label}
              </Link>
            ))}
          </div>
        ))}
      </div>
      <div className="mx-auto mt-10 max-w-[1440px] border-t border-white/10 pt-6">
        <div className="flex flex-col items-start gap-3 md:flex-row md:items-center md:justify-between">
          <span className="text-xs text-muted-light">
            © 2026 2ndLook. Alle Rechte vorbehalten.
          </span>
          <div className="flex flex-wrap gap-4">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-muted-light hover:text-bg"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
