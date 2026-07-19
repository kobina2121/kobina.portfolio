import type { Project } from "@/lib/portfolio-content";
import { absoluteUrl } from "@/lib/site-url";

export function getWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": absoluteUrl("/#person"),
        name: "Kobina Boakye",
        url: absoluteUrl("/"),
        jobTitle: "Front-End Developer",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Accra",
          addressCountry: "GH",
        },
        sameAs: ["https://github.com/kobina2121"],
        knowsAbout: [
          "Front-end development",
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
        name: "Kobina Portfolio",
        url: absoluteUrl("/"),
        author: {
          "@id": absoluteUrl("/#person"),
        },
        inLanguage: "en",
      },
    ],
  };
}

export function getProjectJsonLd(project: Project) {
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
      name: "Kobina Boakye",
    },
    keywords: project.tags.join(", "),
    genre: project.category,
    about: project.problem,
    educationalUse: "Case study",
  };
}
