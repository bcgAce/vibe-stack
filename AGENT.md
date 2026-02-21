# AGENT.md — vibe-stack

> Configuration for AI coding assistants (Claude Code, Cursor, Copilot, etc.)
> Move fast, build cool stuff. The boilerplate handles the boring parts.

## Quick Start

1. **Node.js 22+** → `npm install` → `npm run dev`
2. Everything optional (DB, auth, AI) works when configured, doesn't crash when it's not
3. Deploy to **Vercel** or **Railway** — your call

## Slash Commands

**Setup:**

- `/setup` — Full environment setup
- `/check` — Validate what's installed
- `/auth` — Set up service authentication
- `/gh-setup` — Configure GitHub CLI

**Dev:**

- `/dev` — Start dev server with Turbopack
- `/build` — Production build
- `/lint` — ESLint + TypeScript check
- `/test` — Run tests

**Database:**

- `/db-studio` — Open Drizzle Studio
- `/db-push` — Push schema changes

**Skills (workflow shortcuts):**

- `/add-feature [description]` — Scaffold a new page + API route + component
- `/add-db-table [description]` — Create a Drizzle schema, push it, generate queries
- `/deploy [vercel|railway]` — Build, validate, and deploy
- `/debug [description]` — Systematic debugging workflow

**Subagents (isolated review):**

- Tell Claude: _"Use the code-reviewer to review my changes"_
- Tell Claude: _"Use the ui-reviewer to check this page"_

## Project Structure

```
src/
├── app/                   # Next.js App Router (pages + API routes)
├── components/
│   ├── ui/                # Base components (shadcn/ui)
│   └── features/          # Feature-specific components
├── lib/
│   ├── ai.ts              # AI helpers (OpenAI + Anthropic)
│   ├── ai-response.ts     # API response helpers
│   ├── db.ts              # Database connection (optional)
│   ├── rate-limit.ts      # API rate limiting helper
│   ├── rbac.ts            # Role-based access control
│   ├── pagination.ts      # API pagination helper
│   ├── export-csv.ts      # CSV export utility
│   └── search-params.ts   # URL query param parser
├── hooks/                 # Custom React hooks
├── db/                    # Database schemas (projects → tasks example)
└── middleware.ts           # Auth middleware (activates when Clerk is configured)
docs/                       # Guides and references
scripts/                    # Setup and utility scripts
```

## How Things Work

### AI Integration

Two providers are pre-wired via Vercel AI SDK. Set your API key(s) and go.

```bash
# .env.development.local
OPENAI_API_KEY=sk-your-key
ANTHROPIC_API_KEY=sk-ant-your-key
```

```typescript
import { generateWithAI, generateTypedObject } from '@/lib/ai';
import { z } from 'zod';

// Simple text generation
const text = await generateWithAI('Summarize this article...');

// Use Anthropic instead of OpenAI
const text = await generateWithAI('Summarize this...', undefined, 'anthropic');

// Type-safe structured output (recommended for anything beyond plain text)
const result = await generateTypedObject(
  z.object({
    title: z.string(),
    summary: z.string(),
    tags: z.array(z.string()),
  }),
  'Analyze this content...',
);
// result is fully typed — no JSON parsing needed
```

**Getting API keys:**

