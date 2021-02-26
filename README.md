# Interactive-Form
Interactive form

# js interactive_form

### Javascript project demonstrating an interactive form with regex input validation

This assignment is a mockup of a registration form for a web design/dev conference.  Fields include:  the ordering of t-shirts, selection of activities, and method 
of payment for the conference. 

JavaScript is used to validate fields and ensure no scheduling conflicts with the various meetings and breakout sessions.
-- user input is validated with JS and, where appropriate, genex code.

Activity Registration

To prevent the attendee from registering for conflicting activities, the form enables or disables conflicting activities based on events initially selected.

Certain fields provide instant help messages when an input is not-valid
* Name
* Email
* Activities Box
* Credit Card Number
* Credit Card Zip Code
* Credit Card CVV

Conditional Error Messages

Certain fields provide error messages on the validity of the user input:
* Name
 * If the name field is empty
 * If the name field uses numbers or special characters
* Email
 * If the email field is empty
 * If the email address is not properly formatted
