import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

// Componentes
import Ingredients from '../components/RecipeDetails/Ingredients';
import Video from '../components/RecipeDetails/Video';
import BoxRecomendation from '../components/RecipeDetails/BoxRecomendation';

import { setFoods } from '../redux/reducers/foodsSlice';
import { setDrinks } from '../redux/reducers/drinksSlice';

function CardFood() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { foods } = useSelector((state) => state.foods);
  const { drinks } = useSelector((state) => state.drinks);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Pegando o ID da URL
    const id = history.location.pathname.split('/')[2];
    // Fazemdo a requisição a API pelo ID da receita
    const fetchDrink = async () => {
      const MAX_DRINKS_LIST = 6;
      const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const response = await fetch(endpoint);
      const data = await response.json();
      dispatch(setDrinks(data.drinks.slice(0, MAX_DRINKS_LIST)));
    };

    const fetchFood = async () => {
      const url = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
      const endpoint = `${url}${id}`;
      const response = await fetch(endpoint);
      const data = await response.json();
      dispatch(setFoods(data.meals));
      fetchDrink();
      setLoading(false);
    };
    fetchFood();
  }, [history.location, loading, dispatch]);

  const handleClickToInProgress = async (idMeal) => {
    // const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
    // const response = await fetch(url);
    // const data = await response.json();
    // dispatch(setFoods(data.meals));
    history.push(`/foods/${idMeal}/in-progress`);
  };

  const renderRecipeDetails = () => {
    const details = foods.map((food) => {
      const { idMeal } = food;
      return (
        <div key={ idMeal }>
          <img
            data-testid="recipe-photo"
            src={ food.strMealThumb }
            alt={ food.strMeal }
          />
          <p data-testid="recipe-title">{ food.strMeal }</p>
          <button type="button" data-testid="share-btn">Share</button>
          <button type="button" data-testid="favorite-btn">Favorite</button>
          <p data-testid="recipe-category">{ food.strCategory }</p>
          <Ingredients recipe={ food } />
          <Video url={ food.strYoutube } />
          <p data-testid="instructions">{ food.strInstructions }</p>
          <BoxRecomendation recomendations={ drinks } />
          <button
            type="button"
            data-testid="start-recipe-btn"
            onClick={ () => handleClickToInProgress(idMeal) }
          >
            Start Recipe

          </button>
        </div>
      );
    });
    return details;
  };

  return (
    <div>
      { loading && <h2>loading ...</h2> }
      { !loading && renderRecipeDetails() }
    </div>
  );
}

export default CardFood;
