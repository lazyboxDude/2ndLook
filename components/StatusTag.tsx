import type { ProductStatus } from "@/lib/products";

const statusConfig: Record<ProductStatus, { label: string; color: string }> = {
  gefallen: { label: "Preis gefallen", color: "text-green" },
  geprueft: { label: "Preis geprüft", color: "text-muted" },
  bald: { label: "Bald verfügbar", color: "text-accent" },
  vergriffen: { label: "Vergriffen", color: "text-destructive" },
};

export default function StatusTag({ status }: { status: ProductStatus }) {
  const { label, color } = statusConfig[status];
  return (
    <span className={`flex items-center gap-1.5 text-xs font-medium ${color}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {label}
    </span>
  );
}
