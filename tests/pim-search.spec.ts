import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { MainNavigation } from '../pages/MainNavigation';
import { PIMPage } from '../pages/PIMPage';

test.describe('Search Employee', () => {
  test('searches for an employee in PIM', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const navigation = new MainNavigation(page);
    const pimPage = new PIMPage(page);

    await loginPage.goto();
    await loginPage.login('Admin', 'admin123');
    await navigation.pimLink.click();

    await expect(pimPage.employeeInformationHeading).toBeVisible();
    const employeeName = await pimPage.firstEmployeeName();
    await pimPage.employeeNameInput.fill(employeeName);
    await pimPage.searchButton.click();
    await expect(pimPage.recordsFound).toBeVisible();
  });
});