"use client";

import { useState } from "react";
import Link from "next/link";
import BrandLogo from "./BrandLogo";

const NAV = [
  { href: "/peptide-calculator", label: "Calculator" },
  { href: "/peptide-calculator#compounds", label: "Compounds" },
  { href: "/reconstitution-calculator", label: "Reconstitution" },
  { href: "/guides/mg-vs-mcg", label: "Guides" },
] as const;

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="no-print border-b border-line bg-surface">
      <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-4 px-5 py-4">
        <BrandLogo />

        <nav
          className="hidden items-center gap-6 text-sm text-ink-soft sm:flex"
          aria-label="Primary"
        >
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="min-h-11 inline-flex items-center hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-line text-ink sm:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span aria-hidden className="font-mono text-lg leading-none">
            {open ? "×" : "≡"}
          </span>
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          className="border-t border-line bg-surface px-5 py-3 sm:hidden"
          aria-label="Mobile"
        >
          <ul className="space-y-1">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex min-h-11 items-center text-sm text-ink-soft hover:text-ink"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
