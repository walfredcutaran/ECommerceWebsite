import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';

const Search = () => {

    const [keyword, setKeyword] = useState('');
    const navigate = useNavigate();
    const alert = useAlert()  

  // Handle navigation only when the form is submitted or the keyword is valid
  const handleSearch = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (keyword.trim()) { // Ensure keyword has actual content
      navigate(`/search/${keyword}`);
    } else {
      alert.show("Please enter a keyword.");
    }
  };

  // handle navigation onValidate or onSubmit
  const debouncedSearch = (e) => {
    setKeyword(e.target.value);
  };

  return (
    <div>
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
    </div>
  )
}

export default Search
