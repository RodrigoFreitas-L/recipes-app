import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

function ExploreDrinks() {
  const history = useHistory();
  const onClickSurprise = async () => {
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
    const response = await fetch(url);
    const { drinks } = await response.json();
    history.push(`/drinks/${drinks[0].idDrink}`);
  };

  return (
    <>
      <Header title="Explore Drinks" />
      <div className="ExploreCards">
        <div>
          <div
            className="ExploreCard"
          >
            <Link
              to="/explore/drinks/ingredients"
              data-testid="explore-by-ingredient"
            >
              By Ingredient
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

export default ExploreDrinks;
