import { test } from '@playwright/test';

import { readTestUser } from '../../helpers/userData';
import { LoginPage } from '../../pages/login.page';
import { ProductPage } from '../../pages/product.page';
import { WishlistPage } from '../../pages/wishlist.page';

test.describe('Wishlist Flow', () => {
  test('should login and add item to wishlist successfully', async ({
    page,
  }) => {
    const user = readTestUser();
    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);
    const wishlistPage = new WishlistPage(page);

    await loginPage.goto();
    await loginPage.login(user.email, user.password);
    await loginPage.assertLoggedIn();

    await productPage.goto();
    await productPage.addToWishlist();

    await wishlistPage.goto();
    await wishlistPage.assertWishlistContainsProduct('MacBook');
  });

  test('should remove item from wishlist', async ({ page }) => {
    const user = readTestUser();
    const loginPage = new LoginPage(page);
    const wishlistPage = new WishlistPage(page);

    await loginPage.goto();
    await loginPage.login(user.email, user.password);
    await loginPage.assertLoggedIn();

    await wishlistPage.goto();

    // Precondition: item must exist
    await wishlistPage.assertWishlistContainsProduct('MacBook');

    // Act: remove item
    await wishlistPage.removeProduct('MacBook');

    // Assert: item is no longer in wishlist
    await wishlistPage.assertProductNotInWishlist('MacBook');
  });
});
