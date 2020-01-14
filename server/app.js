const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios').default;
const mongoose = require('mongoose');
const Rates = require('./models/rates');
const candles = require('./data');
// var mysql = require('mysql');

// var con = mysql.createConnection({
//     host: "dedi350.flk1.host-h.net",
//     user: "cavalcupjy_30",
//     password: "65D6Cq3bMm4m3VqoHIc8",
//     database: 'apollo_cavalryapps'
//   });
  
//   con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//     // let sql = `SELECT * FROM rates`;
//     // con.query(sql, function (err, result) {
//     //   if (err) throw err;
//     //   console.log("Result: " + result);
//     // });
//   });

const dbURL = 'mongodb+srv://normy:saber24teeth@mean-gxsi7.mongodb.net/mean-stack?retryWrites=true&w=majority'
mongoose.connect(
    dbURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
.then(data => {
    console.log('success')
}).catch(err => {
    console.log('err')
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
        );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, PATCH, DELETE, OPTIONS"
        )
    next();
});

app.get('', (req, res, next) => {
    const response = res;
    const token = '6a4c1a4c72f9d71e2792d9fecc47d4dd-60eacd80b4faebeea524d673d3cf363b';
    axios.get('https://api-fxpractice.oanda.com/v3/instruments/EUR_USD/candles?price=B&granularity=M5&count=100',
    {headers: {'Authorization': `Bearer ${token}`}})
    .then(async (data) => {
        console.log(data.data);

        response.send(data.data);

        // await Rates.collection.deleteMany({}).then(() => {
        //     console.log('deleted')
        // })

        // const ratesData = data.data.candles;
        // await Rates.collection.insertMany(ratesData, function (err, docs) {
        //     if (err){ 
        //         return console.error(err);
        //     } else {
        //       console.log("Multiple documents inserted to Collection");
        //       response.send('done')
        //     }
        //   });           

    }).catch((err) => {
        console.log(err);
    }).finally(res => {
    })   
})

function getDataFromServer() {
    console.log('yes');
    const token = '6a4c1a4c72f9d71e2792d9fecc47d4dd-60eacd80b4faebeea524d673d3cf363b';
    axios.get('https://api-fxpractice.oanda.com/v3/instruments/EUR_USD/candles?price=B&granularity=S5&count=100',
    {headers: {'Authorization': `Bearer ${token}`}})
    .then(async (data) => {
        console.log(data.data);

        await Rates.collection.deleteMany({}).then(() => {
            console.log('deleted')
        })

        const ratesData = data.data.candles;
        await Rates.collection.insertMany(ratesData, function (err, docs) {
            if (err){ 
                return console.error(err);
            } else {
              console.log("Multiple documents inserted to Collection");
            }
          });           

    }).catch((err) => {
        console.log(err);
    }).finally(res => {
    }) 
}

app.get('/rates', (req, res, next) => {
    getDataFromServer();
    Rates.find().then((data) => {
        const rates = data;
        res.status(200).json({
            message: "Rates Fetched",
            candles: rates
        });
    })
    //res.send(candles);
})

//app.use('/api/posts', allRoutes);

module.exports = app;