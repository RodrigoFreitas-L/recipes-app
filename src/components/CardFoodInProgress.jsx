import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setFoods } from '../redux/reducers/foodsSlice';

// fazer a rota da tela de detalhes para essa tela de receitas em andamento
function CardFoodInProgress() {
  const { foods } = useSelector((state) => state.foods);
  const [loading, setLoading] = useState(true);
  const { location } = useHistory();
  const dispatch = useDispatch();

  const riscaTarget = (item) => {
    const taskItem = item.target;
    if (taskItem.className === 'completed') {
      taskItem.classList.remove('completed');
    } else {
      taskItem.classList.add('completed');
    }
  };

  const riscaTargetOnClick = () => {
    const taskTarget = document.querySelectorAll('li');
    for (let i = 0; i < taskTarget.length; i += 1) {
      taskTarget[i].addEventListener('dblclick', riscaTarget);
    }
  };

  useEffect(() => {
    const fetchFoods = async () => {
      const id = location.pathname.split('/')[2];
      const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      const response = await fetch(url);
      const data = await response.json();
      dispatch(setFoods(data.foods));
      setLoading(false);
    };
    fetchFoods();
  }, [dispatch, location.pathname]);

  const listFoodsInProgress = () => {
    const listInProgress = foods.map((food, index) => (
      <div
        data-testid={ `${index}-recipe-card` }
        key={ food.idMeal }
      >
        <img
          data-testid="recipe-photo"
          src={ food.strMealThumb }
          alt={ food.strMeal }
        />
        <h1
          data-testid={ `${index}-recipe-title` }
        >
          { food.strMeal }
        </h1>
        <button
          data-testid={ `${index}-share-btn` }
          type="button"
        >
          Share
        </button>
        <button
          data-testid={ `${index}-favorite-btn` }
          type="button"
        >
          Favodssddrite
        </button>
        <p
          data-testid={ `${index}-recipe-category` }
        >
          { food.strCategory }
        </p>

        <label htmlFor="ingredient-step">
          <input
            data-testid={ `${index}-ingredient-step` }
            type="checkbox"
            name="ingredient-step"
            value="ingredient-step"
            onClick={ () => riscaTargetOnClick() }
            checked={ food.ingredientStep }
          />
        </label>

        <p
          data-testid={ `${index}-instructions` }
        >
          { food.strInstructions }
        </p>
        <button
          data-testid={ `${index}-finish-recipe-btn` }
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
