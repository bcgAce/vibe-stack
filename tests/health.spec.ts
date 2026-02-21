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

  test('sign-in route renders without ClerkProvider runtime error', async ({ page }) => {
    await page.goto('/sign-in');
    await expect(page.locator('body')).not.toContainText(
      'useSession can only be used within the <ClerkProvider /> component.',
    );

    const clerkEnabled =
      !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && !!process.env.CLERK_SECRET_KEY;

    if (!clerkEnabled) {
      await expect(page.getByText('Auth is not configured')).toBeVisible();
    }
  });
});
