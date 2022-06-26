import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { setDrinks } from '../redux/reducers/drinksSlice';
import BoxDrinkCard from './BoxDrinkCard';
import Glass from './Glass';

function BoxDrink() {
  const { drinks } = useSelector((state) => state.drinks);
  const [renderedDrinks, setRenderedDrinks] = useState([]);
  const [initialDrinks, setInitialDrinks] = useState([]);
  const [drinkCategories, setDrinkCategories] = useState([]);
  const [categoryToggle, setCategoryToggle] = useState(
    { status: false, category: '' },
  );
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAPI = async () => {
      const categories = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
        .then((response) => response.json());
      setDrinkCategories(categories.drinks);
      const data = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
        .then((response) => response.json());
      setRenderedDrinks(data.drinks);
      setInitialDrinks(data.drinks);
      setLoading(false);
    };
    fetchAPI();
  }, []);

  useEffect(() => {
    if (categoryToggle.status) {
      setLoading(true);
      const fetchAPI = async () => {
        const categories = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${categoryToggle.category}`)
          .then((response) => response.json());
        setRenderedDrinks(categories.drinks);
        setLoading(false);
      }; fetchAPI();
    }
  }, [categoryToggle]);

  const filterByCategory = (category) => {
    if (categoryToggle.category === (category)) {
      if (categoryToggle.status) {
        setRenderedDrinks(initialDrinks);
        setCategoryToggle({ status: false, category: '' });
      }
    } else {
      setCategoryToggle({ status: true, category });
      setRenderedDrinks(initialDrinks
        .filter(({ strCategory }) => strCategory === category));
    }
  };

  const renderAllDrinks = () => {
    dispatch(setDrinks([]));
    setCategoryToggle({ status: false, category: '' });
    setRenderedDrinks(initialDrinks);
  };

  const renderDrinksCategories = () => {
    const MAX_LIST_NUMBER = 6;
    const allButton = [
      <button
        key="a"
        data-testid="All-category-filter"
        type="button"
        onClick={ () => renderAllDrinks() }
      >
        All
      </button>,
    ];
    const drinksCategoriesButtons = drinkCategories.map(({ strCategory }, index) => (
      <button
        data-testid={ `${strCategory}-category-filter` }
        type="button"
        key={ index }
        onClick={ () => filterByCategory(strCategory) }
      >
        {strCategory}
      </button>
    ));
    const concatanatedButtons = [...allButton, ...drinksCategoriesButtons];
    return concatanatedButtons.slice(0, MAX_LIST_NUMBER);
  };

  const renderDrinks = () => {
    const MAX_LIST_NUMBER = 12;
    if (drinks !== null) {
      if (drinks.length > 0) {
        const listDrinks = drinks.map(({ idDrink, strDrink, strDrinkThumb }, index) => (
          <BoxDrinkCard
            key={ index }
            drink={ { index, idDrink, strDrink, strDrinkThumb } }
          />
        ));
        return listDrinks.slice(0, MAX_LIST_NUMBER);
      }
      const listDrinksInitial = renderedDrinks
        .map(({ idDrink, strDrink, strDrinkThumb }, index) => (
          <BoxDrinkCard
            drink={ { index, idDrink, strDrink, strDrinkThumb } }
            key={ index }
          />
        ));
      return listDrinksInitial.slice(0, MAX_LIST_NUMBER);
    }
  };

  return (
    <>
      <div className="container-categories-buttons">
        {loading ? <Glass /> : renderDrinksCategories()}
      </div>
      {!loading && renderDrinks()}
    </>
  );
}

BoxDrink.propTypes = {
  drinks: PropTypes.objectOf(PropTypes.shape),
}.isRequired;

export default BoxDrink;
