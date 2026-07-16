import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";
import { routePaths } from "@/lib/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  return routePaths.map((path) => ({
    url: `${siteUrl}${path === "/" ? "" : path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "/peptide-calculator" ? 1 : 0.7,
  }));
}
