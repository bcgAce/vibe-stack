# End-to-End Testing (Playwright)

This template uses Playwright for browser tests.

## Quick Start

```bash
npm test
```

`npm test` runs Playwright with the `chromium` project only for a fast default loop.

## Available Commands

```bash
# Fast default (chromium only)
npm test

# All configured browser projects
npm run test:e2e

# Debugging modes
npm run test:e2e:headed
npm run test:e2e:debug
npm run test:watch
```

## Current Test Structure

```text
tests/
└── health.spec.ts
```

The starter ships with a smoke test for:

- `GET /api/health`
- Homepage render/title

Add more `.spec.ts` files in `tests/` as you build features.

## Auth Behavior in Tests

When Clerk keys are set, middleware normally protects routes. During Playwright runs:

- `playwright.config.ts` starts the app with `PLAYWRIGHT_TESTING=true`
- `src/middleware.ts` bypasses auth only when:
  - `NODE_ENV !== 'production'`
  - `PLAYWRIGHT_TESTING === 'true'`

This keeps production auth behavior unchanged while making E2E tests deterministic in local/CI runs.

## CI Notes

CI installs the Chromium browser and runs:

- `npm run lint`
- `npm run type-check`
- `npm run build`
- `npm test`
