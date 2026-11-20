import { test, expect } from '@playwright/test';
import { AddEmployeePage } from '../pages/AddEmployeePage';
import { EmployeeProfilePage } from '../pages/EmployeeProfilePage';
import { LoginPage } from '../pages/LoginPage';
import { MainNavigation } from '../pages/MainNavigation';
import { PIMPage } from '../pages/PIMPage';

test.describe('Add New Employee', () => {
  test('creates an employee and displays the employee profile', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const navigation = new MainNavigation(page);

    await loginPage.goto();
    await loginPage.login('Admin', 'admin123');
    await navigation.pimLink.click();

    const pimPage = new PIMPage(page);
    await pimPage.addEmployeeLink.click();
    await new AddEmployeePage(page).addEmployee('John123', 'Doe456');

    const profilePage = new EmployeeProfilePage(page, 'John123 Doe456');
    await expect(page).toHaveURL(/\/pim\/viewPersonalDetails\/empNumber\/\d+$/);
    await expect(profilePage.employeeNameHeading).toBeVisible();
  });
});