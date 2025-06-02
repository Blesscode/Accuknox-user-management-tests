import { test, expect } from '@playwright/test';

import { LoginPage } from '../pages/LoginPage';
import { AdminManagement } from '../pages/AdminManagement';
import { UserEdit } from '../pages/UserEdit';

test.describe('Edit User Functionality', () => {
  let userEdit;

  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.gotopage();
    await login.logFn('Admin', 'admin123');

    const admin = new AdminManagement(page);
    await admin.gotoadmin();
    await admin.Usercheck();

    userEdit = new UserEdit(page);
    await userEdit.gotoedit();
  });

  test('Edit a user by role (ESS) and update details', async ({ page }) => {
    await userEdit.SelectUsersByRole('ESS');
    await userEdit.fillUserForm('UpdatedUser123');
    await userEdit.enterEmployeeName('a');
    await userEdit.enterUserStatus('Enabled');
    await userEdit.enterUserRole('Admin');
    await userEdit.Changepassword('Admin1234');
    await userEdit.saveEditUser();

    // Optional: Add assertions here to verify the update
  });

  test('Edit a user by name (Admin123) and update details', async ({ page }) => {
    await userEdit.SelectUserByName('Admin123');
    await userEdit.fillUserForm('AdminUpdated456');
    await userEdit.enterEmployeeName('a');
    await userEdit.enterUserStatus('Enabled');
    await userEdit.enterUserRole('ESS');
    await userEdit.Changepassword('Admin1234');
    await userEdit.saveEditUser();

    // Optional: Add assertions here to verify the update
  });
});
