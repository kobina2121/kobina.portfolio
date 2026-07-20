import type { Metadata } from "next";
import Link from "next/link";

import { isSanityConfigured } from "@/sanity/env";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin — Kobina Portfolio",
  description: "Sanity Studio admin for editing portfolio content.",
  robots: {
    index: false,
    follow: false,
  },
};

function AdminSetupNotice() {
  return (
    <main className="homepage-font bg-background text-foreground flex min-h-screen items-center justify-center px-6 py-20">
      <section className="w-full max-w-2xl rounded-[2rem] border border-zinc-950/10 bg-white/80 p-8 shadow-2xl dark:border-white/12 dark:bg-black/80">
        <p className="text-xs font-bold tracking-[0.18em] text-[#d76bff] uppercase">
          Sanity admin setup
        </p>
        <h1 className="mt-4 text-3xl font-black tracking-tight">
          Connect a Sanity project to unlock the admin dashboard.
        </h1>
        <p className="mt-4 text-sm leading-7 text-zinc-700 dark:text-zinc-400">
          Add these public environment variables locally and in production, then
          reload this route:
        </p>
        <pre className="mt-5 overflow-x-auto rounded-2xl border border-zinc-950/10 bg-zinc-950 p-4 text-xs leading-6 text-white dark:border-white/12">
          {`NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production`}
        </pre>
        <p className="mt-5 text-sm leading-7 text-zinc-700 dark:text-zinc-400">
          After that, visit <span className="font-semibold">/admin</span> to
          edit projects, experience, skills, services, education,
          certifications, testimonials, and site settings.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex min-h-11 items-center rounded-full border border-zinc-950/15 px-5 py-2 text-sm font-semibold hover:border-[#d76bff] hover:text-[#d76bff] dark:border-white/15"
        >
          Back to portfolio
        </Link>
      </section>
    </main>
  );
}

export default async function AdminPage() {
  if (!isSanityConfigured()) {
    return <AdminSetupNotice />;
  }

  const [{ NextStudio }, { default: config }] = await Promise.all([
    import("next-sanity/studio"),
    import("../../../../sanity.config"),
  ]);

  return <NextStudio config={config} />;
}
