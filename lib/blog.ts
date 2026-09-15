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
      "Ein kurzer Überblick über die Marken, die 2026 den Ton angeben — von etablierten Labels bis zu aufstrebenden Studios, die wir laufend auf Preise und Verfügbarkeit bei autorisierten Händlern prüfen.",
      "Struktur: Einleitung, 3-5 Marken-Abschnitte mit Bild, kurzer Fazit-Absatz.",
      "Abschliessender Absatz mit Fazit und Link zu verwandten Artikeln oder zum Feed.",
    ],
    pullQuote: "Qualität und Verfügbarkeit bei autorisierten Händlern schlagen jeden Graumarkt-Preis.",
  },
  {
    slug: "restock-kalender-diese-drops-lohnen-sich",
    category: "sneaker",
    categoryLabel: "Sneaker",
    title: "Restock-Kalender: Diese Drops lohnen sich",
    excerpt:
      "Welche limitierten Modelle in den nächsten Wochen erneut verfügbar sein sollen — und wo du am schnellsten bist.",
    publishedAt: "10. Sept 2026",
    readMinutes: 3,
    content: [
      "Welche limitierten Modelle in den nächsten Wochen erneut verfügbar sein sollen — und wo du am schnellsten bist.",
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
