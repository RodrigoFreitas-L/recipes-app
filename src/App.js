import React, { useEffect } from 'react';

// Componentes
import Routes from './routes';

// Styles
import './styles/App.css';

function App() {
  useEffect(() => {
    const initialFoodStorage = () => {
      if (!localStorage.getItem('savedFoodsIngredients')) {
        localStorage.setItem('savedFoodsIngredients', JSON.stringify([]));
      }
    };
    const initialDrinksStorage = () => {
      if (!localStorage.getItem('savedDrinksIngredients')) {
        localStorage.setItem('savedDrinksIngredients', JSON.stringify([]));
      }
    };
    const initialDrinkFavStorage = () => {
      if (!localStorage.getItem('favoriteRecipes')) {
        localStorage.setItem('favoriteRecipes', JSON.stringify([]));
      }
    };
    initialDrinksStorage();
    initialFoodStorage();
    initialDrinkFavStorage();
  }, []);
  return (
    <Routes />
  );
}

export default App;
