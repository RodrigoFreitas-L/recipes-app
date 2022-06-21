import React, { useState } from 'react';
import Header from './Header';
import searchIcon from '../images/searchIcon.svg';

function ExploreFoodsNationalities() {
  const [searchBar, setSearchBar] = useState(false);
  return (
    <>
      <Header title="Explore Nationalities" />
      <button
        type="button"
        onClick={ () => setSearchBar(!searchBar) }
      >
        <img data-testid="search-top-btn" src={ searchIcon } alt="Search" />
      </button>
    </>
  );
}

export default ExploreFoodsNationalities;
