"use client";

import Link from "next/link";
import { Suspense, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useStore } from "@/lib/store";
import { getCardColor } from "@/lib/templates";
import { formatUSD } from "@/lib/value";
import { CURRENCY_LABEL } from "@/lib/cpp";
import {
  BOOKING_LABEL,
  CATEGORY_LABEL,
  CATEGORY_ORDER,
  formatCents,
  recommendForCategory,
  type Recommendation,
} from "@/lib/recommend";
import type { SpendCategory } from "@/lib/types";

function isSpendCategory(v: string | null): v is SpendCategory {
  return v !== null && (CATEGORY_ORDER as string[]).includes(v);
}

function RecommendInner() {
  const router = useRouter();
  const params = useSearchParams();
  const categoryParam = params.get("category");
  const category: SpendCategory = isSpendCategory(categoryParam) ? categoryParam : "dining";

  const userCards = useStore((s) => s.userCards);
  const cppOverrides = useStore((s) => s.cppOverrides);
  const hydrated = useStore((s) => s.hydrated);

  const results = useMemo(
    () => (hydrated ? recommendForCategory(category, userCards, cppOverrides) : []),
    [hydrated, category, userCards, cppOverrides],
  );

  // Group recommendations by card so portal + direct rows render under one header.
  const grouped = useMemo(() => {
    const map = new Map<string, Recommendation[]>();
    for (const r of results) {
      const arr = map.get(r.userCard.id) ?? [];
      arr.push(r);
      map.set(r.userCard.id, arr);
    }
    const groups = Array.from(map.entries()).map(([, recs]) => recs);
    groups.sort(
      (a, b) => b[0].effectiveCentsPerDollar - a[0].effectiveCentsPerDollar,
    );
    return groups;
  }, [results]);

  const setCategory = (c: SpendCategory) => {
    const qs = new URLSearchParams(params.toString());
    qs.set("category", c);
    router.replace(`/recommend?${qs.toString()}`, { scroll: false });
  };

  if (!hydrated) return <div className="text-sm text-[var(--muted)]">Loading…</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Which card to use</h1>
        <p className="text-sm text-[var(--muted)] mt-1">
          Ranked by effective return per $1 using your valuations for each point currency.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {CATEGORY_ORDER.map((c) => {
          const active = c === category;
          return (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              aria-pressed={active}
              className={`px-3.5 py-2 rounded-full text-sm font-medium border transition-colors duration-200 ${
                active
                  ? "bg-[var(--accent)] text-white border-[var(--accent)]"
                  : "border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--background)]"
              }`}
            >
              {CATEGORY_LABEL[c]}
            </button>
          );
        })}
      </div>

      {userCards.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[var(--border)] p-12 text-center">
          <p className="text-[var(--muted)] mb-6">No cards yet.</p>
          <Link
            href="/cards/new"
            className="inline-block px-5 py-2.5 rounded-lg bg-[var(--accent)] text-white font-medium hover:opacity-90 transition-opacity duration-200"
          >
            Add your first card
          </Link>
        </div>
      ) : grouped.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[var(--border)] p-12 text-center text-[var(--muted)]">
          No earning-rate data on any of your cards for this category yet.
        </div>
      ) : (
        <div className="space-y-3">
          {grouped.map((recs) => (
            <RecommendationCard key={recs[0].userCard.id} recs={recs} />
          ))}
        </div>
      )}
    </div>
  );
}

function RecommendationCard({ recs }: { recs: Recommendation[] }) {
  const best = recs[0];
  const { template, userCard } = best;
  const colors = getCardColor(template);

  return (
    <div
      className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5"
      style={{ borderLeftWidth: "3px", borderLeftColor: colors.primary }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="text-xs font-medium" style={{ color: colors.primary }}>
            {template.issuer}
          </div>
          <div className="font-semibold text-lg truncate">
            {userCard.nickname ? `${userCard.nickname} · ${template.name}` : template.name}
          </div>
        </div>
        <div className="text-right shrink-0">
          <div className="text-xs uppercase tracking-wider text-[var(--muted)] font-medium">
            Best rate
          </div>
          <div className="font-mono font-semibold text-2xl">
            {formatCents(best.effectiveCentsPerDollar)}
            <span className="text-sm text-[var(--muted)] font-normal"> / $1</span>
          </div>
        </div>
      </div>

      <div className="mt-3 space-y-2">
        {recs.map((r, i) => (
          <RateRow key={i} rec={r} />
        ))}
      </div>
    </div>
  );
}

function RateRow({ rec }: { rec: Recommendation }) {
  const bookingLabel = BOOKING_LABEL[rec.bookingMethod];
  return (
    <div className="flex items-start justify-between gap-3 text-sm">
      <div className="min-w-0">
        <div className="font-mono">
          {rec.isBaseFallback ? (
            <span className="text-[var(--muted)]">
              ~{formatCents(rec.effectiveCentsPerDollar)} / $1 (assumed base rate)
            </span>
          ) : (
            <>
              {rec.multiplier}× {CURRENCY_LABEL[rec.currency]} × {rec.cpp.toFixed(1)}¢
              {bookingLabel ? (
                <span className="text-[var(--muted)] font-sans"> · {bookingLabel}</span>
              ) : null}
              <span className="text-[var(--muted)] font-sans">
                {" "}
                = {formatCents(rec.effectiveCentsPerDollar)}/$1
              </span>
            </>
          )}
        </div>
        {rec.rateNotes && !rec.isBaseFallback ? (
          <div className="text-xs text-[var(--muted)] mt-0.5">{rec.rateNotes}</div>
        ) : null}
        {rec.annualCapCents ? (
          <div className="text-xs text-amber-600 mt-0.5">
            Cap: {formatUSD(rec.annualCapCents)}/yr
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default function RecommendPage() {
  return (
    <Suspense fallback={<div className="text-sm text-[var(--muted)]">Loading…</div>}>
      <RecommendInner />
    </Suspense>
  );
}
