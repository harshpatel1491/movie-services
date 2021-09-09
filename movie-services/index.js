const express = require('express');
const mongoose = require('mongoose');

const app = express.Router()

app.use(express.json())

const movieSchema = new mongoose.Schema ({
    id: String,
    title: {
        type: String,
        required: [1, "Movie Title is required"]
    },
    year: String,
    genres: Array,
    ratings: Array,
    poster: String,
    contentRating: String,
    duration: String,
    releaseDate: String,
    averageRating: String,
    originalTitle: String,
    storyline: String,
    actors: Array,
    imdbRating: String,
    posterurl: String
})

const Movie = mongoose.model("movies", movieSchema);

app.post('/api/movies', (req, res) => {
    Movie.create(req.body).then((data) => {
        res.send(data)
    }).catch(err => {
        res.send('Error in Create')
    })
})

app.get('/api/movies', (req, res) => {
    Movie.find({}).then(data => {
        if(data){
            res.send(data)
        } else {
            res.send('No Data in Databse')
        }
    }).catch(err => {
        console.log('Error in Find')
    })
})

app.get('/api/movies/:id', (req,res) => {
    Movie.findById(req.params.id).then((data) => {
        if(data){
            res.send(data)
        } else {
            res.send('No data available')
        }
    }).catch(err => {
        res.send('Its Error in FindById')
    })
})

app.put('/api/movies', (req, res) => {
    Movie.updateOne({_id: req.body._id}, req.body).then(() => {
        Movie.findById(req.body._id).then((data) => {
            if(data){
                res.send(data)
            } else {
                res.send('No Document avialble for update')
            }
        }).catch(err => {
            res.send('Its Error in Update with FindById')
        })
    }).catch(err => {
        res.send('Err in Update')
    })
})

app.delete('/api/movies/:id', (req, res) => {
    Movie.findByIdAndDelete(req.params.id).then(data => {
        Movie.find({}).then(data => {
            if(data){
                res.send(data)
            } else {
                res.send('No data in database')
            }
        }).catch(err => {
            res.send('err in find while delete')
        })
    }).catch(err => {
        res.send('err in delete')
    })
})

module.exports = app