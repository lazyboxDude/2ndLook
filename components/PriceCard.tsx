import Link from "next/link";
import type { Product } from "@/lib/products";
import { formatChf } from "@/lib/products";
import StatusTag from "@/components/StatusTag";
import { DdpNote } from "@/components/DdpBadge";

export default function PriceCard({ product }: { product: Product }) {
  return (
    <Link href={`/produkt/${product.slug}`} className="flex flex-col gap-2">
      <div className="aspect-square w-full rounded-lg bg-placeholder" />
      <StatusTag status={product.status} />
      <span className="text-sm font-semibold text-foreground">{product.name}</span>
      <span className="font-mono text-sm text-muted">{formatChf(product.price)}</span>
      <DdpNote />
    </Link>
  );
}
