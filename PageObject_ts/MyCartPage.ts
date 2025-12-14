import {expect, Page, Locator} from "@playwright/test";
export class MyCartPage {
    page : Page;
    productItem: Locator;
    checkOutBtn : Locator;

    constructor(page: Page) {
        this.page = page;
        this.productItem = this.page.locator("div li");
        this.checkOutBtn = this.page.locator("text=Checkout");
    }

    async checkOutProduct(productName: string) {
        await this.VerifyProductIsDisplayed(productName)
        await this.checkOutBtn.click();
    }

    async VerifyProductIsDisplayed(productName: string) {

        await this.productItem.first().waitFor();
        let bool = await this.page.locator("h3:has-text('" + productName + "')").isVisible();
        await expect(bool).toBeTruthy();

    }
}
module.exports = {MyCartPage};