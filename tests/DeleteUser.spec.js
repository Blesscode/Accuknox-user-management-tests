import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { UserSearch } from '../pages/UserSearch';
import { DeleteUser } from '../pages/DeleteUser';

test.describe('Delete User Functionality', () => {
  let searchUser, deleteUser;

  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.gotopage();
    await login.logFn('Admin', 'admin123');

    searchUser = new UserSearch(page);
    deleteUser = new DeleteUser(page);
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers');
  });

  test('Delete a user and verify it is removed from the UI', async ({ page }) => {
    const targetUsername = 'UserName23'; 

    //select user
    await searchUser.enterUserDetailsEss();
    // Delete the user   
    await deleteUser.DeleteUsersByRole( 'ESS');

    // Confirm the delete in modal
    const confirmBtn = page.locator('.oxd-button--label-danger'); // red "Yes, Delete" button
    await expect(confirmBtn).toBeVisible();
    await confirmBtn.click();

    // Wait for UI to update
    await page.waitForTimeout(2000);

    // Search to confirm the user no longer exists
    await searchUser.gotoSearch();
    await searchUser.enterUserName(targetUsername);
    await searchUser.getUserByName(targetUsername);

  });
  test('Delete a user by name and verify it is removed from the UI', async ({ page }) => {
    const targetUsername = 'Admin123'; 

    //select user
    await searchUser.enterUserName(targetUsername);
     const userExists = await searchUser.getUserByName(targetUsername);
   
    // Delete the user   
    if(  userExists){
        await deleteUser.DeleteUserByName( targetUsername);
         // Confirm the delete in modal
    const confirmBtn = page.locator('.oxd-button--label-danger'); // red "Yes, Delete" button
    await expect(confirmBtn).toBeVisible();
    await confirmBtn.click();

    // Wait for UI to update
    await page.waitForTimeout(2000);

    // Search to confirm the user no longer exists
    await searchUser.gotoSearch();
    await searchUser.enterUserName(targetUsername);
    await searchUser.getUserByName(targetUsername);
    } else {
    console.log(`User ${targetUsername} does not exist, skipping delete.`);
  }
 

   

  });
});
