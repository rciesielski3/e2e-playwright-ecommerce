import { test, expect } from '@playwright/test';

import { RegisterPage } from '../../pages/register.page';
import { generateUser } from '../../fixtures/user.fixture';

test.describe('User Registration Flow', () => {
  test('should register a new user', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const user = generateUser();

    await registerPage.goto();
    await registerPage.register(user);

    await registerPage.assertRegistrationSuccess();
    await expect(page.getByRole('link', { name: 'Continue' })).toBeVisible();
  });

  test('should reject registration without accepting the privacy policy', async ({
    page,
  }) => {
    const registerPage = new RegisterPage(page);
    const user = generateUser();

    await registerPage.goto();
    await registerPage.firstNameInput.fill(user.firstName);
    await registerPage.lastNameInput.fill(user.lastName);
    await registerPage.emailInput.fill(user.email);
    await registerPage.passwordInput.fill(user.password);
    await registerPage.continueButton.click();

    await expect(page).toHaveURL(/account\/register/);
    await expect(page.locator('.alert-danger')).toContainText('Privacy Policy');
  });
});
