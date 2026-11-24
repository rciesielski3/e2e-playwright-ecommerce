import { Locator, Page, expect } from '@playwright/test';

import { User } from '../fixtures/user.fixture';

export class RegisterPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly agreeCheckbox: Locator;
  readonly continueButton: Locator;
  readonly heading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.getByLabel('First Name');
    this.lastNameInput = page.getByLabel('Last Name');
    this.emailInput = page.getByLabel('E-Mail');
    this.passwordInput = page.getByLabel('Password', { exact: true });
    // The privacy-policy <label> has no `for`, so it is not associated with the
    // checkbox; target the checkbox itself by its stable `name`.
    this.agreeCheckbox = page.locator('input[name="agree"]');
    this.continueButton = page.getByRole('button', { name: 'Continue' });
    this.heading = page.getByRole('heading', { level: 1 });
  }

  async goto() {
    await this.page.goto('/index.php?route=account/register');
    await expect(this.heading).toHaveText('Register Account');
  }

  async register(user: User) {
    await this.firstNameInput.fill(user.firstName);
    await this.lastNameInput.fill(user.lastName);
    await this.emailInput.fill(user.email);
    await this.passwordInput.fill(user.password);
    await this.agreeCheckbox.check();
    await this.continueButton.click();
  }

  async assertRegistrationSuccess() {
    await expect(this.page).toHaveURL(/account\/success/);
    await expect(this.heading).toHaveText('Your Account Has Been Created!');
  }
}
