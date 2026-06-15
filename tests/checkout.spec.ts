import { test, expect } from './fixtures/auth.fixture';

test.describe('Checkout flow', () => {
  test('add item to cart and complete checkout', async ({ loggedInPage: page }) => {
    // Add first item to cart
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');

    // Go to cart
    await page.click('[data-test="shopping-cart-link"]');
    await expect(page.locator('[data-test="inventory-item-name"]')).toContainText('Sauce Labs Backpack');

    // Checkout step 1
    await page.click('[data-test="checkout"]');
    await page.fill('[data-test="firstName"]', 'Jane');
    await page.fill('[data-test="lastName"]', 'Doe');
    await page.fill('[data-test="postalCode"]', 'SW1A 1AA');
    await page.click('[data-test="continue"]');

    // Checkout step 2 — verify summary
    await expect(page.locator('[data-test="checkout-summary-container"]')).toBeVisible();
    await expect(page.locator('[data-test="inventory-item-name"]')).toContainText('Sauce Labs Backpack');

    // Finish
    await page.click('[data-test="finish"]');
    await expect(page.locator('[data-test="complete-header"]')).toHaveText('Thank you for your order!');
  });
});
