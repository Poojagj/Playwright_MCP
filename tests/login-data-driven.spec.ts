import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { parse } from 'csv-parse/sync';
import { test, expect, type Page } from '@playwright/test';
import { DashboardPage } from '../pages/DashboardPage';
import { LoginPage } from '../pages/LoginPage';

type LoginCase = {
  Username: string;
  Password: string;
  Expected: 'Dashboard' | 'Invalid credentials';
};

const inlineCases: LoginCase[] = [
  { Username: 'Admin', Password: 'admin123', Expected: 'Dashboard' },
  { Username: 'fakeuser', Password: 'fakepass', Expected: 'Invalid credentials' },
  { Username: 'ESSUser1', Password: 'ess123', Expected: 'Invalid credentials' },
];

const csvCases = parse(
  readFileSync(resolve(__dirname, '../test_data/loginData.csv'), 'utf8'),
  { columns: true, skip_empty_lines: true, trim: true },
) as LoginCase[];

async function assertLoginResult(page: Page, loginCase: LoginCase): Promise<void> {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);

  await loginPage.goto();
  await loginPage.login(loginCase.Username, loginCase.Password);

  if (loginCase.Expected === 'Dashboard') {
    await expect(dashboardPage.heading).toBeVisible();
    return;
  }

  await expect(loginPage.invalidCredentialsMessage).toBeVisible();
}

function registerCases(
  suiteName: string,
  cases: LoginCase[],
  logoutOnSuccess: boolean,
): void {
  test.describe(suiteName, () => {
    for (const loginCase of cases) {
      test(`${loginCase.Username} expects ${loginCase.Expected}`, async ({ page }) => {
        try {
          await assertLoginResult(page, loginCase);
          if (logoutOnSuccess && loginCase.Expected === 'Dashboard') {
            await new DashboardPage(page).logout();
          }
          console.log(`PASS ${loginCase.Username}: ${loginCase.Expected}`);
        } catch (error) {
          console.error(`FAIL ${loginCase.Username}: ${loginCase.Expected}`, error);
          throw error;
        }
      });
    }
  });
}

registerCases('Data Driven Login', inlineCases, true);
registerCases('CSV Data Driven Login', csvCases, false);