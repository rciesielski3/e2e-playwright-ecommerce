import { Locator, Page, expect } from '@playwright/test';

export class ProductPage {
  readonly page: Page;
  readonly addToCartButton: Locator;
  readonly successAlert: Locator;
  readonly cartIcon: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addToCartButton = page.getByRole('button', { name: 'Add to Cart' });
    this.successAlert = page.locator('.alert-success');
    this.cartIcon = page.getByRole('link', { name: 'Shopping Cart' }).first();
  }

  async goto() {
    await this.page.goto('/index.php?route=product/product&product_id=47');
  }

  async addToCart() {
    await this.addToCartButton.click();
    await expect(this.successAlert).toContainText('Success: You have added');
  }

  async goToCart() {
    await this.cartIcon.click();
    await expect(this.page).toHaveURL(/checkout\/cart/);
    await expect(
      this.page.getByRole('heading', { name: /Shopping Cart/ }),
    ).toBeVisible();
  }
}
