import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';

// componentes
import SearchBar from './SearchBar';

function Header({ title }) {
  const [searchBar, setSearchBar] = useState(false);
  const history = useHistory();

  return (
    <div className="container-header">
      <Link to="/profile">
        <img data-testid="profile-top-btn" src={ profileIcon } alt="Profile" />
      </Link>

      <h1 data-testid="page-title">
        {title}
      </h1>

      {history.location.pathname.includes('explore')
        || history.location.pathname.includes('profile')
        || history.location.pathname.includes('done-recipes')
        || history.location.pathname.includes('favorite-recipes')
        ? ''
        : (
          <button
            type="button"
            onClick={ () => setSearchBar(!searchBar) }
          >
            <img data-testid="search-top-btn" src={ searchIcon } alt="Search" />
          </button>
        )}

      {searchBar && <div className="container-search-bar"><SearchBar /></div>}

    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
