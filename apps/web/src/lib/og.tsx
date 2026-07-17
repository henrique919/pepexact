import { ImageResponse } from "next/og";

/** Brand tokens — keep in sync with globals.css @theme (Index system). */
export const OG_PAPER = "#f4f2ec";
export const OG_SURFACE = "#ffffff";
export const OG_INK = "#15181a";
export const OG_INK_SOFT = "#565349";
export const OG_STEEL = "#8a9299";
export const OG_SIGNAL = "#ff4d2e";
export const OG_SIGNAL_INK = "#e23a1e";
export const OG_LINE = "#e2ded3";

export const OG_SIZE = { width: 1200, height: 630 } as const;

/** The Index mark, drawn with primitives so satori renders it reliably. */
function Mark({ scale = 1 }: { scale?: number }) {
  const s = (n: number) => Math.round(n * scale);
  return (
    <div style={{ position: "relative", width: s(84), height: s(96), display: "flex" }}>
      <div style={{ position: "absolute", left: s(12), bottom: s(10), width: s(6), height: s(18), borderRadius: s(3), background: OG_STEEL, display: "flex" }} />
      <div style={{ position: "absolute", left: s(26), bottom: s(10), width: s(6), height: s(30), borderRadius: s(3), background: OG_STEEL, display: "flex" }} />
      <div style={{ position: "absolute", left: s(52), bottom: s(10), width: s(6), height: s(30), borderRadius: s(3), background: OG_STEEL, display: "flex" }} />
      <div style={{ position: "absolute", left: s(66), bottom: s(10), width: s(6), height: s(18), borderRadius: s(3), background: OG_STEEL, display: "flex" }} />
      <div style={{ position: "absolute", left: s(37), bottom: s(8), width: s(9), height: s(60), borderRadius: s(5), background: OG_SIGNAL, display: "flex" }} />
      <div style={{ position: "absolute", left: s(30), top: 0, width: 0, height: 0, borderLeft: `${s(11)}px solid transparent`, borderRight: `${s(11)}px solid transparent`, borderTop: `${s(18)}px solid ${OG_SIGNAL}`, display: "flex" }} />
    </div>
  );
}

/** Shared PepExact Open Graph image: paper field, Index mark + wordmark, title slot. */
export function ogImageResponse(title: string) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: OG_PAPER,
          padding: "60px 72px",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <Mark scale={0.85} />
          <div style={{ display: "flex", fontSize: 46, fontWeight: 800, letterSpacing: "-0.03em", color: OG_INK }}>
            Pep<span style={{ color: OG_INK }}>Exact</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ display: "flex", fontSize: 58, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.05, color: OG_INK, maxWidth: 980 }}>
            {title}
          </div>
          <div style={{ display: "flex", fontSize: 26, color: OG_INK_SOFT, maxWidth: 900 }}>
            Independent measurement utility · the math shown · no dosing advice
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 22, fontWeight: 500 }}>
          <span style={{ color: OG_SIGNAL_INK }}>pepexact.com</span>
          <span style={{ color: OG_INK_SOFT }}>@pepexact</span>
        </div>
      </div>
    ),
    { ...OG_SIZE },
  );
}
