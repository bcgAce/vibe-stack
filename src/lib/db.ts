import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import type { NeonDatabase } from 'drizzle-orm/neon-serverless';
import ws from 'ws';

// Database is optional — if DATABASE_URL isn't set, db will be null.
// Check for it before using: if (!db) throw new Error('Database not configured');

let db: NeonDatabase | null = null;
let pool: Pool | null = null;

if (process.env.DATABASE_URL) {
  neonConfig.webSocketConstructor = ws;
  pool = new Pool({ connectionString: process.env.DATABASE_URL });
  db = drizzle({ client: pool });
}

export { db, pool };
export default db;
