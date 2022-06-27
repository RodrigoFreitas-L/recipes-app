import React from 'react';
import PropTypes from 'prop-types';

function Ingredients({ recipe }) {
  const renderIngredients = () => {
    // Pegando os ingredientes
    const ingredientsList = Object.entries(recipe).filter((key) => {
      if (key[0].includes('strIngredient') && key[1] !== '' && key[1] !== null) {
        return key;
      }
      return false;
    });

    const measuresList = Object.entries(recipe).filter((key) => {
      if (key[0].includes('strMeasure') && key[1] !== '' && key[1] !== null) {
        return key;
      }
      return false;
    });

    return ingredientsList.map((ingredient, index) => {
      const value = ingredient[1];
      const dataTestId = `${index}-ingredient-name-and-measure`;
      const result = `${measuresList[index] === undefined
        ? '' : measuresList[index][1]} ${value}`;
      return (<li data-testid={ dataTestId } key={ ingredient[0] }>{result}</li>);
    });
  };

  return (
    <ul>
      { recipe !== undefined && renderIngredients() }
    </ul>
  );
}

Ingredients.propTypes = {
  recipe: PropTypes.arrayOf(PropTypes.shape),
}.isRequired;

export default Ingredients;
