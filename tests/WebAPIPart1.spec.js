const {test, expect, request} = require("@playwright/test");
const {ApiUtils} = require('../utils/ApiUtils');

const loginPayload = {userEmail: "sandeepnagpal2@gmail.com", userPassword: "Password@123"};
const creatOrderPayload = {orders: [{country: "Cuba", productOrderedId: "68a961719320a140fe1ca57c"}]};

let response;
let orderId;

test.beforeAll(async ()=>{
    const apiContext = await request.newContext();            
    const apiUtits = new ApiUtils(apiContext,loginPayload);
    response = await apiUtits.createOrder(creatOrderPayload);
});

test ("@API API Place the Order! ", async({page})=>{

    await page.addInitScript(value =>{
        window.localStorage.setItem('token', value);
    }, response.token);
    await page.goto("https://rahulshettyacademy.com/client/");

    //search oder in Order History Page 
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = page.locator("tbody tr");

    for(let i=0;i<await rows.count(); ++i){
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        console.log("rowOrderId : " + rowOrderId)
        if (response.orderId.includes(rowOrderId)){
            await rows.nth(i).locator("button").first().click(); 
            break;
        }
    }
    const detailOrderId = await page.locator(".col-md-6 .col-text").textContent();
    expect(response.orderId.includes(detailOrderId)).toBeTruthy();

});