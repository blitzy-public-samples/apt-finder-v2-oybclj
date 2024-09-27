I'm a founder of a start up. I'd like Blitzy to help me build a web service to help new college graduate to find the right apartment to rent.

Here is the description of the system. The system has two subsystems.

I. Subsystem one: apartment listing data subscriber
(1) We run a service that subscribes to zillow.com's data API and receives a real-time flow of newly listed apartments-for-rent in a list of selected markets (for example, all zip codes in greater Boston area).
(2) This service will extract from each listing returned by zillow's API the following data fields:
  - date on market
  - rent
  - broker fee
  - square footage
  - number of bedrooms
  - number of bathrooms
  - available date
  - street address
  - the URL to zillow.com for that listing

(3) This service will save the data fields in a relational database. Each of the data fields collected needs to be separately indexed.

II. Subsystem two: a web application that shows a paid end-user a list of listings based on a filter provided by the end user.
(1) A user can sign up by providing an email and a password.
(2) A user must sign in in order to use the web application.
(3) A user creates a filter for the listings that she is interested in seeing. The filter will contain:
  - one or more (less than 5) zip codes
  - one simple criterion involving one of the listing data fields. An example is: $rent < 2000
(4) After a filter is created and saved, each time when the user signs in, the system displays in a table all listings matching the filter, sorted in descending order of the listing date. The data backing the table comes from querying the relational database created and populated by subsystem I. If a row of the table is clicked by the user, a new browser tab opens up displaying the Zillow page for that particular listing.
(5) There is no free tier for a user to use the web application. Instead, the user must purchase a subscription via Paypal before she can create and save her custom filter. The payment collection should be part of the web application.


III. Notes on code generation
(1) We are not familiar with Zillow's API. Please provide as much code as possible using Zillow's API. The code generated will be a good foundation for further development and tuning of the code.
(2) Please also provide as much code as possible on collecting customer payment using Paypal.