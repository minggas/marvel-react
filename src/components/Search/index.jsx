import React from "react";

const Search = props => {
  const placehold = `Search for ${props.type}`;
  return (
    <form onSubmit={props.onSubmit} className="search-form">
      <h2>See all from marvel</h2>
      <input
        type="search"
        placeholder={placehold}
        onChange={props.inputChange}
      />

      <select value={props.value} onChange={props.typeChange}>
        <option value="characters">Character</option>
        <option value="events">Event</option>
        <option value="creators">Creators</option>
        <option value="series">Series</option>
      </select>
      <br />
      <input type="submit" value="Search" />
    </form>
  );
};

export default Search;
