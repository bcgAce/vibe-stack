# vibe-stack

A batteries-included Next.js starter for building cool stuff fast. AI, database, auth — all optional, all pre-wired. Just start building.

## Get Started

Click **"Use this template"** on GitHub to create your own repo, then:

```bash
git clone https://github.com/YOUR_USERNAME/your-project.git
cd your-project
cp .env.example .env.development.local
npm install
npm run dev
```

Open http://localhost:3000 — you're up and running.

> **Repo owner**: To enable the "Use this template" button, go to your repo's Settings → check "Template repository".

## What's Included

- **Next.js 15** with App Router and TypeScript
- **Tailwind CSS** + **shadcn/ui** components
- **Dark mode** via next-themes
- **Vercel AI SDK** with OpenAI + Anthropic support
- **Postgres** + **Drizzle ORM** — works with Neon, Supabase, Railway, any provider (optional)
- **Clerk auth** (optional)
- **PostHog analytics** (optional)
- **Vercel** + **Railway** deployment support
- **Claude Code** slash commands, skills, and subagents
- **Playwright** for E2E testing
- **Prettier** + **husky** + **lint-staged** for consistent formatting
- **Security headers** out of the box
- **SEO defaults** (sitemap, robots.txt, OpenGraph metadata)
- **Error pages** (404, error boundary, loading skeletons)
- **Data tables** with sorting, filtering, pagination (TanStack Table)
- **Forms** with validation (react-hook-form + Zod)
- **RBAC** role-based access control helpers
- **Pagination**, search/filter, and CSV export utilities
- **Relational schema** example (projects → tasks)

## What Are You Building?

### Web App

You're in the right place. This repo, deploy to Vercel or Railway.

### Mobile App

If you need native device features (camera, push notifications, app store presence), check out [Expo](https://expo.dev/) with React Native. Your Next.js API routes can still serve as the backend.

### PWA (Progressive Web App)

If you want a web app that feels native on mobile (installable, offline support) but don't need native APIs — this repo works great. Add a `manifest.json` and a service worker. Good for content-focused apps where one codebase for web + mobile is ideal.

### When to go native vs PWA?

- **PWA**: Content-focused, no native APIs needed, want one codebase
- **Native (Expo)**: Need camera, push notifications, app store presence, offline-first
- **Both**: Start with PWA, go native when you actually need native features

## Optional Features

### AI — OpenAI + Anthropic

```bash
# Add to .env.development.local
OPENAI_API_KEY=sk-your-key
# and/or
ANTHROPIC_API_KEY=sk-ant-your-key
```

**Getting API keys:**

- **OpenAI**: Go to [platform.openai.com](https://platform.openai.com/) → API Keys → Create new key
- **Anthropic**: Go to [console.anthropic.com](https://console.anthropic.com/) → API Keys → Create key

Then use the helpers in `src/lib/ai.ts`:

```typescript
import { generateWithAI, generateTypedObject } from '@/lib/ai';

// Simple text generation
const text = await generateWithAI('Write a haiku about shipping fast');

// Type-safe structured output with Zod
const result = await generateTypedObject(mySchema, 'Analyze this data...');

// Use Anthropic instead of OpenAI
const text = await generateWithAI('Hello', undefined, 'anthropic');
```

### Database — Any Postgres

```bash
# Add to .env.development.local
DATABASE_URL=postgresql://user:pass@host/db
```

Works with any Postgres provider:

- **Neon** (recommended): [neon.tech](https://neon.tech/) — free tier, serverless, great DX
- **Supabase**: [supabase.com](https://supabase.com/) — free tier, comes with auth/storage too
- **Railway**: [railway.com](https://railway.com/) — deploy Postgres alongside your app
- **Local**: `postgresql://postgres:postgres@localhost:5432/mydb`

Then define schemas in `src/db/schema/` and run `npm run db:push` to sync.

### Auth — Clerk

```bash
# Add to .env.development.local
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

1. Sign up at [clerk.com](https://clerk.com/) (free tier available)
2. Create an application and copy the keys
3. That's it — auth middleware activates automatically

### Analytics — PostHog

```bash
# Add to .env.development.local
NEXT_PUBLIC_POSTHOG_KEY=phc_your-key
```

1. Sign up at [posthog.com](https://posthog.com/) (generous free tier)
2. Create a project and copy the API key
3. Analytics start tracking automatically

## Where Should I Deploy?

### Vercel (recommended for most projects)

Best for: Landing pages, marketing sites, SPAs, apps with serverless API routes.

```bash
npm i -g vercel && vercel login && vercel --prod
```

Vercel is optimized for Next.js. Zero config, automatic previews on PRs, great defaults.

### Railway (best for backend-heavy apps)

Best for: Apps with background jobs, WebSocket servers, cron tasks, persistent processes.

```bash
npm i -g @railway/cli && railway login && railway up
```

Railway gives you a real server. Better for long-running processes and more control.

### Both?

Totally valid. Use Vercel for your frontend and Railway for background workers or separate services.

**Quick heuristic**: If your app is mostly frontend with API routes → Vercel. If you need a persistent server process → Railway.

## Project Structure

```
src/
├── app/           # Pages and API routes (App Router)
├── components/    # UI components
│   ├── ui/        # Base components (shadcn/ui)
│   └── features/  # Feature-specific components
├── lib/           # Helpers (ai.ts, db.ts, ai-response.ts)
├── hooks/         # Custom React hooks
└── db/            # Database schemas (if using DB)
```

## Commands

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run lint         # Check for issues
npm run type-check   # TypeScript validation
npm run format       # Format all files with Prettier
npm run format:check # Check formatting
npm run setup        # Full environment setup
npm run check        # Check prerequisites
npm run db:push      # Push DB schema changes
npm run db:studio    # Open DB admin UI
npm test             # Run Playwright smoke tests (chromium)
npm run test:e2e     # Run Playwright tests
```

## MCP Integrations

This repo comes pre-configured with MCP servers for AI coding assistants:

- **Playwright** — browser testing and automation
- **Railway** — deploy and manage Railway services
- **Context7** — look up library documentation

See `.mcp.json` for configuration.

## Claude Code Skills

vibe-stack includes built-in skills you can invoke with slash commands:

- `/add-feature` — Scaffold a new page + API route + component
- `/add-db-table` — Create a Drizzle schema, push it, generate queries
- `/deploy` — Build, validate, and deploy to Vercel or Railway
- `/debug` — Systematic debugging with logs and browser inspection

### Recommended Community Skills

Install these to supercharge your vibe coding workflow:

```bash
# Find and discover new skills
claude skill install vercel-labs/skills/find-skills

# React best practices from Vercel
claude skill install vercel-labs/agent-skills/vercel-react-best-practices

# Web design guidelines
claude skill install vercel-labs/agent-skills/web-design-guidelines

# Next.js patterns
claude skill install vercel-labs/next-skills/next-best-practices

# Frontend design methodology
claude skill install anthropics/skills/frontend-design

# Structured debugging
claude skill install obra/superpowers/systematic-debugging

# Test-driven development
claude skill install obra/superpowers/test-driven-development

# Web app testing patterns
claude skill install anthropics/skills/webapp-testing
```

Browse all available skills at [skills.sh](https://skills.sh/).

## Subagents

vibe-stack includes custom subagents for isolated code review:

- **code-reviewer** — Reviews for bugs, security issues, and pattern violations
- **ui-reviewer** — Checks visual quality, accessibility, and responsive design

Use them by telling Claude: _"Use a subagent to review this code"_ or _"Use the ui-reviewer to check this page."_

---

Built with good defaults so you don't have to make decisions. Just start building.
