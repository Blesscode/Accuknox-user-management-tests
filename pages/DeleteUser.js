import {expect} from '@playwright/test'
class DeleteUser{
    constructor(page){
        this.page=page;
        this.deletebtn='';

    }


async DeleteUsersByRole(expectedRole) {
  const rows = this.page.locator("//div[@class='oxd-table-card']");
  const rowCount = await rows.count();
  console.log(`    • Number of ${expectedRole} users found: ${rowCount}`);

  // Validate table header contains 'User Role'
  await expect(this.page.locator("//div[@class='oxd-table-header'][1]/div/div[3]")).toContainText('User Role');
 this.page.locator("(//div[@class='oxd-table-card'])[1]//div[@role='cell'][3]");

  this.page.locator("(//div[@class='oxd-table-card'])[1]//div[@role='cell'][6]//button[1]").click();

}
async DeleteUserByName(name){
  const rows = this.page.locator("//div[@class='oxd-table-card']");
  const rowCount = await rows.count();
  console.log(`    • Number of ${name} users found: ${rowCount}`);

  // Validate table header contains 'User Role'
  await expect(this.page.locator("//div[@class='oxd-table-header'][1]/div/div[2]")).toContainText('Username');
  this.page.locator(`(//div[@class='oxd-table-card'])[1]//div[@role='cell'][2]`);
  this.page.locator("(//div[@class='oxd-table-card'])[1]//div[@role='cell'][6]//button[1]").click();

}

}

module.exports={DeleteUser};