Feature: ECom Product Order Applciation - Validation

  @Regression
  Scenario: Place the Order
    Given Login ECOM application "https://rahulshettyacademy.com/client/" with valid "sandeepnagpal2@gmail.com" and "Password@123"
    When Add product "iphone 13 pro" into cart
    Then Product "iphone 13 pro" should be added into cart.
    When Checkout, enter valid details "sandeepnagpal2@gmail.com" "Ind" "India" " Thankyou for the order. " and place the order
    Then Product should present into order history
