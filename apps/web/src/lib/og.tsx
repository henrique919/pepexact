import { ImageResponse } from "next/og";

/** Brand tokens — keep in sync with globals.css @theme */
export const OG_PAPER = "#f7f5f1";
export const OG_INK = "#1c2321";
export const OG_INK_SOFT = "#5d6a66";
export const OG_ACCENT = "#0e6e5c";
export const OG_ACCENT_DEEP = "#0a5748";
export const OG_LINE = "#e6e2d8";

export const OG_SIZE = { width: 1200, height: 630 } as const;

/**
 * Shared PepExact Open Graph image: paper field, teal wordmark, title slot.
 */
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
          padding: "64px 72px",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: OG_PAPER,
              border: `2px solid ${OG_LINE}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 36,
                height: 8,
                borderRadius: 4,
                background: OG_ACCENT,
                display: "flex",
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 44,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: OG_INK,
            }}
          >
            Pep
            <span style={{ color: OG_ACCENT }}>Exact</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              display: "flex",
              fontSize: 56,
              fontWeight: 650,
              letterSpacing: "-0.025em",
              lineHeight: 1.15,
              color: OG_INK,
              maxWidth: 980,
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 26,
              color: OG_INK_SOFT,
              maxWidth: 900,
            }}
          >
            Educational measurement utility · math shown · no dosing advice
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: OG_ACCENT_DEEP,
            fontSize: 22,
            fontWeight: 500,
          }}
        >
          <span>pepexact.com</span>
          <span style={{ color: OG_INK_SOFT }}>@pepexact</span>
        </div>
      </div>
    ),
    { ...OG_SIZE },
  );
}
