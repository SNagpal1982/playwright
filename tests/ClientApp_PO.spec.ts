import { test, Page } from '@playwright/test';
import { POManager } from "../PageObject_ts/POManager";

import { CustomerOrderRequestTestData } from "../utils/ClientAppCustomerOrderRequestTestData.json";
import { LoginTestData } from "../utils/ClientAppLoginTestData.json";
let orderId :any;

test("Practical to get all product name", async ({ page }) => {

    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    await loginPage.validLogin(LoginTestData.url, LoginTestData.email, LoginTestData.password);

    const dashboard = poManager.getDashboardPage();
    await dashboard.addProductToCart(CustomerOrderRequestTestData.productName);

    const myCartPage = poManager.getNyCartPage();
    await myCartPage.checkOutProduct(CustomerOrderRequestTestData.productName);

    const placeOrderPage = poManager.getPlaceOrderPage();
    orderId = await placeOrderPage.placeOrder(CustomerOrderRequestTestData);
    console.log("Order has been placed succesfully with Order Id :" + orderId);

});

test("Validate the ordered product is visibile in Order History", async ({page})=>{
        //search oder in Order History Page
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    await loginPage.validLogin(LoginTestData.url, LoginTestData.email, LoginTestData.password);
   
    const orderHistoryPage  = poManager.getOrderHistoryPage();
    await orderHistoryPage.validateOrderDetail(orderId);

});
