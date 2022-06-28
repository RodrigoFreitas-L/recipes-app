import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Profile.css';

function Profile() {
  const getEmail = () => {
    const getEmailStorage = JSON.parse(localStorage.getItem('user'));
    if (!getEmailStorage) {
      return 'example@example.com';
    } return getEmailStorage.email;
  };
  return (
    <div className="content">
      <Header title="Profile" />
      <main>
        <div
          className="userEmail"
          data-testid="profile-email"
        >
          { getEmail() }
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
          onClick={ () => localStorage.clear() }
        >
          Logout
        </Link>
      </main>

      <Footer />
    </div>
  );
}
export default Profile;
