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

  //   useEffect(() => {
  //     const riscaTarget = (item) => {
  //       const taskItem = item.target;
  //       if (taskItem.className === 'completed') {
  //         taskItem.classList.remove('completed');
  //       } else {
  //         taskItem.classList.add('completed');
  //       }
  //     };

  //     const riscaTargetOnClick = () => {
  //       const taskTarget = document.querySelectorAll('li');
  //       for (let i = 0; i < taskTarget.length; i += 1) {
  //         taskTarget[i].addEventListener('dblclick', riscaTarget);
  //       }
  //     };
  //     riscaTargetOnClick();
  //   }, []);

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

    // const riscaTarget = (item) => {
    //   const taskItem = item.target;
    //   if (taskItem.className === 'completed') {
    //     taskItem.classList.remove('completed');
    //   } else {
    //     taskItem.classList.add('completed');
    //   }
    // };

    // const riscaTargetOnClick = () => {
    //   const taskTarget = document.querySelectorAll('li');
    //   for (let i = 0; i < taskTarget.length; i += 1) {
    //     taskTarget[i].addEventListener('dblclick', riscaTarget);
    //   }
    // };
    // riscaTargetOnClick();
  }, [dispatch, location.pathname]);

  const listDrinkInProgress = () => {
    const listInProgress = drinks.map((drink, index) => (
      <div
        data-testid={ `${index}-recipe-card` }
        key={ drink.idDrink }
      >
        <img
          data-testid="recipe-photo"
          src={ drink.strDrinkThumb }
          alt={ drink.strDrink }
        />
        <h1
          data-testid={ `${index}-recipe-title` }
        >
          { drink.strDrink }
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
          { drink.strCategory }
        </p>

        <IngredientsInProgress recipe={ drink } />

        <p
          data-testid={ `${index}-instructions` }
        >
          { drink.strInstructions }
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
      { !loading && listDrinkInProgress() }
    </div>
  );
}

export default CardDrinkInProgress;
