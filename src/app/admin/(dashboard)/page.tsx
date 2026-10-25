import Link from "next/link";
import { ArrowRight, DatabaseZap } from "lucide-react";

import { seedContentAction } from "@/app/admin/actions";
import { ConfirmSubmitButton } from "@/components/admin/confirm-submit-button";
import { StatusBanner } from "@/components/admin/status-banner";
import { Button } from "@/components/ui/button";
import { requireAdmin } from "@/lib/admin/auth";
import {
  listCollectionKeys,
  listCollections,
  settingsCollection,
} from "@/lib/content/collections";
import { getCollectionCounts } from "@/lib/content/repository";
import { hasSeededContent } from "@/lib/content/seed";
import { getDb } from "@/lib/db/mongodb";

const cardClassName =
  "group border-border hover:border-[#d76bff] flex flex-col justify-between gap-4 rounded-2xl border p-5 transition";

type DashboardPageProps = {
  searchParams: Promise<{ seeded?: string }>;
};

export default async function AdminDashboardPage({
  searchParams,
}: DashboardPageProps) {
  await requireAdmin();

  const db = await getDb();
  const [{ seeded }, isSeeded, counts] = await Promise.all([
    searchParams,
    hasSeededContent(db),
    getCollectionCounts(db),
  ]);

  return (
    <>
      <StatusBanner
        message={seeded ? "Built-in content imported into MongoDB." : null}
      />
      <h1 className="text-3xl font-black tracking-tight">Content</h1>
      <p className="text-muted-foreground mt-2 text-sm">
        Changes publish to the live site as soon as you save.
      </p>

      {!isSeeded ? (
        <section className="mt-8 rounded-2xl border border-[#d76bff]/40 bg-[#d76bff]/5 p-6">
          <h2 className="flex items-center gap-2 text-lg font-bold">
            <DatabaseZap className="size-5 text-[#d76bff]" aria-hidden="true" />
            Your database is empty
          </h2>
          <p className="text-muted-foreground mt-2 text-sm leading-6">
            The site is serving its built-in content. Import it into MongoDB to
            start editing it here.
          </p>
          <form action={seedContentAction} className="mt-4">
            <Button type="submit">Import built-in content</Button>
          </form>
        </section>
      ) : null}

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Link href="/admin/settings" className={cardClassName}>
          <div>
            <h2 className="font-bold">{settingsCollection.label}</h2>
            <p className="text-muted-foreground mt-1 text-xs leading-5">
              {settingsCollection.description}
            </p>
          </div>
          <ArrowRight
            className="size-4 transition group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Link>
        {listCollectionKeys.map((key) => {
          const config = listCollections[key];

          return (
            <Link key={key} href={`/admin/${key}`} className={cardClassName}>
              <div>
                <h2 className="font-bold">{config.label}</h2>
                <p className="text-muted-foreground mt-1 text-xs leading-5">
                  {config.description}
                </p>
              </div>
              <p className="flex items-center justify-between text-xs font-semibold">
                {counts[key]} {counts[key] === 1 ? "item" : "items"}
                <ArrowRight
                  className="size-4 transition group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </p>
            </Link>
          );
        })}
      </div>

      {isSeeded ? (
        <section className="border-destructive/30 mt-12 rounded-2xl border p-6">
          <h2 className="font-bold">Reset content</h2>
          <p className="text-muted-foreground mt-2 text-sm leading-6">
            Replace everything in MongoDB with the built-in content from the
            codebase. Your edits will be lost.
          </p>
          <form action={seedContentAction} className="mt-4">
            <input type="hidden" name="replace" value="true" />
            <ConfirmSubmitButton
              variant="destructive"
              confirmMessage="Replace all portfolio content in MongoDB with the built-in content? Your edits will be lost."
            >
              Reset to built-in content
            </ConfirmSubmitButton>
          </form>
        </section>
      ) : null}
    </>
  );
}
