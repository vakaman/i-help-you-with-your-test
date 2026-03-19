# Project Structure Rules

This rule defines the structure of the Chrome Extension project and the responsibilities of each directory.

## Directory Structure

- `manifest.json`: The core of the Chrome extension, defining permissions, files, and core settings.
- `popup.html`: The user interface for the extension's popup.
- `styles/`: Contains CSS files for styling the popup and content scripts.
- `popup.js`: Script for handling interactions within the popup.
- `content.js`: Script that runs in the context of web pages.
- `utils/`: Common utility functions shared across scripts.
- `generators/`: Scripts or logic for generating extension components.
- `.agents/`: AI-specific configurations, rules, and skills.
    - `rules/`: Custom rules for the AI agents.
    - `skills/`: Specialized skills for the AI agents.
- `tests/`: Directory for unit and E2E tests.

## Rules
1. Maintain strict separation of concerns between `popup.js`, `content.js`, and `background` (if added).
2. All new components must adhere to the existing folder structure.
3. Utility functions must be placed in `utils/`.
