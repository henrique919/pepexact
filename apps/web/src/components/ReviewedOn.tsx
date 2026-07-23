import { GUIDE_REVIEWED_DISPLAY } from "@/lib/site";

/**
 * Small, factual "reviewed on" dateline for informational guide pages. It
 * renders the same date passed into the page's Article JSON-LD, so
 * structured-data dates always mirror a date the reader can see (Google's
 * visible-date guidance for Article content).
 *
 * No author/person entity is asserted — PepExact publishes at the organization
 * level by policy (see /editorial-policy); the Article schema's author is the
 * Organization node accordingly.
 */
export default function ReviewedOn({
  display = GUIDE_REVIEWED_DISPLAY,
}: {
  display?: string;
}) {
  return <p className="text-xs text-ink-soft">Reviewed {display}</p>;
}
