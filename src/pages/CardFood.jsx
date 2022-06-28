import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

// Componentes
import Ingredients from '../components/RecipeDetails/Ingredients';
import Video from '../components/RecipeDetails/Video';
import BoxRecomendation from '../components/RecipeDetails/BoxRecomendation';

import { setFoods } from '../redux/reducers/foodsSlice';
import { setDrinks } from '../redux/reducers/drinksSlice';

import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

const copy = require('clipboard-copy');

function CardFood() {
  const history = useHistory();
  const { location } = useHistory();
  const dispatch = useDispatch();
  const { foods } = useSelector((state) => state.foods);
  const { drinks } = useSelector((state) => state.drinks);
  const [loading, setLoading] = useState(true);
  const [heart, setHeart] = useState(false);
  const getStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));

  useEffect(() => {
    // Pegando o ID da URL
    const id = location.pathname.split('/')[2];
    // Fazemdo a requisição a API pelo ID da receita
    const createStorage = () => {
      if (!localStorage.getItem('savedFoodsIngredients')) {
        localStorage.setItem('savedFoodsIngredients', JSON.stringify([]));
      }
      if (!localStorage.getItem('savedDrinksIngredients')) {
        localStorage.setItem('savedDrinksIngredients', JSON.stringify([]));
      }
      if (!localStorage.getItem('favoriteRecipes')) {
        localStorage.setItem('favoriteRecipes', JSON.stringify([]));
      }
    };

    const isFav = () => {
      const getFoodId = location.pathname.split('/')[2];
      if (getStorage?.find((item) => (item.id === getFoodId))) {
        setHeart(true);
      } else if (getStorage && !getStorage.find((item) => (item.id === getFoodId))) {
        setHeart(false);
      }
    };

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
    createStorage();
    isFav();
  }, [loading, dispatch, location.pathname]);

  const handleClickToInProgress = async (idMeal) => {
    history.push(`/foods/${idMeal}/in-progress`);
  };

  const handleShareClick = ({ target }) => {
    const path = location.pathname;
    const newPath = path.includes('/in-progress')
      ? path.split('/in-progress').shift()
      : path;
    target.innerHTML = 'Link copied!';
    copy(`http://localhost:3000${newPath}`);
  };

  const handleFavoriteClick = (favFood) => {
    // dispatch(setFavoriteFoods(favFood));
    const favFoodArray = favFood[0];
    if (heart === false && !getStorage.find((item) => item.id === favFoodArray.idMeal)) {
      const settingFavFood = {
        id: favFoodArray.idMeal,
        type: 'food',
        nationality: favFoodArray.strArea,
        category: favFoodArray.strCategory,
        alcoholicOrNot: '',
        name: favFoodArray.strMeal,
        image: favFoodArray.strMealThumb,
      };
      const newStorage = [...getStorage, settingFavFood];
      localStorage.setItem('favoriteRecipes', JSON.stringify(newStorage));
      setHeart(true);
    } else {
      const index = getStorage.indexOf(favFoodArray.idMeal);
      getStorage.splice(index, 1);
      localStorage.setItem('favoriteRecipes', JSON.stringify(getStorage));
      setHeart(false);
    }
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
          <button
            type="button"
            data-testid="share-btn"
            onClick={ (e) => handleShareClick(e) }
          >
            Share
          </button>
          <input
            type="image"
            data-testid="favorite-btn"
            onClick={ () => handleFavoriteClick(foods) }
            src={ heart ? blackHeartIcon : whiteHeartIcon }
            alt="favorite"
          />
          Favorite
          <p data-testid="recipe-category">{ food.strCategory }</p>
          <Ingredients recipe={ food } />
          <Video url={ food.strYoutube } />
          <p data-testid="instructions">{ food.strInstructions }</p>
          <BoxRecomendation recomendations={ drinks } />
          <button
            style={ { width: '25%', left: '35%', bottom: '0', position: 'fixed' } }
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
