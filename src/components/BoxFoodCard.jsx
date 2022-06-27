import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function BoxFoodCard({ meal: { index, idMeal, strMeal, strMealThumb } }) {
  return (
    <div
      data-testid={ `${index}-recipe-card` }
      key={ idMeal }
      className="meal-or-drink"
    >
      <Link to={ `/foods/${idMeal}` }>
        <h1
          data-testid={ `${index}-card-name` }
        >
          {strMeal}

        </h1>
        <img
          data-testid={ `${index}-card-img` }
          src={ strMealThumb }
          alt={ strMeal }
        />
      </Link>
    </div>
  );
}

BoxFoodCard.propTypes = {
  idMeal: PropTypes.string,
  strMeal: PropTypes.string,
  strMealThumb: PropTypes.string,
}.isRequired;

export default BoxFoodCard;
