import type { SiteSettings } from "@/lib/content/schema";
import { getPhoneHref } from "@/lib/contact-details";
import { absoluteUrl } from "@/lib/site-url";

export function getWebsiteJsonLd(site: SiteSettings) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": absoluteUrl("/#person"),
        name: site.owner,
        url: absoluteUrl("/"),
        jobTitle: site.title,
        email: site.email,
        telephone: getPhoneHref(site.phone).replace("tel:", ""),
        address: {
          "@type": "PostalAddress",
          addressLocality: site.location,
        },
        sameAs: site.socialLinks
          .map((link) => link.href)
          .filter((href) => href.startsWith("http")),
        knowsAbout: [
          "Full-stack development",
          "React",
          "Next.js",
          "TypeScript",
          "Tailwind CSS",
          "UI design",
        ],
      },
      {
        "@type": "WebSite",
        "@id": absoluteUrl("/#website"),
        name: site.name,
        url: absoluteUrl("/"),
        author: {
          "@id": absoluteUrl("/#person"),
        },
        inLanguage: "en",
      },
    ],
  };
}
