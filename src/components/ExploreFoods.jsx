import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import '../styles/Explore.css';

function ExploreFoods() {
  const history = useHistory();
  const onClickSurprise = async () => {
    const url = 'https://www.themealdb.com/api/json/v1/1/random.php';
    const response = await fetch(url);
    const { meals } = await response.json();
    history.push(`/foods/${meals[0].idMeal}`);
  };

  return (
    <>
      <Header title="Explore Foods" />
      <div className="ExploreCards">
        <div>
          <div
            className="ExploreCard"
          >
            <Link
              to="/explore/foods/ingredients"
              data-testid="explore-by-ingredient"
            >
              By Ingredient
            </Link>
          </div>
          <div
            className="ExploreCard"
          >
            <Link
              to="/explore/foods/nationalities"
              data-testid="explore-by-nationality"
            >
              By Nationality
            </Link>
          </div>
          <div
            className="ExploreCard"
          >
            <button
              type="button"
              data-testid="explore-surprise"
              onClick={ () => onClickSurprise() }
            >
              Surprise me!
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ExploreFoods;
