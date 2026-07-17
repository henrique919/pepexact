"use client";

import { useCallback, useState } from "react";

/**
 * Copies the canonical URL + #fragment on click. Heading remains usable without JS.
 */
export default function CopyHeadingLink({
  fragment,
  label,
}: {
  fragment: string;
  label: string;
}) {
  const [copied, setCopied] = useState(false);

  const onCopy = useCallback(async () => {
    const url = `${window.location.origin}${window.location.pathname}#${fragment}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }, [fragment]);

  return (
    <button
      type="button"
      onClick={onCopy}
      className="ml-2 inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg text-ink-soft opacity-0 transition-opacity hover:bg-surface hover:text-accent-deep focus-visible:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink group-hover:opacity-100"
      aria-label={copied ? "Link copied" : `Copy link to ${label}`}
    >
      <span aria-hidden className="font-mono text-sm">
        {copied ? "✓" : "#"}
      </span>
    </button>
  );
}