- **OpenAI**: [platform.openai.com](https://platform.openai.com/) → API Keys → Create new key
- **Anthropic**: [console.anthropic.com](https://console.anthropic.com/) → API Keys → Create key

### API Routes

Use the `ApiResponse` helper and `withErrorHandling` wrapper:

```typescript
import { ApiResponse, withErrorHandling } from '@/lib/ai-response';

async function handlePOST(request: NextRequest) {
  const body = await request.json();
  const data = mySchema.parse(body); // Zod validates, throws on invalid
  const result = await doSomething(data);
  return ApiResponse.success({ result });
}

export const POST = withErrorHandling(handlePOST);
```

This gives you consistent error responses, validation handling, and proper status codes automatically.

### Database (Optional)

Set `DATABASE_URL` in `.env.development.local` and the database activates. Without it, the app works fine — just no database features.

```typescript
// Define schemas in src/db/schema/
export const posts = pgTable('posts', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  content: text('content'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Use in API routes
import { db } from '@/lib/db';
if (!db) return ApiResponse.error('Database not configured', 503);

const posts = await db.select().from(postsTable);
```

```bash
npm run db:push      # Sync schema to database (dev)
npm run db:generate  # Generate migration files (prod)
npm run db:studio    # Visual database browser
```

### Auth (Optional)

Set Clerk keys in `.env.development.local` and auth activates automatically. Without them, the app is fully open — no sign-in required.

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

Sign up at [clerk.com](https://clerk.com/) and create an app to get your keys.

### Analytics — PostHog (Optional)

Set your PostHog key and analytics activate automatically. Without it, no tracking code runs.

```bash
NEXT_PUBLIC_POSTHOG_KEY=phc_your-key
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

Sign up at [posthog.com](https://posthog.com/) and grab your project API key from Settings.

### Rate Limiting

Use the built-in rate limiter to protect API routes:

```typescript
import { rateLimit } from '@/lib/rate-limit';
import { ApiResponse } from '@/lib/ai-response';

const limiter = rateLimit({ interval: 60_000, limit: 10 });

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') ?? 'unknown';
  const { success } = limiter.check(ip);
  if (!success) {
    return ApiResponse.error('Too many requests', 429);
  }
  // ... handle request
}
```

### Data Tables

Use the `DataTable` component for sortable, filterable, paginated tables:

```typescript
'use client';
import { type ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@/components/ui/data-table';

const columns: ColumnDef<Task>[] = [
  { accessorKey: 'title', header: 'Title' },
  { accessorKey: 'status', header: 'Status' },
  { accessorKey: 'priority', header: 'Priority' },
];

<DataTable columns={columns} data={tasks} searchKey="title" />
```

### Forms with Validation

Use the `Form` component with react-hook-form and Zod:

```typescript
'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const schema = z.object({ name: z.string().min(1, 'Required') });

function MyForm() {
  const form = useForm({ resolver: zodResolver(schema), defaultValues: { name: '' } });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data) => console.log(data))}>
        <FormField control={form.control} name="name" render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl><Input {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
```

### Role-Based Access Control (RBAC)

Server-side (API routes / Server Components):

```typescript
import { requireRole, hasRole } from '@/lib/rbac';

// Throw if user isn't admin
await requireRole('admin');

// Check without throwing
if (await hasRole('member')) {
  /* ... */
}
```

Client-side (conditionally show UI):

```typescript
import { RoleGate } from '@/components/role-gate';

<RoleGate allowedRoles={['admin']}>
  <AdminPanel />
</RoleGate>
```

Roles: `admin` > `member` > `viewer` (hierarchical — admins can do everything members can).

### Pagination

```typescript
import { parsePagination, paginatedResponse } from '@/lib/pagination';

export async function GET(request: NextRequest) {
  const { page, limit, offset } = parsePagination(request);
  const items = await db.select().from(tasks).limit(limit).offset(offset);
  // returns { data: [...], pagination: { page, limit, total, totalPages, hasNext, hasPrev } }
  return paginatedResponse(items, totalCount, page, limit);
}
```

### Search & Filtering

```typescript
import { parseSearchParams } from '@/lib/search-params';

export async function GET(request: NextRequest) {
  const filters = parseSearchParams(request, {
    search: { type: 'string' },
    status: { type: 'enum', values: ['todo', 'in_progress', 'done'] },
    completed: { type: 'boolean' },
  });
  // Use filters to build your query
}
```

### CSV Export

```typescript
import { csvResponse } from '@/lib/export-csv';

export async function GET() {
  const data = await db.select().from(tasks);
  return csvResponse(data, 'tasks-export.csv');
}
```

## Deployment

### Vercel vs Railway — How to Choose

**Vercel** — Best for frontend-heavy apps

- Optimized for Next.js, zero config
- Serverless functions for API routes
- Automatic preview deployments on PRs
- Great for: landing pages, dashboards, SPAs, content sites

**Railway** — Best for backend-heavy apps

- Real server (not serverless)
- Persistent processes, WebSockets, cron jobs
- More control over infrastructure
- Great for: apps with background workers, real-time features, heavy processing

**Quick heuristic**: Mostly frontend with API routes? → Vercel. Need a persistent server? → Railway. Not sure? → Start with Vercel, move to Railway if you hit serverless limits.

### Deploy to Vercel

```bash
npm i -g vercel
vercel login
vercel link
vercel --prod
```

### Deploy to Railway

```bash
npm i -g @railway/cli
railway login
railway link
railway up
```

## Mobile Apps

### When to Build Native (React Native / Expo)

- You need camera, push notifications, or other native device APIs
- You want App Store / Play Store presence
- You need offline-first with local storage
- You're building something gesture-heavy (swipe, pinch, etc.)

Start with [Expo](https://expo.dev/) — it handles the hard parts. Your vibe-stack API routes can serve as the backend.

### When a PWA Is Enough

- Content-focused app (reading, browsing, forms)
- No native API requirements
- Want one codebase for web + mobile
- Don't need app store distribution

Add a `manifest.json` and service worker to this repo and you've got a PWA.

### When in Doubt

Start with a PWA. Go native when you actually need native features. You can always add Expo later and share the backend.

## MCP-First Workflow

This repo includes MCP server configs for AI coding assistants. Use them to move faster:

- **Playwright MCP** — Automate browser testing without writing boilerplate
- **Railway MCP** — Deploy, check logs, manage services from your AI assistant
- **Context7 MCP** — Look up documentation for any library inline

Configure in `.mcp.json` (Claude Code) or `.cursor/mcp.json` (Cursor).

## Code Style

The ESLint config is relaxed. It catches real bugs without getting in your way:

- `any` types are a warning, not an error
- `console.log` is fine
- Unused variables are warnings
- Floating promises are warnings

### Guidelines (Not Rules)

These are good habits that will help as your project grows:

- **Keep components focused** — one component, one job
- **Extract shared logic** — custom hooks and utility functions
- **Use TypeScript** — let the types catch bugs for you
- **Handle errors** — show users something useful when things break
- **Conventional commits** — `feat:`, `fix:`, `refactor:` make your git history readable

### Git Workflow

```bash
# Start a feature
git checkout -b feature/my-thing
# ... make changes ...
git add .
git commit -m "feat: add the thing"
git push origin feature/my-thing

# Create a PR
gh pr create --title "feat: add the thing"
```

No branch protection enforced — it's your project. But PRs are a good habit even for solo work (easy rollbacks, deployment previews).

## When You're Ready to Level Up

As your project grows, you might want to tighten things up:

### Stricter Linting

Edit `eslint.config.mjs`:

```javascript
'@typescript-eslint/no-explicit-any': 'error',    // Ban any types
'@typescript-eslint/no-floating-promises': 'error', // Require await
'no-console': ['warn', { allow: ['warn', 'error'] }], // Limit console.log
```

### Testing

- Add `data-testid` attributes to components for reliable E2E tests
- Write Playwright tests for critical user flows
- See `docs/testing-e2e.md` for patterns

### Code Review

- Require PR reviews before merging
- Add branch protection on `main`
- Set up CI to run lint + type-check + tests

### Monitoring

- Add error tracking (Sentry, LogRocket)
- Set up performance monitoring
- Add uptime checks

## Environment Variables

Copy `.env.example` to get started:

```bash
cp .env.example .env.development.local
```

All env vars are optional — the app works without any of them.

## Documentation

- [Tech Stack](docs/tech-stack.md)
- [Development Setup](docs/DEVELOPMENT.md)
- [Development Guidelines](docs/development-standards.md)
- [AI Integration](docs/AI_INTEGRATION.md)
- [ESLint Config](docs/eslint-2025.md)
- [E2E Testing](docs/testing-e2e.md)
- [Modal Patterns](docs/modal-standards.md)

---

_Build something cool. Ship it. Iterate._
