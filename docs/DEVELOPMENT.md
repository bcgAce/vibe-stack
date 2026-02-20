# Development Setup

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:3000 and start building.

## Environment Variables

Create `.env.development.local` with whatever you need:

```bash
# AI (pick one or both)
OPENAI_API_KEY=sk-your-key
ANTHROPIC_API_KEY=sk-ant-your-key

# Database (Neon Postgres)
DATABASE_URL=postgresql://user:pass@host/db

# Auth (Clerk)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

None of these are required to start the dev server.

## Database (Optional)

Uses **Neon Postgres** with **Drizzle ORM**.

```bash
npm run db:push      # Push schema changes (development)
npm run db:generate  # Generate migration files (production)
npm run db:studio    # Open database admin UI
```

## Deployment

### Vercel
```bash
npm i -g vercel
vercel login
vercel link
vercel --prod
```

### Railway
```bash
npm i -g @railway/cli
railway login
railway link
railway up
```

## Stack

- **Framework**: Next.js 15 (App Router)
- **Database**: Neon Postgres + Drizzle ORM (optional)
- **AI**: Vercel AI SDK with OpenAI + Anthropic (optional)
- **Auth**: Clerk (optional)
- **Styling**: Tailwind CSS
- **UI**: shadcn/ui
