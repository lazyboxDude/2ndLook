export type BrandNeed = "basics" | "denim" | "statement" | "lounge" | "sneaker";
export type BrandMust = "ddp" | "repair" | "europe";

export type Brand = {
  id: string;
  name: string;
  origin: string;
  since: string;
  focus: string;
  text: string;
  facts: [string, string][];
  ddp: boolean;
  shipNote: string;
  who: string;
  source: { label: string; url: string };
  // Finder criteria
  needs: BrandNeed[];
  repair: boolean;
  europe: boolean;
  why: string;
  key: string;
};

export const brands: Brand[] = [
  {
    id: "story",
    name: "Story mfg.",
    origin: "London",
    since: "seit 2013",
    focus: "Handwerk statt Hype",
    text: "Das Label von Saeed und Katy Al-Rubeyi lässt in Auroville (Indien) mit dem Partner The Colours of Nature fertigen. Gefärbt wird mit Pflanzenfarben, bestickt von Hand. An einem Teil arbeiten teils über 100 Handwerker:innen.",
    facts: [
      ["100+", "Hände pro Teil, teils"],
      ["Ab £250", "Gratisversand int."],
    ],
    ddp: true,
    shipNote: "Inkl. Zoll & MwSt. im Checkout",
    who: "Statement-Pieces mit Seele",
    source: {
      label: "Mr Porter",
      url: "https://www.mrporter.com/en-gb/journal/fashion/the-brand-that-moved-5000-miles-in-the-name-of-craftsmanship-894230",
    },
    needs: ["statement"],
    repair: false,
    europe: false,
    why: "Handgefärbte, bestickte Einzelstücke aus Indien.",
    key: "100+ Hände pro Teil",
  },
  {
    id: "hundhund",
    name: "Hund Hund",
    origin: "Berlin",
    since: "Design in Berlin",
    focus: "Transparente Basics",
    text: "Gegründet von Isabel Kücke und Rohan Hoole, produziert in Europa. Hund Hund legt die Produktionskosten offen und verkauft direkt an Kund:innen statt über den Grosshandel. Materialien reichen von Tencel-Jersey bis Seide und Kaschmir.",
    facts: [
      ["EU", "Produktion"],
      ["D2C", "ohne Zwischenhandel"],
    ],
    ddp: false,
    shipNote: "Versand CH prüfen",
    who: "Minimalistische Teile mit fairem Preis",
    source: { label: "Title Magazine", url: "https://title-mag.com/?p=3392" },
    needs: ["basics"],
    repair: false,
    europe: true,
    why: "Ruhige Basics mit offengelegten Produktionskosten.",
    key: "Produktion in Europa",
  },
  {
    id: "asket",
    name: "Asket",
    origin: "Stockholm",
    since: "seit 2015",
    focus: "Eine Kollektion, für immer",
    text: "Keine Saisons, sondern eine permanente Kollektion aus Naturfasern, gefertigt in Europa. Dazu kommen lebenslange Reparatur, Rücknahme und Ersatzteile. Ab CHF 150 ist der Versand gratis.",
    facts: [
      ["CHF 50", "T-Shirt"],
      ["CHF 170", "Jeans"],
    ],
    ddp: true,
    shipNote: "Inkl. Zoll & MwSt.",
    who: "Das Fundament der Garderobe",
    source: { label: "Asket CH", url: "https://www.asket.com/en-ch/" },
    needs: ["basics", "denim"],
    repair: true,
    europe: true,
    why: "Permanente Kollektion, lebenslange Reparatur.",
    key: "T-Shirt CHF 50 · Jeans CHF 170",
  },
  {
    id: "nudie",
    name: "Nudie Jeans",
    origin: "Göteborg",
    since: "seit 2001",
    focus: "Denim mit Gratis-Reparatur",
    text: "Nudie repariert seine Jeans kostenlos, so oft man will und egal, wo sie gekauft wurden. Rund 500'000 Paar wurden bisher geflickt. Wer alte Nudies zurückbringt, erhält 20 % Rabatt auf ein neues Teil.",
    facts: [
      ["68'342", "Reparaturen 2024"],
      ["20 %", "Rabatt bei Rückgabe"],
    ],
    ddp: false,
    shipNote: "Versand CH prüfen",
    who: "Eine Jeans für viele Jahre",
    source: {
      label: "EU Transition Pathways",
      url: "https://transition-pathways.europa.eu/textiles/best-practices/prolonging-lifespan-denim-repair-and-reuse-services-nudie-jeans",
    },
    needs: ["denim"],
    repair: true,
    europe: false,
    why: "Jeans, die gratis repariert werden, so oft du willst.",
    key: "68'342 Reparaturen 2024",
  },
  {
    id: "colorful",
    name: "Colorful Standard",
    origin: "Made in Portugal",
    since: "B Corp",
    focus: "Farbe in Bio-Qualität",
    text: "B-Corp-zertifiziert und gefertigt in Portugal aus Bio-Baumwolle und recycelter Merinowolle. Lieferung in 2–3 Werktagen, 90 Tage Rückgabe.",
    facts: [
      ["€35", "Classic Organic Tee"],
      ["€80", "Sweatpants"],
    ],
    ddp: false,
    shipNote: "Versand CH prüfen",
    who: "Hoodies und Tees in vielen Farben",
    source: { label: "Colorful Standard", url: "https://colorfulstandard.com/" },
    needs: ["basics", "lounge"],
    repair: false,
    europe: true,
    why: "Bio-Basics in vielen Farben, B Corp.",
    key: "Tee €35 · Sweatpants €80",
  },
  {
    id: "pangaia",
    name: "Pangaia",
    origin: "London",
    since: "Material Science",
    focus: "Materialforschung als Marke",
    text: "Pangaia arbeitet mit regenerativer Baumwolle, bio-basiertem EVO-Nylon und dem Lederersatz MIRUM. Seit Januar 2025 gehört die Mehrheit der Royal Group aus Abu Dhabi, neuer CEO ist der Ex-Inditex-Manager Daniel Gómez.",
    facts: [
      ["$240–265", "Hoodie"],
      ["99 %", "bio-basierte Activewear"],
    ],
    ddp: false,
    shipNote: "Versand CH prüfen",
    who: "Tracksuits und Material-Innovation",
    source: {
      label: "FashionUnited",
      url: "https://fashionunited.uk/news/people/daniel-gomez-appointed-ceo-to-lead-pangaias-next-chapter-of-global-growth/2025111884952",
    },
    needs: ["lounge"],
    repair: false,
    europe: false,
    why: "Tracksuits aus neuen, bio-basierten Materialien.",
    key: "Hoodie ca. $240–265",
  },
  {
    id: "mfpen",
    name: "Mfpen",
    origin: "Kopenhagen",
    since: "Menswear",
    focus: "Luxusstoffe aus Restposten",
    text: "Das Label von Sigurd Bank verarbeitet zu rund 70 % Deadstock, also übrige Stoffe aus Produktionen grosser Luxushäuser. Gefertigt wird vor allem in Portugal, in Auflagen von 200–300 Stück pro Teil.",
    facts: [
      ["70 %", "Deadstock"],
      ["ca. €200", "Hemd oder Jeans"],
    ],
    ddp: false,
    shipNote: "Versand CH prüfen",
    who: "Conscious Luxury mit Understatement",
    source: { label: "Ordinary Delusions", url: "https://alecleach.substack.com/p/what-mfpen-does-right" },
    needs: ["statement", "denim"],
    repair: false,
    europe: true,
    why: "Luxusstoffe aus Restposten, kleine Auflagen.",
    key: "70 % Deadstock",
  },
  {
    id: "veja",
    name: "Veja",
    origin: "Paris",
    since: "seit 2004",
    focus: "Der Sneaker zum Look",
    text: "Veja produziert in Brasilien mit Bio-Baumwolle, Wildkautschuk aus dem Amazonas und chromfrei gegerbtem Leder. Kritikpunkt: Ergebnisse von Sozialaudits wurden seit Jahren nicht veröffentlicht.",
    facts: [
      ["Brasilien", "Produktion"],
      ["Chromfrei", "gegerbtes Leder"],
    ],
    ddp: false,
    shipNote: "Versand CH prüfen",
    who: "Der passende Sneaker",
    source: { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Veja_(brand)" },
    needs: ["sneaker"],
    repair: false,
    europe: false,
    why: "Sneaker aus Bio-Baumwolle und Wildkautschuk.",
    key: "Made in Brasilien",
  },
];

export const needOptions: [BrandNeed | "all", string][] = [
  ["all", "Alles"],
  ["basics", "Basics & Tees"],
  ["denim", "Denim"],
  ["statement", "Statement-Pieces"],
  ["lounge", "Hoodies & Tracksuits"],
  ["sneaker", "Sneaker"],
];

export const mustOptions: [BrandMust, string][] = [
  ["ddp", "Inkl. Zoll & MwSt."],
  ["repair", "Reparatur-Service"],
  ["europe", "Made in Europe"],
];

export const criteria: [string, string][] = [
  ["Material", "Bio-, Recycling- oder langlebige Naturfasern"],
  ["Transparenz", "Offene Angaben zu Produktion und Lieferkette"],
  ["Langlebigkeit", "Zeitlose Schnitte, Reparatur oder Garantie"],
  ["Schweiz", "Versand in die Schweiz, idealerweise inkl. Zoll & MwSt."],
];

export const picks: { label: string; brandId: string; text: string }[] = [
  {
    label: "Für Jeans",
    brandId: "nudie",
    text: "Die Gratis-Reparatur macht aus einer Jeans eine Anschaffung für viele Jahre.",
  },
  {
    label: "Für ein besonderes Teil",
    brandId: "story",
    text: "Handgefärbt und bestickt. Teurer, aber mit Zoll und Abgaben direkt im Checkout.",
  },
  {
    label: "Für günstige Basics",
    brandId: "colorful",
    text: "Bio-Tees ab €35. Vor der Bestellung den Versand in die Schweiz prüfen.",
  },
];

export const brandWatchKey = (id: string) => `brand:${id}`;
