import './App.css';
import React, { useState, useEffect } from 'react';
import MovieList from './components/MovieList';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const search = (value) => {
    setSearchValue(value);
    fetch(`/api/search?s=${value}`)
      .then((response) => response.json())
      .then((data) => setMovies(data))
      .catch((error) => console.log(error));
  };

  return (
    <div className="app">
      <MovieList
        movies={movies}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        search={search}
      />
    </div>
  );
};

export default App;

