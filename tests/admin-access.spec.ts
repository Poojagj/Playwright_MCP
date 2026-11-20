import { test, expect } from '@playwright/test';
import { AdminPage } from '../pages/AdminPage';
import { LoginPage } from '../pages/LoginPage';
import { MainNavigation } from '../pages/MainNavigation';

test.describe('Admin Module Access', () => {
  test('shows System Users and the Add button', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const navigation = new MainNavigation(page);
    const adminPage = new AdminPage(page);

    await loginPage.goto();
    await loginPage.login('Admin', 'admin123');
    await navigation.adminLink.click();

    await expect(adminPage.systemUsersHeading).toBeVisible();
    await expect(adminPage.addButton).toBeVisible();
  });
});