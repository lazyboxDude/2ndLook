export type ProductStatus = "gefallen" | "geprueft" | "bald" | "vergriffen";

export type Product = {
  slug: string;
  name: string;
  category: "streetwear" | "duefte";
  price: number;
  wasPrice?: number;
  status: ProductStatus;
  retailer?: string;
  brandSlug?: string;
};

export const products: Product[] = [
  {
    slug: "nightwalker-hoodie",
    name: "Nightwalker Hoodie",
    category: "streetwear",
    price: 119,
    wasPrice: 149,
    status: "gefallen",
    retailer: "Overkill Berlin",
    brandSlug: "overkill-berlin",
  },
  {
    slug: "voltage-jacket",
    name: "Voltage Jacket",
    category: "streetwear",
    price: 205,
    wasPrice: 249,
    status: "bald",
    retailer: "Nordkap Store",
    brandSlug: "nordkap-store",
  },
  {
    slug: "ghost-cargo-pants",
    name: "Ghost Cargo Pants",
    category: "streetwear",
    price: 109,
    status: "geprueft",
  },
  {
    slug: "static-tee",
    name: "Static Tee",
    category: "streetwear",
    price: 49,
    status: "geprueft",
  },
  {
    slug: "concrete-cap",
    name: "Concrete Cap",
    category: "streetwear",
    price: 38,
    status: "geprueft",
  },
  {
    slug: "wool-overshirt",
    name: "Wool Overshirt, gebraucht",
    category: "streetwear",
    price: 85,
    status: "geprueft",
  },
  {
    slug: "ambre-nomade",
    name: "Ambre Nomade, 30ml Dekant",
    category: "duefte",
    price: 36,
    wasPrice: 43,
    status: "gefallen",
    retailer: "Fragrance Vault",
    brandSlug: "fragrance-vault",
  },
  {
    slug: "cuir-de-nuit",
    name: "Cuir de Nuit",
    category: "duefte",
    price: 49,
    status: "geprueft",
  },
  {
    slug: "santal-grau",
    name: "Santal Grau",
    category: "duefte",
    price: 61,
    status: "geprueft",
  },
  {
    slug: "fumee-blanche",
    name: "Fumée Blanche",
    category: "duefte",
    price: 43,
    status: "geprueft",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function formatChf(amount: number): string {
  return `CHF ${amount.toFixed(2)}`;
}
