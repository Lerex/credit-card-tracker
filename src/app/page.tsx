"use client";

import Link from "next/link";
import { useStore } from "@/lib/store";
import { getTemplate } from "@/lib/templates";
import { cardAnnualValue, formatUSD } from "@/lib/value";
import { CardSummary } from "@/components/CardSummary";

export default function DashboardPage() {
  const userCards = useStore((s) => s.userCards);
  const usages = useStore((s) => s.usages);
  const hydrated = useStore((s) => s.hydrated);

  if (!hydrated) {
    return <div className="text-sm text-[var(--muted)]">Loading…</div>;
  }

  const totals = userCards.reduce(
    (acc, c) => {
      const t = getTemplate(c.templateId);
      if (!t) return acc;
      const v = cardAnnualValue(c, t, usages);
      acc.fee += v.annualFeeCents;
      acc.used += v.annualUsedCents;
      return acc;
    },
    { fee: 0, used: 0 },
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-sm text-[var(--muted)] mt-1">
          Your cards and benefit utilization at a glance.
        </p>
      </div>

      {userCards.length > 0 && (
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5">
          <div className="text-sm text-[var(--muted)]">Portfolio this year</div>
          <div className="mt-2 flex flex-wrap gap-8">
            <div>
              <div className="text-xs text-[var(--muted)]">Total annual fees</div>
              <div className="text-xl font-mono">{formatUSD(totals.fee)}</div>
            </div>
            <div>
              <div className="text-xs text-[var(--muted)]">Benefits used</div>
              <div className="text-xl font-mono">{formatUSD(totals.used)}</div>
            </div>
            <div>
              <div className="text-xs text-[var(--muted)]">Net</div>
              <div
                className={`text-xl font-mono font-semibold ${
                  totals.used - totals.fee >= 0 ? "text-emerald-600" : "text-rose-600"
                }`}
              >
                {formatUSD(totals.used - totals.fee)}
              </div>
            </div>
          </div>
        </div>
      )}

      {userCards.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[var(--border)] p-12 text-center">
          <p className="text-[var(--muted)] mb-4">No cards yet.</p>
          <Link
            href="/cards/new"
            className="inline-block px-4 py-2 rounded bg-[var(--accent)] text-white"
          >
            Add your first card
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {userCards.map((c) => (
            <CardSummary key={c.id} card={c} />
          ))}
        </div>
      )}
    </div>
  );
}
