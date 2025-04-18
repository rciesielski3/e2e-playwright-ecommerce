import { test } from '@playwright/test';

import { RegisterPage } from '../../pages/register.page';
import { generateUser } from '../../fixtures/user.fixture';
import { saveUserToJson } from '../../helpers/userData';

test.describe('User Registration Flow', () => {
  test('should register new user and save credentials', async ({ page }) => {
    // Arrange
    const registerPage = new RegisterPage(page);
    const user = generateUser();

    // Act
    await registerPage.goto();
    await registerPage.register(user);

    // Assert
    await registerPage.assertRegistrationSuccess();

    // Act
    saveUserToJson(user);
  });
});
