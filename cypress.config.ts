import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'https://www.saucedemo.com',
    supportFile: false,
    pageLoadTimeout: 120000,
    retries: { runMode: 2, openMode: 0 },
  },
});
