import { test, expect } from '@playwright/test';
import fixtureData from './api-fixtures/posts.json';

test.describe('Network mock via page.route()', () => {
  test('intercepts GET /posts/1 and returns fixture JSON', async ({ page }) => {
    await page.route('https://jsonplaceholder.typicode.com/posts/1', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(fixtureData),
      });
    });

    const response = await page.request.get('https://jsonplaceholder.typicode.com/posts/1');
    const body = await response.json();

    expect(response.status()).toBe(200);
    expect(body.title).toBe('stubbed post title from fixture');
    expect(body.userId).toBe(99);
  });
});
