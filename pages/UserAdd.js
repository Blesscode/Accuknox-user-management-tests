import { expect } from "@playwright/test";
class UserAdd{
    constructor(page){
        this.page=page;
        this.addButton="//button[@class='oxd-button oxd-button--medium oxd-button--secondary']";
        this.userrole="//div[contains(@class,'oxd-grid-item oxd-grid-item--gutters')][1]//div[contains(@class, 'oxd-select-text')]";
        this.employeename="//*[@id='app']/div[1]/div[2]/div[2]/div/div/form/div[1]/div/div[2]/div/div[2]/div/div/input";
        this.status="//label[contains(text(),'Status')]/ancestor::div[contains(@class,'oxd-input-group')]//div[contains(@class,'oxd-select-text')]";
        this.username="//*[@id='app']/div[1]/div[2]/div[2]/div/div/form/div[1]/div/div[4]/div/div[2]/input";
        this.password="//*[@id='app']/div[1]/div[2]/div[2]/div/div/form/div[2]/div/div[1]/div/div[2]/input";
        this.confirmpassword="//*[@id='app']/div[1]/div[2]/div[2]/div/div/form/div[2]/div/div[2]/div/div[2]/input";
        this.cancel="//*[@id='app']/div[1]/div[2]/div[2]/div/div/form/div[3]/button[1]";
        this.save="//*[@id='app']/div[1]/div[2]/div[2]/div/div/form/div[3]/button[2]";
    }
    async gotoAdd(){
        await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/admin/saveSystemUser');
    }
    async fillUserForm( uname, pwd , pwd2) {
        await this.page.locator(this.username).fill(uname);
        await this.page.locator(this.password).fill(pwd);
        await this.page.locator(this.confirmpassword).fill(pwd2);
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
    

    async validateConfirmPasswordMatch(expectedPwd) {
    const confirmPwdValue = await this.page.locator(this.confirmpassword).inputValue();
    
    if (confirmPwdValue !== expectedPwd) {
        throw new Error(`Confirm password does not match the original password.\nExpected: ${expectedPwd}, Got: ${confirmPwdValue}`);
    }
    }
  
    async saveForm() {
        await this.page.locator(this.save).click();
    }


    async cancelForm() {
      await this.page.locator(this.cancel).click();
    }

    
}
module.exports={UserAdd}