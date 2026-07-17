import { calculateDraw, fmt } from "@pepexact/engine";
import { Card, ShowMath, Stat } from "./ui";

/** Canonical illustrative inputs — same defaults as PeptideCalculator. */
const EXAMPLE = {
  vialMg: 5,
  diluentMl: 2,
  doseValue: 250,
  doseUnit: "mcg" as const,
};

/**
 * Static, server-rendered calculator preview for the homepage hero.
 * Uses the real engine so the shown units match the live calculator.
 * Illustrative only — not interactive, not a dosing recommendation.
 */
export default function HeroCalculatorPreview() {
  const result = calculateDraw(EXAMPLE);
  if (!result.ok) {
    throw new Error("Hero preview example failed engine validation");
  }

  return (
    <aside
      className="w-full"
      aria-label="Illustrative calculator preview"
    >
      <Card className="space-y-4">
        <p className="font-mono text-xs font-medium uppercase tracking-wider text-ink-soft">
          Illustrative example — not a recommended amount
        </p>
        <dl className="grid grid-cols-3 gap-2 text-center sm:text-left">
          <div className="rounded-xl border border-line bg-paper/80 px-2 py-3 sm:px-3">
            <dt className="font-mono text-[11px] font-medium uppercase tracking-wider text-ink-soft">
              Vial
            </dt>
            <dd className="mt-0.5 font-mono text-sm font-semibold text-ink sm:text-base">
              {fmt(EXAMPLE.vialMg, 0)} mg
            </dd>
          </div>
          <div className="rounded-xl border border-line bg-paper/80 px-2 py-3 sm:px-3">
            <dt className="font-mono text-[11px] font-medium uppercase tracking-wider text-ink-soft">
              Water
            </dt>
            <dd className="mt-0.5 font-mono text-sm font-semibold text-ink sm:text-base">
              {fmt(EXAMPLE.diluentMl, 0)} mL
            </dd>
          </div>
          <div className="rounded-xl border border-line bg-paper/80 px-2 py-3 sm:px-3">
            <dt className="font-mono text-[11px] font-medium uppercase tracking-wider text-ink-soft">
              Amount
            </dt>
            <dd className="mt-0.5 font-mono text-sm font-semibold text-ink sm:text-base">
              {fmt(EXAMPLE.doseValue, 0)} mcg
            </dd>
          </div>
        </dl>
        <p className="text-xs text-ink-soft">
          User-supplied example inputs. Same arithmetic as the peptide
          calculator.
        </p>
        <Stat
          label="U-100 syringe units"
          value={`${fmt(result.units, 1)} units`}
          sub={`${fmt(result.volumeMl, 3)} mL · ${fmt(result.concentrationMgPerMl, 2)} mg/mL`}
        />
        <ShowMath steps={result.steps} />
      </Card>
    </aside>
  );
}
