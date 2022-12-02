import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

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
    <>
      <Header title="Profile" />
      <span data-testid="profile-email">{ getEmail() }</span>
      <button
        type="button"
        data-testid="profile-done-btn"
        name="Click Me"
        onClick={ () => history.push('/done-recipes') }
      >
        Done Recipes
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => history.push('/favorite-recipes') }
      >
        Favorite Recipes
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ logout }
      >
        Logout
      </button>
      <Footer />
    </>
  );
}

export default Profile;
