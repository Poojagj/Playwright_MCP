import type { Locator, Page } from '@playwright/test';

export class DashboardPage {
  readonly heading: Locator;
  private readonly profileMenu: Locator;
  private readonly logoutMenuItem: Locator;

  constructor(page: Page) {
    this.heading = page.getByRole('heading', { name: 'Dashboard' });
    this.profileMenu = page.getByRole('banner').getByRole('img', { name: 'profile picture' });
    this.logoutMenuItem = page.getByRole('menuitem', { name: 'Logout' });
  }

  async logout(): Promise<void> {
    await this.profileMenu.click();
    await this.logoutMenuItem.click();
  }
}