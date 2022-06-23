import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setDrinks } from '../redux/reducers/drinksSlice';
import Header from './Header';
import Footer from './Footer';
import '../styles/ExploreDrinksIngredients.css';

function ExploreDrinksIngredients() {
  const [ingredients, setIngredients] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const getDrinkIngredients = async () => {
      const MAX_NUM_INGREDIENTS = 12;
      const URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
      const request = await fetch(URL);
      const { drinks } = await request.json();
      const filterData = drinks.map((drink) => ({
        drinkName: drink.strIngredient1,
      })).slice(0, MAX_NUM_INGREDIENTS);
      setIngredients(filterData);
    };
    getDrinkIngredients();
  }, []);

  const handleIngredientClick = async (ingredient) => {
    const URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
    const response = await fetch(URL);
    const { drinks } = await response.json();
    console.log(drinks);
    dispatch(setDrinks(drinks));
    history.push('/drinks');
  };

  return (
    <div className="explore-drink-ingredients-container">
      <Header title="Explore Ingredients" />
      { ingredients.map((ingredient, index) => (
        <button
          type="button"
          key={ `${ingredient.drinkName}-${index}` }
          onClick={ () => handleIngredientClick(ingredient.drinkName) }
        >
          <div
            data-testid={ `${index}-ingredient-card` }
            className="ingredient-container"
          >
            <h3
              data-testid={ `${index}-card-name` }
            >
              { ingredient.drinkName }
            </h3>
            <img
              data-testid={ `${index}-card-img` }
              src={ `https://www.thecocktaildb.com/images/ingredients/${ingredient.drinkName}-Small.png` }
              alt={ ingredient.drinkName }
            />

          </div>

        </button>
      )) }
      <Footer />
    </div>
  );
}

export default ExploreDrinksIngredients;
