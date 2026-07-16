"use client";

import { usePathname } from "next/navigation";

const WAITLIST_FALLBACK =
  "mailto:hello@pepexact.com?subject=PepExact%20iOS%20waitlist";

const waitlistBase =
  process.env.NEXT_PUBLIC_WAITLIST_URL?.trim() || WAITLIST_FALLBACK;

function withWaitlistUtm(base: string, route: string): string {
  if (!/^https?:\/\//i.test(base)) return base;
  const url = new URL(base);
  url.searchParams.set("utm_source", "pepexact");
  url.searchParams.set("utm_medium", "web");
  url.searchParams.set("utm_campaign", "waitlist");
  url.searchParams.set(
    "utm_content",
    route.replace(/^\//, "") || "home",
  );
  return url.toString();
}

export default function AppCta() {
  const pathname = usePathname() || "/";
  const waitlistUrl = withWaitlistUtm(waitlistBase, pathname);
  const isHttpWaitlist = /^https?:\/\//i.test(waitlistUrl);

  return (
    <div className="flex min-h-[7.75rem] flex-col items-start gap-3 rounded-2xl border border-accent/20 bg-accent-soft/50 p-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="font-medium">Continue on your phone</p>
        <p className="mt-0.5 text-sm text-ink-soft">
          PepExact for iPhone keeps the same vial numbers, draws the syringe
          marks, and works offline — the same measurement math as here.
        </p>
      </div>
      <a
        href={waitlistUrl}
        data-cta="web-to-app"
        {...(isHttpWaitlist
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        className="shrink-0 rounded-xl bg-accent px-4 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
      >
        Join waitlist
      </a>
    </div>
  );
}
