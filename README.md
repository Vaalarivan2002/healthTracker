# healthTracker
This project is a diet tracker built using MERN stack for my Software Development Laboratory course. It gives calorie specific diet recommendation which is based on USDA guidelines for 2020-2025 and also provides weekly diet analysis.
View the deployed project at: https://healthtracker-client.onrender.com/ (please refresh the page if login/registering takes more than 10 seconds. I'm using the free tier of Render which makes the backend service slow when it has not been used for a long time)

## Steps to spin the site up in your computer
* Install ReactJS and follow the steps in README.md of the client folder for React specific instructions.
* Give your MongoDB cluster name as the <MONGO> field in the .env file of 'api' folder.
* Set your own 'JWT' secret key inside the .env file of 'api' folder.
* run 'yarn(or npm) start' in the api folder to enable the frontend access the api

[Video describing site's functionality](https://drive.google.com/file/d/1UKyvnHWbVpY8kf_MAj30DN9A9iMQ7IAq/view?usp=sharing)

The daily calorie needs were calculated based on Mifflin St Jeor equation and the data for tracking was based on USDA guidelines for 2020-25.
