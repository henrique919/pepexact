"use client";

import { useState } from "react";
import { mlToUnits, unitsToMl, roundTo } from "@pepexact/engine";
import Syringe from "./Syringe";
import { Card, Field } from "./ui";

function clean(n: number): string {
  return String(roundTo(n, 4));
}

export default function UnitsCalculator() {
  const [units, setUnits] = useState("25");
  const [ml, setMl] = useState("0.25");

  function onUnits(v: string) {
    setUnits(v);
    const n = Number(v);
    setMl(v.trim() !== "" && Number.isFinite(n) ? clean(unitsToMl(n)) : "");
  }

  function onMl(v: string) {
    setMl(v);
    const n = Number(v);
    setUnits(v.trim() !== "" && Number.isFinite(n) ? clean(mlToUnits(n)) : "");
  }

  const fill = Number(units);

  return (
    <div className="space-y-5">
      <Card>
        <div className="grid items-end gap-4 sm:grid-cols-[1fr_auto_1fr]">
          <Field
            label="Syringe units (U-100)"
            value={units}
            onChange={onUnits}
            suffix="units"
          />
          <span
            aria-hidden="true"
            className="hidden pb-3 text-xl text-ink-soft sm:block"
          >
            =
          </span>
          <Field label="Millilitres" value={ml} onChange={onMl} suffix="mL" />
        </div>
        <p className="mt-4 text-sm text-ink-soft">
          On any U-100 insulin syringe, 100 units = 1 mL — so 1 unit = 0.01 mL,
          regardless of the syringe&apos;s size.
        </p>
      </Card>

      {Number.isFinite(fill) && fill > 0 && fill <= 100 && (
        <Card>
          <Syringe
            fillUnits={fill}
            capacity={100}
            caption="Shown on a 1.0 mL (100-unit) U-100 syringe"
          />
        </Card>
      )}
    </div>
  );
}
