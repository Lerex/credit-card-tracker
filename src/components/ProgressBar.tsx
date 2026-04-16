"use client";

import { useEffect, useRef } from "react";

type Props = {
  pct: number;
  tone?: "good" | "warn" | "bad";
  issuerColor?: string;
  issuerColorLight?: string;
};

export function ProgressBar({ pct, tone, issuerColor, issuerColorLight }: Props) {
  const clamped = Math.max(0, Math.min(1, pct));
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    el.style.width = "0%";
    requestAnimationFrame(() => {
      el.style.width = `${clamped * 100}%`;
    });
  }, [clamped]);

  const useGradient = issuerColor && issuerColorLight;

  const toneColor =
    tone === "good"
      ? "bg-emerald-500"
      : tone === "warn"
      ? "bg-amber-500"
      : tone === "bad"
      ? "bg-rose-500"
      : "bg-[var(--accent)]";

  return (
    <div className="h-2.5 w-full rounded-full bg-[var(--border)] overflow-hidden">
      <div
        ref={barRef}
        className={`h-full rounded-full transition-[width] duration-700 ease-out ${useGradient ? "" : toneColor}`}
        style={{
          width: `${clamped * 100}%`,
          ...(useGradient ? { background: `linear-gradient(90deg, ${issuerColor}, ${issuerColorLight})` } : {}),
        }}
      />
    </div>
  );
}
