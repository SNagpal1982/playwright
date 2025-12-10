const {LoginPage} = require("../PageObject/LoginPage");
const {DashboardPage} = require("../PageObject/DashboardPage");
const {MyCartPage} = require("../PageObject/MyCartPage");
const {PlaceOrderPage} = require("../PageObject/PlaceOrderPage");
const {OrderHistoryPage} = require("../PageObject/OrderHistoryPage")

class POManager{
    constructor(page){
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