import { contactEmail, contactPhoneDisplay } from "@/lib/contact-details";
import { portfolioContentSchema } from "@/lib/content/schema";

const rawAboutHighlights = [
  "Full stack developer focused on clean, accessible product experiences.",
  "Designer-minded builder who cares about visual polish and interaction.",
  "Based in Accra, Ghana, building digital products with global taste.",
] as const;

const rawSiteSettings = {
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
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/kobina-kyereboah-219172364",
    },
    { label: "Email", href: `mailto:${contactEmail}` },
  ],
  aboutHighlights: rawAboutHighlights,
  aboutStats: [
    { label: "Focus", value: "Full stack" },
    { label: "Base", value: "Accra" },
    { label: "Style", value: "Premium UI" },
  ],
  heroIntro:
    "I craft responsive websites and product interfaces where clean engineering meets visual taste.",
  metaTitle: "Kobina — Full Stack Developer",
  metaDescription:
    "A premium personal portfolio for Kobina, a Ghana-based full stack developer building polished, accessible digital experiences.",
};

const rawProjects = [
  {
    title: "1111Afolio",
    slug: "1111afolio",
    category: "Portfolio",
    year: "2026",
    description:
      "A cyberpunk portfolio exploring motion, contrast, and tiny UI.",
    stack: ["HTML", "CSS", "JavaScript"],
    accent: "from-[#f4f4f5] via-[#d4d4d8] to-[#fafafa]",
  },
  {
    title: "ProjectX",
    slug: "projectx",
    category: "SaaS",
    year: "2026",
    description:
      "Online cloud storage interface with lightweight sharing flows.",
    stack: ["React", "API Design", "UI Systems"],
    accent: "from-[#151515] via-[#1d1d1d] to-[#090909]",
  },
  {
    title: "CrypTrack",
    slug: "cryptrack",
    category: "Analytics",
    year: "2026",
    description: "Crypto market dashboard with search, watchlists, and charts.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    accent: "from-[#111827] via-[#020617] to-[#050505]",
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

/** Content seeded into MongoDB and served whenever the database is unavailable. */
export const defaultPortfolioContent = portfolioContentSchema.parse({
  settings: rawSiteSettings,
  projects: rawProjects,
  skills: rawSkillItems,
  services: rawServiceItems,
  experience: rawExperienceItems,
  education: rawEducationItems,
  certifications: rawCertificationItems,
  testimonials: rawTestimonialItems,
});
