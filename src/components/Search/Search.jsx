import React from "react";
import "./search.scss";

const Search = () => {
  return (
    <div className="search-container">
      <input type="text" name="global-search" placeholder="search products" />
      <input type="submit" value="Search" />
    </div>
  );
};

export default Search;
