import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
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

  const splitList = (list) => {
    const newArray = [];
    const cutValue = 2;
    for (let i = 0; i < list.length; i += cutValue) {
      newArray.push(list.slice(i, i + cutValue));
    }
    return newArray;
  };

  const renderDetails = (recipe, index) => {
    const card = recipe.map((food) => {
      const { idDrink, idMeal, strDrink, strMeal, strDrinkThumb, strMealThumb } = food;
      const dataTestId = `${index}-recomendation-card`;
      return (
        <a
          key={ idDrink || idMeal }
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
    return card;
  };

  const renderBox = () => {
    const listSplitRecipe = splitList(recomendations);
    const cards = listSplitRecipe.map((food, index) => {
      const idIndex = index === 0 ? 0 : index + (1 + (index - 1));
      const idIndex2 = index === 0 ? index + 1 : idIndex + 1;
      const [recipe1, recipe2] = food;
      return (
        <Carousel.Item key={ index }>
          <div style={ { display: 'flex' } }>
            { renderDetails([recipe1], idIndex) }
            { renderDetails([recipe2], idIndex2) }
          </div>
        </Carousel.Item>
      );
    });
    return cards;
  };

  return (
    <Carousel interval={ null }>
      { renderBox() }
    </Carousel>
  );
}

BoxRecomendation.propTypes = {
  recomendations: PropTypes.arrayOf(PropTypes.shape),
}.isRequired;

export default BoxRecomendation;
