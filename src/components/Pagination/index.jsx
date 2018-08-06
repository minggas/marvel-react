import React from "react";

const Pagination = props => {
  let pages = [];
  for (let i = 1; i <= props.pages; i++) {
    pages.push(
      <option value={i} key={i}>
        {i}
      </option>
    );
  }
  return (
    <div className="pages">
      <label>Pages</label>
      <select
        name="pages"
        className="max-comics"
        onChange={props.changePage}
        value={props.actual}
      >
        {pages}
      </select>
    </div>
  );
};

export default Pagination;
