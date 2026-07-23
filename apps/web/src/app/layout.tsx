import type { Metadata, Viewport } from "next";
import { Archivo, Spline_Sans_Mono } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import {
  GoogleTagManagerBody,
  GoogleTagManagerHead,
} from "@/components/GoogleTagManager";
import { siteHandle, siteName, siteUrl } from "@/lib/site";

// Self-hosted at build time by next/font — no external request, no CLS.
// Weights limited to those used above the fold / body (400/500/600) to cut
// preload bytes. Mono only needs regular + medium for labels.
const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-archivo",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

const splineMono = Spline_Sans_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-spline-mono",
  display: "swap",
  preload: false,
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} — the independent peptide calculator`,
    template: `%s · ${siteName}`,
  },
  description:
    "Free peptide calculator: vial, water, dose in — exact syringe units out, with the math shown. An independent measurement tool. No sales, no advice.",
  manifest: "/site.webmanifest",
  openGraph: {
    siteName,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: siteHandle,
    creator: siteHandle,
  },
  icons: {
    // Google Search prefers a stable square PNG ≥48×48 (SVG alone often shows as a globe).
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-icon", sizes: "180x180", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#15181a",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${archivo.variable} ${splineMono.variable}`}>
      <GoogleTagManagerHead />
      <body className="flex min-h-screen flex-col bg-paper font-sans text-ink antialiased">
        <GoogleTagManagerBody />
        <SiteHeader />
        <main className="mx-auto w-full max-w-3xl flex-1 px-5 pb-24 pt-10">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
