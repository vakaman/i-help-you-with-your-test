# Mandatory Code Coverage Rules

Every change to the extension must include passing tests.

## Testing Rules

1. Every new or modified function must have a unit test.
2. New features that interact with the Web UI or DOM must have E2E tests.
3. Feature development is considered incomplete until all tests pass.
4. If a bug is found and fixed, a regression test must be added.
5. All code must maintain high coverage (e.g., above 80%).

## Test Location

- Unit tests should reside in `tests/unit/`.
- E2E tests should reside in `tests/e2e/`.
- Mock browsers and extensions for testing (e.g., using `jest-chrome`).
- Use Vitest or Jest for runners.
- Playwright or Puppeteer for E2E tests.
