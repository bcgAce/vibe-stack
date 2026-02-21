#!/bin/bash

# Prerequisites check for vibe-stack
# Checks what's available without failing on optional tools

echo "Checking your setup..."
echo ""

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

ok() { echo -e "${GREEN}  [ok] $1${NC}"; }
skip() { echo -e "${YELLOW}  [skip] $1${NC}"; }
info() { echo -e "${BLUE}  [info] $1${NC}"; }
fail() { echo -e "${RED}  [fail] $1${NC}"; }

ENV_FILE=".env.development.local"

get_env_value() {
    local key="$1"
    local line
    line=$(grep -E "^[[:space:]]*${key}[[:space:]]*=" "$ENV_FILE" 2>/dev/null | tail -n 1 || true)
    if [[ -z "$line" ]]; then
        return 1
    fi

    local value="${line#*=}"
    value="${value#"${value%%[![:space:]]*}"}"
    value="${value%"${value##*[![:space:]]}"}"
    value="${value#\"}"
    value="${value%\"}"
    value="${value#\'}"
    value="${value%\'}"

    if [[ -n "$value" ]]; then
        printf '%s' "$value"
        return 0
    fi
    return 1
}

has_env_value() {
    local key="$1"
    get_env_value "$key" >/dev/null
}

echo "Core:"
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version | sed 's/v//')
    NODE_MAJOR=$(echo "$NODE_VERSION" | cut -d. -f1)
    if [[ "$NODE_MAJOR" -ge 22 ]]; then
        ok "Node.js v$NODE_VERSION"
    else
        fail "Node.js v$NODE_VERSION (v22+ required)"
    fi
else
    fail "Node.js not found — install from https://nodejs.org/"
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

echo ""
echo "Environment:"
if [[ -f "$ENV_FILE" ]]; then
    ok "$ENV_FILE exists"

    if has_env_value "DATABASE_URL"; then
        ok "DATABASE_URL configured"
    else
        info "DATABASE_URL not set — database features won't work"
    fi

    if has_env_value "OPENAI_API_KEY" || has_env_value "ANTHROPIC_API_KEY"; then
        ok "AI API key configured"
    else
        info "No AI API key — AI features won't work"
    fi

    if has_env_value "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY" && has_env_value "CLERK_SECRET_KEY"; then
        ok "Clerk auth configured"
    elif has_env_value "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY" || has_env_value "CLERK_SECRET_KEY"; then
        fail "Clerk auth partially configured — set both NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY and CLERK_SECRET_KEY"
    else
        info "Clerk not configured — auth disabled (that's fine!)"
    fi
else
    info "No .env.development.local — run 'npm run setup' or copy .env.example"
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
