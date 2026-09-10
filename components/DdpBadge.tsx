export default function DdpBadge({ variant = "light" }: { variant?: "light" | "dark" }) {
  if (variant === "dark") {
    return (
      <span className="rounded-full bg-white/15 px-3 py-1 text-[11px] font-medium text-muted-light">
        Inkl. Zoll & MwSt. (DDP)
      </span>
    );
  }
  return (
    <span className="rounded-full bg-surface-hero px-3 py-1 text-[11px] font-medium text-muted">
      Inkl. Zoll & MwSt. (DDP)
    </span>
  );
}

export function DdpNote() {
  return <span className="text-xs text-muted">Inkl. Zoll & MwSt.</span>;
}
