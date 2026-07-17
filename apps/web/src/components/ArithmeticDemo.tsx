import { calculateDraw, fmt } from "@pepexact/engine";
import MathDisclosure from "./MathDisclosure";

/** Canonical illustrative inputs — same defaults as PeptideCalculator. */
const EXAMPLE = {
  vialMg: 5,
  diluentMl: 2,
  doseValue: 250,
  doseUnit: "mcg" as const,
};

/**
 * Compact post-hero demonstration of the shared engine arithmetic.
 * Illustrative only — not interactive, not a dosing recommendation.
 */
export default function ArithmeticDemo() {
  const result = calculateDraw(EXAMPLE);
  if (!result.ok) {
    throw new Error("Arithmetic demo example failed engine validation");
  }

  return (
    <section
      className="border-t border-line pt-16 sm:pt-20"
      aria-labelledby="arithmetic-demo-heading"
    >
      <div className="mb-6 max-w-3xl space-y-3">
        <h2
          id="arithmetic-demo-heading"
          className="text-xl font-semibold tracking-tight"
        >
          See how the arithmetic works
        </h2>
        <p className="max-w-2xl text-sm text-ink-soft">
          A user-supplied example showing the same transparent calculation used
          by the peptide calculator. It is not a recommended amount or protocol.
        </p>
      </div>

      <div className="w-full rounded-2xl border border-line bg-surface p-4 sm:p-5">
        <p className="mb-4 font-mono text-xs font-medium uppercase tracking-wider text-ink-soft">
          Illustrative example — not a recommended amount
        </p>

        <dl className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          <div className="rounded-xl border border-line bg-paper/80 px-3 py-3">
            <dt className="font-mono text-[11px] font-medium uppercase tracking-wider text-ink-soft">
              Vial
            </dt>
            <dd className="mt-0.5 font-mono text-base font-semibold text-ink">
              {fmt(EXAMPLE.vialMg, 0)} mg
            </dd>
          </div>
          <div className="rounded-xl border border-line bg-paper/80 px-3 py-3">
            <dt className="font-mono text-[11px] font-medium uppercase tracking-wider text-ink-soft">
              Water
            </dt>
            <dd className="mt-0.5 font-mono text-base font-semibold text-ink">
              {fmt(EXAMPLE.diluentMl, 0)} mL
            </dd>
          </div>
          <div className="rounded-xl border border-line bg-paper/80 px-3 py-3 sm:col-span-1">
            <dt className="font-mono text-[11px] font-medium uppercase tracking-wider text-ink-soft">
              Amount
            </dt>
            <dd className="mt-0.5 font-mono text-base font-semibold text-ink">
              {fmt(EXAMPLE.doseValue, 0)} mcg
            </dd>
          </div>
        </dl>

        <div className="mt-3 rounded-xl border border-line bg-paper/80 px-4 py-3">
          <p className="font-mono text-[11px] font-medium uppercase tracking-wider text-ink-soft">
            U-100 syringe units
          </p>
          <p className="mt-0.5 font-mono text-lg font-semibold text-ink">
            {fmt(result.units, 1)} units
          </p>
          <p className="font-mono text-xs text-ink-soft">
            {fmt(result.volumeMl, 3)} mL ·{" "}
            {fmt(result.concentrationMgPerMl, 2)} mg/mL
          </p>
        </div>

        <div className="mt-4">
          <MathDisclosure steps={result.steps} />
        </div>
      </div>
    </section>
  );
}
