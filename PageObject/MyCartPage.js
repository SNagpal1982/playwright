const { expect } = require("@playwright/test");
class MyCartPage {
    constructor(page) {
        this.page = page;
        this.productItem = this.page.locator("div li");
        this.checkOutBtn = this.page.locator("text=Checkout");
    }

    async checkOutProduct(productName) {
        await this.VerifyProductIsDisplayed(productName)
        await this.checkOutBtn.click();
    }

    async VerifyProductIsDisplayed(productName) {

        await this.productItem.first().waitFor();
        let bool = await this.page.locator("h3:has-text('" + productName + "')").isVisible();
        await expect(bool).toBeTruthy();

    }
}

module.exports = { MyCartPage };
