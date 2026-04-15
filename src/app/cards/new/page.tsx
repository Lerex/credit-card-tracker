"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { CARD_TEMPLATES } from "@/lib/templates";
import { formatUSD } from "@/lib/value";

export default function NewCardPage() {
  const router = useRouter();
  const addCard = useStore((s) => s.addCard);
  const [templateId, setTemplateId] = useState<string>("");
  const [nickname, setNickname] = useState("");
  const [openedAt, setOpenedAt] = useState(new Date().toISOString().slice(0, 10));
  const [chargedMonth, setChargedMonth] = useState<number>(
    new Date().getMonth() + 1,
  );

  const submit = () => {
    if (!templateId) return;
    const id = addCard({
      templateId,
      nickname: nickname || undefined,
      openedAt: new Date(openedAt).toISOString(),
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
        <h1 className="text-2xl font-semibold tracking-tight">Add Card</h1>
        <p className="text-sm text-[var(--muted)] mt-1">
          Pick a template, then fill in your personal details.
        </p>
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-medium">Card template</label>
        {Object.entries(grouped).map(([issuer, list]) => (
          <div key={issuer} className="space-y-2">
            <div className="text-xs text-[var(--muted)] font-semibold">{issuer}</div>
            <div className="grid gap-2 sm:grid-cols-2">
              {list.map((t) => (
                <label
                  key={t.id}
                  className={`cursor-pointer rounded-lg border p-3 ${
                    templateId === t.id
                      ? "border-[var(--accent)] bg-[var(--accent)]/10"
                      : "border-[var(--border)]"
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
            className="w-full px-3 py-2 rounded border border-[var(--border)] bg-[var(--background)]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Opened on</label>
          <input
            type="date"
            value={openedAt}
            onChange={(e) => setOpenedAt(e.target.value)}
            className="w-full px-3 py-2 rounded border border-[var(--border)] bg-[var(--background)]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Annual fee charged in month
          </label>
          <select
            value={chargedMonth}
            onChange={(e) => setChargedMonth(Number(e.target.value))}
            className="w-full px-3 py-2 rounded border border-[var(--border)] bg-[var(--background)]"
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
          className="w-full sm:w-auto px-4 py-2 rounded border border-[var(--border)]"
        >
          Cancel
        </button>
        <button
          onClick={submit}
          disabled={!templateId}
          className="w-full sm:w-auto px-4 py-2 rounded bg-[var(--accent)] text-white disabled:opacity-50"
        >
          Add card
        </button>
      </div>
    </div>
  );
}
