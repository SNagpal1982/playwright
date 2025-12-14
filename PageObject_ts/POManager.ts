import { Page } from "@playwright/test";

import {LoginPage} from "./LoginPage";
import {DashboardPage} from "./DashboardPage";
import {MyCartPage} from "./MyCartPage";
import {PlaceOrderPage} from "./PlaceOrderPage";
import {OrderHistoryPage} from "./OrderHistoryPage";


export class POManager{
    page : Page;
    loginPage : LoginPage;
    dashboardPage : DashboardPage;
    myCartPage : MyCartPage;
    placeOrderPage : PlaceOrderPage;
    orderHistoryPage : OrderHistoryPage;

    constructor(page: Page){
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.myCartPage = new MyCartPage(this.page);
        this.placeOrderPage = new PlaceOrderPage(this.page);
        this.orderHistoryPage = new OrderHistoryPage(this.page);
    }

    getLoginPage(){
        return this.loginPage;
    }
    getDashboardPage(){
        return this.dashboardPage;
    }
    getNyCartPage(){
        return this.myCartPage;
    }
    getPlaceOrderPage(){
        return this.placeOrderPage;
    }
    getOrderHistoryPage(){
        return this.orderHistoryPage;
    }
}

module.exports = {POManager};