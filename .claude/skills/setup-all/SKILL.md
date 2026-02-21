---
name: setup-all
description: Complete automated development environment setup
---

# Project Setup

Walk the user through setting up vibe-stack from scratch. Be conversational and helpful — this is likely their first time.

## Step 1: Get the spec

Ask: "What are you building? If you have a spec or description from ChatGPT/Claude, paste it here. If not, just describe what you're making in a few sentences."

Read their spec carefully. From it, determine:

- **Needs database?** — Does the app store any persistent data (users, posts, products, orders, etc.)?
- **Needs auth?** — Does the app have user accounts, sign-in, roles, or private content?
- **Needs AI?** — Does the app use text generation, analysis, image generation, chatbots, etc.?
- **Data model** — What are the main entities and relationships? (e.g., Users have many Posts, Posts have many Comments)
- **Key pages** — What are the main screens/pages? (e.g., dashboard, feed, settings, landing page)

Summarize back to them: "Based on your spec, here's what I'll set up: [database for X, auth for Y, AI for Z]. Sound right?"

Wait for confirmation before proceeding.

## Step 2: Check Node.js

Run `node --version` to see what we're working with.

- **Not installed**: This is the most common case. Detect their platform and give them the quickest path:
  - **macOS with Homebrew** (`command -v brew`): `brew install node`
  - **macOS without Homebrew**: "Go to https://nodejs.org and download the LTS installer. Run it, then come back here."
  - **Linux**: `curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash - && sudo apt-get install -y nodejs`
  - **Windows/WSL**: "Go to https://nodejs.org and download the LTS installer."
- **Installed but < 22**: suggest upgrading via the same method above, or `nvm install 22 && nvm use 22` if nvm is available
- **22+**: good, move on

**Do not continue until Node 22+ is confirmed.** After they install, re-run `node --version` to verify.

## Step 3: Install dependencies and create env file

1. Check if `node_modules/` exists. If not, run `npm install`.
2. Check if `.env.development.local` exists. If not, run `cp .env.example .env.development.local`.

## Step 4: Set up features based on the spec

Only set up what their spec requires. Walk them through each one they need, **one at a time**.

### Database (if needed)

1. Ask which provider they prefer: Neon (recommended), Supabase, Railway, or local
2. For **Neon**: "Go to https://neon.tech, create a free account, create a project, and copy the connection string from the dashboard. It looks like `postgresql://user:pass@ep-something.us-east-2.aws.neon.tech/neondb?sslmode=require`"
3. For **Supabase**: "Go to https://supabase.com, create a project, then go to Settings → Database → Connection string (URI)"
4. For **local**: "Make sure Postgres is running locally. Your URL will be something like `postgresql://postgres:postgres@localhost:5432/mydb`"
5. Once they give you the URL, update `.env.development.local` by uncommenting and setting `DATABASE_URL`
6. **Create the schema** — see "Schema generation rules" below
7. Run `npm run db:push` to sync the schema
8. **If `db:push` fails**: read the error carefully. Common causes:
   - Connection string wrong → ask them to double-check the URL
   - SSL error → try appending `?sslmode=require` to the URL
   - Table already exists → this is fine on re-runs, not an error
   - Syntax error in schema → fix the schema code and retry

### Auth — Clerk (if needed)

1. "Go to https://clerk.com, create a free account, create an application"
2. "Copy the **Publishable Key** (starts with `pk_test_`) and **Secret Key** (starts with `sk_test_`) from the API Keys page"
3. Once they give you the keys, update `.env.development.local` with both `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY`

### AI (if needed)

1. Ask which provider: OpenAI, Anthropic, or both
2. For **OpenAI**: "Go to https://platform.openai.com, create an API key under API Keys"
3. For **Anthropic**: "Go to https://console.anthropic.com, create an API key under API Keys"
4. Once they give you the key(s), update `.env.development.local`
5. If they're on a new/free-tier account, also set the fallback model in `.env.development.local`:
   - OpenAI: uncomment `OPENAI_MODEL=gpt-4o`
   - Anthropic: uncomment `ANTHROPIC_MODEL=claude-sonnet-4-5-20250929`

For features they **don't** need, skip silently. Don't mention them.

## Step 5: Verify everything works

1. Run `npm run dev` in the background
2. Wait a few seconds for the server to start
3. Tell the user to open http://localhost:3000
4. Ask them to confirm they see the "You're up and running!" page
5. If they set up a database, confirm `npm run db:push` succeeded

## Step 6: Wrap up and set them loose

Tell them what was set up, then point them to building:

- "Your project is ready. Here's what's configured: [list]"
- "Want me to start building? I can scaffold your first feature based on the spec — just say the word, or use `/add-feature [description]`."
- "Run `/check` anytime to see what's configured."

---

## Schema generation rules

When replacing `src/db/schema/index.ts` based on the user's spec, follow these patterns **exactly**. Read the existing example file first to match the style.

### Always use these patterns:

```typescript
import { pgTable, text, timestamp, boolean, integer } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
```

### For every table:

- **ID**: always `text('id').primaryKey().$defaultFn(() => crypto.randomUUID())`
- **Timestamps**: always include `createdAt` and `updatedAt` with `timestamp('created_at').defaultNow().notNull()`
- **Enums**: use `text('status', { enum: ['value1', 'value2'] })` — NOT Postgres native enums
- **Foreign keys**: use `.references(() => otherTable.id, { onDelete: 'cascade' })`
- **Zod schemas**: always export `insertXSchema` and `selectXSchema` via `createInsertSchema` / `createSelectSchema`
- **Relations**: always define relations for both sides of a relationship

### Column type mapping:

- Strings → `text('column_name')`
- Numbers → `integer('column_name')` (or `real` / `numeric` for decimals)
- Booleans → `boolean('column_name')`
- Dates → `timestamp('column_name')`
- Enums → `text('column_name', { enum: [...] })` — never use `pgEnum`
- Money → `integer('price_cents')` — store as cents, not decimals

### Do NOT:

- Use `serial` or `bigserial` for IDs — use text UUIDs
- Use `pgEnum()` — use text with enum option instead
- Use `varchar` — use `text` for everything
- Create a `users` table — Clerk manages users. Store `userId: text('user_id').notNull()` as a reference to Clerk's user ID.
- Forget relations — if table A references table B, define relations on both tables
- Use `jsonb` for structured data — create a separate table instead

### Many-to-many relationships:

Create a join table:

```typescript
export const postTags = pgTable('post_tags', {
  postId: text('post_id')
    .notNull()
    .references(() => posts.id, { onDelete: 'cascade' }),
  tagId: text('tag_id')
    .notNull()
    .references(() => tags.id, { onDelete: 'cascade' }),
});
```

### After writing the schema:

1. Run `npx tsc --noEmit` to verify the schema has no TypeScript errors
2. Run `npm run db:push` to sync to the database
3. If either fails, fix the error and retry — do NOT move on with a broken schema

---

## Rules

- **Spec first, setup second.** Understanding what they're building lets you skip irrelevant features and tailor the DB schema.
- Never skip the Node check — it's the #1 source of setup failures
- Assume they don't have Node. The happy path is: install Node → npm install → start building
- Walk them through one credential at a time. Don't dump all three sign-up links at once.
- When updating `.env.development.local`, use the Edit tool to uncomment and set specific values — don't overwrite the whole file
- Be encouraging, not technical. These are people who want to build something, not configure infrastructure.
- If their spec mentions entities/tables, replace the example projects/tasks schema — don't leave dead example code.
- Always verify the schema compiles before running db:push.
