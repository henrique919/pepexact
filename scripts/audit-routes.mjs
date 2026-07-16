#!/usr/bin/env node
/**
 * TASK-V2-010 — static sitemap + metadata audit.
 *
 * Asserts that apps/web/src/lib/routes.ts stays in lockstep with App Router
 * pages and that every indexable page declares a self-canonical. Run from
 * repo root: `npm run audit:routes`
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const webApp = path.join(root, "apps/web/src/app");
const routesFile = path.join(root, "apps/web/src/lib/routes.ts");
const compoundsFile = path.join(root, "apps/web/src/lib/compounds.ts");
const sitemapFile = path.join(root, "apps/web/src/app/sitemap.ts");

const errors = [];

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function extractQuoted(src, key) {
  const re = new RegExp(`${key}:\\s*"([^"]+)"`, "g");
  const out = [];
  let m;
  while ((m = re.exec(src))) out.push(m[1]);
  return out;
}

const routesSrc = read(routesFile);
const compoundsSrc = read(compoundsFile);

if (!read(sitemapFile).includes("routePaths")) {
  errors.push("sitemap.ts must import/use routePaths from @/lib/routes");
}

const staticPaths = [
  ...extractQuoted(routesSrc, "path").filter((p) => !p.includes("${")),
];
const compoundSlugs = extractQuoted(compoundsSrc, "slug");
const compoundPaths = compoundSlugs.map((s) => `/calculator/${s}`);

const allPaths = [...new Set([...staticPaths, ...compoundPaths])].sort();

function pageFileFor(routePath) {
  if (routePath === "/") return path.join(webApp, "page.tsx");
  if (routePath.startsWith("/calculator/")) {
    return path.join(webApp, "calculator", "[slug]", "page.tsx");
  }
  return path.join(webApp, ...routePath.slice(1).split("/"), "page.tsx");
}

for (const p of allPaths) {
  const file = pageFileFor(p);
  if (!fs.existsSync(file)) {
    errors.push(`missing page for ${p} (expected ${path.relative(root, file)})`);
    continue;
  }
  const src = read(file);
  if (p.startsWith("/calculator/")) {
    if (!src.includes("generateMetadata") || !src.includes("canonical")) {
      errors.push(`calculator/[slug] missing generateMetadata canonical`);
    }
  } else if (!/alternates:\s*\{\s*canonical:\s*"/.test(src)) {
    errors.push(`${p} missing alternates.canonical in ${path.relative(root, file)}`);
  }
}

// Every App Router page.tsx must map to a registry path (or the dynamic slug page).
function walkPages(dir, acc = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) walkPages(full, acc);
    else if (ent.name === "page.tsx") acc.push(full);
  }
  return acc;
}

for (const file of walkPages(webApp)) {
  const rel = path.relative(webApp, file).replace(/\\/g, "/");
  if (rel === "calculator/[slug]/page.tsx") {
    if (compoundSlugs.length < 1) errors.push("no compound slugs in compounds.ts");
    continue;
  }
  const routePath =
    rel === "page.tsx" ? "/" : `/${rel.replace(/\/page\.tsx$/, "")}`;
  if (!allPaths.includes(routePath)) {
    errors.push(`page ${rel} is not registered in routes.ts (${routePath})`);
  }
}

if (allPaths.length < 16) {
  errors.push(`expected ≥16 routes, found ${allPaths.length}`);
}

if (errors.length) {
  console.error("audit-routes FAILED:");
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}

console.log(`audit-routes OK — ${allPaths.length} routes, all pages have canonicals.`);
for (const p of allPaths) console.log(`  ${p}`);
