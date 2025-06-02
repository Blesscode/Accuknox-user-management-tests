

import { test, expect } from '@playwright/test';
import { DashBoardIndex } from '../pages/DashBoardIndex';
import { LoginPage } from '../pages/LoginPage';
import { AdminManagement } from '../pages/AdminManagement';

test.describe('Admin Panel Access and User Management', () => {
  test('Admin user can navigate to User Management > Users section', async ({ page }) => {
    
    const loginPage = new LoginPage(page);
    const dashboard = new DashBoardIndex(page);
    const adminPanel = new AdminManagement(page);

    await test.step('Login to the application', async () => {
      await loginPage.gotopage();
      await loginPage.logFn('Admin', 'admin123');
    });

    await test.step('Click on Admin section from sidebar', async () => {
      await dashboard.adminWorks();
    });

    await test.step('Access User Management > Users page from top nav', async () => {
      await adminPanel.gotoadmin();    // Navigating to Admin landing page
      await adminPanel.Usercheck();    // Clicking User Management > Users
    });

    await test.step('Verify Users page is loaded', async () => {
      await expect(page).toHaveURL(/.*viewSystemUsers.*/);
      await expect(page.locator('h5')).toHaveText('System Users');
    });
  });
});

