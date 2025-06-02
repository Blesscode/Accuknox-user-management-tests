
import { test, expect } from '@playwright/test';
import { DashBoardIndex } from '../pages/DashBoardIndex';
import { LoginPage } from '../pages/LoginPage';

test.describe('Dashboard Access & Admin Verification', () => {

  test('User should be able to login and access Admin panel from Dashboard', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const dashboard = new DashBoardIndex(page);

    // Step 1: Go to login page
    await test.step('Navigate to login page', async () => {
      await loginPage.gotopage();
    });

    // Step 2: Perform login
    await test.step('Login with valid credentials', async () => {
      await loginPage.logFn('Admin', 'admin123');
    });

    // Step 3: Navigate directly to dashboard index
    await test.step('Navigate to Admin Dashboard Index page', async () => {
      await dashboard.gotoindex();
    });

    // Step 4: Check if Admin tab is visible
    await test.step('Verify if Admin menu item is visible', async () => {
      await dashboard.isadmin();
    });

    // Step 5: Interact with the Admin menu
    await test.step('Click Admin and verify it works', async () => {
      await dashboard.adminWorks();
    });
  });
});
