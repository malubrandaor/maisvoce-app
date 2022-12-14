import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import logo from '../images/maisvocelogo.svg';
import SearchBar from './SearchBar';

import styles from '../styles/header/Header.module.scss';

function Header(props) {
  const { title } = props;
  const history = useHistory();
  const [isSearching, setIsSearching] = useState(false);

  // Componentes que não terão o botão de pesquisa
  const noSearchIcon = ['Profile', 'Done Recipes', 'Favorite Recipes'];

  return (
    <>
      <header className={ styles.header }>
        <img
          src={ logo }
          alt="mais voce logo"
          className={ styles.logo }
          onClick={ () => history.push('/meals') }
          aria-hidden
        />

        <h1 data-testid="page-title">{ title }</h1>

        <div className={ styles.nav }>
          {!noSearchIcon.includes(title)
          && (
            <img
              src={ searchIcon }
              alt="search icon"
              onClick={ () => setIsSearching(!isSearching) }
              aria-hidden
              data-testid="search-top-btn"
            />
          )}

          <img
            src={ profileIcon }
            alt="profile icon"
            onClick={ () => history.push('/profile') }
            aria-hidden
            data-testid="profile-top-btn"
          />
        </div>
      </header>

      {isSearching ? <SearchBar isSearching={ isSearching } /> : null}
    </>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
