import './App.css';
import React, { useState, useEffect } from 'react';
import MovieList from './components/MovieList/MovieList';
import Search from "./components/Search/Search";

const App = () => {
  const [list, setList] = useState("watch");
  const [movies, setMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [watch, setWatch] = useState([]);
  const [watched, setWatched] = useState([]);
  const [tags, setTags] = useState({ watch: [], watched: [] });
  const [searchValue, setSearchValue] = useState('');

  const changeList = (list) => {
    setList(list);
    if (list === "watch") setMovies(watch);
    if (list === "watched") setMovies(watched);
  };

  const search = (value) => {
    if (!value || (value === searchValue && list !== "search")) {
      setMovies(value ? searchResults : []);
      setList("search");
      return;
    }
    setList("search");
    fetch(`/api/search?s=${value}`)
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data);
        setMovies(data);
        setSearchValue(value);
      })
      .catch((error) => console.log(error));
  };

  const toggleWatch = (movie) => {
    fetch('/api/watch', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(movie),
    })
      .then((response) => response.json())
      .then((data) => {
        setWatch(data.watch);
        setTags({ ...tags, watch: data.watch.map((movie) => movie.imdbID) });
      })
      .catch((error) => console.log(error));
  };

  const toggleWatched = (movie) => {
    fetch('/api/watched', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(movie),
    })
      .then((response) => response.json())
      .then((data) => {
        setWatched(data.watched);
        setTags({ ...tags, watched: data.watched.map((movie) => movie.imdbID) });
      })
      .catch((error) => console.log(error));
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
        <div className="row">
          <Search search={search} list={list} />
          <div className="tabs">
            <button className={`tab ${list === "watch" ? "selected" : ""}`}
              onClick={() => changeList("watch")}>
              watch List
            </button>
            <button className={`tab ${list === "watched" ? "selected" : ""}`}
              onClick={() => changeList("watched")}>
              watched List
            </button>
          </div>
        </div>
        <h2>{list === "watch" ? "Watch List" : list === "watched" ? "Watched List" : "Search Results"}</h2>
        <MovieList movies={movies} tags={tags} toggleWatch={toggleWatch} toggleWatched={toggleWatched} />
      </div>
    </div>
  );
};

export default App;

