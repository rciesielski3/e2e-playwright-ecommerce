import { Locator, Page, expect } from '@playwright/test';

export class ProductPage {
  readonly page: Page;
  readonly addToCartButton: Locator;
  readonly addToWishlistButton: Locator;
  readonly toastBody: Locator;
  readonly cartIcon: Locator;
  readonly cartDrawer: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addToCartButton = page.getByRole('button', { name: 'Add to Cart' });
    this.addToWishlistButton = page.locator('button.btn-wishlist-48');
    this.toastBody = page.locator('.toast-body');
    this.cartIcon = page.locator('.cart-icon').first();
    this.cartDrawer = page.locator('#cart-total-drawer');
  }

  async goto() {
    await this.page.goto('/index.php?route=product/product&product_id=47');
  }

  async addToCart() {
    await this.addToCartButton.click();
    await expect(this.toastBody).toContainText('Success: You have added');
  }

  async goToCart() {
    await this.cartIcon.click();
    await expect(this.cartDrawer).toBeVisible();
  }

  async addToWishlist() {
    await this.addToWishlistButton.click();
    await expect(this.toastBody).toContainText('Success: You have added');
  }
}
