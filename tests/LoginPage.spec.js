import {test,expect} from '@playwright/test'
import { LoginPage} from '../pages/LoginPage'


test.describe('Login Scenarios', () => {
  test('1. Valid credentials - should login and logout', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.gotopage();
    await loginPage.logFn('Admin', 'admin123');

    // Assert dashboard is visible
    await expect(page.locator('h6')).toHaveText('Dashboard');

    // Logout
    await loginPage.logoutFn();
  });

  test('2. Invalid credentials - should show error', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.gotopage();
    await loginPage.logFn('Admins', 'admin12');

    await expect(page.locator('.oxd-alert-content-text')).toHaveText('Invalid credentials');
  });

  test('3. Empty credentials - should show required validation', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.gotopage();
    await loginPage.logFn('', '');

    await expect(page.locator('.oxd-input-field-error-message')).toHaveCount(2); // Username and Password required
  });

  test('4. No password - should show password required error', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.gotopage();
    await loginPage.logFn('Admin', '');

    await expect(page.locator('.oxd-input-field-error-message')).toHaveText('Required');
  });
});
