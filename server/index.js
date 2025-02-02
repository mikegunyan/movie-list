const express = require('express');
const axios = require('axios');
const movies = require('./movies.json');
require('dotenv').config();

let app = express();

app.get('/api', (req, res) => {
  res.json(movies);
});

app.get('/api/search', (req, res) => {
  axios
    .get(`http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=${req.query.s}`)
    .then((response) => {
      res.json(response.data.Search);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.listen(5000, function() {
  console.log('Server is running on port 5000');
});
