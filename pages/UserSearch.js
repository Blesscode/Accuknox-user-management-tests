import { expect } from "@playwright/test";
class UserSearch{
    constructor(page){
        this.page=page;
        this.name=this.name;
        this.username="//div[@class='oxd-grid-4 orangehrm-full-width-grid']//input[@class='oxd-input oxd-input--active' or contains(@class, 'oxd-input')]";
        this.roleDropdown = "//div[contains(@class,'oxd-grid-item oxd-grid-item--gutters')][2]//div[contains(@class, 'oxd-select-text')]";
        this.stats="//div[contains(@class,'oxd-grid-item oxd-grid-item--gutters')][4]//div[contains(@class, 'oxd-select-text--active')]";
        this.reset="//*[@id='app']/div[1]/div[2]/div[2]/div/div[1]/div[2]/form/div[2]/button[1]"; 
        this.search="//button[@class='oxd-button oxd-button--medium oxd-button--secondary orangehrm-left-space']";
    }
    async gotoSearch(){
        await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers');
    }
/////////////////////////////////////ROLE///////////////////////////////////////////
 async enterUserDetailsAdmin() {
  // Click the role dropdown
  const dropdown = this.page.locator(this.roleDropdown).first();
  await dropdown.click();

  // Define role dropdown options inline (instead of relying on this.roleOptions)
  const dropdownOptions = this.page.locator('.oxd-select-dropdown');

  // Wait and ensure dropdown is visible
  await expect(dropdownOptions).toBeVisible();

  // Click the "Admin" option from the dropdown
  await dropdownOptions.locator('text=Admin').click();

  // Optional wait to ensure stability
  await this.page.waitForTimeout(1000);

  // Click the Search button
  await this.page.locator(this.search).click();

  // Wait for results (use dynamic wait if possible in real-world case)
  await this.page.waitForTimeout(2000);
}

async enterUserDetailsEss() {
  // Click the role dropdown
  const dropdown = this.page.locator(this.roleDropdown).first();
  await dropdown.click();

  const dropdownOptions = this.page.locator('.oxd-select-dropdown');

  // Wait for dropdown and select 'ESS'
  await expect(dropdownOptions).toBeVisible();
  await dropdownOptions.locator('text=ESS').click();

  await this.page.waitForTimeout(1000);

  // Click Search button
  await this.page.locator(this.search).click();

  // Wait for search results
  await this.page.waitForTimeout(2000);
}


async getUsersByRole(expectedRole) {
  const rows = this.page.locator("//div[@class='oxd-table-card']");
  const rowCount = await rows.count();
  console.log(`    • Number of ${expectedRole} users found: ${rowCount}`);

  // Validate table header contains 'User Role'
  await expect(this.page.locator("//div[@class='oxd-table-header'][1]/div/div[3]")).toContainText('User Role');

  for (let i = 1; i <= rowCount; i++) {
    const roleCell = this.page.locator(`(//div[@class='oxd-table-card'])[${i}]//div[@role='cell'][3]`);
    const text = await roleCell.textContent();
    await expect(roleCell).toContainText(expectedRole);
    process.stdout.write("    " + text + "\n");
  }
}

////////////////////////////STATUS///////////////////////////////////////////////
 async enterUserStatusEnabled() {
  // Click the role dropdown
  const dropdown = this.page.locator(this.stats).first();
  await dropdown.click();

  // Define role dropdown options inline (instead of relying on this.roleOptions)
  const dropdownOptions = this.page.locator('.oxd-select-dropdown');

  // Wait and ensure dropdown is visible
  await expect(dropdownOptions).toBeVisible();

  // Click the "Admin" option from the dropdown
  await dropdownOptions.locator('text=Enabled').click();

  // Optional wait to ensure stability
  await this.page.waitForTimeout(1000);

  // Click the Search button
  await this.page.locator(this.search).click();

  // Wait for results (use dynamic wait if possible in real-world case)
  await this.page.waitForTimeout(2000);
}
 async enterUserStatusDisabled() {
  // Click the role dropdown
  const dropdown = this.page.locator(this.stats).first();
  await dropdown.click();

  // Define role dropdown options inline (instead of relying on this.roleOptions)
  const dropdownOptions = this.page.locator('.oxd-select-dropdown');

  // Wait and ensure dropdown is visible
  await expect(dropdownOptions).toBeVisible();

  // Click the "Admin" option from the dropdown
  await dropdownOptions.locator('text=Disabled').click();

  // Optional wait to ensure stability
  await this.page.waitForTimeout(1000);

  // Click the Search button
  await this.page.locator(this.search).click();

  // Wait for results (use dynamic wait if possible in real-world case)
  await this.page.waitForTimeout(2000);
}

    
async getUsersByStatus(expectedStatus) {
  const rows = this.page.locator("//div[@class='oxd-table-card']");
  const rowCount = await rows.count();
  console.log(`    • Number of ${expectedStatus} users found: ${rowCount}`);

  // Validate table header contains 'User Role'
  await expect(this.page.locator("//div[@class='oxd-table-header'][1]/div/div[5]")).toContainText('Status');

  for (let i = 1; i <= rowCount; i++) {
    const roleCell = this.page.locator(`(//div[@class='oxd-table-card'])[${i}]//div[@role='cell'][5]`);
    const text = await roleCell.textContent();
    await expect(roleCell).toContainText(expectedStatus);
    process.stdout.write("    " + text + "\n");
  }
}

/////////////////////////////////////////NAME

async enterUserName(name){
    await this.page.locator(this.username).fill(name);
      await this.page.locator(this.search).click();

}
async getUserByName(name){
    const rows = this.page.locator("//div[@class='oxd-table-card']");
  const rowCount = await rows.count();
  console.log(`    • Number of ${name} users found: ${rowCount}`);

  // Validate table header contains 'User Role'
  await expect(this.page.locator("//div[@class='oxd-table-header'][1]/div/div[2]")).toContainText('Username');

  for (let i = 1; i <= rowCount; i++) {
    const roleCell = this.page.locator(`(//div[@class='oxd-table-card'])[${i}]//div[@role='cell'][2]`);
    const text = await roleCell.textContent();
    await expect(roleCell).toContainText(name);
    process.stdout.write("    " + text + "\n");
  }
}

}
module.exports={UserSearch}