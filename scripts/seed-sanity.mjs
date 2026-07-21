import { spawnSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const envPath = ".env.local";

function loadLocalEnv() {
  if (!existsSync(envPath)) {
    return;
  }

  const lines = readFileSync(envPath, "utf8").split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) {
      continue;
    }

    const [key, ...valueParts] = trimmed.split("=");
    const value = valueParts.join("=").replace(/^['"]|['"]$/g, "");

    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

function requiredEnv(name) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing ${name}. Add it to ${envPath} first.`);
  }

  return value;
}

function keyFrom(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
}

function projectLink(link) {
  return {
    _type: "projectLink",
    label: link.label,
    ...(link.href ? { href: link.href } : {}),
    ...(link.unavailableReason
      ? { unavailableReason: link.unavailableReason }
      : {}),
  };
}

const projects = [
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

const experience = [
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
];

function toProjectDocument(project, index) {
  return {
    _id: `project-${project.slug}`,
    _type: "project",
    title: project.title,
    slug: {
      _type: "slug",
      current: project.slug,
    },
    category: project.category,
    type: project.type,
    year: project.year,
    description: project.description,
    outcome: project.outcome,
    accent: project.accent,
    stack: project.stack,
    tags: project.tags,
    context: project.context,
    role: project.role,
    problem: project.problem,
    constraints: project.constraints,
    process: project.process,
    solution: project.solution,
    impact: project.impact,
    lessons: project.lessons,
    gallery: project.gallery.map((item, galleryIndex) => ({
      _key: keyFrom(`${project.slug}-${item.title}-${galleryIndex}`),
      _type: "projectMedia",
      title: item.title,
      caption: item.caption,
      accent: item.accent,
    })),
    live: projectLink(project.live),
    source: projectLink(project.source),
    confidentiality: project.confidentiality,
    featured: true,
    orderRank: index + 1,
  };
}

function toExperienceDocument(item, index) {
  return {
    _id: `experience-${keyFrom(`${item.company}-${item.role}`)}`,
    _type: "experience",
    role: item.role,
    company: item.company,
    period: item.period,
    location: item.location,
    highlights: item.highlights,
    orderRank: index + 1,
  };
}

function run(command, args) {
  const result = spawnSync(command, args, {
    stdio: "inherit",
    shell: false,
  });

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

loadLocalEnv();

const projectId = requiredEnv("NEXT_PUBLIC_SANITY_PROJECT_ID");
const dataset = requiredEnv("NEXT_PUBLIC_SANITY_DATASET");
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-07-20";
const seedPath = join(tmpdir(), "kobina-portfolio-sanity-seed.ndjson");
const documents = [
  ...projects.map(toProjectDocument),
  ...experience.map(toExperienceDocument),
];

writeFileSync(
  seedPath,
  `${documents.map((document) => JSON.stringify(document)).join("\n")}\n`,
);

console.log(
  `Seeding ${projects.length} projects and ${experience.length} experience items into Sanity...`,
);
console.log("Existing Sanity documents with the same IDs will be skipped.");

run("npx", [
  "sanity",
  "datasets",
  "import",
  seedPath,
  "--project-id",
  projectId,
  "--dataset",
  dataset,
  "--missing",
]);

console.log("Verifying seeded document counts...");

run("npx", [
  "sanity",
  "documents",
  "query",
  '{ "projects": count(*[_type == "project"]), "experience": count(*[_type == "experience"]) }',
  "--project-id",
  projectId,
  "--dataset",
  dataset,
  "--api-version",
  apiVersion,
]);
