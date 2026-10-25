import type { Db } from "mongodb";

import {
  listCollectionKeys,
  settingsCollection,
} from "@/lib/content/collections";
import type { PortfolioContent } from "@/lib/content/schema";

type SettingsDocument = { _id: string } & Record<string, unknown>;

export async function ensureIndexes(db: Db) {
  await Promise.all([
    db
      .collection("projects")
      .createIndex({ slug: 1 }, { unique: true, name: "slug_unique" }),
    ...listCollectionKeys.map((key) =>
      db.collection(key).createIndex({ order: 1 }, { name: "order" }),
    ),
  ]);
}

export async function hasSeededContent(db: Db) {
  const settings = await db
    .collection<SettingsDocument>(settingsCollection.name)
    .findOne(
      { _id: settingsCollection.documentId },
      { projection: { _id: 1 } },
    );

  return Boolean(settings);
}

/**
 * Writes the given content into MongoDB. With `replace`, existing documents in
 * every portfolio collection are removed first; otherwise collections that
 * already have documents are left untouched.
 */
export async function seedPortfolioContent(
  db: Db,
  content: PortfolioContent,
  { replace = false }: { replace?: boolean } = {},
) {
  const now = new Date();
  const summary: Record<string, number> = {};

  await ensureIndexes(db);

  for (const key of listCollectionKeys) {
    const collection = db.collection(key);

    if (replace) {
      await collection.deleteMany({});
    } else if ((await collection.estimatedDocumentCount()) > 0) {
      summary[key] = 0;
      continue;
    }

    const items = content[key];

    if (items.length > 0) {
      await collection.insertMany(
        items.map((item, order) => ({ ...item, order, updatedAt: now })),
      );
    }

    summary[key] = items.length;
  }

  const settings = db.collection<SettingsDocument>(settingsCollection.name);
  const existingSettings = await hasSeededContent(db);

  if (replace || !existingSettings) {
    await settings.replaceOne(
      { _id: settingsCollection.documentId },
      { ...content.settings, updatedAt: now },
      { upsert: true },
    );
    summary.settings = 1;
  } else {
    summary.settings = 0;
  }

  return summary;
}
