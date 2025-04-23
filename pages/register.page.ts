import { Locator, Page, expect } from '@playwright/test';

export class RegisterPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly agreeCheckbox: Locator;
  readonly continueButton: Locator;
  readonly successHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator('#input-firstname');
    this.lastNameInput = page.locator('#input-lastname');
    this.emailInput = page.locator('#input-email');
    this.phoneInput = page.locator('#input-telephone');
    this.passwordInput = page.locator('#input-password');
    this.confirmPasswordInput = page.locator('#input-confirm');
    this.agreeCheckbox = page.locator('label[for="input-agree"]');
    this.continueButton = page.locator('input[value="Continue"]');
    this.successHeader = page.locator('h1');
  }

  async goto() {
    await this.page.goto('/index.php?route=account/register');
  }

  async register(user: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
  }) {
    await this.firstNameInput.fill(user.firstName);
    await this.lastNameInput.fill(user.lastName);
    await this.emailInput.fill(user.email);
    await this.phoneInput.fill(user.phone);
    await this.passwordInput.fill(user.password);
    await this.confirmPasswordInput.fill(user.password);
    await this.agreeCheckbox.click();
    await this.continueButton.click();
  }

  async assertRegistrationSuccess() {
    await expect(this.successHeader).toHaveText(
      'Your Account Has Been Created!',
    );
  }
}
