import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header(props) {
  const { title } = props;
  const history = useHistory();
  const [isSearching, setIsSearching] = useState(false);

  // Componentes que não terão o botão de pesquisa
  const noSearchIcon = ['Profile', 'Done Recipes', 'Favorite Recipes'];

  return (
    <header>
      <h1 data-testid="page-title">{ title }</h1>

      {!noSearchIcon.includes(title)
      && (
        <button
          type="button"
          onClick={ () => setIsSearching(!isSearching) }
        >
          <img src={ searchIcon } alt="search icon" data-testid="search-top-btn" />
        </button>
      )}

      <button
        type="button"
        onClick={ () => history.push('/profile') }
      >
        <img src={ profileIcon } alt="profile icon" data-testid="profile-top-btn" />
      </button>

      {isSearching
      && (
        <div>
          <input
            type="text"
            name="search"
            id="search"
            data-testid="search-input"
          />
        </div>
      )}
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
