import React, { useState } from "react";
import Search from "./Search";
import Movie from "./Movie";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState(null);

  const search = (value) => {
    fetch(`/api/search?s=${value}`)
      .then((response) => response.json())
      .then((data) => setMovies(data))
      .catch((error) => console.log(error));
  };

  const openMovie = (imdbID) => {
    fetch(`/api/movie?i=${imdbID}`)
      .then((response) => response.json())
      .then((data) => setMovie(data))
      .catch((error) => console.log(error));
  };

  return (
    <div className="movie-list">
      <h1>Movie List</h1>
      <Search search={search} />
      <div className="scrollable">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="movie" onClick={() => openMovie(movie.imdbID)}>
            <img src={movie.Poster} alt={movie.Title} className="movie-img" />
            <div className="movie-info">
              <h2>{movie.Title}</h2>
              <div>{movie.Year}</div>
              <div>{movie.Type}</div>
            </div>
          </div>
        ))}
      </div>
      <Movie movie={movie} setMovie={setMovie} />
    </div>
  );
};

export default MovieList;
