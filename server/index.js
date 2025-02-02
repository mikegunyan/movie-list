const express = require('express');
let app = express();
const movies = require('./movies.json');

app.get('/api', (req, res) => {
  res.json(movies);
});

app.listen(5000, function() {
  console.log('Server is running on port 5000');
});
