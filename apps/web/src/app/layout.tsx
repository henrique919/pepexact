import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { siteHandle, siteName, siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} — the independent peptide calculator`,
    template: `%s · ${siteName}`,
  },
  description:
    "Free peptide calculator: vial, water, dose in — exact syringe units out, with the math shown. An independent measurement tool. No sales, no advice.",
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-paper font-sans text-ink antialiased">
        <SiteHeader />
        <main className="mx-auto w-full max-w-3xl flex-1 px-5 pb-24 pt-10">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
