const excelJS = require('exceljs');
const {test, expect} = require("@playwright/test");
// const { exit } = require('process');
const filePath = "C:\\Users\\sandeep.nagpal\\Downloads\\download.xlsx"
//"C:\\SNagpal\\PlaywrightAutomation\\ExcelJSUtil\\excelDownloadTest.xlsx";

async function writeExcel(serchText, replaceText, filePath) {
    const workbook = new excelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet('Sheet1');
    const output = await readExcel(worksheet, serchText);

    if (output.flag) {
        const cell = worksheet.getCell(output.row, output.col);
        console.log("'" + cell.value + "' is found at row: " + output.row + "; col: " + output.col);
        cell.value = replaceText;
        await workbook.xlsx.writeFile(filePath);
        console.log("Replaced with '" + replaceText + "'");
    }
    else {
        console.log("Searched item '" + serchText + "' is not found.")
    }
}

async function updatePriceExcel(serchText, replaceText, priceCordinate, filePath) {
    const workbook = new excelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet('Sheet1');
    const output = await readExcel(worksheet, serchText);

    if (output.flag) {
        let cell = worksheet.getCell(output.row, output.col);
        console.log("'" + cell.value + "' is found at row: " + output.row + "; col: " + output.col);
        cell = worksheet.getCell(output.row, output.col+priceCordinate.PriceCol);
        cell.value = replaceText;
        await workbook.xlsx.writeFile(filePath);
        console.log("Price has been with '" + replaceText + "'");
    }
    else {
        console.log("Searched item '" + serchText + "' is not found.")
    }
}

async function readExcel(worksheet, searchText) {
    let output = { flag: false, row: -1, col: -1 };
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            if (cell.value === searchText) {
                output.row = rowNumber;
                output.col = colNumber;
                output.flag = true;
            }
        })
    });
    return output;

}


// writeExcel("Banana", "Republic", filePath);
// updatePriceExcel("Mango", 351, {priceRow:0,PriceCol:2}, filePath);

test ("Download-upload Excel Validation.", async({page})=>{
    const searchText = "Mango";
    const updatedValue = "350";
    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
    await page.pause();
    const downloadEventPromise = page.waitForEvent("download");
    await page.getByRole("button", {name: 'Download'}).click();
    await downloadEventPromise;
    await updatePriceExcel(searchText, updatedValue, {priceRow:0,PriceCol:2}, filePath);
    // await page.locator("#fileinput").click();
    await page.locator("#fileinput").setInputFiles(filePath);
    const textLocator = page.getByText(searchText);
    const desiredLocator = page.getByRole("row").filter( {has : textLocator});
    await expect(desiredLocator.locator("#cell-4-undefined")).toContainText(updatedValue);


 

    
})

