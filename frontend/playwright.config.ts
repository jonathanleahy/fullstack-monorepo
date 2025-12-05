import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright configuration for E2E testing
 * Run with: pnpm --filter @repo/frontend test:e2e
 */
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    baseURL: 'http://localhost:3001',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  /* Run local dev server before tests */
  webServer: [
    {
      command: 'cd ../backend && go run ./cmd/api',
      url: 'http://localhost:8082/health',
      reuseExistingServer: true,
      timeout: 120000,
    },
    {
      command: 'pnpm dev',
      url: 'http://localhost:3001',
      reuseExistingServer: true,
      timeout: 60000,
    },
  ],
});
