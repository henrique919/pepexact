const WAITLIST_FALLBACK =
  "mailto:hello@pepexact.com?subject=PepExact%20iOS%20waitlist";

const waitlistUrl =
  process.env.NEXT_PUBLIC_WAITLIST_URL?.trim() || WAITLIST_FALLBACK;

const isHttpWaitlist = /^https?:\/\//i.test(waitlistUrl);

export default function AppCta() {
  return (
    <div className="flex flex-col items-start gap-3 rounded-2xl border border-accent/20 bg-accent-soft/50 p-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="font-medium">Keep this vial on your phone</p>
        <p className="mt-0.5 text-sm text-ink-soft">
          PepExact for iPhone saves your vial, renders the syringe, and counts
          doses left — even offline.
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
        Coming soon — get notified
      </a>
    </div>
  );
}
