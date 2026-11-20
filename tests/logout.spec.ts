import { test, expect } from '@playwright/test';
import { DashboardPage } from '../pages/DashboardPage';
import { LoginPage } from '../pages/LoginPage';

test.describe('Logout Functionality', () => {
  test('logs out and returns to the login page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.goto();
    await loginPage.login('Admin', 'admin123');
    await expect(dashboardPage.heading).toBeVisible();

    await dashboardPage.logout();

    await expect(page).toHaveURL(/\/auth\/login$/);
    await expect(loginPage.usernameInput).toBeVisible();
  });
});