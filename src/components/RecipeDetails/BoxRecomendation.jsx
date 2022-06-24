import React from 'react';
import { useHistory } from 'react-router-dom';
import { PropTypes } from 'prop-types';

function BoxRecomendation({ recomendations }) {
  const history = useHistory();

  const onClickRecomendations = (e, idDrink, idMeal) => {
    e.preventDefault();
    if (history.location.pathname.includes('/foods')) {
      history.push(`/drinks/${idDrink}`);
    } else {
      history.push(`/foods/${idMeal}`);
    }
  };

  const renderBox = () => {
    const cards = recomendations.map((food, index) => {
      const { idDrink, idMeal, strDrink, strMeal, strDrinkThumb, strMealThumb } = food;
      const dataTestId = `${index}-recomendation-card`;
      console.log(dataTestId);
      return (
        <a
          key={ index }
          data-testid={ dataTestId }
          className="meal-or-drink"
          href="/"
          onClick={ (e) => onClickRecomendations(e, idDrink, idMeal) }
        >
          <h1
            data-testid={ `${index}-recomendation-title` }
          >
            { strDrink || strMeal }
          </h1>
          <img
            src={ strDrinkThumb || strMealThumb }
            alt={ strDrink || strMeal }
          />
        </a>
      );
    });
    return cards;
  };

  return (
    <>
      { renderBox() }
    </>
  );
}

BoxRecomendation.propTypes = {
  recomendations: PropTypes.arrayOf(PropTypes.shape),
}.isRequired;

export default BoxRecomendation;
