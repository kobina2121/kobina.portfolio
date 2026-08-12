import { z } from "zod";
import { contactEmail, contactPhoneDisplay } from "@/lib/contact-details";

const routeHrefSchema = z.string().refine(
  (href) => {
    if (
      href.startsWith("/") ||
      href.startsWith("#") ||
      href.startsWith("mailto:")
    ) {
      return true;
    }

    return z.url().safeParse(href).success;
  },
  {
    message: "Links must be relative, anchor, mailto, or absolute URLs.",
  },
);

const nonEmptyString = z.string().trim().min(1);
const yearSchema = z.string().regex(/^\d{4}$/, "Expected a four-digit year.");
const periodSchema = z
  .string()
  .regex(
    /^(\d{4}|Ongoing)( — (\d{4}|Present))?$/,
    "Expected a year, Ongoing, or a year range.",
  );

const siteNavKeySchema = z.enum(["home", "about", "projects", "skills"]);
const skillIconSchema = z.enum([
  "html",
  "css",
  "javascript",
  "react",
  "node",
  "figma",
  "git",
  "mysql",
  "firebase",
  "java",
]);

const imageAssetSchema = z.object({
  key: nonEmptyString,
  src: z.string().startsWith("/images/"),
  alt: nonEmptyString,
  purpose: z.enum(["portrait", "illustration", "brand"]),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
});

const siteConfigSchema = z.object({
  name: nonEmptyString,
  owner: nonEmptyString,
  title: nonEmptyString,
  email: z.email(),
  phone: nonEmptyString,
  location: nonEmptyString,
  availability: nonEmptyString,
  primaryCta: z.object({
    label: nonEmptyString,
    href: routeHrefSchema,
  }),
  secondaryCta: z.object({
    label: nonEmptyString,
    href: routeHrefSchema,
  }),
  socialLinks: z.array(
    z.object({
      label: nonEmptyString,
      href: routeHrefSchema,
    }),
  ),
  images: z.array(imageAssetSchema),
});

const navigationItemSchema = z.object({
  key: siteNavKeySchema,
  label: nonEmptyString,
  href: routeHrefSchema,
});

const projectMediaSchema = z.object({
  title: nonEmptyString,
  caption: nonEmptyString,
  accent: nonEmptyString,
});

const projectLinkSchema = z
  .object({
    label: nonEmptyString,
    href: routeHrefSchema.nullable(),
    unavailableReason: nonEmptyString.optional(),
  })
  .refine((link) => link.href || link.unavailableReason, {
    message: "Unavailable project links need a reason.",
  });

const projectSchema = z.object({
  title: nonEmptyString,
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  stack: z.array(nonEmptyString).min(1),
  tags: z.array(nonEmptyString).min(1),
  category: nonEmptyString,
  description: nonEmptyString,
  accent: nonEmptyString,
  type: nonEmptyString,
  year: yearSchema,
  outcome: nonEmptyString,
  context: nonEmptyString,
  role: nonEmptyString,
  problem: nonEmptyString,
  constraints: z.array(nonEmptyString).min(1),
  process: z.array(nonEmptyString).min(1),
  solution: nonEmptyString,
  impact: z.array(nonEmptyString).min(1),
  lessons: z.array(nonEmptyString).min(1),
  gallery: z.array(projectMediaSchema).min(1),
  live: projectLinkSchema,
  source: projectLinkSchema,
  confidentiality: nonEmptyString.optional(),
});

const skillSchema = z.object({
  label: nonEmptyString,
  icon: skillIconSchema,
  color: nonEmptyString,
  category: nonEmptyString,
  description: nonEmptyString,
});

const serviceSchema = z.object({
  title: nonEmptyString,
  description: nonEmptyString,
  deliverables: z.array(nonEmptyString).min(1),
});

const experienceSchema = z.object({
  role: nonEmptyString,
  company: nonEmptyString,
  period: periodSchema,
  location: nonEmptyString,
  highlights: z.array(nonEmptyString).min(1),
});

const educationSchema = z.object({
  institution: nonEmptyString,
  qualification: nonEmptyString,
  period: periodSchema,
  detail: nonEmptyString,
});

const certificationSchema = z.object({
  name: nonEmptyString,
  provider: nonEmptyString,
  status: nonEmptyString,
});

const testimonialSchema = z.object({
  quote: nonEmptyString,
  name: nonEmptyString,
  role: nonEmptyString,
});

