import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import '../styles/Explore.css';

function ExploreFoods() {
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

export default ExploreFoods;
