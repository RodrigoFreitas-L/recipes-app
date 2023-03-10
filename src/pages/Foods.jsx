import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import '../styles/FoodsAndDrinks.css';

// Componentes
import Header from '../components/Header';
import BoxFood from '../components/BoxFood';
import Footer from '../components/Footer';

// Actions
import { setFoods } from '../redux/reducers/foodsSlice';

function Foods() {
  const { foods } = useSelector((state) => state.foods);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (foods === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
      dispatch(setFoods([]));
    } else if (foods.length === 1) {
      history.push(`/foods/${foods[0].idMeal}`);
      dispatch(setFoods([]));
    }
  }, [dispatch, foods, history]);

  return (
    <>
      <Header title="Foods" />
      <div className="container-foods-or-drinks">
        <BoxFood />
      </div>
      <Footer />
    </>
  );
}
export default Foods;
