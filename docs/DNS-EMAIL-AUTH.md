# Email authentication (SPF / DKIM / DMARC) — DNS handoff

**Status as of 17 July 2026:** `proposed` (not deployed from this repository).

## Mail flow found in the codebase

| Item | Finding |
|---|---|
| Provider | None configured in-repo. No Resend/SendGrid/Postmark/SMTP SDK. |
| Contact UX | Public messages directed to X (`@pepexact`). |
| Waitlist fallback | `mailto:hello@pepexact.com?subject=PepExact%20iOS%20waitlist` in `AppCta` when `NEXT_PUBLIC_WAITLIST_URL` is unset. |
| From / envelope | Browser `mailto:` only — the visitor’s mail client sends the message. PepExact does not originate SMTP for that path. |
| Reply-To spoofing | Not applicable; no server-side mailer sets `From`. |

Live DNS (manual check, July 2026 audit): no root SPF, no MX, no `_dmarc`, one Google site-verification TXT.

## Recommendation (domain intentionally sends no email)

Until an email provider is chosen and MX is added, publish a deny-all SPF record so third parties cannot forge `@pepexact.com` SPF passes:

| Type | Host | Value | TTL | State |
|---|---|---|---|---|
| TXT | `@` | `v=spf1 -all` | 3600 | **proposed** |

Do **not** publish DMARC with a reporting address on this domain until that address can receive mail (currently no MX).

## If a provider later sends for pepexact.com

1. Use that provider’s verified-domain SPF includes (exactly one root `v=spf1` record).
2. Keep SPF ≤ 10 DNS lookups.
3. Publish provider-generated DKIM selectors only.
4. Start DMARC at `p=none` with a monitored reporting inbox that can receive mail; raise to quarantine/reject only after alignment checks pass.

## Ownership

DNS for pepexact.com is **not** managed as code in this repository. Apply records at the registrar / Cloudflare / Vercel DNS owner.

Do not mark SPF fixed until: record deployed → DNS propagated → real message headers (if any) verified.
