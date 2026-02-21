# Vibe Stack

## From idea to live product with Claude Code

**A starter kit and step-by-step guide for building with AI.** This repo gives you a production-ready codebase with database, auth, AI, and deployment pre-wired — plus the instructions to go from "I have an idea" to "it's live" even if you've never coded before.

You bring the idea. Claude Code (your AI pair programmer) does the building. This guide walks you through every step. Start with a web app — and when you're ready, go mobile with [Expo](https://expo.dev/) using the same backend.

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

### Accounts you might need

Based on your spec's tech requirements, Claude will walk you through setting up the relevant accounts during `/setup`. All have free tiers — you won't pay anything to get started.

**If your spec needs a database** → [Neon](https://neon.tech/) (recommended)
A **database** is where your app stores information — user profiles, posts, orders, whatever your app saves. Neon gives you a Postgres database in the cloud for free. Think of it like a spreadsheet your app can read and write to, but way faster and more powerful.

**If your spec needs user sign-in** → [Clerk](https://clerk.com/)
Handles the entire login/signup flow so you don't have to build it yourself — passwords, email verification, "forgot password," all of it. A few thousand users on the free tier.

**If your spec needs AI features** → [OpenAI](https://platform.openai.com/) or [Anthropic](https://console.anthropic.com/)
Lets your app use AI models (like ChatGPT or Claude) to generate text, analyze data, or do anything "smart." You'll get an **API key** — basically a password that lets your app talk to their servers.

**When you're ready to deploy** → [Vercel](https://vercel.com/) or [Railway](https://railway.com/)
**Deploying** means putting your app on the internet so other people can use it. Vercel is the easiest option — connect your GitHub repo and it handles everything. Railway is better if your app needs background tasks or always-on processes.

**None of these are required to start building.** The app runs locally without any of them. Claude will prompt you to set them up when your project actually needs them.

### What's an environment variable?

When you sign up for these services, they'll give you **API keys** — secret passwords that let your app connect to them. You store these in a file called `.env.development.local` that lives in your project but never gets uploaded to GitHub (it's automatically hidden from git for security).

Claude handles creating this file and telling you which keys to paste where. You just copy from the service's website and paste when Claude asks.

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

Git is the version control system that tracks changes to your code. It's how developers save their work, undo mistakes, and collaborate. GitHub is where your git repo lives online. Here's the handful of commands that matter:

```bash
git add .                    # Stage all your changes
git commit -m "what I did"   # Save a snapshot with a message
git push                     # Upload to GitHub
git status                   # See what's changed
```

Once you deploy (later in this guide), `git push` does double duty — it saves your code to GitHub **and** triggers your hosting provider (Vercel or Railway) to automatically deploy the latest version. Push your code, your site updates. That's it.

Don't worry about memorizing these — Claude Code handles most git operations for you. When you want to save your work, just tell Claude: _"commit and push my changes"_ and it'll do the right thing.

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

**You'll be prompted to approve things a lot.** Claude Code asks permission before running commands, installing packages, or making changes to your files. This is a safety feature, not a warning sign — **saying yes is safe.** As you get comfortable, you can tell Claude to stop asking for specific commands, or press the "always allow" option.

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
- **Mobile-ready** — your API routes double as a backend for [Expo](https://expo.dev/) / React Native when you're ready to go native

---

## Optional Features

Everything below is opt-in. `/setup` handles most of this for you — this section is here as a reference if you need to add something later or set it up manually.

Each feature is activated by adding keys to your `.env.development.local` file (the one Claude created during setup). No keys = feature stays off. No crashes, no errors.

### AI — OpenAI + Anthropic

Add your key(s) and your app can generate text, analyze data, and more:

- Get an OpenAI key: [platform.openai.com](https://platform.openai.com/) → API Keys
- Get an Anthropic key: [console.anthropic.com](https://console.anthropic.com/) → API Keys

Claude already knows how to use these in your code — just describe the AI feature you want and it'll wire it up.

### Database — Any Postgres

Your app needs somewhere to store data. [Neon](https://neon.tech/) is recommended (free tier, takes 2 minutes to set up), but [Supabase](https://supabase.com/), [Railway](https://railway.com/), and local Postgres all work.

Once connected, you can browse your data visually:

```bash
npm run db:studio    # Opens a visual database browser
```

### Auth — Clerk

Adds login, signup, and user management. Create an app at [clerk.com](https://clerk.com/), copy the keys, and auth activates automatically — including protected routes and role-based access.

### Analytics — PostHog

Tracks how people use your app. Sign up at [posthog.com](https://posthog.com/) (generous free tier), grab your project API key, and tracking starts automatically.

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
