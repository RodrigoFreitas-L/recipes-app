import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import '../styles/FoodsAndDrinks.css';

// Componentes
import Header from '../components/Header';
import BoxDrink from '../components/BoxDrink';
import Footer from '../components/Footer';

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
      <div className="container-foods-or-drinks">
        <BoxDrink />
      </div>
      <Footer />
    </>
  );
}
export default Drinks;
