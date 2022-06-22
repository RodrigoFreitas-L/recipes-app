import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import CardDrink from '../components/CardDrink';
import Header from '../components/Header';
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
      <CardDrink />
    </>
  );
}
export default Drinks;
