# healthTracker
This project is a diet tracker built using MERN stack for my Software Development Laboratory course. It gives calorie specific diet recommendation which is based on USDA guidelines for 2020-2025 and also provides weekly diet analysis.

## Steps to spin the site up 
* Install ReactJS and follow the steps in README.md of the client folder.
* Install MongoDB and MongoDB Compass in your local machine and create a testDB database.
* Initialize your own JWT, JWT_ACC_ACTIVATE and RESET_PASSWORD_KEY keys inside the .env file of api folder.
* To enable email verification in the site, do the following in the .env file of the api:
    * Initialize MAILGUN_DOMAIN to the Mailgun domain for your account.
    * Initialize MAILGUN_KEY to the API key of your domain.
    * Add the email id of the account which you create in this site as 'authorized recipient' of your domain.
