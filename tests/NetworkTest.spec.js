const {test, expect, request} = require("@playwright/test");
const {ApiUtils} = require('../utils/ApiUtils');

const loginPayload = {userEmail: "sandeepnagpal2@gmail.com", userPassword: "Password@123"};
const creatOrderPayload = {orders: [{country: "Cuba", productOrderedId: "68a961719320a140fe1ca57c"}]};

let response;
let UrlOrderHistory = "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*";
let fakePayLoadOrder = {data : [], message: "No Orders" };

test.beforeAll(async ()=>{
    const apiContext = await request.newContext();            
    const apiUtits = new ApiUtils(apiContext,loginPayload);
    response = await apiUtits.createOrder(creatOrderPayload);
});

test ("API Place the Order! ", async({page})=>{

    await page.addInitScript(value =>{
        window.localStorage.setItem('token', value);
    }, response.token);
    await page.goto("https://rahulshettyacademy.com/client/");

    //Intercepting resposne - API Response -> {palywright fake response} -> Browser
    await page.route(UrlOrderHistory,
        async route=>{
            const response = await page.request.fetch(route.request());
            let body = JSON.stringify(fakePayLoadOrder);
            route.fulfill(
                {
                    response,
                    body,
                }
            )
        }
    )
    await page.locator("button[routerlink*='myorders']").click();
    // await page.pause();
    await page.waitForResponse(UrlOrderHistory);
    const message = await page.locator(".mt-4").textContent();
    console.log(message);


});