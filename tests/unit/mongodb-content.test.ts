// @vitest-environment node
import { type Db, MongoClient } from "mongodb";
import { MongoMemoryServer } from "mongodb-memory-server-core";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";

import { defaultPortfolioContent } from "@/lib/content/default-content";
import {
  deleteItem,
  getItem,
  listItems,
  loadPortfolioContent,
  moveItem,
  saveItem,
  saveSettings,
} from "@/lib/content/repository";
import { hasSeededContent, seedPortfolioContent } from "@/lib/content/seed";

let server: MongoMemoryServer;
let client: MongoClient;
let db: Db;

beforeAll(async () => {
  server = await MongoMemoryServer.create({
    instance: { launchTimeout: 60_000 },
  });
  client = await new MongoClient(server.getUri()).connect();
}, 120_000);

afterAll(async () => {
  await client?.close();
  await server?.stop();
});

beforeEach(async () => {
  db = client.db(`portfolio-test-${crypto.randomUUID()}`);
});

describe("MongoDB content storage", () => {
  it("reports an unseeded database as empty", async () => {
    expect(await hasSeededContent(db)).toBe(false);
    expect(await loadPortfolioContent(db)).toBeNull();
  });

  it("seeds and loads the built-in content unchanged", async () => {
    await seedPortfolioContent(db, defaultPortfolioContent);

    expect(await loadPortfolioContent(db)).toEqual(defaultPortfolioContent);
  });

  it("leaves existing content alone unless asked to replace it", async () => {
    await seedPortfolioContent(db, defaultPortfolioContent);
    const [first] = await listItems(db, "testimonials");
    await deleteItem(db, "testimonials", first.id);

    const summary = await seedPortfolioContent(db, defaultPortfolioContent);
    expect(summary.testimonials).toBe(0);
    expect(await listItems(db, "testimonials")).toHaveLength(
      defaultPortfolioContent.testimonials.length - 1,
    );

    await seedPortfolioContent(db, defaultPortfolioContent, { replace: true });
    expect(await listItems(db, "testimonials")).toHaveLength(
      defaultPortfolioContent.testimonials.length,
    );
  });

  it("creates, edits, reorders, and deletes items", async () => {
    await seedPortfolioContent(db, defaultPortfolioContent);
    const certification = {
      name: "MongoDB Basics",
      provider: "MongoDB University",
      status: "Completed",
    };

    const created = await saveItem(db, "certifications", null, certification);
    expect(created.ok).toBe(true);
    if (!created.ok) return;

    let items = await listItems(db, "certifications");
    expect(items.at(-1)).toMatchObject({
      id: created.id,
      title: "MongoDB Basics",
    });

    await saveItem(db, "certifications", created.id, {
      ...certification,
      status: "In progress",
    });
    expect(await getItem(db, "certifications", created.id)).toEqual({
      ...certification,
      status: "In progress",
    });

    await moveItem(db, "certifications", created.id, "up");
    items = await listItems(db, "certifications");
    expect(items.at(-2)?.id).toBe(created.id);

    await deleteItem(db, "certifications", created.id);
    expect(await getItem(db, "certifications", created.id)).toBeNull();
  });

  it("rejects a second project with the same slug", async () => {
    await seedPortfolioContent(db, defaultPortfolioContent);
    const [project] = defaultPortfolioContent.projects;

    const result = await saveItem(db, "projects", null, project);

    expect(result).toMatchObject({
      ok: false,
      fieldErrors: { slug: expect.any(String) },
    });
  });

  it("skips documents that no longer match their schema", async () => {
    await seedPortfolioContent(db, defaultPortfolioContent);
    await db.collection("skills").insertOne({ label: "Broken", order: 99 });

    const content = await loadPortfolioContent(db);

    expect(content?.skills).toEqual(defaultPortfolioContent.skills);
  });

  it("saves site settings", async () => {
    await seedPortfolioContent(db, defaultPortfolioContent);
    await saveSettings(db, {
      ...defaultPortfolioContent.settings,
      availability: "Booked until March",
    });

    expect((await loadPortfolioContent(db))?.settings.availability).toBe(
      "Booked until March",
    );
  });
});
