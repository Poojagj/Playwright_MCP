import type { Locator, Page } from '@playwright/test';

export class PIMPage {
  readonly employeeInformationHeading: Locator;
  readonly employeeNameInput: Locator;
  readonly searchButton: Locator;
  readonly addEmployeeLink: Locator;
  readonly recordsFound: Locator;

  constructor(private readonly page: Page) {
    this.employeeInformationHeading = page.getByRole('heading', { name: 'Employee Information' });
    this.employeeNameInput = page.getByPlaceholder('Type for hints...').first();
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.addEmployeeLink = page.getByRole('link', { name: 'Add Employee' });
    this.recordsFound = page.getByText(/\(\d+\) Records? Found/);
  }

  employeeResult(name: string): Locator {
    return this.page.getByRole('row').filter({ hasText: name });
  }

  async firstEmployeeName(): Promise<string> {
    const firstEmployeeRow = this.page.getByRole('table').getByRole('row').nth(1);
    const firstName = await firstEmployeeRow.getByRole('cell').nth(2).innerText();
    const lastName = await firstEmployeeRow.getByRole('cell').nth(3).innerText();
    return `${firstName} ${lastName}`.trim();
  }
}