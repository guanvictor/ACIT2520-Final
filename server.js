const axios = require('axios');
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const bodyParser = require('body-parser');
const nasa = require('./public/nasa.js');
const cards = require('./public/cards.js');


const port = process.env.PORT || 8080;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

var urlencodedParser = bodyParser.urlencoded({extended: false});

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

app.get('/cards', (request, response) => {
    response.render('cards_api.hbs', {
        title: 'Nasa Image Gallery'
    });
});

app.get('/pictures', (request, response) => {
    response.render('nasa_api.hbs', {
        title: 'Deck of Cards'
    });
});

app.post('/pictures', urlencodedParser, async (request, response) => {
    console.log(request.body.image_gallery);
    try {

        let gallery = await nasa.get_gallery(request.body.image_gallery);

        console.log(gallery);
        response.render('nasa_api.hbs', {
            output:gallery
        });
    }catch (e) {
        response.render('nasa_api.hbs', {
            output: e
        });
    }

});

app.post('/cards', urlencodedParser, async (request, response) => {
    console.log(request.body.numberofcards);
    try {
        if (request.body.numberofcards === null) throw "Enter an item";

        let deck = await cards.get_deck(request.body.numberofcards);

        console.log(deck);
        response.render('cards_api.hbs', {
            output: deck
        });
    }catch (e) {
        response.render('cards_api.hbs', {
            output: e
        });
    }

});





app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});


