import { defineProject } from 'vitest/config';

export default defineProject({
  test: {
    browser: {
      enabled: true,
      provider: 'playwright',
      // https://vitest.dev/guide/browser/playwright
      instances: [
        {
          browser: 'chromium',
        },
      ],
    },
  },
});
