import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site-url";

const staticRoutes = ["/", "/about", "/projects", "/stack"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    ...staticRoutes.map((route) => ({
      url: absoluteUrl(route),
      lastModified: now,
      changeFrequency:
        route === "/" ? ("weekly" as const) : ("monthly" as const),
      priority: route === "/" ? 1 : 0.9,
    })),
  ];
}
