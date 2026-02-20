import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

const databaseUrl = process.env['DATABASE_URL'];

if (!databaseUrl) {
  console.warn('DATABASE_URL not set — run db:* commands after adding it to .env.development.local');
}

export default defineConfig({
  schema: './src/db/schema/index.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: databaseUrl || '',
  },
});
