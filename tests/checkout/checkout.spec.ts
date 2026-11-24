import { test, expect } from '../../fixtures/test.fixture';

import { LoginPage } from '../../pages/login.page';
import { ProductPage } from '../../pages/product.page';
import { CheckoutPage } from '../../pages/checkout.page';
import { generateCheckoutUser } from '../../fixtures/user.fixture';

test.describe('Full Checkout Flow', () => {
  test('should login, add item to cart, and complete checkout', async ({
    page,
    registeredUser: user,
  }) => {
    // Arrange
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

    // Act: Complete the single-page checkout
    await checkoutPage.fillShippingAddress(checkoutData);
    await checkoutPage.chooseShippingMethod();
    await checkoutPage.choosePaymentMethod();

    // Act + Assert: Confirm order (asserts success URL and heading)
    await checkoutPage.confirmOrder();
    await expect(page).toHaveURL(/checkout\/success/);
  });
});
