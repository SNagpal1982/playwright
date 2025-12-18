const { Given, When, Then } = require("@cucumber/cucumber");
const { POManager } = require('../../PageObject/POManager');
const playwright = require('@playwright/test');
const {expect} = require ('@playwright/test');

Given('Login ECOM application {string} with valid {string} and {string}', { timeout: 200 * 1000 }, async function (url, username, password) {
    // Write code here that turns the phrase above into concrete actions

    const loginPage = this.poManager.getLoginPage();
    await loginPage.validLogin(url, username, password);
});
When('Add product {string} into cart', { timeout: 100 * 1000 }, async function (productName) {
    // Write code here that turns the phrase above into concrete actions
    const dashboard = this.poManager.getDashboardPage();
    await dashboard.addProductToCart(productName);
});

Then('Product {string} should be added into cart.', { timeout: 100 * 1000 }, async function (productName) {
    const myCartPage = this.poManager.getNyCartPage();
    await myCartPage.checkOutProduct(productName);
});
When('Checkout, enter valid details {string} {string} {string} {string} and place the order', async function (email, countryCode, countryName, orderConfirmationText) {
    // Write code here that turns the phrase above into concrete actions
    const placeOrderPage = this.poManager.getPlaceOrderPage();
    this.orderId = await placeOrderPage.placeOrder(email, countryCode, countryName, orderConfirmationText);
    console.log("Order has been placed succesfully with Order Id :" + this.orderId);
});

Then('Product should present into order history', async function () {
    // Write code here that turns the phrase above into concrete actions
    const orderHistoryPage = this.poManager.getOrderHistoryPage();
    await orderHistoryPage.validateOrderDetail(this.orderId);
});


Given('Login ECOM application {string} with incorrect credential {string} and {string}', async function (url, username, password) {
    // Write code here that turns the phrase above into concrete actions

    this.loginPage = this.poManager.getLoginPage();
    await this.loginPage.inValidLogin(url, username, password);
});

Then('Verify the error meesgae is displayed', function () {
    // Write code here that turns the phrase above into concrete actions
    this.loginPage.inValidLogin();
    

});