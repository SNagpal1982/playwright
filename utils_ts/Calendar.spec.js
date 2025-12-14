const {test, expect} = require("@playwright/test");

test ("Calendar Validation", async ({page})=>{

    const date = "15";
    const month ="12";
    const year = "2027";

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator("div .react-date-picker__inputGroup").click();
    await page.locator(".react-calendar__navigation__label__labelText").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.getByText(year).click();
    await page.locator("//button[@class='react-calendar__tile react-calendar__year-view__months__month']").nth(Number(month)-1).click();
    await page.locator("//abbr[text()='"+ date+"']").click();

    const inputs =  page.locator("div .react-date-picker__inputGroup__input");

    expect(await inputs.nth(0).inputValue()).toEqual(month);
    expect(await inputs.nth(1).inputValue()).toEqual(date);
    expect(await inputs.nth(2).inputValue()).toEqual(year);
})