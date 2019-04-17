const axios = require('axios');
const _ = require('lodash');


var get_deck = (cardinput) => {
    return new Promise(async (resolve, reject) => {
        try {
            const deck_of_cards = [];

            const num_decks = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');

            const deck_id = num_decks.data.deck_id;

            const cards = await axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=${cardinput}`);

            for (i in cardinput.data.cards)
                deck_of_cards.push(cardinput.data.cards[i].image);

            resolve(deck_of_cards)
        } catch (e) {

            reject(e);
        }
    })
};

module.exports = {
    get_deck
};
