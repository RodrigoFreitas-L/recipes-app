import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

// Componentes
import Ingredients from '../components/RecipeDetails/Ingredients';
import BoxRecomendation from '../components/RecipeDetails/BoxRecomendation';

import { setDrinks } from '../redux/reducers/drinksSlice';
import { setFoods } from '../redux/reducers/foodsSlice';

function CardDrink() {
  const dispatch = useDispatch();
  const { drinks } = useSelector((state) => state.drinks);
  const { foods } = useSelector((state) => state.foods);
  const { location } = useHistory();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Pegando o ID da URL
    const id = location.pathname.split('/')[2];
    // Fazendo a requisição a API pelo ID da receita
    const fetchFoods = async () => {
      const MAX_DRINKS_LIST = 6;
      const endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const response = await fetch(endpoint);
      const data = await response.json();
      dispatch(setFoods(data.meals.slice(0, MAX_DRINKS_LIST)));
    };

    const fetchDrinks = async () => {
      const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
      const endpoint = `${url}${id}`;
      const response = await fetch(endpoint);
      const data = await response.json();
      dispatch(setDrinks(data.drinks));
      fetchFoods();
      setLoading(false);
    };
    fetchDrinks();
  }, [location, loading, dispatch]);

  const renderRecipeDetails = () => {
    const details = drinks.map((drink) => {
      const { idDrink } = drink;
      return (
        <div key={ idDrink }>
          <img
            data-testid="recipe-photo"
            src={ drink.strDrinkThumb }
            alt={ drink.strDrink }
          />
          <p data-testid="recipe-title">{ drink.strDrink }</p>
          <button type="button" data-testid="share-btn">Share</button>
          <button type="button" data-testid="favorite-btn">Favorite</button>
          <p data-testid="recipe-category">{ drink.strAlcoholic }</p>
          <Ingredients recipe={ drink } />
          <p data-testid="instructions">{ drink.strInstructions }</p>
          <BoxRecomendation recomendations={ foods } />
          <button
            style={ { margin: 'auto', width: '100%', bottom: '0', position: 'fixed' } }
            type="button"
            data-testid="start-recipe-btn"
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

export default CardDrink;
