import "server-only";

import { type Db, MongoClient } from "mongodb";

const globalForMongo = globalThis as typeof globalThis & {
  mongoClientPromise?: Promise<MongoClient>;
};

export function isMongoConfigured() {
  return Boolean(process.env.MONGODB_URI);
}

/**
 * Returns the portfolio database, reusing one client per server process (and
 * across hot reloads in development).
 */
export async function getDb(): Promise<Db> {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI is not set.");
  }

  globalForMongo.mongoClientPromise ??= new MongoClient(uri)
    .connect()
    .catch((error: unknown) => {
      globalForMongo.mongoClientPromise = undefined;
      throw error;
    });

  const client = await globalForMongo.mongoClientPromise;

  return client.db(process.env.MONGODB_DB || "portfolio");
}
