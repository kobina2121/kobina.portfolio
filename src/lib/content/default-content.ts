import { contactEmail, contactPhoneDisplay } from "@/lib/contact-details";
import { portfolioContentSchema } from "@/lib/content/schema";

const rawAboutHighlights = [
  "Computer Science graduate (B.Tech Computer Technology, Second Class Upper) from Kumasi Technical University.",
  "Builds web and desktop applications, from TrustKonnect to internal production tools at ICPS.",
  "Works across software development, UI/UX design, data analytics, and process automation.",
] as const;

const rawSiteSettings = {
  name: "Kobina Portfolio",
  owner: "Kobina Kyereboah",
  title: "Full Stack Developer",
  email: contactEmail,
  phone: contactPhoneDisplay,
  location: "Tema, Ghana",
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
    { label: "Base", value: "Tema" },
    { label: "Style", value: "Premium UI" },
  ],
  heroIntro:
    "I craft responsive websites and product interfaces where clean engineering meets visual taste.",
  metaTitle: "Kobina — Full Stack Developer",
  metaDescription:
    "Portfolio of Kobina Kyereboah, a Ghana-based full stack developer building web and desktop applications, with a background in UI/UX design and data analytics.",
};

const rawProjects = [
  {
    title: "TrustKonnect",
    slug: "trustkonnect",
    category: "Mobile Web App",
    year: "2024",
    description:
      "A platform connecting customers with trusted artisans and service providers, built during an internship at HapaSpace Innovation Hub.",
    stack: ["FlutterFlow", "Firebase", "Figma"],
    accent: "from-[#f4f4f5] via-[#d4d4d8] to-[#fafafa]",
  },
  {
    title: "Whitelist Analyzer",
    slug: "whitelist-analyzer",
    category: "Desktop App",
    year: "2026",
    description:
      "An internal audit tool at ICPS that processes and validates whitelist data from large smart-card production files.",
    stack: ["Electron", "React", "SQLite", "TypeScript", "Node.js"],
    accent: "from-[#151515] via-[#2a2a2a] to-[#090909]",
  },
  {
    title: "Remake App",
    slug: "remake-app",
    category: "Desktop App",
    year: "2026",
    description:
      "An internal ICPS app that organizes card records and validates their identifiers so cards can be tracked reliably during remakes.",
    stack: ["Electron", "SQLite", "React", "TypeScript", "shadcn/ui"],
    accent: "from-[#18181b] via-[#3f3f46] to-[#09090b]",
  },
];

const rawSkillItems = [
  {
    label: "html",
    icon: "html",
    color: "text-orange-500",
    category: "Frontend",
    description: "Semantic, accessible page structure.",
  },
  {
    label: "css",
    icon: "css",
    color: "text-blue-500",
    category: "Frontend",
    description: "Responsive layouts and polished styling.",
  },
  {
    label: "javascript",
    icon: "javascript",
    color: "text-yellow-300",
    category: "Language",
    description: "Interactive features for the web.",
  },
  {
    label: "typescript",
    icon: "typescript",
    color: "text-blue-600",
    category: "Language",
    description: "Typed, maintainable application code.",
  },
  {
    label: "php",
    icon: "php",
    color: "text-indigo-400",
    category: "Backend",
    description: "Server-side scripting for web applications.",
  },
  {
    label: "next.js",
    icon: "nextjs",
    color: "text-zinc-950 dark:text-white",
    category: "Framework",
    description: "Full-stack React apps with server rendering.",
  },
  {
    label: "react",
    icon: "react",
    color: "text-sky-500",
    category: "Frontend",
    description: "Component-driven web and desktop interfaces.",
  },
  {
    label: "node.js",
    icon: "node",
    color: "text-lime-400",
    category: "Backend",
    description: "JavaScript runtime for servers and desktop tools.",
  },
  {
    label: "firebase",
    icon: "firebase",
    color: "text-amber-400",
    category: "Backend",
    description: "Authentication, data, and backend services.",
  },
  {
    label: "mongodb",
    icon: "mongodb",
    color: "text-green-600",
    category: "Database",
    description: "Document databases for web applications.",
  },
  {
    label: "sql",
    icon: "mysql",
    color: "text-cyan-400",
    category: "Database",
    description: "Relational data modelling and queries.",
  },
  {
    label: "git & github",
    icon: "git",
    color: "text-red-500",
    category: "Workflow",
    description: "Version control and collaboration.",
  },
  {
    label: "figma",
    icon: "figma",
    color: "text-pink-400",
    category: "Design",
    description: "UI/UX design, wireframes, and prototypes.",
  },
  {
    label: "flutterflow",
    icon: "flutter",
    color: "text-sky-400",
    category: "Mobile",
    description: "Visual app building for mobile and web.",
  },
  {
    label: "power bi",
    icon: "powerbi",
    color: "text-yellow-500",
    category: "Data",
    description: "Interactive dashboards and reports with DAX.",
  },
  {
    label: "excel",
    icon: "excel",
    color: "text-green-600",
    category: "Data",
    description: "Data cleaning, analysis, and PivotTables.",
  },
] as const;

