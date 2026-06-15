import { test, expect } from '@playwright/test';

test.describe('Login', () => {
  test('valid credentials redirect to inventory page', async ({ page }) => {
    await page.goto('/');
    await page.fill('[data-test="username"]', 'standard_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');

    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.locator('[data-test="inventory-list"]')).toBeVisible();
  });
});
