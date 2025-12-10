const { expect } = require("@playwright/test");
class OrderHistoryPage {
    constructor(page) {
        this.page = page;
        this.orderPage = this.page.locator("button[routerlink*='myorders']");
        this.orderTable = this.page.locator("tbody");
        this.row = this.page.locator("tbody tr");
        this.detailOrderId = this.page.locator(".col-md-6 .col-text");
    }

    async validateOrderDetail(orderId) {
        await this.orderPage.click();
        await this.orderTable.waitFor();
        for (let i = 0; i < await this.row.count(); ++i) {
            const rowOrderId = await this.row.nth(i).locator("th").textContent();
            if (orderId.includes(rowOrderId)) {
                await this.row.nth(i).locator("button").first().click();
                console.log("Order with Id : '" + rowOrderId + "' is found in Order History Page.")
                break;
            }
        }
        expect(orderId.includes(await this.detailOrderId.textContent())).toBeTruthy();
    }
}
module.exports = { OrderHistoryPage };