import React from "react";

const Search = ({ searchValue, setSearchValue, search }) => {
  return (
    <div className="search">
      <input
        type="text"
        placeholder="Search for a movie..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <button onClick={() => search(searchValue)}>Search</button>
    </div>
  );
};

export default Search;
