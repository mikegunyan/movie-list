import './App.css';
import React, { useState } from 'react';
import data from './movies.json';
import MovieList from './components/MovieList';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: data,
      searchValue: ''
    };
  }

  search(value) {
    this.setState({
      searchValue: value,
      movies: data.filter((movie) =>
        movie.Title.toLowerCase().includes(value.toLowerCase())
      )
    });
  }

  render() {
    return (
      <div className="app">
        <MovieList
          movies={this.state.movies}
          searchValue={this.state.searchValue}
          setSearchValue={(searchValue) => this.setState({ searchValue })}
          search={(value) => this.search(value)}
        />
      </div>
    );
  }
}

export default App;

