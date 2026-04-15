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
  const removeUsage = useStore((s) => s.removeUsage);
  const setBenefitExpiration = useStore((s) => s.setBenefitExpiration);

  const tone: "good" | "warn" | "bad" =
    status.pct >= 1 ? "good" : status.daysLeft <= 60 ? "warn" : "bad";

  const isFlat = status.benefit.unit === "flat";
  const flatUsage = isFlat ? status.usagesInWindow[0] : undefined;
  const toLocalDateInput = (d: Date) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  };

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

  const markFlatUsed = () => {
    logUsage({
      userCardId,
      benefitId: status.benefit.id,
      dateISO: new Date().toISOString(),
      amountCents: status.benefit.amountCents,
    });
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
        {!isFlat && (
          <div className="text-right shrink-0">
            <div className="font-mono text-sm">
              {formatUSD(status.usedCents)} / {formatUSD(status.benefit.amountCents)}
            </div>
            <div className="text-xs text-[var(--muted)]">
              {formatUSD(status.remainingCents)} left
            </div>
          </div>
        )}
      </div>

      {!isFlat && (
        <div className="mt-3">
          <ProgressBar pct={status.pct} tone={tone} />
        </div>
      )}

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        {isFlat ? (
          <>
            <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
              <input
                type="checkbox"
                checked={!!flatUsage}
                onChange={() => {
                  if (flatUsage) removeUsage(flatUsage.id);
                  else markFlatUsed();
                }}
                className="h-4 w-4"
              />
              {flatUsage
                ? `Used on ${new Date(flatUsage.dateISO).toLocaleDateString()}`
                : "Mark as used"}
            </label>
            <label className="flex items-center gap-2 text-xs text-[var(--muted)]">
              Expires
              <input
                type="date"
                value={toLocalDateInput(status.windowEnd)}
                onChange={(e) => {
                  const v = e.target.value;
                  if (!v) {
                    setBenefitExpiration(userCardId, status.benefit.id, null);
                    return;
                  }
                  const parsed = new Date(v + "T00:00:00");
                  if (!Number.isFinite(parsed.getTime())) return;
                  setBenefitExpiration(
                    userCardId,
                    status.benefit.id,
                    parsed.toISOString(),
                  );
                }}
                className="px-2 py-1 rounded border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)]"
              />
            </label>
          </>
        ) : open ? (
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
