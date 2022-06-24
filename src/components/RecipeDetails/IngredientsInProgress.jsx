import React from 'react';
import PropTypes from 'prop-types';

function Ingredients({ recipe }) {
  // const [completed, useCompleted] = useState(false);

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

    // const handleScratch = (e) => {
    //   if (e.target.classList.contains('completed')) {
    //     const riscaTarget = (item) => {
    //       const taskItem = item.target;
    //       if (taskItem.className === 'completed') {
    //         taskItem.classList.remove('completed');
    //       } else {
    //         taskItem.classList.add('completed');
    //       }
    //     };
    //     return riscaTarget;
    //   }
    // };

    const handleRiscada = (e) => {
      if (e.target.className === 'completo') {
        return true;
      } return false;
    };

    return ingredientsList.map((ingredient, index) => {
      const value = ingredient[1];
      const dataTestId = `${index}-ingredient-name-and-measure`;
      const result = `${measuresList[index][1]} ${value}`;
      return (
        <li
          data-testid={ dataTestId }
          key={ ingredient[0] }
          className={ (e) => (handleRiscada(e) ? 'completo' : 'incompleto') }
        >
          <input
            data-testid={ `${index}-ingredient-step` }
            type="checkbox"
            name="ingredient-step"
            value="ingredient-step"
            // checked={ drink.ingredientStep }
            onClick={ (e) => handleRiscada(e) }
          />
          {result}
        </li>
      );
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
