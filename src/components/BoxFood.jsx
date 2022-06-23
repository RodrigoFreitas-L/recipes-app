import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

function BoxFood() {
  const { foods } = useSelector((state) => state.foods);

  const renderFoods = () => {
    const MAX_LIST_NUMBER = 12;
    if (foods !== null) {
      if (foods.length > 0) {
        const listFoods = foods.map((meal, index) => (
          <div
            data-testid={ `${index}-recipe-card` }
            key={ meal.idMeal }
          >
            <h1
              data-testid={ `${index}-card-name` }
            >
              { meal.strMeal }

            </h1>
            <img
              data-testid={ `${index}-card-img` }
              src={ meal.strMealThumb }
              alt={ meal.strMeal }
            />
          </div>
        ));
        return listFoods.slice(0, MAX_LIST_NUMBER);
      }
      return false;
    }
  };

  return (
    <>
      { renderFoods() }
    </>
  );
}

BoxFood.propTypes = {
  foods: PropTypes.objectOf(PropTypes.shape),
}.isRequired;

export default BoxFood;
