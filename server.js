const axios = require('axios');
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const bodyParser = require('body-parser');


const port = process.env.PORT || 8080;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use((request, response, next) => {
    setTimeout(() => {
        next();
    }, 1000);

});

app.get('/', (request, response) => {
    response.render('index.hbs', {
        title: 'Home'
    });
});


app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});


