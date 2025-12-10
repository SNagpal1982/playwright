const {test, expect} = require('@playwright/test');
const { count } = require('console');
const { constants } = require('http2');


test("Practical to get all product name", async ({page})=>{

    const productName = "iphone 13 pro";
    const email = "sandeepnagpal2@gmail.com";
    const productList = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client/");
    
    // await page.locator("#userEmail").fill(email);
    await page.getByPlaceholder("email@example.com").fill(email);
    
    // await page.locator("#userPassword").fill("Password@123");
    await page.getByPlaceholder("enter your passsword").fill("Password@123");
    
    // await page.locator("#login").click();
    await page.getByRole("button", {name : "Login"}).click();

    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();

    // const count = await productList.count();
    // for (let i =0;i< count; ++i){
    //     if (await productList.nth(i).locator("b").textContent() === productName){
    //         //add to cart
    //         await productList.nth(i).waitFor();
    //         await productList.nth(i).locator("text= Add To Cart").click(); 
    //         console.log(i +  ") '" + productName + "' is added into cart.");
    //         break;
    //     }
    // }
    await page.locator(".card-body").filter({hasText : productName})
        .getByRole("button", {name : "Add to Cart"}).click();
    
    // await page.locator("[routerlink='/dashboard/cart']").click();
    await page.getByRole("listitem").getByRole("button", {name : "Cart"}).click();

    await page.locator("div li").first().waitFor(); 
    // const bool = await page.locator("h3:has-text('iphone 13 pro')").isVisible();
    const bool = await page.getByText(productName).isVisible();
    expect(bool).toBeTruthy();

    // await page.locator("text=Checkout").click();
    await page.getByRole("button", {name : "Checkout"}).click();
    
    await page.locator("text=Credit Card").first().waitFor();
    
    // const inputTxt = page.locator("input[class='input txt']");
    const inputTxt = page.locator("div input");

    // Enter Credit Card Details     
    await inputTxt.nth(0).fill("4542 9931 9292 9999");    
    
    // Enter Expiry Date of Credit Card     
    await page.locator(".small select").first().selectOption("12");    
    await page.locator(".small select").nth(1).selectOption("31");    

    //Enter CVV Code
    await inputTxt.nth(1).fill("123"); 

    
    //Enter Name on Card
    await inputTxt.nth(2).fill("Sandeep Nagpal"); 

    //Enter Apply Coupon
    await inputTxt.nth(3).fill("festival discount"); 

    // await page.locator("[placeholder*='Country']").pressSequentially("ind");
    await page.getByPlaceholder("Select Country").pressSequentially("ind");
    
    // const dropdown = await page.locator(".ta-results");
    // await dropdown.waitFor();
    // const optionsList = dropdown.locator("button");
    // const optionsCount = await dropdown.locator("button").count();

    // for (let i =0;i<optionsCount; ++i){
    //     const option = await dropdown.locator("button").nth(i).textContent();
    //     if ( option === " India"){
    //         await optionsList.nth(i).click();
    //         break;
    //     }
    // }

    await page.getByRole("button", {name : "India"}).nth(1).click();


    // await expect(page.locator(".user__name label")).toHaveText(email);
    // await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
    // await page.locator(".action__submit").click();
    await page.getByText("PLACE ORDER").click();

    // await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    await expect(page.getByText("Thankyou for the order.")).toBeVisible();

    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);
    //search oder in Order History Page 
    
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");

    for(let i=0;i<await rows.count(); ++i){
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        console.log("rowOrderId : " + rowOrderId)
        if (orderId.includes(rowOrderId)){
            await rows.nth(i).locator("button").first().click(); 
            break;
        }
    }
    const detailOrderId = await page.locator(".col-md-6 .col-text").textContent();
    expect(orderId.includes(detailOrderId)).toBeTruthy();

}
);

