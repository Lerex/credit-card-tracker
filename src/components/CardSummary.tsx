"use client";

import Link from "next/link";
import { useStore } from "@/lib/store";
import { getTemplate, getCardColor } from "@/lib/templates";
import { benefitStatuses, cardAnnualValue, formatUSD } from "@/lib/value";
import type { UserCard } from "@/lib/types";
import { ProgressBar } from "./ProgressBar";

export function CardSummary({ card }: { card: UserCard }) {
  const usages = useStore((s) => s.usages);
  const template = getTemplate(card.templateId);
  if (!template) return null;

  const colors = getCardColor(template);
  const value = cardAnnualValue(card, template, usages);
  const tone = value.pct >= 1 ? "good" : value.pct >= 0.6 ? "warn" : "bad";
  const statuses = benefitStatuses(card, template, usages);
  const flatStatuses = statuses.filter((s) => s.benefit.unit === "flat");
  const expiring = statuses
    .filter(
      (s) =>
        s.benefit.unit !== "flat" &&
        s.daysLeft <= 60 &&
        s.pct < 0.5 &&
        s.remainingCents > 0,
    )
    .sort((a, b) => a.daysLeft - b.daysLeft)
    .slice(0, 3);

  return (
    <Link
      href={`/cards/${card.id}`}
      className="group block rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 sm:p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/5"
      style={{ borderLeftWidth: "3px", borderLeftColor: colors.primary }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xs font-medium" style={{ color: colors.primary }}>{template.issuer}</div>
          <div className="font-semibold text-lg">
            {card.nickname ? `${card.nickname} · ${template.name}` : template.name}
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-[var(--muted)]">Annual fee</div>
          <div className="font-mono">{formatUSD(template.annualFeeCents)}</div>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-[var(--muted)]">Benefits used this year</span>
          <span className="font-mono">
            {formatUSD(value.annualUsedCents)} / {formatUSD(template.annualFeeCents)}
          </span>
        </div>
        <ProgressBar pct={value.pct} tone={tone} issuerColor={colors.primary} issuerColorLight={colors.light} />
        <div className="text-sm">
          Net value:{" "}
          <span className={`font-mono font-semibold ${value.netCents >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
            {formatUSD(value.netCents)}
          </span>
        </div>
      </div>

      {flatStatuses.length > 0 && (
        <div className="mt-4 pt-3 border-t border-[var(--border)]">
          <div className="text-xs text-[var(--muted)] mb-1">🏨 Free nights</div>
          <ul className="text-xs space-y-1">
            {flatStatuses.map((s) => {
              const used = s.usagesInWindow[0];
              return (
                <li key={s.benefit.id} className="flex justify-between gap-2">
                  <span className="flex items-center gap-1.5 min-w-0">
                    <span className={used ? "text-emerald-600" : "text-[var(--muted)]"}>
                      {used ? "✓" : "○"}
                    </span>
                    <span className="truncate">{s.benefit.name}</span>
                  </span>
                  <span className="text-[var(--muted)] shrink-0">
                    {used
                      ? `used ${new Date(used.dateISO).toLocaleDateString()}`
                      : `${s.daysLeft}d left`}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {expiring.length > 0 && (
        <div className="mt-4 pt-3 border-t border-[var(--border)]">
          <div className="text-xs text-[var(--muted)] mb-1">⏰ Expiring soon</div>
          <ul className="text-xs space-y-1">
            {expiring.map((s) => (
              <li key={s.benefit.id} className="flex justify-between">
                <span>{s.benefit.name}</span>
                <span className="text-[var(--muted)] font-mono">
                  {formatUSD(s.remainingCents)} · {s.daysLeft}d
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Link>
  );
}
