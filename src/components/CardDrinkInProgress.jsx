import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setDrinks } from '../redux/reducers/drinksSlice';
import IngredientsInProgress from './RecipeDetails/IngredientsInProgress';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import '../styles/CardInProgress.css';

const copy = require('clipboard-copy');

// fazer a rota da tela de detalhes para essa tela de receitas em andamento
function CardDrinkInProgress() {
  const { drinks } = useSelector((state) => state.drinks);
  const { location } = useHistory();
  const [loading, setLoading] = useState(true);
  const [heart, setHeart] = useState(false);
  const dispatch = useDispatch();
  const getStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));

  useEffect(() => {
    const fetchDrink = async () => {
      const id = location.pathname.split('/')[2];
      const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      const response = await fetch(url);
      const data = await response.json();
      dispatch(setDrinks(data.drinks));
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

    fetchDrink();
    createStorage();
    isFav();
  }, [dispatch, location.pathname]);

  const handleShareClick = ({ target }) => {
    const path = location.pathname;
    const newPath = path.includes('/in-progress')
      ? path.split('/in-progress').shift()
      : path;
    target.innerHTML = 'Link copied!';
    copy(`http://localhost:3000${newPath}`);
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

  const listDrinkInProgress = () => {
    const listInProgress = drinks.map((drink) => (
      <div
        key={ drink.idDrink }
      >
        <img
          data-testid="recipe-photo"
          src={ drink.strDrinkThumb }
          alt={ drink.strDrink }
        />
        <h1
          data-testid="recipe-title"
        >
          { drink.strDrink }
        </h1>
        <button
          data-testid="share-btn"
          type="button"
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
        <p
          data-testid="recipe-category"
        >
          { drink.strCategory }
        </p>

        <IngredientsInProgress recipe={ drink } storageName="savedDrinksIngredients" />

        <p
          data-testid="instructions"
        >
          { drink.strInstructions }
        </p>
        <button
          data-testid="finish-recipe-btn"
          type="button"
        >
          Finish
        </button>
      </div>
    ));
    return listInProgress;
  };
  return (
    <div>
      { loading && <h2>loading ...</h2> }
      { !loading && listDrinkInProgress() }
    </div>
  );
}

export default CardDrinkInProgress;
