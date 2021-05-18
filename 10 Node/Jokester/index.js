const joke = require('give-me-a-joke');
const colors = require('colors');

joke.getRandomDadJoke(function (joke) {
    console.log(joke.rainbow);
});