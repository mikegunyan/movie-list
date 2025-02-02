import './App.css';
import React, { useState } from 'react';
import data from './movies.json';
import MovieList from './components/MovieList';

const App = () => {
  const [movies, setMovies] = useState(data);
  return (
    <div className="app">
      <MovieList movies={movies} />
    </div>
  );
}

export default App;

