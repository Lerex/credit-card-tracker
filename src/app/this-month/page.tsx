"use client";

import { useStore } from "@/lib/store";
import { getTemplate, getCardColor } from "@/lib/templates";
import { benefitStatuses, formatUSD, type BenefitStatus } from "@/lib/value";
import { currentWindow } from "@/lib/periods";
import { BenefitRow } from "@/components/BenefitRow";
import type { CardTemplate, UserCard } from "@/lib/types";

type Row = {
  status: BenefitStatus;
  card: UserCard;
  template: CardTemplate;
};

const PERIOD_ORDER = ["monthly", "quarterly", "semi-annual"] as const;
type ActivePeriod = (typeof PERIOD_ORDER)[number];

const PERIOD_TITLE: Record<ActivePeriod, string> = {
  monthly: "Monthly",
  quarterly: "Quarterly",
  "semi-annual": "Semi-annual",
};

function isPending(status: BenefitStatus): boolean {
  if (status.benefit.unit === "flat") return status.usagesInWindow.length === 0;
  return status.pct < 1;
}

function isActivePeriod(t: string): t is ActivePeriod {
  return t === "monthly" || t === "quarterly" || t === "semi-annual";
}

export default function ThisMonthPage() {
  const userCards = useStore((s) => s.userCards);
  const usages = useStore((s) => s.usages);
  const hydrated = useStore((s) => s.hydrated);

  if (!hydrated) {
    return <div className="text-sm text-[var(--muted)]">Loading…</div>;
  }

  const now = new Date();
  const rows: Row[] = [];
  for (const card of userCards) {
    const template = getTemplate(card.templateId);
    if (!template) continue;
    for (const status of benefitStatuses(card, template, usages, now)) {
      if (!isActivePeriod(status.benefit.period.type)) continue;
      if (!isPending(status)) continue;
      rows.push({ status, card, template });
    }
  }

  const grouped = PERIOD_ORDER.map((period) => {
    const items = rows
      .filter((r) => r.status.benefit.period.type === period)
      .sort((a, b) => a.status.daysLeft - b.status.daysLeft);
    const win = currentWindow({ type: period }, now.toISOString(), now);
    const endsInDays = Math.max(
      0,
      Math.ceil((win.end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)),
    );
    return { period, title: PERIOD_TITLE[period], items, endsInDays };
  }).filter((g) => g.items.length > 0);

  const totalRemaining = rows.reduce((sum, r) => {
    if (r.status.benefit.unit === "flat") return sum + r.status.benefit.amountCents;
    return sum + r.status.remainingCents;
  }, 0);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">This Month</h1>
        <p className="text-sm text-[var(--muted)] mt-1">
          Credits to use before they reset, across all cards.
        </p>
      </div>

      {userCards.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[var(--border)] p-16 text-center">
          <p className="text-[var(--muted)] text-lg">
            Add a card on the Dashboard to start tracking benefits.
          </p>
        </div>
      ) : rows.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[var(--border)] p-16 text-center">
          <p className="text-[var(--muted)] text-lg">Nothing pending — enjoy 🎉</p>
        </div>
      ) : (
        <>
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
            <div className="text-[11px] uppercase tracking-wider text-[var(--muted)] font-medium">
              Remaining this period
            </div>
            <div className="mt-1 text-2xl sm:text-3xl font-mono font-light">
              {formatUSD(totalRemaining)}
            </div>
            <div className="text-xs text-[var(--muted)] mt-1">
              {rows.length} {rows.length === 1 ? "benefit" : "benefits"} pending
            </div>
          </div>

          {grouped.map((g) => (
            <section key={g.period}>
              <div className="flex items-baseline justify-between mb-3">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--muted)]">
                  {g.title}
                </h2>
                <span className="text-xs text-[var(--muted)]">
                  resets in {g.endsInDays}d
                </span>
              </div>
              <div className="grid gap-3">
                {g.items.map(({ status, card, template }) => {
                  const colors = getCardColor(template);
                  const cardLabel = card.nickname
                    ? `${card.nickname} · ${template.name}`
                    : template.name;
                  return (
                    <div key={`${card.id}:${status.benefit.id}`} className="space-y-1">
                      <div
                        className="text-xs font-medium px-1"
                        style={{ color: colors.primary }}
                      >
                        {cardLabel}
                      </div>
                      <BenefitRow
                        userCardId={card.id}
                        status={status}
                        issuerColor={colors.primary}
                        issuerColorLight={colors.light}
                      />
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </>
      )}
    </div>
  );
}
