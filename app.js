
const express = require('express');
const https = require('https');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();

const folderPath = __dirname + '/frontend';
app.use(express.static(folderPath));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res)=>{
    res.sendFile(__dirname + "/frontend/index.html");
});

app.post('/info', (req, res)=>{
    const query = req.body.cityName;
    const apiKey = "api-key"; // Here goes your API Key
    const unit = "metric";
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + query + '&units=' + unit + '&APPID=' + apiKey;

    https.get(url, (response)=>{
        response.on('data', (data)=>{
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const weatherDesc = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.write("<h1 style='text-align: center;'>The temperature in " + query + " is " + temp + " degrees Celcius</h1>");
            res.write("<h2 style='text-align: center;'>The weather is currently " + weatherDesc + "</h2>");
            res.write("<img style='width: 100px; height: 100px; transform: translateX(650px);' src=" + imageURL + ">");
            res.send();
        });
    });
});

app.listen(3000, ()=>{
    console.log("Server listening on port 3000 🚀");
});