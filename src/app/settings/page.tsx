"use client";

import { useRef, useState } from "react";
import { useStore } from "@/lib/store";
import { toLocalDateString } from "@/lib/dates";
import { CURRENCY_LABEL, DEFAULT_CPP } from "@/lib/cpp";
import { ExportPayloadSchema } from "@/lib/schemas";
import type { PointsCurrency } from "@/lib/types";

const CPP_CURRENCIES: PointsCurrency[] = [
  "MR",
  "UR",
  "TY",
  "CapOneMiles",
  "Cashback",
  "HiltonHonors",
  "MarriottBonvoy",
  "WorldOfHyatt",
  "AAdvantage",
  "Atmos",
  "Delta",
  "Other",
];

export default function SettingsPage() {
  const fileRef = useRef<HTMLInputElement>(null);
  const exportJSON = useStore((s) => s.exportJSON);
  const importJSON = useStore((s) => s.importJSON);
  const clearAll = useStore((s) => s.clearAll);
  const hydrated = useStore((s) => s.hydrated);
  const cppOverrides = useStore((s) => s.cppOverrides);
  const setCppOverride = useStore((s) => s.setCppOverride);

  const onExport = () => {
    const payload = exportJSON();
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `benefit-tracker-${toLocalDateString()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const onImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const result = ExportPayloadSchema.safeParse(JSON.parse(text));
      if (!result.success) {
        alert("Invalid file: " + result.error.issues[0]?.message);
        return;
      }
      const data = result.data;
      if (
        confirm(
          `Import ${data.userCards.length} cards and ${data.usages.length} usage records? This replaces existing data.`,
        )
      ) {
        importJSON(data);
        alert("Imported successfully.");
      }
    } catch {
      alert("Failed to parse file.");
    } finally {
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const onClear = () => {
    if (confirm("Delete ALL cards and usage records? This cannot be undone.")) {
      clearAll();
    }
  };

  if (!hydrated) return <div className="text-sm text-[var(--muted)]">Loading…</div>;

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Settings</h1>
        <p className="text-sm text-[var(--muted)] mt-1">
          Your data is stored in this browser only. Use export/import to move between devices.
        </p>
      </div>

      <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 space-y-4">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--muted)]">
            Point values
          </h2>
          <p className="text-xs text-[var(--muted)] mt-1">
            Cents per point when converting card rewards into cash value. Adjust for the redemption rate you typically get.
          </p>
        </div>
        <div className="space-y-2">
          {CPP_CURRENCIES.map((c) => (
            <CppRow
              key={c}
              currency={c}
              override={cppOverrides[c]}
              onChange={(v) => setCppOverride(c, v)}
            />
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--muted)]">Backup</h2>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={onExport}
            className="px-4 py-2.5 rounded-lg bg-[var(--accent)] text-white font-medium hover:opacity-90 transition-opacity duration-200"
          >
            Export JSON
          </button>
          <button
            onClick={() => fileRef.current?.click()}
            className="px-4 py-2.5 rounded-lg border border-[var(--border)] font-medium hover:bg-[var(--background)] transition-colors duration-200"
          >
            Import JSON
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json"
            onChange={onImport}
            className="hidden"
          />
        </div>
      </div>

      <div className="rounded-2xl border border-rose-200 bg-[var(--card)] p-6 space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-rose-500">Danger zone</h2>
        <button
          onClick={onClear}
          className="px-4 py-2.5 rounded-lg border border-rose-300 text-rose-600 font-medium hover:bg-rose-50 transition-colors duration-200"
        >
          Clear all data
        </button>
      </div>
    </div>
  );
}

function CppRow({
  currency,
  override,
  onChange,
}: {
  currency: PointsCurrency;
  override: number | undefined;
  onChange: (v: number | null) => void;
}) {
  const defaultCpp = DEFAULT_CPP[currency];
  const isOverridden = typeof override === "number";
  const [raw, setRaw] = useState<string>(
    isOverridden ? String(override) : String(defaultCpp),
  );

  return (
    <div className="flex items-center justify-between gap-3">
      <div className="min-w-0">
        <div className="text-sm font-medium">{CURRENCY_LABEL[currency]}</div>
        <div className="text-xs text-[var(--muted)]">
          Default {defaultCpp.toFixed(1)}¢{isOverridden ? " · overridden" : ""}
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <input
          type="number"
          step="0.1"
          min="0"
          value={raw}
          onChange={(e) => setRaw(e.target.value)}
          onBlur={() => {
            const num = parseFloat(raw);
            if (!Number.isFinite(num) || num < 0) {
              setRaw(isOverridden ? String(override) : String(defaultCpp));
              return;
            }
            if (Math.abs(num - defaultCpp) < 1e-9) onChange(null);
            else onChange(num);
          }}
          className="w-20 px-2 py-1.5 rounded-md border border-[var(--border)] bg-[var(--background)] font-mono text-base sm:text-sm text-right"
        />
        <span className="text-sm text-[var(--muted)]">¢</span>
        {isOverridden ? (
          <button
            type="button"
            onClick={() => {
              setRaw(String(defaultCpp));
              onChange(null);
            }}
            className="text-xs text-[var(--muted)] underline underline-offset-2 hover:text-[var(--foreground)]"
          >
            Reset
          </button>
        ) : null}
      </div>
    </div>
  );
}
