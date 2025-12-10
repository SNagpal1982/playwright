const {test, expect} = require('@playwright/test');
const { count } = require('console');
let webPageContext;
let orderId;
const email = "sandeepnagpal2@gmail.com";
const password = "Password@123";

test.beforeAll(async ({browser})=>{

    const context = await browser.newContext();
    const page = await context.newPage();
    
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill(password);
    await page.locator("#login").click();
    await page.waitForLoadState('networkidle');

    await context.storageState({path : 'state.json'});
    webPageContext = await browser.newContext({storageState : 'state.json'});

});

test("Order the products", { mode: 'serial' }, async ()=>{
    const productName = "iphone 13 pro";
    const page = await webPageContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.waitForLoadState('networkidle');
    
    const productList = page.locator(".card-body");
    await page.locator(".card-body b").first().waitFor();
    const title = await page.locator(".card-body b").allTextContents();
    //console.log(title);
const count = await productList.count();
    for (let i =0;i< count; ++i){
        if (await productList.nth(i).locator("b").textContent() === productName){
            //add to cart
            await productList.nth(i).waitFor();
            await productList.nth(i).locator("text= Add To Cart").click(); 
            console.log(i +  ") '" + productName + "' is added into cart.");
            break;
        }
    }
    await page.locator("[routerlink='/dashboard/cart']").click();
    await page.locator("div li").first().waitFor(); 
    const bool = await page.locator("h3:has-text('iphone 13 pro')").isVisible();
    expect(bool).toBeTruthy();

    await page.locator("text=Checkout").click();
    await page.locator("text=Credit Card").first().waitFor();
    
    // const inputTxt = page.locator("input[class='input txt']");
    const inputTxt = page.locator("div input");   

    await page.locator("[placeholder*='Country']").pressSequentially("ind");
    const dropdown = await page.locator(".ta-results");
    await dropdown.waitFor();
    const optionsList = dropdown.locator("button");
    const optionsCount = await dropdown.locator("button").count();

    for (let i =0;i<optionsCount; ++i){
        const option = await dropdown.locator("button").nth(i).textContent();
        if ( option === " India"){
            await optionsList.nth(i).click();
            break;
        }
    }
    // await page.pause();
    await expect(page.locator(".user__name label")).toHaveText(email);
    await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
    // await expect(page.locator(".user__name [type='text']").last()).toHaveText(email);

    await page.locator(".action__submit").click();

    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);

    //search oder in Order History Page 
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");

    for(let i=0;i<await rows.count(); ++i){
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (orderId.includes(rowOrderId)){
            await rows.nth(i).locator("button").first().click(); 
            break;
        }
    }
    const detailOrderId = await page.locator(".col-md-6 .col-text").textContent();
    expect(orderId.includes(detailOrderId)).toBeTruthy();
});

test("Serach the Order in Order History", async()=>{
    const page = await webPageContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.waitForLoadState('networkidle');
    
    const productList = page.locator(".card-body");
    await page.locator(".card-body b").first().waitFor();
    const title = await page.locator(".card-body b").allTextContents();
    console.log(title);

});