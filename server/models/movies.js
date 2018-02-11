const mongoose = require('mongoose');
const { Schema } = mongoose;

const Movie = mongoose.model('movies', {
    name: {
        type: String,
        required: true
    },
    type: {
        type: String
    },
    year: {
        type: Number,
        min: 1920,
        max: 2020
    },
    //array of reviews
    review: [{ type: Number, min: 1, max: 10 }]
});

module.exports = {Movie};