import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

function BoxDrink() {
  const { drinks } = useSelector((state) => state.drinks);
  const renderDrinks = () => {
    const MAX_LIST_NUMBER = 12;
    if (drinks !== null) {
      if (drinks.length > 0) {
        const listDrinks = drinks.map((drink, index) => (
          <div
            data-testid={ `${index}-recipe-card` }
            key={ drink.idDrink }
          >
            <h1
              data-testid={ `${index}-card-name` }
            >
              { drink.strDrink }

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
      return false;
    }
  };

  return (
    <>
      { renderDrinks() }
    </>
  );
}

BoxDrink.propTypes = {
  drinks: PropTypes.objectOf(PropTypes.shape),
}.isRequired;

export default BoxDrink;
