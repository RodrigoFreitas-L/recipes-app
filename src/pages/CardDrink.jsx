import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

// Componentes
import Ingredients from '../components/RecipeDetails/Ingredients';
import BoxRecomendation from '../components/RecipeDetails/BoxRecomendation';

import { setDrinks } from '../redux/reducers/drinksSlice';
import { setFoods } from '../redux/reducers/foodsSlice';

import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

const copy = require('clipboard-copy');

function CardDrink() {
  const dispatch = useDispatch();
  const { drinks } = useSelector((state) => state.drinks);
  const { foods } = useSelector((state) => state.foods);
  const { location, push } = useHistory();
  const [loading, setLoading] = useState(true);
  const [heart, setHeart] = useState(false);
  const getStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));

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
      const getDrinkId = location.pathname.split('/')[2];
      if (getStorage?.find((item) => (item.id === getDrinkId))) {
        setHeart(true);
      } else if (getStorage && !getStorage.find((item) => (item.id === getDrinkId))) {
        setHeart(false);
      }
    };

    fetchDrinks();
    createStorage();
    isFav();
  }, [location, loading, dispatch]);

  const handleShareClick = ({ target }) => {
    const path = location.pathname;
    const newPath = path.includes('/in-progress')
      ? path.split('/in-progress').shift()
      : path;
    target.innerHTML = 'Link copied!';
    copy(`http://localhost:3000${newPath}`);
  };

  // foto, nome, categoria, nacionalidade, botão de compartilhar e unfav

  const handleClickToInProgress = async (idDrink) => {
    push(`/drinks/${idDrink}/in-progress`);
  };
  const handleFavoriteClick = (favDrink) => {
    const favDrinkArray = favDrink[0];
    if (heart === false
      && !getStorage.find((item) => item.id === favDrinkArray.idDrink)) {
      const settingFavFood = {
        id: favDrinkArray.idDrink,
        type: 'drink',
        nationality: '',
        category: favDrinkArray.strCategory,
        alcoholicOrNot: favDrinkArray.strAlcoholic,
        name: favDrinkArray.strDrink,
        image: favDrinkArray.strDrinkThumb,
      };
      const newStorage = [...getStorage, settingFavFood];
      localStorage.setItem('favoriteRecipes', JSON.stringify(newStorage));
      setHeart(true);
    } else {
      const index = getStorage.indexOf(favDrinkArray.idDrink);
      getStorage.splice(index, 1);
      localStorage.setItem('favoriteRecipes', JSON.stringify(getStorage));
      setHeart(false);
    }
  };

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
            onClick={ () => handleFavoriteClick(drinks) }
            src={ heart ? blackHeartIcon : whiteHeartIcon }
            alt="favorite"
          />
          Favorite

          <p data-testid="recipe-category">{ drink.strAlcoholic }</p>
          <Ingredients recipe={ drink } />
          <p data-testid="instructions">{ drink.strInstructions }</p>
          <BoxRecomendation recomendations={ foods } />
          <button
            style={ { margin: 'auto', width: '100%', bottom: '0', position: 'fixed' } }
            type="button"
            data-testid="start-recipe-btn"
            onClick={ () => handleClickToInProgress(idDrink) }
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
