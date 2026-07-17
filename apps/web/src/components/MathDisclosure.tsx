"use client";

import { useId, useState } from "react";

/**
 * Accessible “Show the math” disclosure for the homepage demo.
 * Uses a real button + aria-expanded/controls; content stays in the DOM.
 */
export default function MathDisclosure({
  steps,
}: {
  steps: { label: string; expression: string; result: string }[];
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div>
      <button
        type="button"
        className="inline-flex min-h-11 items-center rounded-xl border border-line bg-surface px-4 py-2 text-sm font-medium text-accent-deep transition-colors hover:border-accent-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? "Hide the math" : "Show the math"}
      </button>
      <div
        id={panelId}
        hidden={!open}
        className="mt-3 motion-safe:transition-opacity"
      >
        <ol className="space-y-3 font-mono text-sm">
          {steps.map((s, i) => (
            <li key={s.label}>
              <span className="font-medium text-ink">
                {i + 1}. {s.label}:
              </span>{" "}
              <span className="text-ink-soft">{s.expression}</span>{" "}
              <span className="font-semibold text-ink">= {s.result}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
