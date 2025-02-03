import React, { useState } from "react";
import Movie from "./Movie";

const MovieList = ({ movies, tags, toggleWatch, toggleWatched }) => {
  const [movie, setMovie] = useState(null);
  
  const openMovie = (imdbID) => {
    fetch(`/api/movie?i=${imdbID}`)
      .then((response) => response.json())
      .then((data) => setMovie(data))
      .catch((error) => console.log(error));
  };

  return (
    <div className="scrollable">
      {movies.map((movie) => (
        <div key={movie.imdbID} className="movie">
          <img src={movie.Poster} alt={movie.Title} className="movie-img" onClick={() => openMovie(movie.imdbID)} />
          <div className="movie-info">
            <h2 onClick={() => openMovie(movie.imdbID)}>{movie.Title}</h2>
            <div>{movie.Year}</div>
            <div>{movie.Type}</div>
            <button className={`movie-tag ${tags.watch.includes(movie.imdbID) ? "tagged" : ""}`}
              onClick={() => toggleWatch(movie.imdbID)}>
              watch
            </button>
            <button className={`movie-tag ${tags.watched.includes(movie.imdbID) ? "tagged" : ""}`}
              onClick={() => toggleWatched(movie.imdbID)}>
              watched
            </button>
          </div>
        </div>
      ))}
      <Movie movie={movie} setMovie={setMovie} />
    </div>
  );
};

export default MovieList;