const rawServiceItems = [
  {
    title: "Web development",
    description:
      "Responsive websites and web applications, from business sites to full-stack platforms.",
    deliverables: ["Responsive UI", "Admin dashboards", "Launch support"],
  },
  {
    title: "Internal tools and automation",
    description:
      "Desktop and web tools that streamline operational workflows, like audit and production apps.",
    deliverables: ["Desktop apps", "Data validation", "Process automation"],
  },
  {
    title: "UI/UX design and data dashboards",
    description:
      "Clear interfaces designed in Figma, and dashboards that turn data into decisions.",
    deliverables: ["Figma designs", "Power BI dashboards", "Reports"],
  },
] as const;

const rawExperienceItems = [
  {
    role: "Smart Card Operator (National Service)",
    company: "Intelligent Card Production Systems (ICPS)",
    period: "2025 — Present",
    location: "Spintex, Accra",
    highlights: [
      "Operate and monitor smart card milling, embedding, serialization, and quality assurance processes.",
      "Developed Whitelist Analyzer, an internal desktop application for audit verification and whitelist processing.",
      "Developed Remaker, an internal desktop application supporting smart card remake workflows.",
      "Perform quality checks and inspections to maintain production accuracy and high-quality smart cards.",
      "Ensure production checklists are completed and support stock control within the milling section.",
    ],
  },
  {
    role: "Computer Science Intern",
    company: "HapaSpace Innovation Hub",
    period: "2024",
    location: "Danyame, Kumasi",
    highlights: [
      "Designed and developed TrustKonnect, a mobile web application connecting users with trusted artisans and service providers.",
      "Created user interfaces using Figma and FlutterFlow, with Firebase for backend services and data management.",
      "Supported data entry and digital innovation activities.",
      "Participated in Ghana Digital & Innovation Week and the R4DAC pilot training.",
    ],
  },
  {
    role: "Data Analytics Intern",
    company: "Institute for Digital Marketing & Communication (IDMC)",
    period: "2023",
    location: "Osu, Accra",
    highlights: [
      "Analysed datasets using Microsoft Excel and Power BI.",
      "Performed data cleaning, transformation, statistical analysis, and visualization.",
      "Created interactive dashboards and reports using Power BI Desktop and DAX.",
      "Applied Excel formulas, functions, PivotTables, and charts for data analysis.",
    ],
  },
] as const;

const rawEducationItems = [
  {
    institution: "Kumasi Technical University",
    qualification: "Bachelor of Technology, Computer Technology",
    period: "2021 — 2025",
    detail: "Graduated with Second Class Upper. Kumasi, Ghana.",
  },
  {
    institution: "Chemu Senior High School",
    qualification: "General Arts",
    period: "2017 — 2020",
    detail:
      "Elective Mathematics, Geography, Economics, and French. Tema, Ghana.",
  },
] as const;

const rawCertificationItems = [
  {
    name: "Data Analytics and Visualization",
    provider: "Institute for Digital Marketing & Communication (IDMC)",
    status: "Completed",
  },
  {
    name: "R4DAC Pilot Training",
    provider: "HapaSpace Innovation Hub",
    status: "Completed",
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
});
