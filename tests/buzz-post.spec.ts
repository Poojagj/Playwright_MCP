import { test, expect } from '@playwright/test';
import { BuzzPage } from '../pages/BuzzPage';
import { LoginPage } from '../pages/LoginPage';
import { MainNavigation } from '../pages/MainNavigation';

test.describe('Buzz Module Post', () => {
  test('publishes a message to the newsfeed', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const navigation = new MainNavigation(page);
    const buzzPage = new BuzzPage(page);
    const message = 'Excited for testing!';

    await loginPage.goto();
    await loginPage.login('Admin', 'admin123');
    await navigation.buzzLink.click();

    await expect(buzzPage.feedHeading).toBeVisible();
    await buzzPage.postMessage(message);
    await expect(buzzPage.postedMessage(message)).toBeVisible();
  });
});