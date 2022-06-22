import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
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

  const renderDrinks = () => {
    if (drinks !== null) {
      if (drinks.length > 0) {
        const listDrinks = drinks.map((drink) => (
          <div key={ drink.idDrink }>
            <h1>{ drink.strDrink }</h1>
          </div>

        ));
        return listDrinks;
      } return false;
    }
  };

  return (
    <>
      <Header title="Drinks" />
      { renderDrinks() }
    </>
  );
}
export default Drinks;
