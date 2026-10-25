// Seeds MongoDB with the built-in portfolio content.
//
//   npm run db:seed              # fill empty collections only
//   npm run db:seed -- --replace # overwrite everything with the built-in content

import { MongoClient } from "mongodb";

import { defaultPortfolioContent } from "../src/lib/content/default-content";
import { seedPortfolioContent } from "../src/lib/content/seed";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "portfolio";
const replace = process.argv.includes("--replace");

if (!uri) {
  console.error("Set MONGODB_URI (for example in .env.local) before seeding.");
  process.exit(1);
}

async function main(mongoUri: string) {
  const client = new MongoClient(mongoUri);

  try {
    await client.connect();
    const summary = await seedPortfolioContent(
      client.db(dbName),
      defaultPortfolioContent,
      { replace },
    );

    console.log(
      `Seeded "${dbName}"${replace ? " (replaced existing content)" : ""}:`,
    );

    for (const [collection, count] of Object.entries(summary)) {
      console.log(
        `  ${collection}: ${count > 0 ? `${count} written` : "already had content, skipped"}`,
      );
    }
  } finally {
    await client.close();
  }
}

main(uri).catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
