"use client";

/** Tiny client control — browser print dialog for the printable chart guide. */
export default function PrintButton({ label = "Print this chart" }: { label?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="no-print rounded-xl border border-line bg-surface px-4 py-2 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
    >
      {label}
    </button>
  );
}
