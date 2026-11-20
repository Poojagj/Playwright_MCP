import type { Locator, Page } from '@playwright/test';

export class EmployeeProfilePage {
  readonly employeeNameHeading: Locator;

  constructor(page: Page, employeeName: string) {
    this.employeeNameHeading = page.getByRole('heading', { name: employeeName });
  }
}