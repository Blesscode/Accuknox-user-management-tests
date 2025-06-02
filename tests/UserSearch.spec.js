import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { UserSearch } from '../pages/UserSearch';

test.describe('User Search Scenarios', () => {
  let searchPage;

  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.gotopage();
    await login.logFn('Admin', 'admin123');

    searchPage = new UserSearch(page);
    await searchPage.gotoSearch();
  });

  test('Search with valid username input', async () => {
    await test.step('Enter known username and search', async () => {
      await searchPage.enterUserName('Admin');
      await searchPage.getUserByName('Admin');
    });
  });

  test('Search with invalid username input', async () => {
    await test.step('Enter unknown username and verify zero results', async () => {
      await searchPage.enterUserName('UnknownUser12345');
      const resultRows = await searchPage.page.locator("//div[@class='oxd-table-card']").count();
      expect(resultRows).toBe(0); // Expecting no results
    });
  });

  test('Search with role: Admin', async () => {
    await test.step('Select Admin role and search', async () => {
      await searchPage.enterUserDetailsAdmin();
      await searchPage.getUsersByRole('Admin');
    });
  });

  test('Search with role: ESS', async () => {
    await test.step('Select ESS role and search', async () => {
      await searchPage.enterUserDetailsEss();
      await searchPage.getUsersByRole('ESS');
    });
  });

  test('Search with status: Enabled', async () => {
    await test.step('Select Enabled status and search', async () => {
      await searchPage.enterUserStatusEnabled();
      await searchPage.getUsersByStatus('Enabled');
    });
  });

  test('Search with status: Disabled', async () => {
    await test.step('Select Disabled status and search', async () => {
      await searchPage.enterUserStatusDisabled();
      await searchPage.getUsersByStatus('Disabled');
    });
  });

  test('Search with mixed filters (valid)', async () => {
    await test.step('Combine username + Admin role + Enabled status', async () => {
      await searchPage.enterUserName('Admin');
      await searchPage.enterUserDetailsAdmin();
      await searchPage.enterUserStatusEnabled();
      const resultRows = await searchPage.page.locator("//div[@class='oxd-table-card']").count();
      expect(resultRows).toBeGreaterThan(0); // Expecting at least one match
    });
  });

  test('Search with mixed filters (invalid)', async () => {
    await test.step('Use random values to ensure no match found', async () => {
      await searchPage.enterUserName('InvalidUser');
      await searchPage.enterUserDetailsEss();
      await searchPage.enterUserStatusDisabled();
      const resultRows = await searchPage.page.locator("//div[@class='oxd-table-card']").count();
      expect(resultRows).toBe(0); // Expecting no results
    });
  });
});
