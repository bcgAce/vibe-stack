#!/bin/bash

# Authentication setup for vibe-stack
# Checks and authenticates CLI tools that are installed

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

ok() { echo -e "${GREEN}  [done] $1${NC}"; }
info() { echo -e "${BLUE}  [info] $1${NC}"; }
warn() { echo -e "${YELLOW}  [skip] $1${NC}"; }

echo "Checking CLI authentication..."
echo ""

# GitHub CLI
echo "1. GitHub CLI"
if command -v gh &> /dev/null; then
    if gh auth status &> /dev/null 2>&1; then
        GH_USER=$(gh api user --jq '.login' 2>/dev/null || echo "unknown")
        ok "Authenticated as $GH_USER"
    else
        info "Not authenticated — run 'gh auth login' to set up"
    fi
else
    warn "Not installed — get it at https://cli.github.com/ (optional)"
fi

# Vercel CLI
echo "2. Vercel CLI"
if command -v vercel &> /dev/null; then
    if vercel whoami &> /dev/null 2>&1; then
        VERCEL_USER=$(vercel whoami 2>/dev/null || echo "unknown")
        ok "Authenticated as $VERCEL_USER"
    else
        info "Not authenticated — run 'vercel login' to set up"
    fi
else
    warn "Not installed — run 'npm i -g vercel' if deploying to Vercel (optional)"
fi

# Railway CLI
echo "3. Railway CLI"
if command -v railway &> /dev/null; then
    if railway whoami &> /dev/null 2>&1; then
        ok "Authenticated with Railway"
    else
        info "Not authenticated — run 'railway login' to set up"
    fi
else
    warn "Not installed — run 'npm i -g @railway/cli' if deploying to Railway (optional)"
fi

echo ""
echo "All tools checked. Install and authenticate what you need — everything is optional."
