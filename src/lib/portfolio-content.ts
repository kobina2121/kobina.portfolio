export const siteNavItems = [
  { key: "home", label: "home", href: "/" },
  { key: "about", label: "about", href: "/about" },
  { key: "projects", label: "projects", href: "/projects" },
  { key: "skills", label: "skills", href: "/skills" },
] as const;

export type SiteNavKey = (typeof siteNavItems)[number]["key"];

export const projects = [
  {
    title: "1111Afolio",
    stack: "HTML, CSS, JS",
    description:
      "A cyberpunk portfolio exploring motion, contrast, and tiny UI.",
    accent: "from-[#dcecff] via-[#b9d6ff] to-[#fff6e9]",
    type: "Portfolio Experience",
    year: "2026",
    outcome: "Built a sharp personal brand interface with high-contrast cards.",
  },
  {
    title: "ProjectX",
    stack: "API, React, Design",
    description:
      "Online cloud storage interface with lightweight sharing flows.",
    accent: "from-[#151515] via-[#1d1d1d] to-[#090909]",
    type: "SaaS Interface",
    year: "2026",
    outcome: "Designed a clean product dashboard for file sharing workflows.",
  },
  {
    title: "CrypTrack",
    stack: "Next.js, Tailwind",
    description: "Crypto market dashboard with search, watchlists, and charts.",
    accent: "from-[#111827] via-[#020617] to-[#050505]",
    type: "Analytics Dashboard",
    year: "2026",
    outcome: "Created a market-focused UI for tracking assets quickly.",
  },
] as const;

export const skillItems = [
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

export const aboutHighlights = [
  "Front-end developer focused on clean, accessible interfaces.",
  "Designer-minded builder who cares about visual polish and interaction.",
  "Based in Accra, Ghana, building digital products with global taste.",
] as const;

export const serviceItems = [
  {
    title: "Portfolio & brand websites",
    description:
      "Premium personal and business websites that make the first impression feel intentional.",
    deliverables: ["Responsive UI", "SEO-ready pages", "Launch support"],
  },
  {
    title: "Frontend implementation",
    description:
      "Clean React and Next.js interfaces built from design direction, wireframes, or rough ideas.",
    deliverables: ["Component systems", "Accessible markup", "Performance pass"],
  },
  {
    title: "Product interface polish",
    description:
      "Sharper dashboards, landing pages, and flows with stronger hierarchy and interaction details.",
    deliverables: ["UI audit", "Design cleanup", "Interaction states"],
  },
] as const;

export const experienceItems = [
  {
    role: "Frontend Developer",
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

export const educationItems = [
  {
    institution: "Self-directed learning",
    qualification: "Frontend engineering, UI design, and product thinking",
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

export const certificationItems = [
  {
    name: "Responsive Web Design",
    provider: "Project-based certification path",
    status: "In progress",
  },
  {
    name: "Frontend Libraries",
    provider: "Project-based certification path",
    status: "Planned",
  },
  {
    name: "Accessibility Foundations",
    provider: "Portfolio quality standard",
    status: "Ongoing",
  },
] as const;

export const testimonialItems = [
  {
    quote:
      "Kobina brings a calm eye for detail to interfaces. The work feels clean, modern, and easy to understand.",
    name: "Creative Partner",
    role: "Brand collaborator",
  },
  {
    quote:
      "He turns rough ideas into polished screens quickly, while still caring about usability and structure.",
    name: "Product Lead",
    role: "Early-stage product team",
  },
  {
    quote:
      "The final result had the exact mood we wanted: minimal, sharp, and professional without feeling generic.",
    name: "Founder",
    role: "Small business client",
  },
] as const;
