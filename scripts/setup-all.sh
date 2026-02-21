#!/bin/bash

# vibe-stack setup script
# Gets you from zero to running

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

ok() { echo -e "${GREEN}  [done] $1${NC}"; }
info() { echo -e "${BLUE}  [info] $1${NC}"; }
warn() { echo -e "${YELLOW}  [skip] $1${NC}"; }
fail() { echo -e "${RED}  [fail] $1${NC}"; }

echo "Setting up vibe-stack..."
echo ""

# 1. Check Node.js
echo "1. Node.js"
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version | sed 's/v//')
    NODE_MAJOR=$(echo "$NODE_VERSION" | cut -d. -f1)
    if [[ "$NODE_MAJOR" -ge 22 ]]; then
        ok "Node.js v$NODE_VERSION"
    else
        fail "Node.js v$NODE_VERSION found, but v22+ is required"
        echo ""
        if command -v nvm &> /dev/null; then
            echo "  Run: nvm install 22 && nvm use 22"
        elif command -v brew &> /dev/null; then
            echo "  Run: brew install node"
        else
            echo "  Download Node.js 22+ from https://nodejs.org/"
        fi
        exit 1
    fi
else
    fail "Node.js not found"
    echo ""
    if command -v brew &> /dev/null; then
        echo "  Run: brew install node"
    else
        echo "  Download Node.js 22+ from https://nodejs.org/"
    fi
    echo ""
    echo "  Then re-run: npm run setup"
    exit 1
fi

# 2. Install dependencies
echo "2. Dependencies"
if [[ -d "node_modules" ]]; then
    ok "Already installed"
else
    npm install
    ok "Installed"
fi

# 3. Create env file if needed
echo "3. Environment"
if [[ -f ".env.development.local" ]]; then
    ok ".env.development.local exists"
else
    cp .env.example .env.development.local
    ok "Created .env.development.local (edit it to add your keys)"
fi

# 4. Optional tools
echo "4. Optional tools"

if command -v gh &> /dev/null; then
    ok "GitHub CLI installed"
else
    info "GitHub CLI not installed — get it at https://cli.github.com/"
fi

if command -v vercel &> /dev/null; then
    ok "Vercel CLI installed"
else
    info "Vercel CLI not installed — run 'npm i -g vercel' if deploying to Vercel"
fi

if command -v railway &> /dev/null; then
    ok "Railway CLI installed"
else
    info "Railway CLI not installed — run 'npm i -g @railway/cli' if deploying to Railway"
fi

echo ""
echo "Setup complete! Run 'npm run dev' to start building."
echo ""
echo "Optional features (add to .env.development.local when ready):"
echo "  Database — Neon, Supabase, Railway, or local Postgres"
echo "  Auth     — Clerk (clerk.com)"
echo "  AI       — OpenAI or Anthropic API key"
echo ""
echo "Everything works without these — just start building."
