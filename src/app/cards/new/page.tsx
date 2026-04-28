"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { toLocalDateString } from "@/lib/dates";
import { CARD_TEMPLATES, ISSUER_COLORS } from "@/lib/templates";
import { formatUSD } from "@/lib/value";

export default function NewCardPage() {
  const router = useRouter();
  const addCard = useStore((s) => s.addCard);
  const [templateId, setTemplateId] = useState<string>("");
  const [nickname, setNickname] = useState("");
  const [openedAt, setOpenedAt] = useState(toLocalDateString());
  const [chargedMonth, setChargedMonth] = useState<number>(
    new Date().getMonth() + 1,
  );

  const submit = () => {
    if (!templateId) return;
    const id = addCard({
      templateId,
      nickname: nickname || undefined,
      openedAt,
      annualFeeChargedMonth: chargedMonth,
    });
    router.push(`/cards/${id}`);
  };

  const grouped = CARD_TEMPLATES.reduce<Record<string, typeof CARD_TEMPLATES>>(
    (acc, t) => {
      (acc[t.issuer] ??= []).push(t);
      return acc;
    },
    {},
  );

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Add Card</h1>
        <p className="text-sm text-[var(--muted)] mt-1">
          Pick a template, then fill in your personal details.
        </p>
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-medium">Card template</label>
        {Object.entries(grouped).map(([issuer, list]) => (
          <div key={issuer} className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-[var(--muted)]">
              <span
                className="inline-block h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: (ISSUER_COLORS[issuer] ?? ISSUER_COLORS["Other"]).primary }}
              />
              {issuer}
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {list.map((t) => (
                <label
                  key={t.id}
                  className={`cursor-pointer rounded-xl border p-3 transition-all duration-200 ${
                    templateId === t.id
                      ? "border-[var(--accent)] bg-[var(--accent)]/5 shadow-sm"
                      : "border-[var(--border)] hover:border-[var(--muted)] hover:bg-[var(--card-hover)]"
                  }`}
                >
                  <input
                    type="radio"
                    name="template"
                    value={t.id}
                    checked={templateId === t.id}
                    onChange={() => setTemplateId(t.id)}
                    className="sr-only"
                  />
                  <div className="font-medium">{t.name}</div>
                  <div className="text-xs text-[var(--muted)]">
                    {formatUSD(t.annualFeeCents)} annual · {t.benefits.length} credits
                  </div>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium mb-1">Nickname (optional)</label>
          <input
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="e.g. My Platinum"
            className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/30 focus:border-[var(--accent)] transition-colors duration-200"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Opened on</label>
          <input
            type="date"
            value={openedAt}
            onChange={(e) => setOpenedAt(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/30 focus:border-[var(--accent)] transition-colors duration-200"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Annual fee charged in month
          </label>
          <select
            value={chargedMonth}
            onChange={(e) => setChargedMonth(Number(e.target.value))}
            className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/30 focus:border-[var(--accent)] transition-colors duration-200"
          >
            {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
              <option key={m} value={m}>
                {new Date(2000, m - 1, 1).toLocaleString(undefined, { month: "long" })}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
        <button
          onClick={() => router.back()}
          className="w-full sm:w-auto px-4 py-2.5 rounded-lg border border-[var(--border)] font-medium hover:bg-[var(--background)] transition-colors duration-200"
        >
          Cancel
        </button>
        <button
          onClick={submit}
          disabled={!templateId}
          className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-[var(--accent)] text-white font-medium disabled:opacity-50 hover:opacity-90 transition-opacity duration-200"
        >
          Add card
        </button>
      </div>
    </div>
  );
}