const portfolioContentSchema = z
  .object({
    site: siteConfigSchema,
    navigation: z.array(navigationItemSchema).min(1),
    projects: z.array(projectSchema).min(1),
    skills: z.array(skillSchema).min(1),
    aboutHighlights: z.array(nonEmptyString).min(1),
    services: z.array(serviceSchema).min(1),
    experience: z.array(experienceSchema).min(1),
    education: z.array(educationSchema).min(1),
    certifications: z.array(certificationSchema).min(1),
    testimonials: z.array(testimonialSchema).min(1),
    contentStrategy: z.object({
      caseStudiesUseMdx: z.boolean(),
      blogEnabled: z.boolean(),
      adapter: z.enum(["typed-local", "sanity-ready"]),
    }),
  })
  .superRefine((content, context) => {
    const projectSlugs = new Set<string>();

    content.projects.forEach((project, index) => {
      if (projectSlugs.has(project.slug)) {
        context.addIssue({
          code: "custom",
          path: ["projects", index, "slug"],
          message: `Duplicate project slug: ${project.slug}`,
        });
      }

      projectSlugs.add(project.slug);
    });

    const navKeys = new Set<string>();

    content.navigation.forEach((item, index) => {
      if (navKeys.has(item.key)) {
        context.addIssue({
          code: "custom",
          path: ["navigation", index, "key"],
          message: `Duplicate navigation key: ${item.key}`,
        });
      }

      navKeys.add(item.key);
    });
  });

export type SiteNavKey = z.infer<typeof siteNavKeySchema>;
export type ProjectMedia = z.infer<typeof projectMediaSchema>;
export type ProjectLink = z.infer<typeof projectLinkSchema>;
export type Project = z.infer<typeof projectSchema>;
export type Skill = z.infer<typeof skillSchema>;
export type SkillIcon = z.infer<typeof skillIconSchema>;
export type ImageAsset = z.infer<typeof imageAssetSchema>;

const rawSiteConfig = {
  name: "Kobina Portfolio",
  owner: "Kobina Boakye",
  title: "Full Stack Developer",
  email: contactEmail,
  phone: contactPhoneDisplay,
  location: "Accra, Ghana",
  availability: "Available for selected builds",
  primaryCta: {
    label: "View projects",
    href: "#projects",
  },
  secondaryCta: {
    label: "Contact me",
    href: "#contact-me",
  },
  socialLinks: [
    { label: "GitHub", href: "https://github.com/kobina2121" },
    { label: "LinkedIn", href: "#contact-me" },
    { label: "Email", href: `mailto:${contactEmail}` },
  ],
  images: [
    {
      key: "formal-portrait",
      src: "/images/kobina-formal-portrait-background-removed.png",
      alt: "Portrait of Kobina Boakye",
      purpose: "portrait",
      width: 1024,
      height: 1024,
    },
    {
      key: "developer-character",
      src: "/images/developer-character.png",
      alt: "Developer avatar with laptop",
      purpose: "illustration",
      width: 420,
      height: 614,
    },
    {
      key: "looprompt-logo",
      src: "/images/looprompt-logo.png",
      alt: "Looprompt logo",
      purpose: "brand",
      width: 32,
      height: 32,
    },
  ],
} as const;

const rawSiteNavItems = [
  { key: "home", label: "home", href: "/" },
  { key: "about", label: "about", href: "/about" },
  { key: "projects", label: "projects", href: "/projects" },
  { key: "skills", label: "skills", href: "/skills" },
] as const;

