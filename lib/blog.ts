export type BlogCategory = "streetwear" | "sneaker" | "duefte" | "ratgeber" | "markt";

export type BlogPost = {
  slug: string;
  category: BlogCategory;
  categoryLabel: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  readMinutes?: number;
  content: string[];
  pullQuote?: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "die-besten-streetwear-marken-2026",
    category: "streetwear",
    categoryLabel: "Streetwear",
    title: "Die besten Streetwear-Marken 2026",
    excerpt:
      "Ein Überblick über die Labels, die 2026 den Ton angeben — von etablierten Namen bis zu aufstrebenden Studios.",
    publishedAt: "12. Sept 2026",
    readMinutes: 4,
    content: [
      "Ein kurzer Überblick über die Marken, die 2026 den Ton angeben — von etablierten Labels bis zu aufstrebenden Studios.",
      "Struktur: Einleitung, 3-5 Marken-Abschnitte mit Bild, kurzer Fazit-Absatz.",
      "Abschliessender Absatz mit Fazit und Link zu verwandten Artikeln oder zum Feed.",
    ],
    pullQuote: "Qualität und Verfügbarkeit zählen mehr als der niedrigste Preis.",
  },
  {
    slug: "restock-kalender-diese-drops-lohnen-sich",
    category: "sneaker",
    categoryLabel: "Sneaker",
    title: "Restock-Kalender: Diese Drops lohnen sich",
    excerpt:
      "Ein Blick auf limitierte Modelle, für die ein erneuter Verkauf angekündigt sein könnte.",
    publishedAt: "10. Sept 2026",
    readMinutes: 3,
    content: [
      "Ein Blick auf limitierte Modelle, für die ein erneuter Verkauf angekündigt sein könnte.",
      "Angekündigte Termine können sich ändern; massgeblich sind die Angaben der Händler.",
    ],
  },
  {
    slug: "nischenduefte-die-2026-jeder-kennt",
    category: "duefte",
    categoryLabel: "Düfte",
    title: "Nischendüfte, die 2026 jeder kennt",
    excerpt:
      "Fünf Duftlinien abseits des Mainstreams.",
    publishedAt: "8. Sept 2026",
    readMinutes: 5,
    content: [
      "Fünf Duftlinien abseits des Mainstreams.",
      "Worauf du bei Dekants und Flakon-Grössen achten kannst, bevor du kaufst.",
    ],
  },
  {
    slug: "so-liest-du-einen-preisverlauf-richtig",
    category: "ratgeber",
    categoryLabel: "Ratgeber",
    title: "So liest du einen Preisverlauf richtig",
    excerpt:
      "Was ein Preis-Chart verrät — und worauf du bei Rabattaktionen achten kannst.",
    publishedAt: "5. Sept 2026",
    readMinutes: 4,
    content: [
      "Was ein Preis-Chart verrät — und worauf du bei Rabattaktionen achten kannst.",
      "Ein Preisverlauf über mehrere Wochen kann zeigen, ob ein 'Angebot' tatsächlich ein Tiefstand ist oder nur ein kurzfristig angehobener Vergleichspreis.",
    ],
  },
  {
    slug: "ddp-erklaert-zoll-und-mwst-auf-einen-blick",
    category: "ratgeber",
    categoryLabel: "Ratgeber",
    title: "DDP erklärt: Zoll & MwSt. auf einen Blick",
    excerpt:
      "Was Preise „inklusive Zoll und Mehrwertsteuer“ bedeuten.",
    publishedAt: "2. Sept 2026",
    readMinutes: 3,
    content: [
      "Was Preise „inklusive Zoll und Mehrwertsteuer“ bedeuten.",
      "DDP steht für 'Delivered Duty Paid': Der Händler übernimmt laut eigener Angabe Zoll und Mehrwertsteuer. Massgeblich sind die Angaben auf der Händlerseite.",
    ],
  },
  {
    slug: "herbst-ausblick-preise-im-vergleich",
    category: "markt",
    categoryLabel: "Markt",
    title: "Herbst-Ausblick: Preise im Vergleich",
    excerpt:
      "Ein Ausblick auf die Preisentwicklung im Herbst.",
    publishedAt: "29. Aug 2026",
    content: [
      "Ein Ausblick auf die Preisentwicklung im Herbst.",
    ],
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
