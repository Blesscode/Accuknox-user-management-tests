import {expect} from '@playwright/test'
class DashBoardIndex{
    constructor(page){
        this.page=page;
        this.admin='//*[@id="app"]/div[1]/div[1]/aside/nav/div[2]/ul/li[1]/a';
        this.doNothing='i.bi-chevron-left';
        this.openINDEX='i.bi-chevron-right';
    }
    async gotoindex(){
         await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers');
    }
    // //for full index view
    // async expandedcheck(){
    //    if(this.page.locator(this.openINDEX).isVisible()){
    //         await this.page.click(this.openINDEX)
    //     }
    // }

    //find if admin present or not
    async isadmin(){
        const adminoption=await this.page.locator(this.admin);
        await expect(adminoption).toBeVisible();
    }

    //select admin
    async adminWorks(){
        await this.page.click(this.admin);
    }

}
module.exports={DashBoardIndex};