const rawProjects = [
  {
    title: "1111Afolio",
    slug: "1111afolio",
    stack: ["HTML", "CSS", "JavaScript"],
    tags: ["Portfolio", "Personal brand", "High contrast"],
    category: "Portfolio",
    description:
      "A cyberpunk portfolio exploring motion, contrast, and tiny UI.",
    accent: "from-[#dcecff] via-[#b9d6ff] to-[#fff6e9]",
    type: "Portfolio Experience",
    year: "2026",
    outcome: "Built a sharp personal brand interface with high-contrast cards.",
    context:
      "A concept portfolio created to explore a more memorable visual direction for personal developer websites.",
    role: "Handled the interface direction, responsive layout, component structure, and visual polish.",
    problem:
      "Most starter portfolios feel interchangeable. The challenge was to create a simple portfolio experience that still had a distinct mood and fast first impression.",
    constraints: [
      "Keep the interface lightweight enough to load quickly.",
      "Use strong visuals without overwhelming the project content.",
      "Make the layout work from small mobile screens to desktop.",
    ],
    process: [
      "Defined a compact content structure for hero, projects, skills, and contact.",
      "Explored contrast-heavy cards and small interface details to create a cyberpunk tone.",
      "Refined spacing and typography so the design stayed readable despite the visual direction.",
    ],
    solution:
      "A high-contrast landing page with sharp project cards, compact copy blocks, and a focused path from introduction to contact.",
    impact: [
      "Created a stronger brand mood than a generic developer template.",
      "Established reusable section patterns for future portfolio iterations.",
      "Kept the page easy to scan while still feeling expressive.",
    ],
    lessons: [
      "A bold interface needs disciplined spacing to remain professional.",
      "Visual personality works best when the content hierarchy stays simple.",
    ],
    gallery: [
      {
        title: "Hero direction",
        caption:
          "A compact first screen pairing expressive typography with a focused introduction.",
        accent: "from-[#dcecff] via-[#b9d6ff] to-[#fff6e9]",
      },
      {
        title: "Project cards",
        caption:
          "Small cards use contrast and clear labels to make each case easy to scan.",
        accent: "from-[#151515] via-[#2d1745] to-[#090909]",
      },
      {
        title: "Contact path",
        caption:
          "The page keeps contact options close to the story instead of hiding them.",
        accent: "from-[#2b1055] via-[#7597de] to-[#d76bff]",
      },
    ],
    live: {
      label: "Live concept",
      href: null,
      unavailableReason: "Live demo will be attached after deployment.",
    },
    source: {
      label: "Source code",
      href: null,
      unavailableReason:
        "Source is private while the concept is being refined.",
    },
    confidentiality:
      "Concept project; no private client data or proprietary assets are included.",
  },
  {
    title: "ProjectX",
    slug: "projectx",
    stack: ["React", "API Design", "UI Systems"],
    tags: ["SaaS", "Cloud storage", "Dashboard"],
    category: "SaaS",
    description:
      "Online cloud storage interface with lightweight sharing flows.",
    accent: "from-[#151515] via-[#1d1d1d] to-[#090909]",
    type: "SaaS Interface",
    year: "2026",
    outcome: "Designed a clean product dashboard for file sharing workflows.",
    context:
      "A product interface concept for teams that need a clearer way to organize, preview, and share files.",
    role: "Designed the dashboard information architecture and translated it into reusable frontend UI patterns.",
    problem:
      "File dashboards can become visually noisy very quickly. The goal was to make common actions visible without turning the interface into clutter.",
    constraints: [
      "Balance quick actions with calm visual hierarchy.",
      "Support future states such as empty folders, previews, and sharing permissions.",
      "Keep the interface modular enough for additional dashboard panels.",
    ],
    process: [
      "Mapped the core file-sharing actions and reduced the dashboard to the most frequent tasks.",
      "Built card, list, and action patterns that could scale across multiple file states.",
      "Used muted surfaces and stronger primary actions to guide attention.",
    ],
    solution:
      "A dark SaaS dashboard concept with clear file groups, strong primary actions, and a calm visual system for sharing workflows.",
    impact: [
      "Improved task clarity by grouping related file actions together.",
      "Created a design direction that can scale into settings, teams, and preview pages.",
      "Reduced visual noise through consistent spacing and surface contrast.",
    ],
    lessons: [
      "Dashboards need restraint more than decoration.",
      "A reusable layout system makes product screens much easier to extend.",
    ],
    gallery: [
      {
        title: "Dashboard shell",
        caption:
          "A calm interface shell gives file actions and storage information clear places to live.",
        accent: "from-[#050505] via-[#151515] to-[#343434]",
      },
      {
        title: "Sharing flow",
        caption:
          "Primary actions are grouped so sharing feels discoverable without being loud.",
        accent: "from-[#1f2937] via-[#111827] to-[#030712]",
      },
      {
        title: "State system",
        caption:
          "Cards and panels are prepared for empty, loading, and unavailable states.",
        accent: "from-[#171717] via-[#27272a] to-[#52525b]",
      },
    ],
    live: {
      label: "Live preview",
      href: null,
      unavailableReason: "Preview is not public yet.",
    },
    source: {
      label: "Repository",
      href: null,
      unavailableReason: "Repository is private for now.",
    },
    confidentiality:
      "Product concept only; all data shown is illustrative and non-sensitive.",
  },
  {
    title: "CrypTrack",
    slug: "cryptrack",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    tags: ["Analytics", "Crypto", "Search"],
    category: "Analytics",
    description: "Crypto market dashboard with search, watchlists, and charts.",
    accent: "from-[#111827] via-[#020617] to-[#050505]",
    type: "Analytics Dashboard",
    year: "2026",
    outcome: "Created a market-focused UI for tracking assets quickly.",
    context:
      "A crypto tracking interface concept focused on faster asset scanning and clearer market snapshots.",
    role: "Planned the product layout, dashboard cards, responsive behavior, and visual hierarchy.",
    problem:
      "Crypto interfaces often overload users with charts, metrics, and motion. CrypTrack needed to make important market information feel organized and quick to compare.",
    constraints: [
      "Keep metric cards readable on mobile.",
      "Design for changing market states without relying on clutter.",
      "Make search, watchlist, and chart areas feel connected.",
    ],
    process: [
      "Grouped market information into scan-friendly dashboard regions.",
      "Defined visual states for gain/loss indicators and tracked assets.",
      "Created a dark analytical UI with strong contrast for data-heavy areas.",
    ],
    solution:
      "A responsive analytics dashboard with watchlist cards, search-first navigation, and a dark interface optimized for quick comparisons.",
    impact: [
      "Made market scanning feel less visually overwhelming.",
      "Created reusable dashboard sections for charts, lists, and watchlists.",
      "Improved small-screen readability through tighter information grouping.",
    ],
    lessons: [
      "Data-heavy products need hierarchy before they need more charts.",
      "A restrained color system keeps analytics interfaces easier to trust.",
    ],
    gallery: [
      {
        title: "Market overview",
        caption:
          "A focused dashboard area groups the highest-value market information first.",
        accent: "from-[#111827] via-[#020617] to-[#050505]",
      },
      {
        title: "Asset watchlist",
        caption:
          "Tracked assets are presented as cards designed for fast comparison.",
        accent: "from-[#064e3b] via-[#022c22] to-[#020617]",
      },
      {
        title: "Chart region",
        caption:
          "The analytical surface keeps contrast high and decorative noise low.",
        accent: "from-[#1e1b4b] via-[#312e81] to-[#020617]",
      },
    ],
    live: {
      label: "Live dashboard",
      href: null,
      unavailableReason:
        "Live dashboard will be attached after public release.",
    },
    source: {
      label: "Source code",
      href: null,
      unavailableReason:
        "Source is unavailable while the dashboard is in concept stage.",
    },
    confidentiality:
      "Concept dashboard using illustrative market data; no financial advice or real user data.",
  },
];

