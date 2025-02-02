import './App.css';
import React, { useState, useEffect } from 'react';
// import data from './movies.json';
import MovieList from './components/MovieList';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const search = (value) => {
    setSearchValue(value);
    setMovies(
      movies.filter((movie) =>
        movie.Title.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  useEffect(() => {
    fetch('/api')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMovies(data)}
      );
  }, []);

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

