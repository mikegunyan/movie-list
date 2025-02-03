import './App.css';
import React, { useState, useEffect } from 'react';
import MovieList from './components/MovieList';
import Search from "./components/Search";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [watch, setWatch] = useState([]);
  const [watched, setWatched] = useState([]);
  const [tags, setTags] = useState({
    watch: [],
    watched: [],
  });

  const search = (value) => {
    if (!value) return;
    fetch(`/api/search?s=${value}`)
      .then((response) => response.json())
      .then((data) => setMovies(data))
      .catch((error) => console.log(error));
  };

  const toggleWatch = (imdbID) => {
    if (tags.watch.includes(imdbID)) {
      setWatch(watch.filter((movie) => movie.imdbID !== imdbID));
      setTags({ ...tags, watch: tags.watch.filter((id) => id !== imdbID) });
    } else {
      setWatch([...watch, movies.find((movie) => movie.imdbID === imdbID)]);
      setTags({ ...tags, watch: [...tags.watch, imdbID] });
    }
  };

  const toggleWatched = (imdbID) => {
    if (tags.watched.includes(imdbID)) {
      setWatched(watched.filter((movie) => movie.imdbID !== imdbID));
      setTags({ ...tags, watched: tags.watched.filter((id) => id !== imdbID) });
    } else {
      setWatched([...watched, movies.find((movie) => movie.imdbID === imdbID)]);
      setTags({ ...tags, watched: [...tags.watched, imdbID] });
    }
  };

  useEffect(() => {
    fetch('/api/movies')
      .then((response) => response.json())
      .then((data) => {
        setWatch(data.watch);
        setWatched(data.watched);
        setTags({
          watch: data.watch.map((movie) => movie.imdbID),
          watched: data.watched.map((movie) => movie.imdbID),
        });
        setMovies(data.watch);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="app">
      <div className="movie-list">
        <h1>Movie List</h1>
        <Search search={search} />
        <MovieList movies={movies} tags={tags} toggleWatch={toggleWatch} toggleWatched={toggleWatched} />
      </div>
    </div>
  );
};

export default App;

