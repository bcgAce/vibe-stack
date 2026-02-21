# vibe-stack

@AGENT.md

# Build & Test Commands
- `npm run dev` — Turbopack dev server (port 3000)
- `npm run build` — Production build
- `npm run lint` — ESLint + type checking
- `npm run type-check` — TypeScript only
- `npm run test:e2e` — Playwright tests
- `npm run db:push` — Push schema to database
- `npm run db:generate` — Generate migration files
- `npm run db:studio` — Visual database browser

# Critical Rules
- ALWAYS use `data-testid` attributes for test selectors, NEVER use getByText()
- Optional features (DB, auth, AI) must gracefully degrade — never crash when unconfigured
- Use `ApiResponse` helper and `withErrorHandling` wrapper for all API routes
- Use conventional commits: `feat:`, `fix:`, `refactor:`
- Path alias: use `@/` for imports from `src/` (e.g., `import { db } from '@/lib/db'`)
- Prefer Server Components by default; only add `'use client'` when you need interactivity
