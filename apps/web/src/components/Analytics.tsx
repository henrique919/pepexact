import Script from "next/script";

/**
 * Google Analytics 4 (gtag.js) — PepExact property G-6B35Q3CXCT.
 * Mounted once in the root layout so every page loads a single tag.
 * Override with NEXT_PUBLIC_GA_MEASUREMENT_ID if needed; set that env to
 * an empty string to disable scripts entirely (local/privacy testing).
 */
const DEFAULT_GA_ID = "G-6B35Q3CXCT";

export default function Analytics() {
  const raw = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  if (raw !== undefined && raw.trim() === "") return null;
  const id = raw?.trim() || DEFAULT_GA_ID;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config',${JSON.stringify(id)});`}
      </Script>
    </>
  );
}
