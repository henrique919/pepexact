import type { ReactNode } from "react";

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-line bg-surface p-5 sm:p-6 ${className}`}
    >
      {children}
    </div>
  );
}

export function Field({
  label,
  value,
  onChange,
  suffix,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  suffix?: ReactNode;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-mono text-[11px] font-medium uppercase tracking-wider text-ink-soft">
        {label}
      </span>
      <span className="flex min-h-11 items-center rounded-xl border border-line bg-surface transition-colors focus-within:border-accent focus-within:ring-2 focus-within:ring-accent-soft">
        <input
          type="text"
          inputMode="decimal"
          className="w-full min-w-0 rounded-xl bg-transparent px-4 py-3 font-mono text-lg text-ink outline-none"
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
        {suffix ? (
          <span className="shrink-0 pr-3 font-mono text-sm text-ink-soft">
            {suffix}
          </span>
        ) : null}
      </span>
    </label>
  );
}

export function Segmented<T extends string>({
  options,
  value,
  onChange,
  ariaLabel,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  ariaLabel?: string;
}) {
  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className="inline-flex rounded-xl border border-line bg-surface p-1"
    >
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onChange(o.value)}
          className={`min-h-10 rounded-lg px-3 py-2 font-mono text-sm transition-colors ${
            o.value === value
              ? "bg-accent font-medium text-white"
              : "text-ink-soft hover:text-ink"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function Stat({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="rounded-xl border border-line bg-paper/80 px-4 py-3">
      <p className="font-mono text-[11px] font-medium uppercase tracking-wider text-ink-soft">
        {label}
      </p>
      <p className="mt-0.5 font-mono text-lg font-semibold text-ink">{value}</p>
      {sub ? (
        <p className="font-mono text-xs text-ink-soft">{sub}</p>
      ) : null}
    </div>
  );
}

export function Note({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-xl border border-line bg-paper px-4 py-3 text-sm text-ink-soft">
      {children}
    </p>
  );
}

export function Warnings({ items }: { items: string[] }) {
  if (items.length === 0) return null;
  return (
    <ul className="space-y-2 rounded-xl border border-warn/20 bg-warn-soft px-4 py-3 text-sm text-warn">
      {items.map((w) => (
        <li key={w}>{w}</li>
      ))}
    </ul>
  );
}

export function Errors({ items }: { items: string[] }) {
  if (items.length === 0) return null;
  return (
    <ul className="space-y-1 rounded-xl border border-line bg-surface px-4 py-3 text-sm text-ink-soft">
      {items.map((e) => (
        <li key={e}>{e}</li>
      ))}
    </ul>
  );
}

export function ShowMath({
  steps,
}: {
  steps: { label: string; expression: string; result: string }[];
}) {
  return (
    <details className="group rounded-xl border border-line bg-surface px-4 py-3">
      <summary className="cursor-pointer select-none text-sm font-medium text-accent-deep">
        Show the math
      </summary>
      <ol className="mt-3 space-y-3 font-mono text-sm">
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
    </details>
  );
}
