import { Page, Locator, expect } from '@playwright/test';

export class WishlistPage {
  readonly page: Page;
  readonly wishlistTable: Locator;
  readonly wishlistRows: Locator;

  constructor(page: Page) {
    this.page = page;
    this.wishlistTable = page.locator('.table-responsive');
    this.wishlistRows = this.wishlistTable.locator('tbody > tr');
  }

  async goto() {
    await this.page.goto('/index.php?route=account/wishlist');
  }

  async assertWishlistContainsProduct(productName: string) {
    await expect(this.wishlistTable).toContainText(productName);
  }

  async removeProduct(productName: string) {
    const row = this.wishlistRows.filter({ hasText: productName });
    const removeBtn = row.locator('a[data-original-title="Remove"]');
    await removeBtn.click();
  }

  async assertProductNotInWishlist(productName: string) {
    await expect(this.wishlistTable).not.toContainText(productName);
  }
}
