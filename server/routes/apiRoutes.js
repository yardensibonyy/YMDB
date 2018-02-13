const mongoose = require('mongoose');
const _ = require('lodash');
const {Movie} = require('../models/movies');

module.exports = (app) => {

    //PROXY CHECK
    app.get('/api/aaa', (req, res) => {
        res.send('ggggg');
    });

    app.post('/api/add/movie', (req, res) => {
        const movie = new Movie({
            name: req.body.name,
            type: req.body.type,
            year: req.body.year
        });

        //Make sure the movie's not exist already
        Movie.count({name: movie.name}, (err, count) => { 
            if(count === 0){
                movie.save().then((doc) => {
                    res.send(doc);
                }, (err) => {
                    res.status(400).send(err);
                });
            } else {
                res.status(412).send({error: 'The movie exist already'});
            }
        });
    });

    app.post('/api/add/review', (req, res) => {
        let body = _.pick(req.body, ['name', 'review']);
        Movie.findOneAndUpdate(
            {name: body.name},
            {$push: {review: body.review}},
            {new: true},
            (err, movie) => {
                if(!movie) {
                    return res.status(412).send(
                        {error: 'The movie does not exist in our catalog. You should add him first'});
                }
                res.send({movie});
            }
        );
    });

    app.patch('/api/search', (req, res) => {
        let body = _.pick(req.body, ['type', 'fromYear', 'untilYear']);
        Movie.find({
            $and: [{type: body.type }, {year: { $gte: body.fromYear }}, {year: { $lte: body.untilYear }}]
        }).select('name review')
        .then((movies) => {
            if(!movies) {
                return res.status(412).send({error: 'No match. Try again.'});
            }
            const match = movies.map((movie) => {
                return {
                    name: movie.name,
                    avg: movie.review.reduce((accumulator, currentValue) => accumulator + currentValue, 0)/(movie.review).length
                };
            });
            
            res.send({match});
        })
    });
};