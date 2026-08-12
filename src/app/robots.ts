import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-url";

function allowsIndexing() {
  const url = new URL(siteUrl);

  if (url.hostname === "localhost" || url.hostname === "127.0.0.1") {
    return false;
  }

  if (process.env.VERCEL_ENV) {
    return process.env.VERCEL_ENV === "production";
  }

  return process.env.NODE_ENV === "production";
}

export default function robots(): MetadataRoute.Robots {
  const indexable = allowsIndexing();

  return {
    rules: indexable
      ? [
          {
            userAgent: "*",
            allow: "/",
            disallow: ["/admin", "/admin/", "/api/", "/design-system"],
          },
        ]
      : [
          {
            userAgent: "*",
            disallow: "/",
          },
        ],
    sitemap: indexable ? `${siteUrl}/sitemap.xml` : undefined,
    host: indexable ? siteUrl : undefined,
  };
}
