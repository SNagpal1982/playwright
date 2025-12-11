const { test, expect } = require("@playwright/test");

test.describe.configure({mode : "parallel"})
test("More Validation", async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/AutomationPractice");

    // await page.goto("https://google.com");
    // await page.goBack();
    // await page.goForward();
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();

    page.on('dialog', dialog => dialog.accept());
    await page.locator("#confirmbtn").click();

    await page.locator("#mousehover").hover();

    const framePage = page.frameLocator("#courses-iframe");
    await framePage.locator("[href*='all-access-subscription']").first().click();
    const subscriber = framePage.locator(".text-center");
    const count = await subscriber.count();
    let flagToExist = false;
    for (let i = 0; i < count; i++) {
        const textElements = subscriber.nth(i).locator(".text-sm");
        const textElementsCount = await textElements.count();
        for (let j = 0; j < textElementsCount; j++) {
            const text = await textElements.nth(j).textContent();
            if (text === "Success Rate") {
                const happySubscriber = await subscriber.nth(i).locator(".text-2xl").nth(j).textContent();
                console.log(text + ": " + happySubscriber);
                flagToExist = true;
                break;
            }
        }
        if (flagToExist) {
            break;
        }
    }

});

test("Screenshot and Visual Comparision", async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/AutomationPractice");
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#displayed-text").screenshot({path: "SS_Element.png"})
    await page.screenshot({path: "SS_Visible.png"})
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
    await page.screenshot({path: "SS_Hidden.png"})
});

test("Visual Comparision", async ({ page }) => {

    await page.goto("https://playwright.dev/docs/api/class-playwright");
    await page.waitForLoadState();
    expect(await page.screenshot()).toMatchSnapshot("landing.png");
});
