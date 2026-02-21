---
name: deploy
description: Build, validate, and deploy to Vercel or Railway
disable-model-invocation: true
---

# Deploy

Deploy the application: $ARGUMENTS

## Steps

1. **Pre-flight checks** — Run all validation before deploying:
   ```bash
   npm run lint
   npm run type-check
   npm run build
   ```
   Fix any errors before proceeding. Do not deploy broken code.

2. **Determine target** — If not specified in arguments, ask the user:
   - **Vercel** — Best for frontend-heavy apps (serverless, auto-preview PRs)
   - **Railway** — Best for backend-heavy apps (persistent server, WebSockets, cron)

3. **Deploy to Vercel**:
   ```bash
   # First time: link the project
   vercel link
   # Deploy to preview
   vercel
   # Deploy to production
   vercel --prod
   ```

4. **Deploy to Railway**:
   ```bash
   # First time: link the project
   railway link
   # Deploy
   railway up
   ```

5. **Set environment variables** — Remind the user to set any required env vars in their deployment platform's dashboard:
   - `DATABASE_URL` (if using database)
   - `OPENAI_API_KEY` / `ANTHROPIC_API_KEY` (if using AI)
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` / `CLERK_SECRET_KEY` (if using auth)

6. **Verify deployment** — Check the deployed URL loads correctly and key features work.
