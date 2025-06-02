import {expect} from '@playwright/test'
class UserEdit{
    constructor(page){
        this.page=page;
         this.userrole="//div[contains(@class,'oxd-grid-item oxd-grid-item--gutters')][1]//div[contains(@class, 'oxd-select-text')]";
         this.employeename="//*[@id='app']/div[1]/div[2]/div[2]/div/div/form/div[1]/div/div[2]/div/div[2]/div/div/input";
         this.status="//label[contains(text(),'Status')]/ancestor::div[contains(@class,'oxd-input-group')]//div[contains(@class,'oxd-select-text')]";
         this.username="//div[contains(@class,'oxd-grid-item oxd-grid-item--gutters')][4]//input[contains(@class, 'oxd-input')]";
         this.passwordCheckbox="//*[@id='app']/div[1]/div[2]/div[2]/div/div/form/div[1]/div/div[5]/div/div[2]/div/label/span";
         this.confirmpassword="//*[@id='app']/div[1]/div[2]/div[2]/div/div/form/div[2]/div/div[2]/div/div[2]/input";
         this.password="//*[@id='app']/div[1]/div[2]/div[2]/div/div/form/div[2]/div/div[1]/div/div[2]/input";
         this.save="//div[contains(@class,'oxd-form-actions')]//button[normalize-space()='Save']";
         this.cancel="//div[contains(@class,'oxd-form-actions')]//button[normalize-space()='Cancel']";

    }
    async gotoedit(){
                await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers');
    
    }

   async SelectUsersByRole(expectedRole) {
  const rows = this.page.locator("//div[@class='oxd-table-card']");
  const rowCount = await rows.count();
  console.log(`    • Number of ${expectedRole} users found: ${rowCount}`);

  // Validate table header contains 'User Role'
  await expect(this.page.locator("//div[@class='oxd-table-header'][1]/div/div[3]")).toContainText('User Role');
 this.page.locator("(//div[@class='oxd-table-card'])[1]//div[@role='cell'][3]");

  this.page.locator("(//div[@class='oxd-table-card'])[1]//div[@role='cell'][6]//button[2]").click();
   }
async SelectUserByName(name){
  const rows = this.page.locator("//div[@class='oxd-table-card']");
  const rowCount = await rows.count();
  console.log(`    • Number of ${name} users found: ${rowCount}`);

  // Validate table header contains 'User Role'
  await expect(this.page.locator("//div[@class='oxd-table-header'][1]/div/div[2]")).toContainText('Username');
  this.page.locator(`(//div[@class='oxd-table-card'])[1]//div[@role='cell'][2]`);
  this.page.locator("(//div[@class='oxd-table-card'])[1]//div[@role='cell'][6]//button[2]").click();

}

    


async fillUserForm( uname) {
      if (uname.length < 5) {
          throw new Error(`Username must be at least 5 characters. Provided: "${uname}"`);
      }
      await this.page.locator(this.username).fill(uname);
       
    }
async Changepassword(pwd){

  const passwordCriteria = {
    length: pwd.length >= 7,
    uppercase: /[A-Z]/.test(pwd),
    lowercase: /[a-z]/.test(pwd),
    number: /[0-9]/.test(pwd)
  };

  const failedCriteria = Object.entries(passwordCriteria)
    .filter(([_, valid]) => !valid)
    .map(([key]) => key);

  if (failedCriteria.length > 0) {
    throw new Error(`Password must meet all criteria. Failed: ${failedCriteria.join(', ')}`);
  }


  await this.page.locator(this.passwordCheckbox).click();

  await this.page.locator(this.password).fill(pwd);
  await this.page.locator(this.confirmpassword).fill(pwd);

}



 async enterEmployeeName(partialName) {
    // Type partial name into the employee input field
    const empInput = this.page.locator(this.employeename);
    await empInput.fill(''); // clear it first
    await empInput.type(partialName, { delay: 100 }); // simulate human typing
     // Wait for suggestions to appear
  const listbox = this.page.locator('div[role="listbox"]');
  await expect(listbox).toBeVisible({ timeout: 5000 });

  const options = listbox.locator('.oxd-autocomplete-option');

  const count = await options.count();

  for (let i = 0; i < count; i++) {
    const option = options.nth(i);
    const text = await option.textContent();

    if (text && text.includes(partialName)) {
      await option.click();
      break;
    }
  }

}
    async enterUserStatus(status) {
      // Click the role dropdown
      const dropdown = this.page.locator(this.status).first();
      await dropdown.click();
    
      // Define role dropdown options inline (instead of relying on this.roleOptions)
      const dropdownOptions = this.page.locator('.oxd-select-dropdown');
    
      // Wait and ensure dropdown is visible
      await expect(dropdownOptions).toBeVisible();
    
      // Click the "Admin" option from the dropdown
      await dropdownOptions.locator(`text=${status}`).click();
    
      // Optional wait to ensure stability
      await this.page.waitForTimeout(1000);

    }
    async enterUserRole(role) {
      // Click the role dropdown
      const dropdown = this.page.locator(this.userrole).first();
      await dropdown.click();
    
      // Define role dropdown options inline (instead of relying on this.roleOptions)
      const dropdownOptions = this.page.locator('.oxd-select-dropdown');
    
      // Wait and ensure dropdown is visible
      await expect(dropdownOptions).toBeVisible();
    
      // Click the "Admin" option from the dropdown
      await dropdownOptions.locator(`text=${role}`).click();
    
      // Optional wait to ensure stability
      await this.page.waitForTimeout(1000);

    }

    async saveEditUser(){
      await this.page.locator(this.save).waitFor({ state: 'visible', timeout: 5000 });
await this.page.locator(this.save).click();

    }
    async cancleEditUser(){
      await this.page.locator(this.cancel).click();
    }
}
module.exports={UserEdit};