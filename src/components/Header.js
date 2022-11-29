import PropTypes from 'prop-types';
import React from 'react';

import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header(props) {
  const { title } = props;

  // Componentes que não terão o botão de pesquisa
  const noSearchIcon = ['Profile', 'Done Recipes', 'Favorite Recipes'];

  return (
    <header>
      <h1 data-testid="page-title">{ title }</h1>

      {!noSearchIcon.includes(title)
      && (
        <button type="button">
          <img src={ searchIcon } alt="search icon" data-testid="search-top-btn" />
        </button>
      )}

      <button type="button">
        <img src={ profileIcon } alt="profile icon" data-testid="profile-top-btn" />
      </button>

    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
