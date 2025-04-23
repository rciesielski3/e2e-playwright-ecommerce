import { test, expect } from '@playwright/test';

import { readTestUser } from '../../helpers/userData';
import { LoginPage } from '../../pages/login.page';
import { ProductPage } from '../../pages/product.page';
import { CheckoutPage } from '../../pages/checkout.page';
import { generateCheckoutUser } from '../../fixtures/user.fixture';

test.describe('Full Checkout Flow', () => {
  test('should login, add item to cart, and complete checkout', async ({
    page,
  }) => {
    // Arrange
    const user = readTestUser();
    const checkoutData = generateCheckoutUser();

    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Act: Login
    await loginPage.goto();
    await loginPage.login(user.email, user.password);

    // Assert: Logged in
    await loginPage.assertLoggedIn();

    // Act: Add product to cart
    await productPage.goto();
    await productPage.addToCart();
    await productPage.goToCart();

    // Act: Go to checkout
    await checkoutPage.proceedToCheckout();

    // Assert: Checkout page loaded
    await expect(page.locator('#form-checkout')).toBeVisible();

    // Act: Fill and submit checkout form
    await checkoutPage.fillCheckoutForm(checkoutData);
    await checkoutPage.agreeToTermsAndContinue();

    // Assert: Payment page loaded
    await expect(page).toHaveURL(/confirm/);

    // Act + Assert: Confirm order
    await checkoutPage.confirmOrder(); // includes header text assertion

    // Act + Assert: Return to home
    await checkoutPage.navigateToHomePageAfterOrder();
    await expect(page).toHaveURL(/home/);
    await expect(page.locator('#common-home')).toBeVisible();
  });
});
