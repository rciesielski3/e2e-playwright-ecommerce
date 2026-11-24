import { test as base, expect } from '@playwright/test';

import { RegisterPage } from '../pages/register.page';
import { User, generateUser } from './user.fixture';

type Fixtures = {
  /**
   * A brand-new account registered through the UI for each test, in an
   * isolated browser context so the test's own page starts logged out.
   * Nothing is written to disk, so tests can run in any order or in parallel.
   */
  registeredUser: User;
};

export const test = base.extend<Fixtures>({
  registeredUser: async ({ browser }, use) => {
    const user = generateUser();
    const context = await browser.newContext();
    try {
      const page = await context.newPage();
      const registerPage = new RegisterPage(page);
      await registerPage.goto();
      await registerPage.register(user);
      await registerPage.assertRegistrationSuccess();
    } finally {
      await context.close();
    }
    await use(user);
  },
});

export { expect };
