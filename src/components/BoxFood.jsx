import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Glass from './Glass';

function BoxFood() {
  const { foods } = useSelector((state) => state.foods);
  const [foodsInitial, setFoodsInitial] = useState([]);
  const [foodCategories, setFoodCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAPI = async () => {
      const categories = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
        .then((response) => response.json());
      setFoodCategories(categories.meals);
      const data = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
        .then((response) => response.json());
      setFoodsInitial(data.meals);
      setLoading(false);
    };
    fetchAPI();
  }, []);

  const renderFoodsCategories = () => {
    const MAX_LIST_NUMBER = 5;
    const foodsCategoriesButtons = foodCategories.map(({ strCategory }, index) => (
      <button
        data-testid={ `${strCategory}-category-filter` }
        type="button"
        key={ index }
        onClick={ () => console.log(strCategory) }
      >
        {strCategory}
      </button>
    ));
    return foodsCategoriesButtons.slice(0, MAX_LIST_NUMBER);
  };

  const renderFoods = () => {
    const MAX_LIST_NUMBER = 12;
    if (foods !== null) {
      if (foods.length > 0) {
        const listFoods = foods.map((meal, index) => (
          <div
            data-testid={ `${index}-recipe-card` }
            key={ meal.idMeal }
            className="meal-or-drink"
          >
            <h1
              data-testid={ `${index}-card-name` }
            >
              {meal.strMeal}

            </h1>
            <img
              data-testid={ `${index}-card-img` }
              src={ meal.strMealThumb }
              alt={ meal.strMeal }
            />
          </div>
        ));
        return listFoods.slice(0, MAX_LIST_NUMBER);
      }
      const listFoodsInitial = foodsInitial.map((meal, index) => (
        <div
          data-testid={ `${index}-recipe-card` }
          key={ meal.idMeal }
          className="meal-or-drink"
        >
          <h1
            data-testid={ `${index}-card-name` }
          >
            {meal.strMeal}

          </h1>
          <img
            data-testid={ `${index}-card-img` }
            src={ meal.strMealThumb }
            alt={ meal.strMeal }
          />
        </div>
      ));
      return listFoodsInitial.slice(0, MAX_LIST_NUMBER);
    }
  };

  return (
    <>
      <div className="container-categories-buttons">
        {loading ? <Glass /> : renderFoodsCategories()}
      </div>
      {renderFoods()}
    </>
  );
}

BoxFood.propTypes = {
  foods: PropTypes.objectOf(PropTypes.shape),
}.isRequired;

export default BoxFood;
