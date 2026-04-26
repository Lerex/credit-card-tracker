"use client";

import Link from "next/link";
import { useStore } from "@/lib/store";
import { getTemplate } from "@/lib/templates";
import { cardAnnualValue, formatUSD } from "@/lib/value";
import { CardSummary } from "@/components/CardSummary";
import { CATEGORY_LABEL, CATEGORY_ORDER } from "@/lib/recommend";

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
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-sm text-[var(--muted)] mt-1">
            Your cards and benefit utilization at a glance.
          </p>
        </div>
        {userCards.length > 0 && (
          <Link
            href="/cards/new"
            className="shrink-0 px-3 py-2 sm:py-1.5 text-sm rounded-lg border border-[var(--border)] hover:bg-[var(--background)] hover:border-[var(--muted)] transition-colors duration-200"
          >
            + Add card
          </Link>
        )}
      </div>

      {userCards.length > 0 && (
        <div className="relative rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 overflow-hidden">
          <div
            className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full opacity-[0.07]"
            style={{ background: "radial-gradient(circle, var(--accent), transparent 70%)" }}
          />
          <div className="relative">
            <div className="text-sm font-medium tracking-tight">Portfolio this year</div>
            <div className="mt-4 grid grid-cols-3 gap-3 sm:flex sm:flex-wrap sm:gap-10">
              <div>
                <div className="text-[11px] uppercase tracking-wider text-[var(--muted)] font-medium">Annual fees</div>
                <div className="text-2xl sm:text-3xl font-mono font-light mt-0.5">{formatUSD(totals.fee)}</div>
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wider text-[var(--muted)] font-medium">Benefits used</div>
                <div className="text-2xl sm:text-3xl font-mono font-light mt-0.5">{formatUSD(totals.used)}</div>
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wider text-[var(--muted)] font-medium">Net</div>
                <div
                  className={`text-2xl sm:text-3xl font-mono font-semibold mt-0.5 ${
                    totals.used - totals.fee >= 0 ? "text-emerald-500" : "text-rose-500"
                  }`}
                >
                  {formatUSD(totals.used - totals.fee)}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {userCards.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[var(--border)] p-16 text-center">
          <p className="text-[var(--muted)] mb-6 text-lg">No cards yet.</p>
          <Link
            href="/cards/new"
            className="inline-block px-5 py-2.5 rounded-lg bg-[var(--accent)] text-white font-medium hover:opacity-90 transition-opacity duration-200"
          >
            Add your first card
          </Link>
        </div>
      ) : (
        <>
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
            <div className="text-sm font-medium tracking-tight mb-3">Which card for…</div>
            <div className="flex flex-wrap gap-2">
              {CATEGORY_ORDER.map((c) => (
                <Link
                  key={c}
                  href={`/recommend?category=${c}`}
                  className="px-3.5 py-2 rounded-full text-sm font-medium border border-[var(--border)] hover:bg-[var(--background)] transition-colors duration-200"
                >
                  {CATEGORY_LABEL[c]}
                </Link>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {userCards.map((c) => (
              <CardSummary key={c.id} card={c} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