const rawSkillItems = [
  {
    label: "html",
    icon: "html",
    color: "text-orange-500",
    category: "Frontend",
    description:
      "Semantic structure, accessibility, and polished page layouts.",
  },
  {
    label: "css",
    icon: "css",
    color: "text-blue-500",
    category: "Frontend",
    description: "Responsive styling, animation, and design-system thinking.",
  },
  {
    label: "javascript",
    icon: "javascript",
    color: "text-yellow-300",
    category: "Language",
    description: "Interactive UI logic, browser APIs, and product behavior.",
  },
  {
    label: "react.js",
    icon: "react",
    color: "text-cyan-400",
    category: "Frontend",
    description: "Component-driven interfaces with reusable UI patterns.",
  },
  {
    label: "node.js",
    icon: "node",
    color: "text-lime-400",
    category: "Backend",
    description: "Server-side JavaScript, APIs, and app foundations.",
  },
  {
    label: "figma",
    icon: "figma",
    color: "text-pink-400",
    category: "Design",
    description: "Wireframes, visual direction, and interface exploration.",
  },
  {
    label: "git",
    icon: "git",
    color: "text-red-500",
    category: "Workflow",
    description: "Version control, collaboration, and clean delivery habits.",
  },
  {
    label: "mysql",
    icon: "mysql",
    color: "text-sky-500",
    category: "Database",
    description: "Relational data modeling for reliable application storage.",
  },
  {
    label: "firebase",
    icon: "firebase",
    color: "text-amber-400",
    category: "Backend",
    description: "Authentication, real-time data, and rapid product builds.",
  },
  {
    label: "java",
    icon: "java",
    color: "text-red-400",
    category: "Language",
    description: "Object-oriented programming and structured app logic.",
  },
] as const;

const rawAboutHighlights = [
  "Full stack developer focused on clean, accessible product experiences.",
  "Designer-minded builder who cares about visual polish and interaction.",
  "Based in Accra, Ghana, building digital products with global taste.",
] as const;

const rawServiceItems = [
  {
    title: "Portfolio & brand websites",
    description:
      "Premium personal and business websites that make the first impression feel intentional.",
    deliverables: ["Responsive UI", "SEO-ready pages", "Launch support"],
  },
  {
    title: "Full-stack implementation",
    description:
      "Clean React and Next.js experiences connected to practical product foundations.",
    deliverables: [
      "Component systems",
      "Accessible markup",
      "Performance pass",
    ],
  },
  {
    title: "Product interface polish",
    description:
      "Sharper dashboards, landing pages, and flows with stronger hierarchy and interaction details.",
    deliverables: ["UI audit", "Design cleanup", "Interaction states"],
  },
] as const;

