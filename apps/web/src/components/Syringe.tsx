import { fmt } from "@pepexact/engine";

type Capacity = 30 | 50 | 100;

const TICKS: Record<Capacity, { minor: number; label: number }> = {
  30: { minor: 1, label: 5 },
  50: { minor: 1, label: 5 },
  100: { minor: 2, label: 10 },
};

/**
 * Rendered U-100 syringe with the plunger drawn back to `fillUnits`.
 * Pure SVG — safe to render on the server or inside client components.
 */
export default function Syringe({
  fillUnits,
  capacity = 100,
  caption,
}: {
  fillUnits: number;
  capacity?: Capacity;
  caption?: string;
}) {
  const clamped = Math.max(0, Math.min(fillUnits, capacity));
  const x0 = 92;
  const x1 = 560;
  const yTop = 40;
  const yBot = 102;
  const span = x1 - x0;
  const pos = (u: number) => x0 + (u / capacity) * span;
  const fx = pos(clamped);
  const { minor, label } = TICKS[capacity];

  const minors: number[] = [];
  for (let u = 0; u <= capacity; u += minor) minors.push(u);
  const labels: number[] = [];
  for (let u = 0; u <= capacity; u += label) labels.push(u);

  return (
    <svg
      viewBox="0 0 640 156"
      className="w-full"
      role="img"
      aria-label={`U-100 syringe drawn to ${fmt(clamped, 1)} units`}
    >
      {/* needle */}
      <line
        x1="14"
        y1="71"
        x2="76"
        y2="71"
        stroke="var(--color-ink-soft)"
        strokeWidth="2"
      />
      {/* hub */}
      <rect x="74" y="57" width="16" height="28" rx="4" fill="var(--color-line)" />
      {/* barrel */}
      <rect
        x={x0 - 2}
        y={yTop - 6}
        width={span + 4}
        height={yBot - yTop + 12}
        rx="10"
        fill="var(--color-surface)"
        stroke="var(--color-line)"
        strokeWidth="1.5"
      />
      {/* liquid */}
      {clamped > 0 && (
        <rect
          x={x0}
          y={yTop}
          width={Math.max(fx - x0, 2)}
          height={yBot - yTop}
          rx="4"
          fill="var(--color-accent)"
          opacity="0.16"
        />
      )}
      {/* plunger seal, rod, thumb pad */}
      <rect
        x={fx}
        y={yTop - 2}
        width="7"
        height={yBot - yTop + 4}
        rx="2"
        fill="var(--color-ink-soft)"
      />
      <line
        x1={fx + 7}
        y1="71"
        x2="606"
        y2="71"
        stroke="var(--color-line)"
        strokeWidth="6"
      />
      <rect x="604" y="49" width="10" height="44" rx="3" fill="var(--color-line)" />
      {/* tick marks */}
      {minors.map((u) => (
        <line
          key={`m${u}`}
          x1={pos(u)}
          y1={yTop - 6}
          x2={pos(u)}
          y2={yTop - 6 + (u % label === 0 ? 16 : 9)}
          stroke="var(--color-ink-soft)"
          strokeWidth="1"
          opacity="0.65"
        />
      ))}
      {labels.map((u) => (
        <text
          key={`l${u}`}
          x={pos(u)}
          y={yBot + 26}
          textAnchor="middle"
          fontSize="12"
          fill="var(--color-ink-soft)"
        >
          {u}
        </text>
      ))}
      {/* fill marker */}
      {clamped > 0 && (
        <>
          <line
            x1={fx}
            y1={yTop - 14}
            x2={fx}
            y2={yBot + 8}
            stroke="var(--color-accent)"
            strokeWidth="2.5"
          />
          <text
            x={fx}
            y={yTop - 20}
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--color-accent)"
          >
            {fmt(clamped, 1)} u
          </text>
        </>
      )}
      {caption && (
        <text
          x={(x0 + x1) / 2}
          y="152"
          textAnchor="middle"
          fontSize="12"
          fill="var(--color-ink-soft)"
        >
          {caption}
        </text>
      )}
    </svg>
  );
}
