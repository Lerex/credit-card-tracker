"use client";

import Link from "next/link";
import { notFound, useParams, useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { getTemplate } from "@/lib/templates";
import { benefitStatuses, cardAnnualValue, formatUSD } from "@/lib/value";
import { BenefitRow } from "@/components/BenefitRow";
import { ProgressBar } from "@/components/ProgressBar";

export default function CardDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const hydrated = useStore((s) => s.hydrated);
  const card = useStore((s) => s.userCards.find((c) => c.id === params.id));
  const usages = useStore((s) => s.usages);
  const removeCard = useStore((s) => s.removeCard);
  const removeUsage = useStore((s) => s.removeUsage);

  if (!hydrated) return <div className="text-sm text-[var(--muted)]">Loading…</div>;
  if (!card) return notFound();
  const template = getTemplate(card.templateId);
  if (!template) return notFound();

  const statuses = benefitStatuses(card, template, usages);

  const PERIOD_ORDER = [
    "monthly",
    "quarterly",
    "semi-annual",
    "calendar-year",
    "cardmember-year",
  ] as const;
  const PERIOD_TITLE: Record<(typeof PERIOD_ORDER)[number], string> = {
    monthly: "Monthly",
    quarterly: "Quarterly",
    "semi-annual": "Semi-annual",
    "calendar-year": "Annual (calendar year)",
    "cardmember-year": "Annual (cardmember year)",
  };
  const grouped = PERIOD_ORDER.map((p) => ({
    period: p,
    title: PERIOD_TITLE[p],
    items: statuses
      .filter((s) => s.benefit.period.type === p)
      .sort((a, b) => a.daysLeft - b.daysLeft),
  })).filter((g) => g.items.length > 0);
  const value = cardAnnualValue(card, template, usages);
  const tone: "good" | "warn" | "bad" =
    value.pct >= 1 ? "good" : value.pct >= 0.6 ? "warn" : "bad";

  const cardUsages = usages
    .filter((u) => u.userCardId === card.id)
    .sort((a, b) => b.dateISO.localeCompare(a.dateISO));

  const onDelete = () => {
    if (confirm(`Delete ${template.name}? This removes all its usage records.`)) {
      removeCard(card.id);
      router.push("/");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <Link href="/" className="text-sm text-[var(--muted)] hover:underline">
          ← Dashboard
        </Link>
        <div className="mt-2 flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="text-xs text-[var(--muted)]">{template.issuer}</div>
            <h1 className="text-2xl font-semibold tracking-tight">
              {card.nickname ? `${card.nickname} · ${template.name}` : template.name}
            </h1>
            <div className="text-sm text-[var(--muted)] mt-1">
              Opened {new Date(card.openedAt).toLocaleDateString()} · Annual fee{" "}
              {formatUSD(template.annualFeeCents)} in{" "}
              {new Date(2000, card.annualFeeChargedMonth - 1, 1).toLocaleString(undefined, {
                month: "long",
              })}
            </div>
          </div>
          <button
            onClick={onDelete}
            className="px-3 py-1 text-sm rounded border border-rose-500 text-rose-600"
          >
            Delete card
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5">
        <div className="flex justify-between text-sm">
          <span>Net value this year</span>
          <span className="font-mono">
            {formatUSD(value.annualUsedCents)} used − {formatUSD(value.annualFeeCents)} fee
          </span>
        </div>
        <div className="mt-2">
          <ProgressBar pct={value.pct} tone={tone} />
        </div>
        <div
          className={`mt-2 text-lg font-mono font-semibold ${
            value.netCents >= 0 ? "text-emerald-600" : "text-rose-600"
          }`}
        >
          {formatUSD(value.netCents)}
        </div>
      </div>

      {grouped.map((g) => (
        <section key={g.period}>
          <h2 className="font-semibold mb-3">{g.title}</h2>
          <div className="grid gap-3">
            {g.items.map((s) => (
              <BenefitRow key={s.benefit.id} userCardId={card.id} status={s} />
            ))}
          </div>
        </section>
      ))}

      {template.qualitativePerks && template.qualitativePerks.length > 0 && (
        <div>
          <h2 className="font-semibold mb-3">Other perks</h2>
          <ul className="list-disc list-inside text-sm text-[var(--muted)] space-y-1">
            {template.qualitativePerks.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
      )}

      {cardUsages.length > 0 && (
        <div>
          <h2 className="font-semibold mb-3">History</h2>
          <div className="rounded-lg border border-[var(--border)] overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-[var(--card)] text-[var(--muted)]">
                <tr>
                  <th className="text-left px-3 py-2">Date</th>
                  <th className="text-left px-3 py-2">Benefit</th>
                  <th className="text-right px-3 py-2">Amount</th>
                  <th className="text-left px-3 py-2">Note</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cardUsages.map((u) => {
                  const b =
                    template.benefits.find((x) => x.id === u.benefitId) ??
                    card.customBenefits?.find((x) => x.id === u.benefitId);
                  return (
                    <tr key={u.id} className="border-t border-[var(--border)]">
                      <td className="px-3 py-2 font-mono">
                        {new Date(u.dateISO).toLocaleDateString()}
                      </td>
                      <td className="px-3 py-2">{b?.name ?? u.benefitId}</td>
                      <td className="px-3 py-2 text-right font-mono">
                        {formatUSD(u.amountCents)}
                      </td>
                      <td className="px-3 py-2 text-[var(--muted)]">{u.note}</td>
                      <td className="px-3 py-2 text-right">
                        <button
                          onClick={() => removeUsage(u.id)}
                          className="text-xs text-rose-600 hover:underline"
                        >
                          delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
