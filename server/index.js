const express = require('express');
const axios = require('axios');
const watch = require('./watch.json');
const watched = require('./watched.json');
require('dotenv').config();


let app = express();

app.get('/api/movies', (req, res) => {
  res.json({ watch, watched });
});

app.get('/api/search', (req, res) => {
  axios.get(`http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=${req.query.s}`)
    .then((response) => {
      res.json(response.data.Search);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get('/api/movie', (req, res) => {
  axios.get(`http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&i=${req.query.i}`)
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.listen(5000, function() {
  console.log('Server is running on port 5000');
});
