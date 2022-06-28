import React, { useEffect, useState } from 'react';
// import Header from './Header';
import BoxFoodCard from './BoxFoodCard';
import Footer from './Footer';
import Glass from './Glass';

function ExploreFoodsNationalities() {
  const [nationalities, setNationalities] = useState([]);
  const [initialFoods, setInitialFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchAPI = async () => {
      const nationalitiesFetch = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
        .then((response) => response.json());
      setNationalities(nationalitiesFetch.meals);
      const data = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
        .then((response) => response.json());
      setInitialFoods(data.meals);
      setFilteredFoods(data.meals);
      setLoading(false);
    };
    fetchAPI();
  }, []);

  const selectNationality = async (nationality) => {
    if (nationality === 'All') {
      setFilteredFoods(initialFoods);
    } else {
      setLoading(true);
      const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${nationality}`;
      const response = await fetch(URL);
      const { meals } = await response.json();
      setFilteredFoods(meals);
    }
    setLoading(false);
  };

  const renderNationalities = () => (
    <select
      data-testid="explore-by-nationality-dropdown"
      onChange={ (e) => selectNationality(e.target.value) }
    >
      <option defaultChecked>Select an option</option>
      <option data-testid="All-option">All</option>
      {
        nationalities.map(({ strArea }, index) => (
          <option
            data-testid={ `${strArea}-option` }
            key={ index }
          >
            {strArea}
          </option>
        ))
      }
    </select>
  );

  const renderFoods = () => {
    const MAX_LIST_NUMBER = 12;
    const foods = filteredFoods
      .map(({ idMeal, strMeal, strMealThumb }, index) => (
        <BoxFoodCard
          meal={ { index, idMeal, strMeal, strMealThumb } }
          key={ index }
        />
      ));
    return foods.slice(0, MAX_LIST_NUMBER);
  };

  return (
    <>
      {/* <Header title="Explore Nationalities" /> */}
      <div className="container-foods-or-drinks">
        <div className="container-categories-buttons">
          {loading ? <Glass /> : renderNationalities()}
        </div>
        {!loading && renderFoods()}
      </div>
      <Footer />
    </>
  );
}

export default ExploreFoodsNationalities;
