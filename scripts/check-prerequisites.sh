#!/bin/bash

# Prerequisites check for vibe-stack
# Checks what's available without failing on optional tools

echo "Checking your setup..."
echo ""

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

ok() { echo -e "${GREEN}  [ok] $1${NC}"; }
skip() { echo -e "${YELLOW}  [skip] $1${NC}"; }
info() { echo -e "${BLUE}  [info] $1${NC}"; }

echo "Core:"
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    ok "Node.js $NODE_VERSION"
else
    skip "Node.js not found — install from https://nodejs.org/"
fi

if command -v npm &> /dev/null; then
    ok "npm $(npm --version)"
else
    skip "npm not found"
fi

if [[ -d "node_modules" ]]; then
    ok "Dependencies installed"
else
    skip "Run 'npm install' to install dependencies"
fi

echo ""
echo "Optional tools:"

if command -v gh &> /dev/null; then
    ok "GitHub CLI"
else
    info "GitHub CLI not installed — install from https://cli.github.com/"
fi

if command -v vercel &> /dev/null; then
    ok "Vercel CLI"
else
    info "Vercel CLI not installed — npm i -g vercel"
fi

if command -v railway &> /dev/null; then
    ok "Railway CLI"
else
    info "Railway CLI not installed — npm i -g @railway/cli"
fi

if command -v neonctl &> /dev/null; then
    ok "Neon CLI"
else
    info "Neon CLI not installed — npm i -g neonctl (only needed for DB branching)"
fi

echo ""
echo "Environment:"
if [[ -f ".env.development.local" ]]; then
    ok ".env.development.local exists"

    if grep -q "DATABASE_URL" ".env.development.local" 2>/dev/null; then
        ok "DATABASE_URL configured"
    else
        info "DATABASE_URL not set — database features won't work"
    fi

    if grep -q "OPENAI_API_KEY\|ANTHROPIC_API_KEY" ".env.development.local" 2>/dev/null; then
        ok "AI API key configured"
    else
        info "No AI API key — AI features won't work"
    fi

    if grep -q "CLERK" ".env.development.local" 2>/dev/null; then
        ok "Clerk auth configured"
    else
        info "Clerk not configured — auth disabled (that's fine!)"
    fi
else
    info "No .env.development.local — create one when you need env vars"
fi

echo ""
echo "Port:"
if command -v lsof &> /dev/null; then
    if lsof -i :3000 &> /dev/null; then
        skip "Port 3000 is in use"
    else
        ok "Port 3000 available"
    fi
fi

echo ""
echo "You're good to go! Run 'npm run dev' to start."
