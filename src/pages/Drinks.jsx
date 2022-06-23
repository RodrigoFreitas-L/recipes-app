import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

// Componentes
import BoxDrink from '../components/BoxDrink';
import Header from '../components/Header';

// Actions
import { setDrinks } from '../redux/reducers/drinksSlice';

function Drinks() {
  const { drinks } = useSelector((state) => state.drinks);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (drinks === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
      dispatch(setDrinks([]));
    } else if (drinks.length === 1) {
      history.push(`/drinks/${drinks[0].idDrink}`);
      dispatch(setDrinks([]));
    }
  }, [dispatch, drinks, history]);

  return (
    <>
      <Header title="Drinks" />
      <BoxDrink />
    </>
  );
}
export default Drinks;
