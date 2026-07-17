import Link from "next/link";

/**
 * PepExact wordmark: graphite type + small Index signal tick (not a full-colour
 * "Exact"). Master SVG from /public/brand.
 */
export default function BrandLogo({
  href = "/",
  className = "",
}: {
  href?: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper ${className}`}
      aria-label="PepExact home"
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- SVG wordmark from brand masters */}
      <img
        src="/brand/pepexact-logo.svg"
        alt="PepExact"
        width={148}
        height={41}
        className="h-8 w-auto sm:h-9"
        decoding="async"
      />
    </Link>
  );
}
