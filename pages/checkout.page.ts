import { Page, Locator, expect } from '@playwright/test';
import { CheckoutUser } from '../fixtures/user.fixture';

export class CheckoutPage {
  private readonly page: Page;

  // Checkout form fields
  private readonly existingAddressSelect: Locator;
  private readonly firstName: Locator;
  private readonly lastName: Locator;
  private readonly address: Locator;
  private readonly city: Locator;
  private readonly postCode: Locator;
  private readonly country: Locator;
  private readonly region: Locator;

  // Actions
  private readonly termsLabel: Locator;
  private readonly saveButton: Locator;
  private readonly confirmButton: Locator;
  private readonly continueLink: Locator;

  // Assertions
  private readonly successHeader: Locator;

  constructor(page: Page) {
    this.page = page;

    // Form locators
    this.existingAddressSelect = page.locator(
      '#input-payment-address-existing',
    );
    this.firstName = page.locator('#input-payment-firstname');
    this.lastName = page.locator('#input-payment-lastname');
    this.address = page.locator('#input-payment-address-1');
    this.city = page.locator('#input-payment-city');
    this.postCode = page.locator('#input-payment-postcode');
    this.country = page.locator('#input-payment-country');
    this.region = page.locator('#input-payment-zone');

    // Action locators
    this.termsLabel = page.locator('label[for="input-agree"]');
    this.saveButton = page.locator('#button-save');
    this.confirmButton = page.locator('#button-confirm');
    this.continueLink = page.getByRole('link', { name: 'Continue' });

    // Assertion locators
    this.successHeader = page.locator('h1');
  }

  async proceedToCheckout() {
    await this.page.getByRole('button', { name: 'Checkout' }).click();
    await this.page.waitForURL(/checkout/);
    await this.page.waitForSelector('#form-checkout');
  }

  async fillCheckoutForm(user: CheckoutUser) {
    const isAddressVisible = await this.existingAddressSelect.isVisible();
    if (!isAddressVisible) {
      await this.firstName.fill(user.firstName);
      await this.lastName.fill(user.lastName);
      await this.address.fill(user.address1);
      await this.city.fill(user.city);
      await this.postCode.fill(user.postCode);
      await this.country.selectOption({ label: user.country });
      await this.region.selectOption({ label: user.region });
    }
  }

  async agreeToTermsAndContinue() {
    await this.termsLabel.click();
    await this.saveButton.click();
  }

  async confirmOrder() {
    await this.page.waitForURL(/confirm/);
    await this.page.waitForSelector('#content');
    await this.confirmButton.click();
    await expect(this.successHeader).toHaveText('Your order has been placed!');
  }

  async navigateToHomePageAfterOrder() {
    await this.continueLink.click();
    await this.page.waitForURL(/home/);
    await this.page.waitForSelector('#common-home');
  }
}
