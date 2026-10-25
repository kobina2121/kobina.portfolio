import type { MetadataRoute } from "next";
import { getAllProjects } from "@/lib/portfolio-content";
import { absoluteUrl } from "@/lib/site-url";

const staticRoutes = ["/", "/about", "/projects", "/skills"] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const projectRoutes = (await getAllProjects()).map((project) => ({
    url: absoluteUrl(`/projects/${project.slug}`),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    ...staticRoutes.map((route) => ({
      url: absoluteUrl(route),
      lastModified: now,
      changeFrequency:
        route === "/" ? ("weekly" as const) : ("monthly" as const),
      priority: route === "/" ? 1 : 0.9,
    })),
    ...projectRoutes,
  ];
}
