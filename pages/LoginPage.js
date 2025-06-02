
class LoginPage{
    constructor(page){
        this.page=page;
        
        this.usernameBox='input.oxd-input[placeholder="Username"]';
        this.passwordBox='input.oxd-input[placeholder="Password"]';
        this.login='button.oxd-button';
        this.toggle='i.oxd-userdropdown-icon';
        this.logout="//ul[contains(@class, 'oxd-dropdown-menu')]//a[text()='Logout']";
    }
   async gotopage(){
    await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
     waitUntil: 'domcontentloaded'
   }
   async logFn(username,password) {
    await this.page.locator(this.usernameBox).fill(username);
    await this.page.locator(this.passwordBox).fill(password);
    await this.page.locator(this.login).click();
   
   }

   async logoutFn(){
   await this.page.locator(this.toggle).click();
    await this.page.locator(this.logout).click();

   }

}
module.exports={LoginPage};
