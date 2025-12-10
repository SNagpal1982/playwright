
class LoginPage {
    constructor(page) {
        this.userName = page.locator("#userEmail");
        this.userPassword = page.locator("#userPassword");
        this.btnLogin = page.locator("#login");
        this.forwardPassword = page.locator(".forgot-password-link");
        this.page = page;
    }
    async validLogin(url, userName, userPassword) {

        await this.page.goto(url);
        await this.userName.fill(userName);
        await this.userPassword.fill(userPassword);
        await this.btnLogin.click();
        await this.page.waitForLoadState('networkidle');
    }
}
module.exports = { LoginPage };