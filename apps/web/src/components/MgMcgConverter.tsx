"use client";

import { useState } from "react";
import { mgToMcg, mcgToMg, roundTo } from "@pepexact/engine";
import { Card, Field } from "./ui";

function clean(n: number): string {
  return String(roundTo(n, 6));
}

export default function MgMcgConverter() {
  const [mg, setMg] = useState("1");
  const [mcg, setMcg] = useState("1000");

  function onMg(v: string) {
    setMg(v);
    const n = Number(v);
    setMcg(v.trim() !== "" && Number.isFinite(n) ? clean(mgToMcg(n)) : "");
  }

  function onMcg(v: string) {
    setMcg(v);
    const n = Number(v);
    setMg(v.trim() !== "" && Number.isFinite(n) ? clean(mcgToMg(n)) : "");
  }

  return (
    <Card>
      <div className="grid items-end gap-4 sm:grid-cols-[1fr_auto_1fr]">
        <Field label="Milligrams" value={mg} onChange={onMg} suffix="mg" />
        <span
          aria-hidden="true"
          className="hidden pb-3 text-xl text-ink-soft sm:block"
        >
          =
        </span>
        <Field label="Micrograms" value={mcg} onChange={onMcg} suffix="mcg" />
      </div>
      <p className="mt-4 text-sm text-ink-soft">
        1 mg = 1,000 mcg. Type in either box — the other updates.
      </p>
    </Card>
  );
}
