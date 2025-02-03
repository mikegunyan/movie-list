import React, { useState } from "react";

const Search = ({ search, list }) => {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="search">
      <input
        className="search-input"
        type="text"
        placeholder="Search for a movie..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <button className={`tab ${list === "search" ? "selected" : ""}`} onClick={() => search(searchValue)}>Search</button>
    </div>
  );
};

export default Search;
