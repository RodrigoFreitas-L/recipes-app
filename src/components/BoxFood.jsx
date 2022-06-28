import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { setFoods } from '../redux/reducers/foodsSlice';
import BoxFoodCard from './BoxFoodCard';
import Glass from './Glass';

function BoxFood() {
  const { foods } = useSelector((state) => state.foods);
  const [renderedFoods, setRenderedFoods] = useState([]);
  const [initialFoods, setInitialFoods] = useState([]);
  const [foodCategories, setFoodCategories] = useState([]);
  const [categoryToggle, setCategoryToggle] = useState(
    { status: false, category: '' },
  );
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAPI = async () => {
      const categories = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
        .then((response) => response.json());
      setFoodCategories(categories.meals);
      const data = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
        .then((response) => response.json());
      setRenderedFoods(data.meals);
      setInitialFoods(data.meals);
      setLoading(false);
    };
    fetchAPI();
  }, []);

  useEffect(() => {
    if (categoryToggle.status) {
      setLoading(true);
      const fetchAPI = async () => {
        const categories = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryToggle.category}`)
          .then((response) => response.json());
        setRenderedFoods(categories.meals);
        setLoading(false);
      }; fetchAPI();
    }
  }, [categoryToggle]);

  const filterByCategory = (category) => {
    if (categoryToggle.category === category && categoryToggle.status) {
      setRenderedFoods(initialFoods);
      setCategoryToggle({ status: false, category: '' });
    } else {
      setCategoryToggle({ status: true, category });
      setRenderedFoods(initialFoods
        .filter(({ strCategory }) => strCategory === category));
    }
  };

  const renderAllFoods = () => {
    dispatch(setFoods([]));
    setCategoryToggle({ status: false, category: '' });
    setRenderedFoods(initialFoods);
  };

  const renderFoodsCategories = () => {
    const MAX_LIST_NUMBER = 6;
    const allButton = [
      <button
        key="a"
        data-testid="All-category-filter"
        type="button"
        onClick={ () => renderAllFoods() }
      >
        All
      </button>,
    ];
    const foodsCategoriesButtons = foodCategories.map(({ strCategory }, index) => (
      <button
        data-testid={ `${strCategory}-category-filter` }
        type="button"
        key={ index }
        onClick={ () => filterByCategory(strCategory) }
      >
        {strCategory}
      </button>
    ));
    const concatanatedButtons = [...allButton, ...foodsCategoriesButtons];
    return concatanatedButtons.slice(0, MAX_LIST_NUMBER);
  };

  const renderFoods = () => {
    const MAX_LIST_NUMBER = 12;
    if (foods !== null && foods.length > 0) {
      const listFoods = foods.map(({ idMeal, strMeal, strMealThumb }, index) => (
        <BoxFoodCard
          key={ index }
          meal={ { index, idMeal, strMeal, strMealThumb } }
        />
      ));
      return listFoods.slice(0, MAX_LIST_NUMBER);
    }
    const listFoodsInitial = renderedFoods
      .map(({ idMeal, strMeal, strMealThumb }, index) => (
        <BoxFoodCard
          meal={ { index, idMeal, strMeal, strMealThumb } }
          key={ index }
        />
      ));
    return listFoodsInitial.slice(0, MAX_LIST_NUMBER);
  };

  return (
    <>
      <div className="container-categories-buttons">
        {loading ? <Glass /> : renderFoodsCategories()}
      </div>
      {!loading && renderFoods()}
    </>
  );
}

BoxFood.propTypes = {
  foods: PropTypes.objectOf(PropTypes.shape),
}.isRequired;

export default BoxFood;
