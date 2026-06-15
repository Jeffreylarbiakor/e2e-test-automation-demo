import { test, expect } from './fixtures/auth.fixture';

test.describe('Sort products', () => {
  test('sort Z to A puts correct product first', async ({ loggedInPage: page }) => {
    await page.selectOption('[data-test="product-sort-container"]', 'za');

    const firstProduct = page.locator('[data-test="inventory-item-name"]').first();
    await expect(firstProduct).toHaveText('Test.allTheThings() T-Shirt (Red)');
  });

  test('sort by price low to high puts cheapest product first', async ({ loggedInPage: page }) => {
    await page.selectOption('[data-test="product-sort-container"]', 'lohi');

    const prices = page.locator('[data-test="inventory-item-price"]');
    const first = await prices.first().textContent();
    const last = await prices.last().textContent();

    const parse = (s: string | null) => parseFloat((s ?? '0').replace('$', ''));
    expect(parse(first)).toBeLessThanOrEqual(parse(last));
  });
});
