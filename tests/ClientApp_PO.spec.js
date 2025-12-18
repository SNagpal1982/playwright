const { test } = require('@playwright/test');
const { POManager } = require('../PageObject/POManager');
const { LoginTestData } = require("../utils/ClientAppLoginTestData.json");
const { CustomerOrderRequestTestData } = require("../utils/ClientAppCustomerOrderRequestTestData.json");

    test("Practical to get all product name", async ({ page }) => {

        const poManager = new POManager(page);

        const loginPage = poManager.getLoginPage();
        await loginPage.validLogin(LoginTestData.url, LoginTestData.email, LoginTestData.password);

        const dashboard = poManager.getDashboardPage();
        await dashboard.addProductToCart(CustomerOrderRequestTestData.productName);

        const myCartPage = poManager.getNyCartPage();
        await myCartPage.checkOutProduct(CustomerOrderRequestTestData.productName);

        const placeOrderPage = poManager.getPlaceOrderPage();
        const orderId = await placeOrderPage.placeOrder(CustomerOrderRequestTestData.countryCode, CustomerOrderRequestTestData.countryName);
        console.log("Order has been placed succesfully with Order Id :" + orderId);

        //search oder in Order History Page
        const orderHistoryPage = poManager.getOrderHistoryPage();
        await orderHistoryPage.validateOrderDetail(orderId);

    });
