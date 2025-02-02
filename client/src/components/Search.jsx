import React, { useState } from "react";

const Search = ({ search }) => {
  const [searchValue, setSearchValue] = useState('');

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
