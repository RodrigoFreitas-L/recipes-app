import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import { setFoods } from '../redux/reducers/foodsSlice';

function Foods() {
  const { foods } = useSelector((state) => state.foods);
  const [filteredMeal, setFilteredMeal] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    setFilteredMeal(foods);
    if (filteredMeal.length === 1) {
      history.push(`/foods/${filteredMeal[0].idMeal}`);
      setFilteredMeal([]);
      dispatch(setFoods([]));
    }
  }, [dispatch, filteredMeal, foods, history]);

  return (
    <>
      <Header title="Foods" />
      { foods.length !== 0 && filteredMeal.map((meal) => (
        <div key={ meal.idMeal }>
          <h1>{ meal.strMeal }</h1>
        </div>
      )) }
    </>
  );
}
export default Foods;
