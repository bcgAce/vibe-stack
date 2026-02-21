# Tests

This directory contains Playwright end-to-end tests.

## Run Tests

```bash
# Fast default (chromium)
npm test

# Full Playwright run (all configured browser projects)
npm run test:e2e
```

## Starter Coverage

`tests/health.spec.ts` verifies:

- `GET /api/health` returns `{ status: "ok" }`
- Homepage loads with the expected title

## Adding New Tests

Create new files ending in `.spec.ts` in this folder.

Example:

```typescript
import { test, expect } from '@playwright/test';

test('my page works', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/vibe-stack/i);
});
```
