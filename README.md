# e2e-playwright-ecommerce

[![Playwright](https://github.com/rciesielski3/e2e-playwright-ecommerce/actions/workflows/playwright.yml/badge.svg)](https://github.com/rciesielski3/e2e-playwright-ecommerce/actions/workflows/playwright.yml)

End-to-end tests in Playwright + TypeScript against the public
[LambdaTest e-commerce playground](https://ecommerce-playground.lambdatest.io).

- **Page Object Model** in `pages/` (login, register, product, checkout)
- **Fixtures and helpers** in `fixtures/` and `helpers/` (test data via faker)
- **Specs** in `tests/` (auth, checkout)
- ESLint 9 flat config with `eslint-plugin-playwright`, Prettier

```bash
npm ci
npx playwright install chromium
npm test        # run the suite
npm run lint    # ESLint
```
