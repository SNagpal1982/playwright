import { test as baseTest } from '@playwright/test';
interface TestDataForOrder {
    username: string;
    password: string;

};
export const customTest = baseTest.extend<{ testDataForOrder: TestDataForOrder }>
{

    testDataForOrder: {
        username: "sandeepnagpal2@gmail.com",
            password : "Password@123"
    }
}
