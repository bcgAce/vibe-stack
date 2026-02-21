# vibe-stack

**A starter kit and step-by-step guide for building web apps with AI.** This repo gives you a production-ready codebase with database, auth, AI, and deployment pre-wired — plus the instructions to go from "I have an idea" to "it's live" even if you've never coded before.

You bring the idea. Claude Code (your AI pair programmer) does the building. This guide walks you through every step.

---

## How This Works

1. You follow this guide to get set up (takes ~15 minutes)
2. You write a short spec describing your app idea
3. You create your own copy of this repo — a ready-to-go codebase with everything wired up
4. You type `/setup` in Claude Code and paste your spec
5. Claude configures your app and you start building features in plain English

**Already have accounts and tools installed?** Skip ahead to [Step 1](#step-1-write-your-spec). Not everyone starts from zero.

---

## Table of Contents

- [Step 0: Prerequisites](#step-0-prerequisites) — two accounts, two installs
- [Step 1: Write Your Spec](#step-1-write-your-spec) — describe what you're building
- [Step 2: Create Your Repo](#step-2-create-your-repo) — clone the template
- [Step 3: Set Up Claude Code](#step-3-set-up-claude-code) — your AI pair programmer
- [Step 4: Run Setup](#step-4-run-setup) — Claude configures everything
- [Step 5: Start Building](#step-5-start-building) — the fun part
- [What's Included](#whats-included) — everything in the box
- [Optional Features](#optional-features) — add when you need them
- [Deploying](#deploying) — ship it
- [Reference](#reference) — commands, structure, tools

---

## Step 0: Prerequisites

Two accounts and two installs. Skip anything you've already got.

### 1. A GitHub account

Where your code lives. If you don't have one: [github.com/signup](https://github.com/signup). Free. Takes 2 minutes.

### 2. An Anthropic account

Powers your AI coding assistant. Sign up at [anthropic.com](https://www.anthropic.com/) — you'll need either API access or a Max subscription.

### 3. Install VS Code

Your code editor. Download it at [code.visualstudio.com](https://code.visualstudio.com/). Install it, open it. That's it.

You'll use VS Code's built-in terminal to run commands. Open it with:

- **Mac**: <kbd>Ctrl</kbd> + <kbd>`</kbd> (backtick — the key above Tab)
- **Windows/Linux**: <kbd>Ctrl</kbd> + <kbd>`</kbd>

Or go to **View → Terminal** from the menu. This is where you'll type every command in this guide.

### 4. Install Claude Code

Claude Code is your AI pair programmer. It lives in your terminal, reads your codebase, and builds features from plain English. One command to install:

**Mac / Linux:**

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

**Windows** (PowerShell):

```powershell
irm https://claude.ai/install.ps1 | iex
```

Close and reopen your terminal, then verify it worked:

```bash
claude --version
```

If you see a version number, you're good. It auto-updates, so you never have to think about this again.

> **Windows note**: Claude Code on Windows requires [Git Bash](https://git-scm.com/downloads/win). The installer will tell you if it's missing.

> **Already use Cursor or another AI editor?** This template works with any AI coding assistant, but the slash commands and skills are built for Claude Code. The setup scripts (`npm run setup`) work everywhere.

---

## Step 1: Write Your Spec

Before you touch code, spend 5 minutes describing what you're building. This isn't busywork — Claude uses your spec to set up exactly the right database tables, pages, and features.

Open [ChatGPT](https://chat.openai.com) or [Claude](https://claude.ai) and use the [spec prompt](docs/SPEC_PROMPT.md). It'll ask you to describe your idea, then generate a structured spec with:

- App name and one-liner
- User stories (what people can do)
- Data model (what the app stores)
- Pages (what screens exist)
- Tech requirements (auth? database? AI?)

Save the output. You'll paste it during setup.

> **Don't overthink it.** A few sentences about your idea is enough. The spec prompt does the heavy lifting. You can always change things later — this is a starting point, not a contract.

---

## Step 2: Create Your Repo

A **repo** (repository) is a folder for your project that lives on GitHub. It tracks every change you make, so you can always undo mistakes. Think of it as a save-file system for your entire project.

### Create your copy

Click **"Use this template"** on the [GitHub repo page](https://github.com/bcgAce/vibe-stack). Give it a name (your project name works great), then click **Create repository**.

### Clone it to your computer

"Cloning" just means downloading your repo so you can work on it locally. In your VS Code terminal:

```bash
git clone https://github.com/YOUR_USERNAME/your-project.git
cd your-project
```

Replace `YOUR_USERNAME` and `your-project` with your actual GitHub username and repo name.

### Git basics you'll need

Git saves snapshots of your code called **commits**. Here's the handful of commands that matter:

```bash
git add .                    # Stage all your changes
git commit -m "what I did"   # Save a snapshot with a message
git push                     # Upload to GitHub
git status                   # See what's changed
```

Don't worry about memorizing these — Claude Code handles most git operations for you. When you want to save your work, just tell Claude: _"commit my changes"_ and it'll do the right thing.

---

## Step 3: Set Up Claude Code

Open your project folder and launch Claude Code:

```bash
cd your-project
claude
```

First time? Claude will walk you through authenticating with your Anthropic account.

Once you're in the Claude Code session, set up GitHub access:

```
/gh-setup
```

This installs the GitHub CLI and authenticates you. Lets you create PRs, manage issues, and deploy — all from the terminal.

---

## Step 4: Run Setup

Still in Claude Code, type:

```
/setup
```

Claude will:

1. Check your environment and install anything missing
2. Ask you to paste your spec
3. Set up the features your app needs (database, auth, AI — only what's relevant)
4. Create your database schema based on your spec's data model
5. Start the dev server and verify everything works

Open [localhost:3000](http://localhost:3000). You should see your app running.

> **No Claude Code?** Run `npm run setup` in a regular terminal for basic environment setup, then copy `.env.example` to `.env.development.local` and fill in the values you need.

---

## Step 5: Start Building

Now the good part. Tell Claude what to build:

```
/add-feature user can create and edit blog posts with a rich text editor
```

```
/add-db-table comments table — belongs to a post, has author name and body
```

```
/backlog add search functionality to the posts page
```

Or just describe what you want in plain English. Claude reads your codebase and builds features that follow the existing patterns.

### Useful commands

| Command                       | What it does                                   |
| ----------------------------- | ---------------------------------------------- |
| `/add-feature [description]`  | Scaffold a page + API route + component        |
| `/add-db-table [description]` | Create a database table and typed queries      |
| `/backlog [idea]`             | Capture an idea to GitHub Issues for later     |
| `/debug [description]`        | Systematic debugging with logs and screenshots |
| `/lint`                       | Check for code issues                          |
| `/test`                       | Run end-to-end tests                           |
| `/build`                      | Production build                               |

### Your backlog

Ideas come fast. Capture them before they evaporate:

```bash
# In Claude Code
/backlog add dark mode toggle to settings

# Or from the terminal
gh issue create --label idea --title "Add dark mode toggle"

# View your backlog
gh issue list --label idea
```

---

## What's Included

Everything is pre-wired. Nothing crashes when it's not configured.

- **Next.js 15** — App Router, TypeScript, Turbopack
- **Tailwind CSS + shadcn/ui** — looks good out of the box
- **Dark mode** — via next-themes
- **AI integration** — OpenAI + Anthropic via Vercel AI SDK (optional)
- **Postgres + Drizzle ORM** — any provider, graceful without it (optional)
- **Clerk auth** — sign-in, roles, middleware (optional)
- **PostHog analytics** — event tracking, user analytics (optional)
- **Security headers** — CSP, HSTS, X-Frame-Options, and friends
- **Secret scanning** — pre-commit hook blocks accidental API key commits
- **SEO defaults** — sitemap, robots.txt, OpenGraph metadata
- **E2E testing** — Playwright, ready to go
- **Data tables** — sorting, filtering, pagination (TanStack Table)
- **Forms + validation** — react-hook-form + Zod
- **Rate limiting, RBAC, pagination, CSV export** — the boring stuff, already done
- **Claude Code skills** — slash commands and subagents for common workflows

---

## Optional Features

Everything below is opt-in. Add env vars when you need them, ignore when you don't.

### AI — OpenAI + Anthropic

```bash
# .env.development.local
OPENAI_API_KEY=sk-your-key
ANTHROPIC_API_KEY=sk-ant-your-key
```

Get keys: [OpenAI](https://platform.openai.com/) | [Anthropic](https://console.anthropic.com/)

```typescript
import { generateWithAI, generateTypedObject } from '@/lib/ai';

const text = await generateWithAI('Write a haiku about shipping fast');
const structured = await generateTypedObject(myZodSchema, 'Analyze this data...');
```

### Database — Any Postgres

```bash
# .env.development.local
DATABASE_URL=postgresql://user:pass@host/db
```

Providers: [Neon](https://neon.tech/) (recommended, free tier) | [Supabase](https://supabase.com/) | [Railway](https://railway.com/) | local Postgres

```bash
npm run db:push      # Sync schema to database
npm run db:studio    # Visual database browser
```

### Auth — Clerk

```bash
# .env.development.local
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

Get keys: [clerk.com](https://clerk.com/) — create an app, copy the keys. Auth middleware activates automatically.

### Analytics — PostHog

```bash
# .env.development.local
NEXT_PUBLIC_POSTHOG_KEY=phc_your-key
```

Get key: [posthog.com](https://posthog.com/) — generous free tier. Tracking activates automatically.

---

## Deploying

### Vercel — best for most projects

Optimized for Next.js. Zero config. Automatic preview deployments on PRs.

```bash
npm i -g vercel && vercel login && vercel --prod
```

### Railway — best for backend-heavy apps

Real server. WebSockets, cron jobs, background workers, persistent processes.

```bash
npm i -g @railway/cli && railway login && railway up
```

**Quick rule**: Mostly frontend with API routes? Vercel. Need a persistent server? Railway. Not sure? Start with Vercel.

---

## Reference

### Commands

```bash
npm run dev          # Start dev server (port 3000)
npm run build        # Production build
npm run lint         # ESLint + type checking
npm run type-check   # TypeScript only
npm run format       # Prettier format all files
npm run setup        # Full environment setup
npm run check        # Validate prerequisites
npm run db:push      # Push schema to database
npm run db:studio    # Visual database browser
npm test             # Run Playwright tests
```

### Project structure

```
src/
├── app/           # Pages and API routes (App Router)
├── components/
│   ├── ui/        # Base components (shadcn/ui)
│   └── features/  # Feature-specific components
├── lib/           # Helpers (ai, db, auth, rate-limit, etc.)
├── hooks/         # Custom React hooks
└── db/            # Database schemas
docs/              # Guides and references
scripts/           # Setup and utility scripts
tests/             # Playwright E2E tests
```

### Claude Code skills

| Skill           | What it does                                          |
| --------------- | ----------------------------------------------------- |
| `/setup`        | Full environment setup with spec-driven configuration |
| `/add-feature`  | Scaffold a page + API route + component               |
| `/add-db-table` | Create a Drizzle schema, push it, generate queries    |
| `/backlog`      | Quick-capture ideas to GitHub Issues                  |
| `/debug`        | Systematic debugging with logs and browser inspection |
| `/deploy`       | Build, validate, and deploy to Vercel or Railway      |

### Subagents

Tell Claude to use these for isolated review:

- **code-reviewer** — bugs, security issues, pattern violations
- **ui-reviewer** — visual quality, accessibility, responsive design

Example: _"Use the code-reviewer to review my changes"_

### MCP integrations

Pre-configured in `.mcp.json`:

- **Playwright** — browser testing and automation
- **Railway** — deploy and manage services
- **Context7** — look up library documentation inline

### Recommended community skills

```bash
claude skill install vercel-labs/skills/find-skills
claude skill install vercel-labs/agent-skills/vercel-react-best-practices
claude skill install vercel-labs/agent-skills/web-design-guidelines
claude skill install vercel-labs/next-skills/next-best-practices
claude skill install anthropics/skills/frontend-design
claude skill install obra/superpowers/systematic-debugging
```

Browse more at [skills.sh](https://skills.sh/).

---

Built with good defaults so you can focus on the interesting parts. Now go build something.
