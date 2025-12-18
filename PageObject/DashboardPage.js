class DashboardPage {
    constructor(page) {
        this.page = page;
        this.productList = this.page.locator(".card-body");
        this.productName = this.page.locator(".card-body b");
        this.productPrice = this.page.locator(".text-muted");
        this.viewBtn = this.page.locator("text= View");
        this.addToCartBtn = this.page.locator("text= Add To Cart");

    }

    async addProductToCart(productName) {
        // await this.productList.first().waitFor();
        const title = await this.productName.allTextContents();
        console.log(title);

        const count = await this.productList.count();
        for (let i = 0; i < count; ++i) {
            if (await this.productList.nth(i).locator("b").textContent() === productName) {
                //add to cart
                await this.productList.nth(i).waitFor();
                await this.productList.nth(i).locator("text= Add To Cart").click();
                console.log("'" + productName + "' is added into cart.");
                break;
            }
        }
    }

}

module.exports = { DashboardPage };