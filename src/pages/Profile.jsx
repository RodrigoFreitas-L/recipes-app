import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Profile.css';

function Profile() {
  return (
    <div className="content">
      <Header title="Profile" />
      <main>
        <div
          className="userEmail"
          data-testid="profile-email" // TO DO
        >
          email@email.com
        </div>
        <Link
          data-testid="profile-done-btn"
          to="/done-recipes"
          className="contentBtns"
        >
          Done Recipes
        </Link>
        <Link
          data-testid="profile-favorite-btn"
          to="/favorite-recipes"
          className="contentBtns"
        >
          Favorite Recipes
        </Link>
        <Link
          data-testid="profile-logout-btn"
          to="/"
          className="contentBtns"
        >
          Logout
        </Link>
      </main>

      <Footer />
    </div>
  );
}
export default Profile;
