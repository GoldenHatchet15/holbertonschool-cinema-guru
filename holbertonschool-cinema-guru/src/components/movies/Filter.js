import React, { useState } from "react";
import "./movies.css";

const Filter = ({ minYear, setMinYear, maxYear, setMaxYear, sort, setSort, title, setTitle }) => {
  const [sortPlaceholder, setSortPlaceholder] = useState("Sort By"); // ✅ Placeholder state

  const handleSortChange = (e) => {
    setSort(e.target.value);
    setSortPlaceholder(e.target.value); // ✅ Update display text
  };

  return (
    <div className="filter-container">
      
      {/* ✅ Left Section (Search + Year Inputs) */}
      <div className="filter-left">
      <input
        type="text"
        className="search-bar"
        placeholder="Search Movies"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        />

        <input 
          type="number" 
          placeholder="Min Year" 
          value={minYear} 
          onChange={(e) => setMinYear(e.target.value)} 
        />
        <input 
          type="number" 
          placeholder="Max Year" 
          value={maxYear} 
          onChange={(e) => setMaxYear(e.target.value)} 
        />

        {/* ✅ Dropdown Menu for Sorting */}
        <select value={sort} onChange={handleSortChange} className="sort-dropdown">
          <option value="" disabled>{sortPlaceholder}</option> {/* ✅ Placeholder */}
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
          <option value="highestrated">Highest Rated</option>
          <option value="lowestrated">Lowest Rated</option>
        </select>
      </div>

      {/* ✅ Right Section (Genre Tags) */}
      <ul className="filter-right">
        {["Action", "Drama", "Comedy", "Biography", "Romance", "Thriller", "War", "History", "Sport", "Sci-Fi", "Documentary", "Crime", "Fantasy"].map((genre) => (
          <li key={genre} className="tag">{genre}</li>
        ))}
      </ul>

    </div>
  );
};

export default Filter;
