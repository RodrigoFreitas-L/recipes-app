import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';
import { setSearchBar } from '../redux/reducers/searchBarSlice';

// componentes
import SearchBar from './SearchBar';

function Header({ title }) {
  const { searchBar } = useSelector((state) => state.searchBar);
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <div className="container-header">
      <Link to="/profile">
        <img data-testid="profile-top-btn" src={ profileIcon } alt="Profile" />
      </Link>

      <h1 data-testid="page-title">
        {title}
      </h1>

      {history.location.pathname === '/explore'
        || history.location.pathname === '/explore/foods'
        || history.location.pathname === '/explore/drinks'
        || history.location.pathname === '/explore/foods/ingredients'
        || history.location.pathname === '/explore/drinks/ingredients'
        || history.location.pathname.includes('profile')
        || history.location.pathname.includes('done-recipes')
        || history.location.pathname.includes('favorite-recipes')
        ? ''
        : (
          <button
            type="button"
            onClick={ () => dispatch(setSearchBar(!searchBar)) }
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
