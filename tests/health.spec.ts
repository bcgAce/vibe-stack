import { test, expect } from '@playwright/test';

test.describe('Health Check', () => {
  test('GET /api/health returns ok', async ({ request }) => {
    const response = await request.get('/api/health');

    expect(response.ok()).toBeTruthy();

    const body = await response.json();
    expect(body.status).toBe('ok');
    expect(body.timestamp).toBeTruthy();
  });

  test('homepage loads successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/vibe-stack/i);
  });
});
