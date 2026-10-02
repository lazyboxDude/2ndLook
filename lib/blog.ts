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
  layout?: "brands";
};

export const blogPosts: BlogPost[] = [
  {
    slug: "die-besten-streetwear-marken-2026",
    category: "streetwear",
    categoryLabel: "Streetwear",
    title: "Die besten Slow-Streetwear-Marken 2026",
    excerpt:
      "Acht Labels, die auf gute Materialien, faire Produktion und lange Tragedauer setzen, mit Preisen und Versandinfos für die Schweiz.",
    publishedAt: "2. Okt 2026",
    readMinutes: 6,
    layout: "brands",
    content: [
      "Streetwear muss nicht Hype, Drop und Wegwerfen heissen. Wir stellen acht Labels vor, die auf gute Materialien, faire Produktion und lange Tragedauer setzen. Mit Preisen und Versandinfos für die Schweiz.",
    ],
  },
  {
    slug: "restock-kalender-diese-drops-lohnen-sich",
    category: "sneaker",
    categoryLabel: "Sneaker",
    title: "Restock-Kalender: Diese Drops lohnen sich",
    excerpt:
      "Welche limitierten Modelle in den nächsten Wochen erneut verfügbar sein sollen — und bei welchen Händlern sie gelistet sind.",
    publishedAt: "10. Sept 2026",
    readMinutes: 3,
    content: [
      "Welche limitierten Modelle in den nächsten Wochen erneut verfügbar sein sollen — und bei welchen Händlern sie gelistet sind.",
      "Wir aktualisieren diesen Kalender laufend, sobald Händler neue Restock-Termine bestätigen.",
    ],
  },
  {
    slug: "nischenduefte-die-2026-jeder-kennt",
    category: "duefte",
    categoryLabel: "Düfte",
    title: "Nischendüfte, die 2026 jeder kennt",
    excerpt:
      "Fünf Duftlinien abseits des Mainstreams, die gerade an Fahrt aufnehmen — samt Preisrange bei autorisierten Händlern.",
    publishedAt: "8. Sept 2026",
    readMinutes: 5,
    content: [
      "Fünf Duftlinien abseits des Mainstreams, die gerade an Fahrt aufnehmen — samt Preisrange bei autorisierten Händlern.",
      "Wir zeigen dir, worauf du bei Dekants und Flakon-Grössen achten solltest, bevor du kaufst.",
    ],
  },
  {
    slug: "so-liest-du-einen-preisverlauf-richtig",
    category: "ratgeber",
    categoryLabel: "Ratgeber",
    title: "So liest du einen Preisverlauf richtig",
    excerpt:
      "Was ein Preis-Chart wirklich verrät — und woran du eine echte Reduktion von einer Fake-Rabattaktion unterscheidest.",
    publishedAt: "5. Sept 2026",
    readMinutes: 4,
    content: [
      "Was ein Preis-Chart wirklich verrät — und woran du eine echte Reduktion von einer Fake-Rabattaktion unterscheidest.",
      "Ein Preisverlauf über mehrere Wochen zeigt dir, ob ein 'Angebot' tatsächlich ein Tiefstand ist oder nur ein kurzfristig angehobener Vergleichspreis.",
    ],
  },
  {
    slug: "ddp-erklaert-zoll-und-mwst-auf-einen-blick",
    category: "ratgeber",
    categoryLabel: "Ratgeber",
    title: "DDP erklärt: Zoll & MwSt. auf einen Blick",
    excerpt:
      "Warum bei 2ndLook der angezeigte Preis inklusive Zoll und Mehrwertsteuer der Preis ist, den du wirklich zahlst.",
    publishedAt: "2. Sept 2026",
    readMinutes: 3,
    content: [
      "Warum bei 2ndLook der angezeigte Preis inklusive Zoll und Mehrwertsteuer der Preis ist, den du wirklich zahlst.",
      "DDP steht für 'Delivered Duty Paid' — keine Überraschungen bei der Zustellung.",
    ],
  },
  {
    slug: "herbst-ausblick-preise-im-vergleich",
    category: "markt",
    categoryLabel: "Markt",
    title: "Herbst-Ausblick: Preise im Vergleich",
    excerpt:
      "Ein Rückblick auf die Preisentwicklung der letzten Saison — und was das für den kommenden Herbst bedeutet.",
    publishedAt: "29. Aug 2026",
    content: [
      "Ein Rückblick auf die Preisentwicklung der letzten Saison — und was das für den kommenden Herbst bedeutet.",
    ],
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function postCategoryLabel(post: BlogPost): string {
  if (post.category === "streetwear") return "2Wear";
  if (post.category === "duefte") return "2Scent";
  return post.categoryLabel;
}
