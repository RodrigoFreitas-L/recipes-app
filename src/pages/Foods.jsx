import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
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

  const renderFoods = () => {
    if (foods !== null) {
      if (foods.length > 0) {
        const listFoods = foods.map((meal) => (
          <div key={ meal.idMeal }>
            <h1>{ meal.strMeal }</h1>
          </div>
        ));
        return listFoods;
      } return false;
    }
  };

  return (
    <>
      <Header title="Foods" />
      { renderFoods() }
    </>
  );
}
export default Foods;
