
const { test, expect } = require('@playwright/test');


// test ("API Place the Order! ", async({page})=>{

test("Security Test", async ({page})=> {
    //Login and reach on order page
    const email = "sandeepnagpal2@gmail.com";
    const password = "Password@123";
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill(password);
    await page.locator("#login").click();
    await page.waitForLoadState('networkidle');

    await page.locator("button[routerlink*='myorders']").click();

    //Intercept the reques
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({
            url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=69343dbc32ed865871221ce7"
        }));
    await page.locator("button:has-text('View')").first().click();
    await expect(page.locator(".blink_me")).toHaveText('You are not authorize to view this order');





})

