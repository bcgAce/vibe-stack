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
│   └── db.ts              # Database connection (optional)
├── hooks/                 # Custom React hooks
├── db/                    # Database schemas
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
  'Analyze this content...'
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

## Documentation

- [Tech Stack](docs/tech-stack.md)
- [Development Setup](docs/DEVELOPMENT.md)
- [Development Guidelines](docs/development-standards.md)
- [AI Integration](docs/AI_INTEGRATION.md)
- [ESLint Config](docs/eslint-2025.md)
- [E2E Testing](docs/testing-e2e.md)
- [Modal Patterns](docs/modal-standards.md)

---

*Build something cool. Ship it. Iterate.*
