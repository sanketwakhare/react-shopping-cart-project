import React from "react";
import "./search.scss";

const Search = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("search clicked");
  };
  return (
    <form onSubmit={handleSubmit} className="search-container">
      <input type="text" name="global-search" placeholder="search products" />
      <input type="submit" value="Search" />
    </form>
  );
};

export default Search;
