import type { Locator, Page } from '@playwright/test';

export class MainNavigation {
  readonly adminLink: Locator;
  readonly pimLink: Locator;
  readonly buzzLink: Locator;

  constructor(page: Page) {
    this.adminLink = page.getByRole('link', { name: 'Admin' });
    this.pimLink = page.getByRole('link', { name: 'PIM' });
    this.buzzLink = page.getByRole('link', { name: 'Buzz' });
  }
}