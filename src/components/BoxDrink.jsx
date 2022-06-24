import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

function BoxDrink() {
  const { drinks } = useSelector((state) => state.drinks);
  const [drinksInitial, setDrinksInitial] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      const data = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
        .then((response) => response.json());
      setDrinksInitial(data.drinks);
    };
    fetchAPI();
  }, []);

  const renderDrinks = () => {
    const MAX_LIST_NUMBER = 12;
    if (drinks !== null) {
      if (drinks.length > 0) {
        const listDrinks = drinks.map((drink, index) => (
          <div
            data-testid={ `${index}-recipe-card` }
            key={ drink.idDrink }
            className="meal-or-drink"
          >
            <h1
              data-testid={ `${index}-card-name` }
            >
              {drink.strDrink}

            </h1>
            <img
              data-testid={ `${index}-card-img` }
              src={ drink.strDrinkThumb }
              alt={ drink.strDrink }
            />
          </div>
        ));
        return listDrinks.slice(0, MAX_LIST_NUMBER);
      }
      const listDrinksInitial = drinksInitial.map((drink, index) => (
        <div
          data-testid={ `${index}-recipe-card` }
          key={ drink.idDrink }
          className="meal-or-drink"
        >
          <h1
            data-testid={ `${index}-card-name` }
          >
            {drink.strDrink}

          </h1>
          <img
            data-testid={ `${index}-card-img` }
            src={ drink.strDrinkThumb }
            alt={ drink.strDrink }
          />
        </div>
      ));
      return listDrinksInitial.slice(0, MAX_LIST_NUMBER);
    }
  };

  return (
    <>
      {renderDrinks()}
    </>
  );
}

BoxDrink.propTypes = {
  drinks: PropTypes.objectOf(PropTypes.shape),
}.isRequired;

export default BoxDrink;
