Feature: ECom Login Validation

  @Validations
  Scenario Outline: Login with incorrect credential
    Given Login ECOM application "https://rahulshettyacademy.com/client/" with incorrect credential "sandeepnagpal2@gmail.com" and "Password@123"
    Then Verify the error meesgae is displayed

  # Example:
  # | username                | password      |
  # |sandeepnagpal2@gmail.com | Password@1234 |
  # |sandeepnagpal@gmail.com  | Password@123  |