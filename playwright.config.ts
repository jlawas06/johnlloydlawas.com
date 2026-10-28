import { defineConfig } from '@playwright/test';

/**
 * UI regression checks (tests/ui.spec.ts). Runs against a production build:
 *
 *   npm run build && npx playwright test
 *
 * Set UI_BASE_URL to test an already-running server instead.
 */
const baseURL = process.env.UI_BASE_URL ?? 'http://localhost:3000';

export default defineConfig({
  testDir: 'tests',
  fullyParallel: true,
  reporter: [['list']],
  use: {
    baseURL,
    browserName: 'chromium',
    reducedMotion: 'reduce',
  },
  webServer: process.env.UI_BASE_URL
    ? undefined
    : {
        command: 'npm run start',
        url: baseURL,
        reuseExistingServer: true,
        timeout: 60_000,
      },
});
