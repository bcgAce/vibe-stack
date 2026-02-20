# Technology Stack

## Core
- **Node.js**: 22.x LTS
- **Framework**: Next.js 15.x (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui

## Optional
- **Database**: Neon Postgres + Drizzle ORM
- **Auth**: Clerk
- **AI**: Vercel AI SDK (OpenAI + Anthropic)

## Deployment
- **Vercel** — best for frontend-heavy apps, serverless
- **Railway** — best for backend-heavy apps, persistent processes
- Both work great with this stack

## Directory Structure
```
src/
├── app/                   # Next.js App Router (pages + API routes)
├── components/            # UI components
│   ├── ui/               # Base components (shadcn/ui)
│   └── features/         # Feature-specific components
├── lib/                   # Utilities, config, helpers
├── hooks/                 # Custom React hooks
└── db/                    # Database schemas (if using DB)
```
