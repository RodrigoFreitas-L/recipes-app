import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

// Actions
import { setFoods } from '../redux/reducers/foodsSlice';

const endpoints = {
  name: 'https://www.themealdb.com/api/json/v1/1/search.php/?s=',
  firstLetter: 'https://www.themealdb.com/api/json/v1/1/search.php/?f=',
  ingredient: 'https://www.themealdb.com/api/json/v1/1/search.php/?i=',
};

function useMealsApi(filter, value) {
  const [mealsList, setMealsList] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchFoodsAPI = async () => {
      const endpoint = `${endpoints[filter]}${value}`;
      const response = await fetch(endpoint);
      const { meals } = await response.json();
      setMealsList(meals);
    };
    fetchFoodsAPI();
  }, [filter, value]);

  dispatch(setFoods(mealsList));
}

export default useMealsApi;
