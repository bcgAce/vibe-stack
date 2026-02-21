---
name: add-db-table
description: Create a new database table with Drizzle schema, push it, and generate typed queries
---

# Add Database Table

Create a new database table for: $ARGUMENTS

## Steps

1. **Check database is configured** — Verify `DATABASE_URL` is set in `.env.development.local`. If not, tell the user to set it up first (see `docs/DEVELOPMENT.md`).

2. **Define the schema** — Add to `src/db/schema/index.ts`:
   ```typescript
   import { pgTable, text, timestamp, integer, boolean } from 'drizzle-orm/pg-core';
   import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

   export const tableName = pgTable('table_name', {
     id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
     // ... columns based on requirements
     createdAt: timestamp('created_at').defaultNow().notNull(),
     updatedAt: timestamp('updated_at').defaultNow().notNull(),
   });

   // Auto-generate Zod schemas for validation
   export const insertTableNameSchema = createInsertSchema(tableName);
   export const selectTableNameSchema = createSelectSchema(tableName);
   ```

3. **Push the schema** — Run `npm run db:push` to sync to the database

4. **Verify in Studio** — Run `npm run db:studio` to visually confirm the table exists

5. **Create helper queries** (optional) — Add commonly needed queries:
   ```typescript
   import { db } from '@/lib/db';
   import { eq } from 'drizzle-orm';

   // In your API route or server component:
   if (!db) return ApiResponse.error('Database not configured', 503);

   const all = await db.select().from(tableName);
   const one = await db.select().from(tableName).where(eq(tableName.id, id));
   await db.insert(tableName).values({ ... });
   await db.update(tableName).set({ ... }).where(eq(tableName.id, id));
   await db.delete(tableName).where(eq(tableName.id, id));
   ```

6. **Always check for `db`** — Every usage must handle the case where database is not configured:
   ```typescript
   if (!db) return ApiResponse.error('Database not configured', 503);
   ```
