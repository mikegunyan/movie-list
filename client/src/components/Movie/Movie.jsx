import React from "react";

const Movie = ({ movie, setMovie }) => {
  if (!movie) return null;
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h1>{movie.Title} ({movie.Year})</h1>
          <div className="modal-close" onClick={() => setMovie(null)}>x</div>
        </div>
        <div className="modal-movie">
          <img src={movie.Poster} alt={movie.Title} className="modal-movie-img" />
          <div className="modal-movie-info">
            <div><strong>Directed by:</strong> {movie.Director}</div>
            <div><strong>Genre:</strong> {movie.Genre}</div>
            <div><strong>Rated:</strong> {movie.Rated}</div>
            <div><strong>Released:</strong> {movie.Released}</div>
            <div><strong>Runtime:</strong> {movie.Runtime}</div>
            <div><strong>IMDB Rating:</strong> {movie.imdbRating}</div>
            <div><strong>Actors:</strong> {movie.Actors}</div>
            <p>{movie.Plot}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movie;
