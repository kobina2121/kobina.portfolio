import Link from "next/link";
import { ArrowUpRight, LogOut } from "lucide-react";

import { logoutAction } from "@/app/admin/actions";
import { AdminNotice } from "@/components/admin/admin-notice";
import { Button } from "@/components/ui/button";
import { requireAdmin } from "@/lib/admin/auth";
import {
  listCollectionKeys,
  listCollections,
  settingsCollection,
} from "@/lib/content/collections";
import { getDb, isMongoConfigured } from "@/lib/db/mongodb";

const navLinkClassName =
  "rounded-full px-3 py-1.5 text-xs font-semibold text-zinc-600 hover:bg-zinc-950/5 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-white";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();

  if (!isMongoConfigured()) {
    return (
      <AdminNotice
        eyebrow="MongoDB setup"
        title="Connect a MongoDB database to start editing."
        env={`MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net
MONGODB_DB=portfolio`}
      >
        <p>
          Add these server environment variables locally and in production, then
          reload this page. Until then the site serves its built-in content.
        </p>
      </AdminNotice>
    );
  }

  try {
    await getDb();
  } catch (error) {
    return (
      <AdminNotice
        eyebrow="MongoDB connection"
        title="The admin could not reach MongoDB."
      >
        <p>
          Check MONGODB_URI and that this server&apos;s IP address is allowed in
          your database&apos;s network access settings.
        </p>
        <p className="mt-3 font-mono text-xs">
          {error instanceof Error ? error.message : String(error)}
        </p>
      </AdminNotice>
    );
  }

  return (
    <div className="homepage-font bg-background text-foreground min-h-screen">
      <header className="border-border border-b">
        <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-3 px-5 py-4">
          <Link href="/admin" className="text-sm font-black tracking-tight">
            Portfolio admin
          </Link>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm">
              <Link href="/" target="_blank" rel="noreferrer">
                View site
                <ArrowUpRight />
              </Link>
            </Button>
            <form action={logoutAction}>
              <Button type="submit" variant="outline" size="sm">
                <LogOut />
                Sign out
              </Button>
            </form>
          </div>
        </div>
        <nav
          aria-label="Admin sections"
          className="mx-auto flex w-full max-w-5xl gap-1 overflow-x-auto px-4 pb-3"
        >
          <Link href="/admin/settings" className={navLinkClassName}>
            {settingsCollection.label}
          </Link>
          {listCollectionKeys.map((key) => (
            <Link key={key} href={`/admin/${key}`} className={navLinkClassName}>
              {listCollections[key].label}
            </Link>
          ))}
        </nav>
      </header>
      <main
        id="main-content"
        tabIndex={-1}
        className="mx-auto w-full max-w-5xl px-5 py-10"
      >
        {children}
      </main>
    </div>
  );
}
