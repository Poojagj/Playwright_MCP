import type { Locator, Page } from '@playwright/test';

export class BuzzPage {
  readonly feedHeading: Locator;
  readonly messageInput: Locator;
  readonly postButton: Locator;

  constructor(private readonly page: Page) {
    this.feedHeading = page.getByText('Buzz Newsfeed', { exact: true });
    this.messageInput = page.getByRole('textbox', { name: "What's on your mind?" });
    this.postButton = page.getByRole('button', { name: 'Post', exact: true });
  }

  async postMessage(message: string): Promise<void> {
    await this.messageInput.fill(message);
    await this.postButton.click();
  }

  postedMessage(message: string): Locator {
    return this.page.getByText(message, { exact: true }).first();
  }
}