import { Locator, Page } from "@playwright/test";

export class LoginPage {

    userName : Locator;
    userPassword : Locator;
    btnLogin : Locator;
    forwardPassword: Locator;
    page : Page;
    constructor(page: Page) {
        this.userName = page.locator("#userEmail");
        this.userPassword = page.locator("#userPassword");
        this.btnLogin = page.locator("#login");
        this.forwardPassword = page.locator(".forgot-password-link");
        this.page = page;
    }
    async validLogin(url : string, userName : string, userPassword: string) {

        await this.page.goto(url);
        await this.userName.fill(userName);
        await this.userPassword.fill(userPassword);
        await this.btnLogin.click();
        await this.page.waitForLoadState('networkidle');
    }
}
module.exports = {LoginPage};