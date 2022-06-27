import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setFoods } from '../redux/reducers/foodsSlice';
import IngredientsInProgress from './RecipeDetails/IngredientsInProgress';

// fazer a rota da tela de detalhes para essa tela de receitas em andamento
function CardFoodInProgress() {
  const { foods } = useSelector((state) => state.foods);
  const [loading, setLoading] = useState(true);
  const { location } = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchFoods = async () => {
      const id = location.pathname.split('/')[2];
      const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      const response = await fetch(url);
      const data = await response.json();
      dispatch(setFoods(data.meals));
      setLoading(false);
    };
    fetchFoods();
  }, [dispatch, location.pathname]);

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
        >
          Share
        </button>
        <button
          data-testid="favorite-btn"
          type="button"
        >
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
