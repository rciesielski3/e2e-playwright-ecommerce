import { Page, expect } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/index.php?route=account/login');
  }

  async login(email: string, password: string) {
    await this.page.fill('#input-email', email);
    await this.page.fill('#input-password', password);
    await this.page.click('input[value="Login"]');
  }

  async assertLoggedIn() {
    await expect(this.page.locator('.breadcrumb')).toContainText('Account');
  }
}
