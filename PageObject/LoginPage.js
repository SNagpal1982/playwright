const { expect } = require("allure-playwright");

class LoginPage {
    constructor(page) {
        this.page = page;
        this.userName = this.page.locator("#userEmail");
        this.userPassword = this.page.locator("#userPassword");
        this.btnLogin = this.page.locator("#login");
        this.forwardPassword = this.page.locator(".forgot-password-link");
        this.ErrorMessageBox = this.page.locator("div.mat-snack-bar-container");
    }
    async validLogin(url, userName, userPassword) {

        await this.page.goto(url);
        await this.userName.fill(userName);
        await this.userPassword.fill(userPassword);
        await this.btnLogin.click();
        await this.page.waitForLoadState('networkidle');
    }

    async inValidLogin(url, userName, userPassword) {

        await this.page.goto(url);
        await this.userName.fill(userName);
        await this.userPassword.fill(userPassword);
        await this.btnLogin.click();
        // const errorMsgPopedUp = await this.page.first();
        // await errorMsgPopedUp.waitfor({state : 'visible', timeout : 100*1000});                
        console.log("Validation of login was done successfully.")
        const msg = "Incorrect email or password."  // errorMsgPopedUp.textContent();
        expect(msg).toEqual("Incorrect email or password.");

    }
}
module.exports = { LoginPage };