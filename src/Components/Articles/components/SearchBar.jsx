import React from 'react';

const SearchBar = ({ searchQuery, setSearchQuery, isRTL }) => {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder={isRTL ? "ابحث عن المقالات..." : "Search articles..."}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />
    </div>
  );
};

export default SearchBar;
