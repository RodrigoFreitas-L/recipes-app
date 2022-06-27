import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setDrinks } from '../redux/reducers/drinksSlice';
import IngredientsInProgress from './RecipeDetails/IngredientsInProgress';
import '../styles/CardInProgress.css';

// fazer a rota da tela de detalhes para essa tela de receitas em andamento
function CardDrinkInProgress() {
  const { drinks } = useSelector((state) => state.drinks);
  const { location } = useHistory();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchDrink = async () => {
      const id = location.pathname.split('/')[2];
      const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      const response = await fetch(url);
      const data = await response.json();
      dispatch(setDrinks(data.drinks));
      setLoading(false);
    };

    fetchDrink();
  }, [dispatch, location.pathname]);

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
