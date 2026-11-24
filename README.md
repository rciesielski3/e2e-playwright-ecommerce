# e2e-playwright-ecommerce

[![Playwright](https://github.com/rciesielski3/e2e-playwright-ecommerce/actions/workflows/playwright.yml/badge.svg)](https://github.com/rciesielski3/e2e-playwright-ecommerce/actions/workflows/playwright.yml)

End-to-end tests in Playwright + TypeScript against the public
[LambdaTest e-commerce playground](https://ecommerce-playground.lambdatest.io).

- **Page Object Model** in `pages/` (login, register, product, checkout)
- **Fixtures** in `fixtures/` (faker test data, `registeredUser` fixture)
- **Specs** in `tests/` (auth, checkout)
- ESLint 9 flat config with `eslint-plugin-playwright`, Prettier

```bash
npm ci
npx playwright install chromium
npm test        # run the suite
npm run lint    # ESLint
```

## Tests

| Spec                              | Covers                                                           |
| --------------------------------- | ---------------------------------------------------------------- |
| `tests/auth/register.spec.ts`     | Register a new user; reject registration without privacy consent |
| `tests/auth/login.spec.ts`        | Login with valid credentials; reject a wrong password            |
| `tests/checkout/checkout.spec.ts` | Login, add a product, complete the single-page checkout          |

## Test independence

No test depends on another test or on files on disk. Tests that need an account
use the `registeredUser` fixture (`fixtures/test.fixture.ts`): it registers a
fresh, uniquely named user through the UI in an isolated browser context before
the test and hands the credentials to it. Any spec can run alone, in any order.

## Notes on flakiness

The target is a public third-party demo site, so occasional slowness or UI
drift is possible. Locally there are no retries (`npm test` shows real
results); on CI (`CI=true`) one retry is enabled as a last resort, and a test
that passes only on retry is reported as "flaky" and should be investigated.
