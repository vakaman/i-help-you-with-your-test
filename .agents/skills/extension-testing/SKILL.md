---
name: Extension Testing Specialist
description: Specialist in unit and E2E testing for Google Chrome extensions.
---

# Extension Testing Specialist Skill

This skill focuses on ensuring the quality, reliability, and correctness of Google Chrome extensions.

### Testing capabilities:
- **Unit Testing**: Testing individual functions and components in isolation.
    - Use Vitest or Jest.
    - Mock the Chrome API (`jest-chrome`, `sinon-chrome`).
    - Test content scripts, service workers, and popup logic.
- **E2E Testing**: Testing the entire user flow from installation to UI interaction.
    - Use Playwright or Puppeteer.
    - Test the extension's popup UI.
    - Test the interaction of content scripts with a real web page.
    - Validate the messaging between components.
- **Integration Testing**: Ensuring scripts communicate correctly via Message APIs.
- **Mocking and Stubs**: Creating fake Chrome contexts to run tests without a browser.

### Best Practices:
- Always mock `chrome.runtime` and `chrome.storage`.
- Use `wait` helpers for asynchronous Chrome API calls.
- Separate business logic from Chrome API calls for easier testing.
- Include regression tests for all bug fixes.

### Keywords:
- `jest`, `vitest`, `playwright`, `puppeteer`, `jest-chrome`, `mock`, `e2e`, `unit`.
