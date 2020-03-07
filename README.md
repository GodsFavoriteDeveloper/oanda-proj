# oanda-proj
Angular 8 client + Node, Express & MongoDB server. The idea behind this project was to create a Candlestick chart that updates rates every 5 seconds. To utilize Node, Express and MongoDB, the app pulls the data from OANDA API and saves it on MongoDB and every 5 seconds pulls a fresh copy of data and updates that which is already on the database. On the client side it's basically Angular and some use of rxJS operators and Typescript. I also made the UI a bit more 'exciting' by adding a marquee slider that shows highest, lowest and average rates

Frontend: https://oanda-frontend.firebaseapp.com/ <br/>
Rates API endpoint: https://oanda-proj.herokuapp.com/rates
