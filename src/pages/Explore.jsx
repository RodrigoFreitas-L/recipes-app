import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../styles/Explore.css';

function Explore() {
  return (
    <div>
      <Header title="Explore" />
      <div className="ExploreCards">
        <div className="ExploreCard">
          <Link
            to="/explore/foods"
            data-testid="explore-foods"
          >
            Explore Foods
          </Link>
        </div>
        <div className="ExploreCard">
          <Link
            to="/explore/drinks"
            data-testid="explore-drinks"
          >
            Explore Drinks
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Explore;
