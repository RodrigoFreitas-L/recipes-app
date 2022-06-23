import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

function ExploreDrinks() {
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
            <Link
              to="/explore/foods/" // TODO
              data-testid="explore-surprise"
            >
              Surprise me!
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ExploreDrinks;
