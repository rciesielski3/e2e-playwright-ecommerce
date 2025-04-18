import { Page, expect } from '@playwright/test';

export class RegisterPage {
  constructor(private page: Page) {}

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
    await this.page.fill('#input-firstname', user.firstName);
    await this.page.fill('#input-lastname', user.lastName);
    await this.page.fill('#input-email', user.email);
    await this.page.fill('#input-telephone', user.phone);
    await this.page.fill('#input-password', user.password);
    await this.page.fill('#input-confirm', user.password);
    await this.page.click('label[for="input-agree"]');
    await this.page.click('input[value="Continue"]');
  }

  async assertRegistrationSuccess() {
    await expect(this.page.locator('h1')).toHaveText(
      'Your Account Has Been Created!',
    );
  }
}
