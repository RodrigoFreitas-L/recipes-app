import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function BoxDrinkCard({ drink: { index, idDrink, strDrink, strDrinkThumb } }) {
  return (
    <div
      data-testid={ `${index}-recipe-card` }
      key={ idDrink }
      className="meal-or-drink"
    >
      <Link to={ `/drinks/${idDrink}` }>
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
      </Link>
    </div>
  );
}

BoxDrinkCard.propTypes = {
  idDrink: PropTypes.string,
  strDrink: PropTypes.string,
  strDrinkThumb: PropTypes.string,
}.isRequired;

export default BoxDrinkCard;
