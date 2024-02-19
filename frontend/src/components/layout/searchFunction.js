import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';

const Search = () => {
  const [keyword, setKeyword] = useState('');
  const [showSearchBar, setShowSearchBar] = useState(true);
  const navigate = useNavigate();
  const alert = useAlert();

  // console.log("DEBUG: ", showSearchBar);

  const handleSearch = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      setShowSearchBar(true);
      navigate(`/search/${keyword}`);

    } else {
      alert.show("Please enter a keyword.");
    }
  };

  const debouncedSearch = (e) => {
    setKeyword(e.target.value);
  };

  return (
    <div>
      {showSearchBar && (
        <form onSubmit={handleSearch}>
          <div className="input-group">
            <input
              type="text"
              id="search_field"
              className="form-control"
              placeholder="Enter Product Name ..."
              onChange={debouncedSearch}
            />
            <div className="input-group-append">
              <button id="search_btn" className="btn">
                <i className="fa fa-search" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default Search;
