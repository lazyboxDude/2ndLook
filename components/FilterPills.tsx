import Link from "next/link";

export type FeedParams = Record<string, string | undefined>;

export function buildHref(base: string, params: FeedParams, patch: FeedParams = {}): string {
  const next = { ...params, ...patch };
  const qs = new URLSearchParams();
  for (const [key, value] of Object.entries(next)) {
    if (value) qs.set(key, value);
  }
  const query = qs.toString();
  return query ? `${base}?${query}` : base;
}

export type FilterOption = { label: string; patch: FeedParams; active: boolean };

export default function FilterPills({
  base,
  params,
  options,
  variant = "pill",
}: {
  base: string;
  params: FeedParams;
  options: FilterOption[];
  variant?: "pill" | "chip";
}) {
  const shape = variant === "pill" ? "rounded-full" : "rounded-sm";
  return (
    <div className="flex flex-wrap gap-2.5">
      {options.map((option) => (
        <Link
          key={option.label}
          href={buildHref(base, params, option.patch)}
          aria-current={option.active ? "true" : undefined}
          className={`flex h-10 items-center border px-4 text-sm ${shape} ${
            option.active
              ? "border-foreground bg-foreground font-semibold text-bg"
              : "border-line bg-bg text-foreground hover:border-foreground"
          }`}
        >
          {option.label}
        </Link>
      ))}
    </div>
  );
}
