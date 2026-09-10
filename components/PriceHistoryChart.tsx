const points = [0, 8, 4, 14, 2, 16, 10, 18, 12, 22, 6, 24, 14, 28, 20, 26, 30, 30];

function toPath(width: number, height: number) {
  const step = width / (points.length - 1);
  const max = Math.max(...points);
  return points
    .map((p, i) => {
      const x = i * step;
      const y = height - (p / max) * height;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

export default function PriceHistoryChart({ lowLabel }: { lowLabel: string }) {
  const width = 600;
  const height = 90;
  const path = toPath(width, height);
  const lastX = width;
  const lastY = height - (points[points.length - 1] / Math.max(...points)) * height;

  return (
    <div className="rounded-lg bg-white p-4">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-24 w-full"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d={path} fill="none" stroke="#3f6b3d" strokeWidth={2} vectorEffect="non-scaling-stroke" />
        <circle cx={lastX - 3} cy={lastY} r={4} fill="#1e3a8a" />
      </svg>
      <p className="mt-2 font-mono text-xs text-muted">{lowLabel}</p>
    </div>
  );
}
