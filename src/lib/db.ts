import { drizzle } from 'drizzle-orm/postgres-js';
import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

// Database is optional — if DATABASE_URL isn't set, db will be null.
// Check for it before using: if (!db) return ApiResponse.error('Database not configured', 503);
// Works with any Postgres provider: Neon, Supabase, Railway, local, etc.

let db: PostgresJsDatabase | null = null;
let client: postgres.Sql | null = null;

if (process.env.DATABASE_URL) {
  client = postgres(process.env.DATABASE_URL);
  db = drizzle(client);
}

export { db, client };
export default db;
