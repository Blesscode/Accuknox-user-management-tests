import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { UserAdd } from '../pages/UserAdd';
import { UserSearch } from '../pages/UserSearch';

test.describe('Add User Functionality', () => {
  let addUser, searchUser;

  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.gotopage();
    await login.logFn('Admin', 'admin123');

    addUser = new UserAdd(page);
    searchUser = new UserSearch(page);
    await addUser.gotoAdd();
  });

  test('Add user with all valid fields', async () => {
    const username = 'admin_test_' + Date.now();

    await addUser.enterUserRole('Admin');
    await addUser.enterEmployeeName('A'); // Picks one matching "A"
    await addUser.enterUserStatus('Enabled');
    await addUser.fillUserForm(username, 'Password123!', 'Password123!');
    await addUser.validateConfirmPasswordMatch('Password123!');
    await addUser.saveForm();

    await searchUser.gotoSearch();
    await searchUser.enterUserName(username);
    await searchUser.getUserByName(username);
  });

  test('Add user with mismatched password and confirm password', async () => {
    await addUser.enterUserRole('Admin');
    await addUser.enterEmployeeName('A');
    await addUser.enterUserStatus('Enabled');
    await addUser.fillUserForm('admin_mismatch', 'Password123!', 'WrongPass123');

    await expect(async () => {
      await addUser.validateConfirmPasswordMatch('Password123!');
    }).rejects.toThrow(/Confirm password does not match/);
  });

  test('Add user with missing required fields (username/password)', async () => {
    await addUser.enterUserRole('ESS');
    await addUser.enterEmployeeName('A');
    await addUser.enterUserStatus('Enabled');
    // Leave username and password blank
    await addUser.saveForm();

    const usernameField = addUser.page.locator(addUser.username);
    await expect(usernameField).toHaveAttribute('class', /--error/);
  });

  test('Cancel user creation form', async () => {
    await addUser.enterUserRole('ESS');
    await addUser.enterEmployeeName('A');
    await addUser.fillUserForm('cancel_test', 'Password123!', 'Password123!');
    await addUser.cancelForm();

    await expect(addUser.page).not.toHaveURL(/saveSystemUser/); 
  });

  test('Employee name suggestion box shows up on partial input', async () => {
    const empInput = addUser.page.locator(addUser.employeename);
    await empInput.fill('');
    await empInput.type('a');

    const suggestions = addUser.page.locator('div[role="listbox"]');
    await expect(suggestions).toBeVisible();
  });
});
