import {test, expect} from '@playwright/test';

test("Haning woth special locators", async ({page})=>{

    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    // await page.route("**/*.{jpg}", route=>route.abort());
    page.on("request", request=>console.log("Request: " + request.url()));
    page.on("response", response=>console.log("Response: " + response.url(), response.status()));
    // await page.pause();    
    await page.getByLabel("Employed").click();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("Password").fill("Password@123");
    await page.getByRole("button", {name: 'Submit'}).click();
    await page.getByText("Success! The Form has been submitted successfully!.").waitFor();
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
    await page.getByRole("link", {name : "Shop"}).click();
    await page.locator('app-card').filter({hasText : "Samsung Note 8"}).getByRole("button").click(); 
});