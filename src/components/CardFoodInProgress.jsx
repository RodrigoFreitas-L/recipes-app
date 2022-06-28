import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setFoods } from '../redux/reducers/foodsSlice';
import IngredientsInProgress from './RecipeDetails/IngredientsInProgress';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
// import { setFavoriteFoods } from '../redux/reducers/favoriteFoodsSlice';

const copy = require('clipboard-copy');
// fazer a rota da tela de detalhes para essa tela de receitas em andamento
function CardFoodInProgress() {
  const { foods } = useSelector((state) => state.foods);
  const [loading, setLoading] = useState(true);
  const { location } = useHistory();
  const [heart, setHeart] = useState([]);
  const dispatch = useDispatch();
  const getStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));

  useEffect(() => {
    const fetchFoods = async () => {
      const id = location.pathname.split('/')[2];
      const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      const response = await fetch(url);
      const data = await response.json();
      dispatch(setFoods(data.meals));
      setLoading(false);
    };

    const isFav = () => {
      const getFoodId = location.pathname.split('/')[2];
      if (getStorage?.find((item) => (item.id === getFoodId))) {
        setHeart(blackHeartIcon);
      } else {
        setHeart(whiteHeartIcon);
      }
    };
    fetchFoods();
    isFav();
  }, [dispatch, getStorage, heart, location.pathname]);

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
    if (!getStorage.find((item) => item.id === favFoodArray.idMeal)) {
      const settingFavFood = {
        id: favFoodArray.idMeal,
        type: 'food',
        nationality: favFoodArray.strArea,
        category: favFoodArray.strCategory,
        alcoholicOrNot: 'non-alcoholic',
        name: favFoodArray.strMeal,
        image: favFoodArray.strMealThumb,
      };
      const newStorage = [...getStorage, settingFavFood];
      localStorage.setItem('favoriteRecipes', JSON.stringify(newStorage));
    } else {
      const index = getStorage.indexOf(favFoodArray.idMeal);
      getStorage.splice(index, 1);
      localStorage.setItem('favoriteRecipes', JSON.stringify(getStorage));
    }
  };

  const listFoodsInProgress = () => {
    const listInProgress = foods.map((food) => (
      <div
        key={ food.idMeal }
      >
        <img
          data-testid="recipe-photo"
          src={ food.strMealThumb }
          alt={ food.strMeal }
        />
        <h1
          data-testid="recipe-title"
        >
          { food.strMeal }
        </h1>
        <button
          data-testid="share-btn"
          type="button"
          onClick={ (e) => handleShareClick(e) }
        >
          Share
        </button>
        <button
          type="button"
          onClick={ () => handleFavoriteClick(foods) }
        >
          <img
            data-testid="favorite-btn"
            src={ heart }
            alt="favorite"
          />
          Favorite
        </button>
        <p
          data-testid="recipe-category"
        >
          { food.strCategory }
        </p>

        <IngredientsInProgress recipe={ food } storageName="savedFoodsIngredients" />

        <p
          data-testid="instructions"
        >
          { food.strInstructions }
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
      { !loading && foods !== undefined && listFoodsInProgress() }
    </div>
  );
}

export default CardFoodInProgress;
