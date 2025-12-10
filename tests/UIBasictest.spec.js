const {test, expect} = require('@playwright/test');
const { promises } = require('dns');
const { constants } = require('http2');


test("Practice for child window.", async ({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.pause();
    await page.route("**/*.css", route=>route.abort());
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    const userName = page.locator("#username");
    const docLink = page.locator("[href*=documents-request]");
    await expect(docLink).toHaveAttribute("class", "blinkingText");
    
    const [newPage] = await Promise.all(
    [
        context.waitForEvent('page'), //Listen any new page (Promise - Pending, Rejected and Fullfilled
        docLink.click(), //new page is opened
    ])
    const text = await newPage.locator(".red").textContent();
    const arrayText = text.split("@")[1];
    const domainName = arrayText.split(" ")[0];
    console.log("Domain Name from Child Window : " + domainName);
    //await page.pause();
    await page.locator("#username").fill(domainName);
    const newText = await page.locator("#username").inputValue();
    console.log("Email in Parent Window : " + newText);
});

test("Practice for Radio and Dropdown Button.", async ({page})=>{

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await page.locator("#username").fill("sandeepnagpal2@gmail.com");
    await page.locator("#password").fill("Password@123");
    const docLink = page.locator("[href*=documents-request]");
    await page.locator("span.radiotextsty").last().click();
    await expect(page.locator("span.radiotextsty").last()).toBeChecked();
    await page.locator("#okayBtn").click();
    await page.locator("select.form-control").selectOption("teach");
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy();
    await expect(docLink).toHaveAttribute("class", "blinkingText")

});

test.only ("Practical to get all product name", async ({browser})=>{

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.pause();
    await page.goto("https://rahulshettyacademy.com/client/#/auth/register");
    await page.locator("#firstName").fill("Sandeep");
    await page.locator("#lastName").fill("Nagpal");
    await page.locator ("#userEmail").fill("sandeepnagpal2@gmail.com");
    await page.locator("#userMobile").fill("9953011811");
    await page.locator("[formcontrolname='occupation']").selectOption("Student");
    await page.locator("[value='Male']").click();
    await page.locator("#userPassword").fill("Password@123");
    await page.locator("#confirmPassword").fill("Password@123");
    await page.locator("[type='checkbox']").click();
    await page.locator("#login").click();


}
);


test('Browser context Playwright test', async ({browser})=>
    {

        const context = await browser.newContext();
        const page = await context.newPage();
        const userName = page.locator("#username");
        const signIn = page.locator("#signInBtn");
        const cardTile = page.locator(".card-body a");

        await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
        console.log (await page.title());

        await userName.fill("rahulshettyacademy1");
        await page.locator("[type='password']").fill("learning");
        await signIn.click();

        console.log (await page.locator("[style*='block']").textContent());
        await expect(page.locator("[style*='block']")).toContainText("Incorrect");

        await userName.fill("");
        await userName.fill("rahulshettyacademy");
        await signIn.click();

        // console.log (await cardTile.first().textContent());
        // console.log (await cardTile.nth(1).textContent());
        const cardAllTitle = await cardTile.allTextContents();

        console.log(cardAllTitle);


    }
);

test('Page Playwright test', async ({page})=>
    {
        await page.goto("https://google.com/");
        await expect(page).toHaveTitle("Google");
    }
);

/*
test('First Playwright test', function()
{
    // Step 1 : Open Browser
    // Step 2 : Enter username and password
    // Step 3 : Click on Submit button
});

test('First Playwright test 1', async function()
{
    // Step 1 : Open Browser
    // Step 2 : Enter username and password
    await
    // Step 3 : Click on Submit button
});

test('First Playwright test2', async ()=>
{

    // Step 1 : Open Browser
    // Step 2 : Enter username and password
    await
    // Step 3 : Click on Submit button
});

test('First Playwright test2', async ({browsers})=>
{
    // Step 1 : Open Browser
    // Step 2 : Enter username and password
    await
    // Step 3 : Click on Submit button
});

*/