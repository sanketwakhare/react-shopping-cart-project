import React from "react";
import { useNavigate } from "react-router";
import "./search.scss";

const Search = () => {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const searchString = event?.target[0]?.value;
    if (!searchString) return;
    console.log("search clicked");
    navigate("search", { state: { searchString } });
  };

  return (
    <form onSubmit={handleSubmit} className="search-container">
      <input type="text" name="global-search" placeholder="search products" />
      <input type="submit" value="Search" />
    </form>
  );
};

export default Search;
