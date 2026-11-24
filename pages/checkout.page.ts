import { Page, Locator, expect } from '@playwright/test';
import { CheckoutUser } from '../fixtures/user.fixture';

/**
 * Single-page checkout: shipping address -> shipping method -> payment method
 * -> "Confirm Order". Each step is saved over AJAX, and the page confirms it
 * with a success alert, which we assert on instead of sleeping.
 */
export class CheckoutPage {
  private readonly page: Page;

  private readonly cartCheckoutLink: Locator;

  // Shipping address form
  private readonly firstName: Locator;
  private readonly lastName: Locator;
  private readonly address: Locator;
  private readonly city: Locator;
  private readonly postCode: Locator;
  private readonly country: Locator;
  private readonly region: Locator;
  private readonly saveAddressButton: Locator;

  // Shipping / payment method dialogs
  private readonly shippingMethodInput: Locator;
  private readonly paymentMethodInput: Locator;
  private readonly chooseShippingButton: Locator;
  private readonly shippingOption: Locator;
  private readonly saveShippingButton: Locator;
  private readonly choosePaymentButton: Locator;
  private readonly paymentOption: Locator;
  private readonly savePaymentButton: Locator;

  private readonly confirmButton: Locator;
  private readonly heading: Locator;

  constructor(page: Page) {
    this.page = page;

    this.cartCheckoutLink = page
      .locator('#checkout-cart')
      .getByRole('link', { name: 'Checkout' });

    this.firstName = page.locator('#input-shipping-firstname');
    this.lastName = page.locator('#input-shipping-lastname');
    this.address = page.locator('#input-shipping-address-1');
    this.city = page.locator('#input-shipping-city');
    this.postCode = page.locator('#input-shipping-postcode');
    this.country = page.locator('#input-shipping-country');
    this.region = page.locator('#input-shipping-zone');
    this.saveAddressButton = page.locator('#button-shipping-address');

    this.shippingMethodInput = page.locator('#input-shipping-method');
    this.paymentMethodInput = page.locator('#input-payment-method');
    this.chooseShippingButton = page.locator('#button-shipping-methods');
    this.shippingOption = page
      .locator('input[type="radio"][name="shipping_method"]')
      .first();
    this.saveShippingButton = page.locator('#button-shipping-method');
    this.choosePaymentButton = page.locator('#button-payment-methods');
    this.paymentOption = page
      .locator('input[type="radio"][name="payment_method"]')
      .first();
    this.savePaymentButton = page.locator('#button-payment-method');

    this.confirmButton = page.locator('#button-confirm');
    this.heading = page.getByRole('heading', { level: 1 });
  }

  async proceedToCheckout() {
    await this.cartCheckoutLink.click();
    await expect(this.page).toHaveURL(/checkout\/checkout/);
    await expect(this.address).toBeVisible();
  }

  async fillShippingAddress(user: CheckoutUser) {
    await this.firstName.fill(user.firstName);
    await this.lastName.fill(user.lastName);
    await this.address.fill(user.address1);
    await this.city.fill(user.city);
    await this.postCode.fill(user.postCode);
    await this.country.selectOption({ label: user.country });
    await this.region.selectOption({ label: user.region });
    await this.saveAddressButton.click();
    await expect(
      this.page.getByText('Success: You have changed shipping address'),
    ).toBeVisible();
  }

  async chooseShippingMethod() {
    await this.chooseShippingButton.click();
    await expect(this.shippingOption).toBeVisible();
    await this.shippingOption.check();
    await this.saveShippingButton.click();
    // Assert on the persisted field value: the success alert is transient.
    await expect(this.shippingMethodInput).toHaveValue(/Flat Shipping Rate/);
  }

  async choosePaymentMethod() {
    await this.choosePaymentButton.click();
    await expect(this.paymentOption).toBeVisible();
    await this.paymentOption.check();
    await this.savePaymentButton.click();
    await expect(this.paymentMethodInput).toHaveValue(/Cash On Delivery/);
  }

  async confirmOrder() {
    await this.confirmButton.click();
    await expect(this.page).toHaveURL(/checkout\/success/);
    await expect(this.heading).toHaveText('Your order has been placed!');
  }
}
