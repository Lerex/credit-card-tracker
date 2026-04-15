export function ProgressBar({ pct, tone }: { pct: number; tone?: "good" | "warn" | "bad" }) {
  const clamped = Math.max(0, Math.min(1, pct));
  const color =
    tone === "good"
      ? "bg-emerald-500"
      : tone === "warn"
      ? "bg-amber-500"
      : tone === "bad"
      ? "bg-rose-500"
      : "bg-[var(--accent)]";
  return (
    <div className="h-2 w-full rounded-full bg-[var(--border)] overflow-hidden">
      <div className={`h-full ${color} transition-all`} style={{ width: `${clamped * 100}%` }} />
    </div>
  );
}
