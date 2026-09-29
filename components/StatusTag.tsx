import type { ProductStatus } from "@/lib/products";

const statusConfig: Record<ProductStatus, { label: string; color: string } | null> = {
  gefallen: { label: "Reduziert", color: "text-green" },
  geprueft: null,
  bald: { label: "Bald verfügbar", color: "text-accent" },
  vergriffen: { label: "Vergriffen", color: "text-destructive" },
};

export default function StatusTag({ status }: { status: ProductStatus }) {
  const config = statusConfig[status];
  if (!config) return null;
  const { label, color } = config;
  return (
    <span className={`flex items-center gap-1.5 text-xs font-medium ${color}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
      {label}
    </span>
  );
}