const rawExperienceItems = [
  {
    role: "Full Stack Developer",
    company: "Looprompt",
    period: "2026 — Present",
    location: "Accra, Ghana",
    highlights: [
      "Building polished web experiences with Next.js, Tailwind CSS, and React.",
      "Designing interfaces with a strong focus on clarity, accessibility, and conversion.",
    ],
  },
  {
    role: "Independent Web Designer",
    company: "Freelance",
    period: "2025 — Present",
    location: "Remote",
    highlights: [
      "Creating portfolio, landing page, and product interface concepts for growing brands.",
      "Translating visual references into responsive, production-minded implementations.",
    ],
  },
] as const;

const rawEducationItems = [
  {
    institution: "Self-directed learning",
    qualification: "Full-stack engineering, UI design, and product thinking",
    period: "Ongoing",
    detail:
      "Focused learning through production builds, design references, and modern web tooling.",
  },
  {
    institution: "Practical project work",
    qualification: "React, Next.js, TypeScript, Tailwind CSS",
    period: "2025 — Present",
    detail:
      "Hands-on projects covering responsive layouts, reusable components, and deployment workflows.",
  },
] as const;

const rawCertificationItems = [
  {
    name: "Responsive Web Design",
    provider: "Self-guided certification track",
    status: "In progress",
  },
  {
    name: "Full Stack Engineering",
    provider: "Portfolio project practice",
    status: "Ongoing",
  },
  {
    name: "Accessibility Foundations",
    provider: "Portfolio quality standard",
    status: "Ongoing",
  },
] as const;

const rawTestimonialItems = [
  {
    quote:
      "Kobina brings a calm eye for detail to interfaces. The work feels clean, modern, and easy to understand.",
    name: "Anonymous collaborator",
    role: "Brand feedback",
  },
  {
    quote:
      "He turns rough ideas into polished screens quickly, while still caring about usability and structure.",
    name: "Anonymous product partner",
    role: "Product feedback",
  },
  {
    quote:
      "The final result had the exact mood we wanted: minimal, sharp, and professional without feeling generic.",
    name: "Anonymous founder",
    role: "Business feedback",
  },
] as const;

const rawPortfolioContent = {
  site: rawSiteConfig,
  navigation: rawSiteNavItems,
  projects: rawProjects,
  skills: rawSkillItems,
  aboutHighlights: rawAboutHighlights,
  services: rawServiceItems,
  experience: rawExperienceItems,
  education: rawEducationItems,
  certifications: rawCertificationItems,
  testimonials: rawTestimonialItems,
  contentStrategy: {
    caseStudiesUseMdx: false,
    blogEnabled: false,
    adapter: "typed-local",
  },
} as const;

const portfolioContent = portfolioContentSchema.parse(rawPortfolioContent);

export function getSiteConfig() {
  return portfolioContent.site;
}

export function getNavigationItems() {
  return portfolioContent.navigation;
}

export function getImageAsset(key: string) {
  return portfolioContent.site.images.find((image) => image.key === key);
}

export function getRequiredImageAsset(key: string) {
  const asset = getImageAsset(key);

  if (!asset) {
    throw new Error(`Missing image asset: ${key}`);
  }

  return asset;
}

export function getAllProjects() {
  return portfolioContent.projects;
}

export function getFeaturedProjects() {
  return getAllProjects().slice(0, 3);
}

export function getProjectBySlug(slug: string) {
  return getAllProjects().find((project) => project.slug === slug);
}

export function getRelatedProjects(slug: string, limit = 2) {
  return getAllProjects()
    .filter((project) => project.slug !== slug)
    .slice(0, limit);
}

export function getAdjacentProjects(slug: string) {
  const projects = getAllProjects();
  const currentIndex = projects.findIndex((project) => project.slug === slug);

  if (currentIndex === -1) {
    return { previous: null, next: null };
  }

  return {
    previous: projects[currentIndex - 1] ?? null,
    next: projects[currentIndex + 1] ?? null,
  };
}

export function getSkillItems() {
  return portfolioContent.skills;
}

export function getAboutHighlights() {
  return portfolioContent.aboutHighlights;
}

export function getServiceItems() {
  return portfolioContent.services;
}

export function getExperienceItems() {
  return portfolioContent.experience;
}

export function getEducationItems() {
  return portfolioContent.education;
}

export function getCertificationItems() {
  return portfolioContent.certifications;
}

export function getTestimonialItems() {
  return portfolioContent.testimonials;
}

export function getContentStrategy() {
  return portfolioContent.contentStrategy;
}
