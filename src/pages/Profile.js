/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

import checkmarkIcon from '../images/profile/checkmark.png';
import heartIcon from '../images/profile/heart.png';
import logoutIcon from '../images/profile/logout.png';

import styles from '../styles/profile/Profile.module.scss';

function Profile() {
  const history = useHistory();

  function getEmail() {
    const result = JSON.parse(localStorage.getItem('user'));
    return result?.email;
  }

  function logout() {
    localStorage.clear('');
    history.push('/');
  }
  return (
    <section className={ styles.profile }>
      <Header title="Profile" />
      <div className={ styles.main }>
        <span data-testid="profile-email">{ getEmail() }</span>

        <label
          htmlFor="done-recipes"
          className={ styles.done }
          data-testid="profile-done-btn"
          onClick={ () => history.push('/done-recipes') }
          aria-hidden
        >
          <img
            src={ checkmarkIcon }
            alt="checkmark icon"
            id="done-recipes"
          />
          Done Recipes
        </label>

        <label
          htmlFor="favorite-recipes"
          className={ styles.favorite }
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/favorite-recipes') }
          aria-hidden
        >
          <img
            src={ heartIcon }
            alt="heart icon"
            id="favorite-recipes"
          />
          Favorite Recipes
        </label>

        <label
          htmlFor="logout"
          className={ styles.logout }
          data-testid="profile-logout-btn"
          onClick={ logout }
          aria-hidden
        >
          <img
            src={ logoutIcon }
            alt="logout icon"
            id="logout"
          />
          Logout
        </label>
      </div>
      <Footer />
    </section>
  );
}

export default Profile;
