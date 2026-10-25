import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowDown, ArrowUp, Pencil, Plus, Trash2 } from "lucide-react";

import {
  deleteItemAction,
  moveItemAction,
  saveSettingsAction,
} from "@/app/admin/actions";
import { ConfirmSubmitButton } from "@/components/admin/confirm-submit-button";
import { ContentForm } from "@/components/admin/content-form";
import { StatusBanner } from "@/components/admin/status-banner";
import { Button } from "@/components/ui/button";
import { requireAdmin } from "@/lib/admin/auth";
import {
  isListCollectionKey,
  listCollections,
  settingsCollection,
} from "@/lib/content/collections";
import { defaultPortfolioContent } from "@/lib/content/default-content";
import { getSettings, listItems } from "@/lib/content/repository";
import { getDb } from "@/lib/db/mongodb";

type CollectionPageProps = {
  params: Promise<{ collection: string }>;
  searchParams: Promise<{ saved?: string; deleted?: string }>;
};

export default async function AdminCollectionPage({
  params,
  searchParams,
}: CollectionPageProps) {
  await requireAdmin();

  const [{ collection }, { saved, deleted }] = await Promise.all([
    params,
    searchParams,
  ]);
  const db = await getDb();

  if (collection === "settings") {
    const settings =
      (await getSettings(db)) ?? defaultPortfolioContent.settings;

    return (
      <>
        <StatusBanner message={saved ? "Site settings saved." : null} />
        <h1 className="text-3xl font-black tracking-tight">
          {settingsCollection.label}
        </h1>
        <p className="text-muted-foreground mt-2 mb-8 text-sm">
          {settingsCollection.description}
        </p>
        <ContentForm
          fields={settingsCollection.fields}
          initialValues={settings}
          action={saveSettingsAction}
          submitLabel="Save settings"
          cancelHref="/admin"
        />
      </>
    );
  }

  if (!isListCollectionKey(collection)) {
    notFound();
  }

  const config = listCollections[collection];
  const items = await listItems(db, collection);

  return (
    <>
      <StatusBanner
        message={
          saved
            ? `The ${config.singular} was saved.`
            : deleted
              ? `The ${config.singular} was deleted.`
              : null
        }
      />
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight">{config.label}</h1>
          <p className="text-muted-foreground mt-2 text-sm">
            {config.description} Items appear on the site in this order.
          </p>
        </div>
        <Button asChild>
          <Link href={`/admin/${collection}/new`}>
            <Plus />
            New {config.singular}
          </Link>
        </Button>
      </div>

      {items.length === 0 ? (
        <p className="border-border text-muted-foreground mt-8 rounded-2xl border border-dashed p-8 text-center text-sm">
          No {config.label.toLowerCase()} yet.
        </p>
      ) : (
        <ol className="border-border mt-8 divide-y rounded-2xl border">
          {items.map((item, index) => (
            <li
              key={item.id}
              className="flex flex-wrap items-center justify-between gap-3 px-4 py-3"
            >
              <div className="min-w-0 flex-1">
                <Link
                  href={`/admin/${collection}/${item.id}`}
                  className="font-semibold hover:text-[#d76bff]"
                >
                  {item.title}
                </Link>
                {item.subtitle ? (
                  <p className="text-muted-foreground truncate text-xs">
                    {item.subtitle}
                  </p>
                ) : null}
              </div>
              <div className="flex items-center gap-1">
                {(["up", "down"] as const).map((direction) => (
                  <form key={direction} action={moveItemAction}>
                    <input type="hidden" name="collection" value={collection} />
                    <input type="hidden" name="id" value={item.id} />
                    <input type="hidden" name="direction" value={direction} />
                    <Button
                      type="submit"
                      variant="ghost"
                      size="icon-sm"
                      disabled={
                        direction === "up"
                          ? index === 0
                          : index === items.length - 1
                      }
                      aria-label={`Move ${item.title} ${direction}`}
                    >
                      {direction === "up" ? <ArrowUp /> : <ArrowDown />}
                    </Button>
                  </form>
                ))}
                <Button asChild variant="ghost" size="icon-sm">
                  <Link
                    href={`/admin/${collection}/${item.id}`}
                    aria-label={`Edit ${item.title}`}
                  >
                    <Pencil />
                  </Link>
                </Button>
                <form action={deleteItemAction}>
                  <input type="hidden" name="collection" value={collection} />
                  <input type="hidden" name="id" value={item.id} />
                  <ConfirmSubmitButton
                    variant="ghost"
                    size="icon-sm"
                    aria-label={`Delete ${item.title}`}
                    confirmMessage={`Delete "${item.title}"? This cannot be undone.`}
                  >
                    <Trash2 />
                  </ConfirmSubmitButton>
                </form>
              </div>
            </li>
          ))}
        </ol>
      )}
    </>
  );
}
