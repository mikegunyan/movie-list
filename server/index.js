const express = require('express');
const axios = require('axios');
const fs = require('fs');
let watch = require('./watch.json');
let watched = require('./watched.json');
require('dotenv').config();


let app = express();

app.use(express.json());

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

app.post('/api/watch', (req, res) => {
  let message = "";
  const movie = req.body;
  if (!movie || !movie.imdbID) {
    return res.status(400).json({ error: "Invalid movie data" });
  }

  if (!watch.find(m => m.imdbID === movie.imdbID)) {
    watch.push(movie);
    fs.writeFileSync('./watch.json', JSON.stringify(watch, null, 2));
    message = "added to";
  } else {
    watch = watch.filter(m => m.imdbID !== movie.imdbID);
    fs.writeFileSync('./watch.json', JSON.stringify(watch, null, 2));
    message = "removed from";
  }

  res.json({ message: `Movie ${message} watch list`, watch });
});

app.post('/api/watched', (req, res) => {
  let message = "";
  const movie = req.body;
  if (!movie || !movie.imdbID) {
    return res.status(400).json({ error: "Invalid movie data" });
  }

  if (!watched.find(m => m.imdbID === movie.imdbID)) {
    watched.push(movie);
    fs.writeFileSync('./watched.json', JSON.stringify(watched, null, 2));
    message = "added to";
  } else {
    // remove movie from watched list
    watched = watched.filter(m => m.imdbID !== movie.imdbID);
    fs.writeFileSync('./watched.json', JSON.stringify(watched, null, 2));
    message = "removed from";
  }

  res.json({ message: `Movie ${message} watched list`, watched });
});

app.listen(5000, function() {
  console.log('Server is running on port 5000');
});
