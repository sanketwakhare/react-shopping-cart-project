import { useState } from "react";
import { useNavigate } from "react-router";
import "./search.scss";

const Search = () => {
  const navigate = useNavigate();
  const [freeText, setFreeText] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const searchString = event?.target[0]?.value?.trim();
    if (!searchString) return;
    navigate("search", { state: { searchString } });
  };

  const handleClear = async (event) => {
    event.preventDefault();
    setFreeText("");
  };

  const handleOnChange = async (event) => {
    event.preventDefault();
    setFreeText(event?.target?.value?.trim());
  };

  const clearSearchClasses = ["clear-search"];
  if (freeText) {
    clearSearchClasses.push("show-clear-search");
  }

  return (
    <form onSubmit={handleSubmit} className="search-container">
      <div>
        <input
          type="text"
          name="global-search"
          placeholder="search products"
          className="search-input"
          value={freeText}
          onChange={handleOnChange}
        />
        <button
          type="button"
          onClick={handleClear}
          className={clearSearchClasses.join(" ")}
        >
          x
        </button>
      </div>
      <input type="submit" value="Search"></input>
    </form>
  );
};

export default Search;
