import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setFoods } from '../redux/reducers/foodsSlice';
import Header from './Header';
import Footer from './Footer';
// import '../styles/ExploreFoodsIngredients.css';

function ExploreFoodsIngredients() {
  const [ingredients, setIngredients] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const getFoodIngredients = async () => {
      const MAX_NUM_INGREDIENTS = 12;
      const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
      const response = await fetch(URL);
      const { meals } = await response.json();
      const filterData = meals.map((meal) => ({
        mealName: meal.strIngredient,
      })).slice(0, MAX_NUM_INGREDIENTS);
      setIngredients(filterData);
    };
    getFoodIngredients();
  }, []);

  const handleIngredientClick = async (ingredient) => {
    const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
    const response = await fetch(URL);
    const { meals } = await response.json();
    dispatch(setFoods(meals));
    history.push('/foods');
  };

  return (
    <div className="explore-food-ingredients-container">
      <Header title="Explore Ingredients" />
      <div className="container-foods-or-drinks">
        {ingredients.map((ingredient, index) => (
          <button
            type="button"
            key={ ingredient.mealName }
            className="meal-or-drink"
            onClick={ () => handleIngredientClick(ingredient.mealName) }
          >
            <div
              data-testid={ `${index}-ingredient-card` }
            >
              <h1
                data-testid={ `${index}-card-name` }
              >
                {ingredient.mealName}
              </h1>
              <img
                data-testid={ `${index}-card-img` }
                src={ `https://www.themealdb.com/images/ingredients/${ingredient.mealName}-Small.png` }
                alt={ ingredient.mealName }
              />

            </div>

          </button>

        ))}
      </div>
      <Footer />
    </div>
  );
}

export default ExploreFoodsIngredients;
