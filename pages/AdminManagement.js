class AdminManagement{
    constructor(page){
        this.page=page;
        // this.userManag='//*[@id="app"]/div[1]/div[1]/header/div[2]/nav/ul/li[1]';
        //this.Userpage='//*[@id="app"]/div[1]/div[1]/header/div[2]/nav/ul/li[1]/ul/li/a';
        this.userManag = 'nav[aria-label="Topbar Menu"] >> text=User Management';
        this.Userpage = 'a.oxd-topbar-body-nav-tab-link:has-text("Users")';


    }

    async gotoadmin(){
         await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers');
    }


    async Usercheck(){
        await this.page.locator(this.userManag).click();
        await this.page.locator(this.Userpage).click();
    }

}
module.exports={AdminManagement};