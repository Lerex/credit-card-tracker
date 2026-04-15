"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";
import { formatUSD, type BenefitStatus } from "@/lib/value";
import { ProgressBar } from "./ProgressBar";

export function BenefitRow({ userCardId, status }: { userCardId: string; status: BenefitStatus }) {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const logUsage = useStore((s) => s.logUsage);

  const tone: "good" | "warn" | "bad" =
    status.pct >= 1 ? "good" : status.daysLeft <= 60 ? "warn" : "bad";

  const submit = () => {
    const cents = Math.round(Number(amount) * 100);
    if (!Number.isFinite(cents) || cents <= 0) return;
    logUsage({
      userCardId,
      benefitId: status.benefit.id,
      dateISO: new Date(date).toISOString(),
      amountCents: cents,
      note: note || undefined,
    });
    setAmount("");
    setNote("");
    setOpen(false);
  };

  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="font-medium">{status.benefit.name}</div>
          <div className="text-xs text-[var(--muted)]">{status.daysLeft}d left</div>
          {status.benefit.notes && (
            <div className="text-xs text-[var(--muted)] mt-1">{status.benefit.notes}</div>
          )}
        </div>
        <div className="text-right shrink-0">
          <div className="font-mono text-sm">
            {formatUSD(status.usedCents)} / {formatUSD(status.benefit.amountCents)}
          </div>
          <div className="text-xs text-[var(--muted)]">
            {formatUSD(status.remainingCents)} left
          </div>
        </div>
      </div>

      <div className="mt-3">
        <ProgressBar pct={status.pct} tone={tone} />
      </div>

      <div className="mt-3 flex justify-end">
        {open ? (
          <div className="flex flex-wrap gap-2 w-full">
            <input
              type="number"
              step="0.01"
              placeholder="Amount $"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-28 px-2 py-1 text-sm rounded border border-[var(--border)] bg-[var(--background)]"
              autoFocus
            />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="px-2 py-1 text-sm rounded border border-[var(--border)] bg-[var(--background)]"
            />
            <input
              placeholder="Note (optional)"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="flex-1 min-w-32 px-2 py-1 text-sm rounded border border-[var(--border)] bg-[var(--background)]"
            />
            <button
              onClick={submit}
              className="px-3 py-1 text-sm rounded bg-[var(--accent)] text-white hover:opacity-90"
            >
              Save
            </button>
            <button
              onClick={() => setOpen(false)}
              className="px-3 py-1 text-sm rounded border border-[var(--border)]"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setOpen(true)}
            className="px-3 py-1 text-sm rounded border border-[var(--border)] hover:bg-[var(--background)]"
          >
            + Log usage
          </button>
        )}
      </div>
    </div>
  );
}
