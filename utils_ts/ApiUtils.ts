export class ApiUtils{    
    apiContext: any;
    loginPayload : string;
    
    constructor(apiContext: any, loginPayload :string){
        this.apiContext     = apiContext;
        this.loginPayload   = loginPayload;
    }

    async getToken(){
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", 
            {
                data : this.loginPayload
            }
        );
        const loginResponseData = await loginResponse.json();
        const token = loginResponseData.token;
        console.log(token)
        return token;
    }

    async createOrder(createOrderPayload: string){
        let response = {token: String, orderId : String};
        response.token = await this.getToken();
        const creatOrderResponse = await this.apiContext.post(
            "https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data    : createOrderPayload,
                headers : {
                            'Authorization' : response.token,
                            'Content-Type'  : 'application/json'                        
                }
            });
        const creatOrderResponseData = await creatOrderResponse.json();
        console.log(creatOrderResponseData);
        const orderId = creatOrderResponseData.orders[0];
        response.orderId = orderId;
        return response;
    }
}
module.exports = { ApiUtils};
