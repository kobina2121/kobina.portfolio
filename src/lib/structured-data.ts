import type { Project, SiteSettings } from "@/lib/content/schema";
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

export function getProjectJsonLd(project: Project, site: SiteSettings) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": absoluteUrl(`/projects/${project.slug}#project`),
    name: project.title,
    url: absoluteUrl(`/projects/${project.slug}`),
    description: project.description,
    datePublished: `${project.year}-01-01`,
    creator: {
      "@id": absoluteUrl("/#person"),
      name: site.owner,
    },
    keywords: project.tags.join(", "),
    genre: project.category,
    about: project.problem,
    educationalUse: "Case study",
  };
}
