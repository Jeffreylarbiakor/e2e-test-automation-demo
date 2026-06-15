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

    // Must use page.evaluate so the fetch goes through the browser network stack
    // where page.route() can intercept it. page.request.get() bypasses routing.
    await page.goto('about:blank');
    const body = await page.evaluate(async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts/1');
      return res.json();
    });

    expect(body.title).toBe('stubbed post title from fixture');
    expect(body.userId).toBe(99);
  });
});
