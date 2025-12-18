const { expect } = require("@playwright/test");
class MyCartPage {
    constructor(page) {
        this.page = page;
        this.cartDashboard = this.page.locator("[routerlink*='/cart']");
        this.productItem = this.page.locator("div li");
        this.checkOutBtn = this.page.locator("text=Checkout");
    }

    async checkOutProduct(productName) {
        await this.goToCart();
        await this.VerifyProductIsDisplayed(productName)
        await this.checkOutBtn.click();
    }

    async VerifyProductIsDisplayed(productName) {

        await this.productItem.first().waitFor();
        let bool = await this.page.locator("h3:has-text('" + productName + "')").isVisible();
        await expect(bool).toBeTruthy();

    }
    async goToCart() {
        await this.cartDashboard.click();
    }
}

module.exports = { MyCartPage };
