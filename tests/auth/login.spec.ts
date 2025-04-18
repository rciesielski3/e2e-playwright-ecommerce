import { test } from '@playwright/test';

import { LoginPage } from '../../pages/login.page';
import { readTestUser } from '../../helpers/userData';

test.describe('User Login Flow', () => {
  test('should login using previously registered credentials', async ({
    page,
  }) => {
    // Arrange
    const user = readTestUser();
    const loginPage = new LoginPage(page);

    // Act
    await loginPage.goto();
    await loginPage.login(user.email, user.password);

    // Assert
    await loginPage.assertLoggedIn();
  });
});
