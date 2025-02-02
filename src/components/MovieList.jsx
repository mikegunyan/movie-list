import React from "react";

const MovieList = ({ movies }) => {
  return (
    <div className="movie-list">
      <h1>Movie List</h1>
      <div className="scrollable">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="movie">
            <img src={movie.Poster} alt={movie.Title} className="movie-img" />
            <div className="movie-info">
              <h3>{movie.Title}</h3>
              <div>{movie.Year}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
