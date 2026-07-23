export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://pepexact.com";

export const siteName = "PepExact";

export const siteHandle = "@pepexact";

/**
 * Review dates for the informational guide / regulatory pages. These are the
 * real launch ship date (single launch commit, 2026-07-17). Bump
 * `GUIDE_MODIFIED_ISO` (and the display string) only when a page's indexable
 * copy actually changes, so the Article `dateModified` stays honest. The same
 * value is rendered visibly on the page (see ReviewedOn) so structured-data
 * dates always mirror a date the reader can see.
 */
export const GUIDE_PUBLISHED_ISO = "2026-07-17";
export const GUIDE_MODIFIED_ISO = "2026-07-17";
export const GUIDE_REVIEWED_DISPLAY = "17 July 2026";

const ORG_ID = `${siteUrl}/#organization`;
const WEBSITE_ID = `${siteUrl}/#website`;

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${siteUrl}${it.path === "/" ? "" : it.path}`,
    })),
  };
}

export function webAppJsonLd(opts: {
  name: string;
  path: string;
  description: string;
}) {
  const url = `${siteUrl}${opts.path === "/" ? "" : opts.path}`;
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": `${url || siteUrl}#webapplication`,
    name: opts.name,
    url: url || siteUrl,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    description: opts.description,
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    publisher: { "@id": ORG_ID },
  };
}

export function webPageJsonLd(opts: {
  name: string;
  path: string;
  description: string;
}) {
  const url = opts.path === "/" ? siteUrl : `${siteUrl}${opts.path}`;
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    name: opts.name,
    description: opts.description,
    url,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
  };
}

export function faqJsonLd(faqs: { q: string; a: string }[], path?: string) {
  const node: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  if (path) {
    node["@id"] = `${siteUrl}${path}#faq`;
    node.url = `${siteUrl}${path}`;
  }
  return node;
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: siteName,
    url: siteUrl,
    logo: `${siteUrl}/icon.svg`,
    sameAs: [`https://x.com/${siteHandle.replace(/^@/, "")}`],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: siteName,
    url: siteUrl,
    publisher: { "@id": ORG_ID },
  };
}

export function articleJsonLd(opts: {
  headline: string;
  path: string;
  description: string;
  datePublished?: string;
  dateModified?: string;
}) {
  const url = `${siteUrl}${opts.path}`;
  const node: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: opts.headline,
    description: opts.description,
    url,
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${url}#webpage` },
  };
  if (opts.datePublished) node.datePublished = opts.datePublished;
  if (opts.dateModified) node.dateModified = opts.dateModified;
  return node;
}
