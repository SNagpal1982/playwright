class DashboardPage {
    constructor(page) {
        this.page = page;
        this.productList = page.locator(".card-body");
        this.productName = page.locator(".card-body b");
        this.productPrice = page.locator(".text-muted");
        this.viewBtn = page.locator("text= View");
        this.addToCartBtn = page.locator("text= Add To Cart");
        this.cartDashboard = page.locator("[routerlink='/dashboard/cart']");
    }

    async addProductToCart(productName) {
        this.productList.first().waitFor();
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
        await this.goToCart();
    }
    async goToCart() {
        await this.cartDashboard.click();
    }
}

module.exports = { DashboardPage };