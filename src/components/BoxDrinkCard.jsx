import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function BoxDrinkCard({ drink: { index, idDrink, strDrink, strDrinkThumb } }) {
  return (
    <Link to={ `/drinks/${idDrink}` }>
      <div
        data-testid={ `${index}-recipe-card` }
        key={ idDrink }
        className="meal-or-drink"
      >
        <h1
          data-testid={ `${index}-card-name` }
        >
          {strDrink}

        </h1>
        <img
          data-testid={ `${index}-card-img` }
          src={ strDrinkThumb }
          alt={ strDrink }
        />
      </div>
    </Link>
  );
}

BoxDrinkCard.propTypes = {
  idDrink: PropTypes.string,
  strDrink: PropTypes.string,
  strDrinkThumb: PropTypes.string,
}.isRequired;

export default BoxDrinkCard;
