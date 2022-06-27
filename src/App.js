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
    initialDrinksStorage();
    initialFoodStorage();
  }, []);
  return (
    <Routes />
  );
}

export default App;
