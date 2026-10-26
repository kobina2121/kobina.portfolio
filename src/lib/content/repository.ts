import "server-only";

import { type Db, MongoServerError, ObjectId } from "mongodb";
import { z } from "zod";

import {
  listCollectionKeys,
  listCollections,
  type ListCollectionKey,
  settingsCollection,
} from "@/lib/content/collections";
import {
  commonTechnologies,
  getUniqueTechNames,
  splitStack,
} from "@/lib/tech-stack";
import {
  type PortfolioContent,
  type SiteSettings,
  siteSettingsSchema,
} from "@/lib/content/schema";

type SettingsDocument = { _id: string } & Record<string, unknown>;

export type ListItemSummary = {
  id: string;
  title: string;
  subtitle: string;
};

function stripMetadata(document: Record<string, unknown>) {
  const { _id, order, updatedAt, ...item } = document;
  void _id;
  void order;
  void updatedAt;
  return item;
}

function toObjectId(id: string) {
  return ObjectId.isValid(id) ? new ObjectId(id) : null;
}

function settingsStore(db: Db) {
  return db.collection<SettingsDocument>(settingsCollection.name);
}

/**
 * Reads every portfolio collection. Returns null when the database has not
 * been seeded yet. Documents that no longer match their schema are skipped so
 * one bad edit cannot take the whole site down.
 */
export async function loadPortfolioContent(
  db: Db,
): Promise<PortfolioContent | null> {
  const settingsDocument = await settingsStore(db).findOne({
    _id: settingsCollection.documentId,
  });

  if (!settingsDocument) {
    return null;
  }

  const settings = siteSettingsSchema.parse(stripMetadata(settingsDocument));
  const lists = await Promise.all(
    listCollectionKeys.map(async (key) => {
      const documents = await db
        .collection(key)
        .find()
        .sort({ order: 1, _id: 1 })
        .toArray();

      const items = documents.flatMap((document) => {
        const result = listCollections[key].schema.safeParse(
          stripMetadata(document),
        );

        if (!result.success) {
          console.error(
            `Skipping invalid ${key} document ${document._id.toString()}:\n${z.prettifyError(result.error)}`,
          );
          return [];
        }

        return [result.data];
      });

      return [key, items] as const;
    }),
  );

  return { settings, ...Object.fromEntries(lists) } as PortfolioContent;
}

export async function getCollectionCounts(db: Db) {
  const counts = await Promise.all(
    listCollectionKeys.map(
      async (key) => [key, await db.collection(key).countDocuments()] as const,
    ),
  );

  return Object.fromEntries(counts) as Record<ListCollectionKey, number>;
}

export async function listItems(
  db: Db,
  key: ListCollectionKey,
): Promise<ListItemSummary[]> {
  const { titleField, subtitleField } = listCollections[key];
  const documents = await db
    .collection(key)
    .find({}, { projection: { [titleField]: 1, [subtitleField]: 1 } })
    .sort({ order: 1, _id: 1 })
    .toArray();

  return documents.map((document) => ({
    id: document._id.toString(),
    title: String(document[titleField] ?? "Untitled"),
    subtitle: String(document[subtitleField] ?? ""),
  }));
}

export async function getItem(db: Db, key: ListCollectionKey, id: string) {
  const objectId = toObjectId(id);

  if (!objectId) {
    return null;
  }

  const document = await db.collection(key).findOne({ _id: objectId });

  return document ? stripMetadata(document) : null;
}

export type SaveResult =
  | { ok: true; id: string }
  | { ok: false; message: string; fieldErrors?: Record<string, string> };

export async function saveItem(
  db: Db,
  key: ListCollectionKey,
  id: string | null,
  data: Record<string, unknown>,
): Promise<SaveResult> {
  const collection = db.collection(key);
  const updatedAt = new Date();

  try {
    if (!id) {
      const [last] = await collection
        .find({}, { projection: { order: 1 } })
        .sort({ order: -1 })
        .limit(1)
        .toArray();
      const order = typeof last?.order === "number" ? last.order + 1 : 0;
      const { insertedId } = await collection.insertOne({
        ...data,
        order,
        updatedAt,
      });

      return { ok: true, id: insertedId.toString() };
    }

    const objectId = toObjectId(id);
    const existing = objectId
      ? await collection.findOne(
          { _id: objectId },
          { projection: { order: 1 } },
        )
      : null;

    if (!objectId || !existing) {
      return { ok: false, message: "This item no longer exists." };
    }

    await collection.replaceOne(
      { _id: objectId },
      { ...data, order: existing.order, updatedAt },
    );

    return { ok: true, id };
  } catch (error) {
    if (error instanceof MongoServerError && error.code === 11000) {
      return {
        ok: false,
        message: "Another project already uses this slug.",
        fieldErrors: { slug: "Another project already uses this slug." },
      };
    }

    throw error;
  }
}

export async function deleteItem(db: Db, key: ListCollectionKey, id: string) {
  const objectId = toObjectId(id);

  if (objectId) {
    await db.collection(key).deleteOne({ _id: objectId });
  }
}

/** Moves an item one place up or down and renumbers the collection. */
export async function moveItem(
  db: Db,
  key: ListCollectionKey,
  id: string,
  direction: "up" | "down",
) {
  const collection = db.collection(key);
  const ids = (
    await collection
      .find({}, { projection: { _id: 1 } })
      .sort({ order: 1, _id: 1 })
      .toArray()
  ).map((document) => document._id);
  const index = ids.findIndex((itemId) => itemId.toString() === id);
  const target = direction === "up" ? index - 1 : index + 1;

  if (index === -1 || target < 0 || target >= ids.length) {
    return;
  }

  [ids[index], ids[target]] = [ids[target], ids[index]];

  await collection.bulkWrite(
    ids.map((itemId, order) => ({
      updateOne: { filter: { _id: itemId }, update: { $set: { order } } },
    })),
  );
}

export async function getSettings(db: Db) {
  const document = await settingsStore(db).findOne({
    _id: settingsCollection.documentId,
  });

  return document ? stripMetadata(document) : null;
}

export async function saveSettings(db: Db, settings: SiteSettings) {
  await settingsStore(db).replaceOne(
    { _id: settingsCollection.documentId },
    { ...settings, updatedAt: new Date() },
    { upsert: true },
  );
}

/**
 * Technologies for the admin stack picker: the ones already used in
 * projects first, then common ones, each listed once.
 */
export async function getStackSuggestions(db: Db) {
  const projects = await db
    .collection("projects")
    .find({}, { projection: { stack: 1 } })
    .toArray();
  const stacks = projects.map((project) =>
    splitStack(
      Array.isArray(project.stack)
        ? project.stack.filter(
            (tool: unknown): tool is string => typeof tool === "string",
          )
        : [],
    ),
  );

  return getUniqueTechNames([...stacks, [...commonTechnologies]]);
}
