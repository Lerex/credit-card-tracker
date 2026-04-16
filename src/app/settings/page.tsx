"use client";

import { useRef } from "react";
import { useStore } from "@/lib/store";
import type { ExportPayload } from "@/lib/types";

export default function SettingsPage() {
  const fileRef = useRef<HTMLInputElement>(null);
  const exportJSON = useStore((s) => s.exportJSON);
  const importJSON = useStore((s) => s.importJSON);
  const clearAll = useStore((s) => s.clearAll);
  const hydrated = useStore((s) => s.hydrated);

  const onExport = () => {
    const payload = exportJSON();
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `benefit-tracker-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const onImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const data = JSON.parse(text) as ExportPayload;
      if (data.version !== 1 || !Array.isArray(data.userCards)) {
        alert("Invalid file format.");
        return;
      }
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
