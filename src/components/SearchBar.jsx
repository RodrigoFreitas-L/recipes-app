import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// Actions
import { setFoods } from '../redux/reducers/foodsSlice';
import { setDrinks } from '../redux/reducers/drinksSlice';
import { setSearchBar } from '../redux/reducers/searchBarSlice';

function SearchBar() {
  const [radioFilter, setRadioFilter] = useState('');
  const [searchFilter, setSearchFilter] = useState('');
  const { location } = useHistory();
  const { searchBar } = useSelector((state) => state.searchBar);
  const dispatch = useDispatch();

  const validationFirstLetter = (filter, value) => {
    if (filter === 'firstLetter' && value.length > 1) {
      return true;
    }
    return false;
  };

  const onClickSearch = async () => {
    const endpointsFoods = {
      name: 'https://www.themealdb.com/api/json/v1/1/search.php?s=',
      firstLetter: 'https://www.themealdb.com/api/json/v1/1/search.php?f=',
      ingredient: 'https://www.themealdb.com/api/json/v1/1/filter.php?i=',
    };

    const endpointsDrinks = {
      name: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
      firstLetter: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=',
      ingredient: 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=',
    };

    if (radioFilter !== '' && searchFilter !== '') {
      if (!validationFirstLetter(radioFilter, searchFilter)) {
        const finalEndpoint = location.pathname === '/foods'
          ? endpointsFoods : endpointsDrinks;
        const response = await fetch(`${finalEndpoint[radioFilter]}${searchFilter}`);
        const data = await response.json();
        if (location.pathname === '/foods') {
          dispatch(setFoods(data.meals));
        } else {
          dispatch(setDrinks(data.drinks));
        }
      } else {
        global.alert('Your search must have only 1 (one) character');
      }
    }
    dispatch(setSearchBar(!searchBar));
  };

  return (
    <div className="search-bar">
      <div className="input-search-bar">
        <input
          type="text"
          data-testid="search-input"
          className="form-control"
          placeholder="Search..."
          value={ searchFilter }
          onChange={ (e) => setSearchFilter(e.target.value) }
        />
      </div>
      <div className="radio-search-bar">
        <label htmlFor="ingredients">
          <input
            type="radio"
            name="filter"
            data-testid="ingredient-search-radio"
            value="ingredient"
            onChange={ (e) => setRadioFilter(e.target.value) }
          />
          Ingredient
        </label>
        <label htmlFor="filter">
          <input
            type="radio"
            name="filter"
            data-testid="name-search-radio"
            value="name"
            onChange={ (e) => setRadioFilter(e.target.value) }
          />
          Name
        </label>
        <label htmlFor="firstLetter">
          <input
            type="radio"
            name="filter"
            data-testid="first-letter-search-radio"
            value="firstLetter"
            onChange={ (e) => setRadioFilter(e.target.value) }
          />
          First Letter
        </label>
      </div>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => onClickSearch() }
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
