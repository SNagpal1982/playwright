const { expect } = require('@playwright/test');
class PlaceOrderPage {

    constructor(page) {
        this.page = page;
        this.creditCardLabel = this.page.locator("text=Credit Card");
        this.creditCardTxtBox = this.page.locator("div input");
        this.creditCardExpiry = this.page.locator(".small select");
        this.country = this.page.locator("[placeholder*='Country']");
        this.emailLabel = this.page.locator(".user__name label");
        this.emailValue = this.page.locator(".user__name [type='text']").first();
        this.submitBtn = this.page.locator(".action__submit");
        this.orderConfirmation = this.page.locator(".hero-primary");
        this.orderId = this.page.locator(".em-spacer-1 .ng-star-inserted");
        this.dropdown = this.page.locator(".ta-results");
    }

    async placeOrder(placeOrderDetails) {
        await this.searchCountryAndSelect(placeOrderDetails.countryCode, placeOrderDetails.countryName);
        await this.getValidateData(placeOrderDetails.email);
        await this.submitBtn.click();
        await expect(this.orderConfirmation).toHaveText(placeOrderDetails.orderConfirmationText);
        return (await this.orderId.textContent());
    }

    async searchCountryAndSelect(countryCode, countryName) {

        await this.country.pressSequentially(countryCode);
        await this.dropdown.waitFor();
        const optionsList = this.dropdown.locator("button");
        const optionsCount = await this.dropdown.locator("button").count();


        for (let i = 0; i < optionsCount; ++i) {
            const option = await optionsList.nth(i).textContent();

            if (option.trim() === countryName) {
                await optionsList.nth(i).click();
                console.log(option.trim);
                break;
            }
        }
    }
    async getValidateData(email) {
        await expect(this.emailLabel).toHaveText(email);
        await expect(this.emailValue).toHaveText(email);
    }
}

module.exports = { PlaceOrderPage };