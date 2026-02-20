#!/bin/bash

# vibe-stack setup script
# Gets you from zero to running

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

ok() { echo -e "${GREEN}  [done] $1${NC}"; }
info() { echo -e "${BLUE}  [info] $1${NC}"; }
warn() { echo -e "${YELLOW}  [skip] $1${NC}"; }

echo "Setting up vibe-stack..."
echo ""

# 1. Check Node.js
echo "1. Node.js"
if command -v node &> /dev/null; then
    ok "Node.js $(node --version)"
else
    echo "  Node.js not found. Install it from https://nodejs.org/ (v22+)"
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
    cat > .env.development.local << 'EOF'
# Uncomment and fill in what you need:

# AI (pick one or both)
# OPENAI_API_KEY=sk-your-key
# ANTHROPIC_API_KEY=sk-ant-your-key

# Database (Neon Postgres)
# DATABASE_URL=postgresql://user:pass@host/db

# Auth (Clerk)
# NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
# CLERK_SECRET_KEY=sk_test_...
EOF
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
