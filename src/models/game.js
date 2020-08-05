const mongoose = require('mongoose');
const { model } = require('./user');
const { darkblue } = require('color-name');

const Game = mongoose.model('Game', {
    gameJSON:{
        type: String
    }
});

module.exports = Game;