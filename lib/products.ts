import { createClient } from "@/lib/supabase/public";

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
  lastChecked?: string;
  spec?: string;
  description?: string;
  material?: string;
};

// Used when Supabase is unreachable (missing env vars, or a failed query) so
// pages still render instead of crashing.
const fallbackProducts: Product[] = [
  {
    slug: "nightwalker-hoodie",
    name: "Nightwalker Hoodie — Limited Run",
    category: "streetwear",
    price: 119,
    wasPrice: 149,
    status: "gefallen",
    retailer: "Overkill Berlin",
    lastChecked: "Heute, 09:14",
    material: "480 GSM Fleece, Bio-Baumwolle",
    description:
      "Nur 200 Stück. Premium Fleece, oversized Fit, reflektierender Print. Der Preis wird laufend bei mehreren Händlern verglichen.",
  },
  {
    slug: "voltage-jacket",
    name: "Voltage Jacket",
    category: "streetwear",
    price: 205,
    wasPrice: 249,
    status: "bald",
    retailer: "Nordkap Store",
    lastChecked: "Heute, 09:14",
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
    lastChecked: "Heute, 09:14",
    spec: "Extrait de Parfum · Frankreich",
  },
  {
    slug: "cuir-de-nuit",
    name: "Cuir de Nuit",
    category: "duefte",
    price: 49,
    status: "geprueft",
    spec: "Eau de Parfum · Deutschland",
  },
  {
    slug: "santal-grau",
    name: "Santal Grau",
    category: "duefte",
    price: 61,
    status: "geprueft",
    spec: "Parfum Concentré · Schweiz",
  },
  {
    slug: "fumee-blanche",
    name: "Fumée Blanche",
    category: "duefte",
    price: 43,
    status: "geprueft",
    spec: "Eau de Parfum · Frankreich",
  },
];

type ProductRow = {
  slug: string;
  name: string;
  category: "streetwear" | "duefte";
  status: ProductStatus;
  price: number | string;
  was_price: number | string | null;
  last_checked_at: string | null;
  spec: string | null;
  description: string | null;
  material: string | null;
  retailer_name: string | null;
  brands: { slug: string } | null;
  retailers: { name: string } | null;
};

function formatLastChecked(iso: string | null): string | undefined {
  if (!iso) return undefined;
  const date = new Date(iso);
  const isToday = date.toDateString() === new Date().toDateString();
  const time = date.toLocaleTimeString("de-CH", { hour: "2-digit", minute: "2-digit" });
  return isToday ? `Heute, ${time}` : date.toLocaleDateString("de-CH") + `, ${time}`;
}

function mapRow(row: ProductRow): Product {
  return {
    slug: row.slug,
    name: row.name,
    category: row.category,
    price: Number(row.price),
    wasPrice: row.was_price != null ? Number(row.was_price) : undefined,
    status: row.status,
    retailer: row.retailers?.name ?? row.retailer_name ?? undefined,
    brandSlug: row.brands?.slug ?? undefined,
    lastChecked: formatLastChecked(row.last_checked_at),
    spec: row.spec ?? undefined,
    description: row.description ?? undefined,
    material: row.material ?? undefined,
  };
}

const SELECT_COLUMNS =
  "slug,name,category,status,price,was_price,last_checked_at,spec,description,material,retailer_name,brands(slug),retailers(name)";

export async function getProducts(): Promise<Product[]> {
  const supabase = createClient();
  if (!supabase) return fallbackProducts;

  const { data, error } = await supabase.from("products").select(SELECT_COLUMNS);
  if (error || !data) {
    console.error("Failed to load products from Supabase", error);
    return fallbackProducts;
  }

  return (data as unknown as ProductRow[]).map(mapRow);
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const supabase = createClient();
  if (!supabase) return fallbackProducts.find((p) => p.slug === slug);

  const { data, error } = await supabase
    .from("products")
    .select(SELECT_COLUMNS)
    .eq("slug", slug)
    .maybeSingle();
  if (error) {
    console.error("Failed to load product from Supabase", error);
    return fallbackProducts.find((p) => p.slug === slug);
  }
  if (!data) return undefined;

  return mapRow(data as unknown as ProductRow);
}

export function formatChf(amount: number): string {
  return `CHF ${amount.toFixed(2)}`;
}
