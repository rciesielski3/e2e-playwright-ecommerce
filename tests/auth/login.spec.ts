import { test, expect } from '../../fixtures/test.fixture';
import { LoginPage } from '../../pages/login.page';

test.describe('User Login Flow', () => {
  test('should login with valid credentials', async ({
    page,
    registeredUser,
  }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(registeredUser.email, registeredUser.password);

    await loginPage.assertLoggedIn();
    await expect(page).toHaveURL(/account\/account/);
  });

  test('should reject invalid credentials', async ({
    page,
    registeredUser,
  }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(registeredUser.email, `${registeredUser.password}x`);

    await expect(page).toHaveURL(/account\/login/);
    await expect(page.locator('.alert-danger')).toContainText(
      'No match for E-Mail Address and/or Password',
    );
  });
});
