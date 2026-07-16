export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://pepexact.com";

export const siteName = "PepExact";

export const siteHandle = "@pepexact";

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${siteUrl}${it.path}`,
    })),
  };
}

export function webAppJsonLd(opts: {
  name: string;
  path: string;
  description: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: opts.name,
    url: `${siteUrl}${opts.path}`,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    description: opts.description,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };
}

export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
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
    name: siteName,
    url: siteUrl,
  };
}

export function articleJsonLd(opts: {
  headline: string;
  path: string;
  description: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.headline,
    description: opts.description,
    url: `${siteUrl}${opts.path}`,
    author: { "@type": "Organization", name: siteName },
    publisher: { "@type": "Organization", name: siteName },
  };
}
