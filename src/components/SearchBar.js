import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchDrinks } from '../app/slices/drinks';
import { fetchMeals } from '../app/slices/meals';

import styles from '../styles/header/SearchBar.module.scss';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();
  const { meals, drinks } = useSelector((state) => state);

  useEffect(() => {
    if (meals.data.length === 1) history.push(`/meals/${meals.data[0].idMeal}`);
    if (drinks.data.length === 1) history.push(`/drinks/${drinks.data[0].idDrink}`);
  }, [meals, drinks, history]);

  /**
   * Altera o estado do termo de busca.
   * @param {object} event - Objeto com as informações do evento.
   */
  const onSearchRecipes = ({ target: { value } }) => {
    setSearchTerm(value);
  };

  /**
   * Altera o estado do tipo de busca.
   * @param {object} event - Objeto com as informações do evento.
   */
  const onChangeFilter = ({ target: { value } }) => {
    let type = '';

    if (value === 'ingredient') type = 'i';
    if (value === 'name') type = 's';
    if (value === 'first-letter') type = 'f';

    setSearchType(type);
  };

  /**
   * Verifica se o usuário digitou alguma coisa no input de busca caso o tipo de busca seja por primeira letra.
   * Verifica a rotas para saber qual API deve ser chamada.
   * @returns {void}
   */
  const onSearch = () => {
    const { pathname } = history.location;

    if (searchType === 'f' && searchTerm.length > 1) {
      global.alert('Your search must have only 1 (one) character');
      return;
    }

    if (pathname === '/meals') dispatch(fetchMeals({ searchType, searchTerm }));
    if (pathname === '/drinks') dispatch(fetchDrinks({ searchType, searchTerm }));
  };

  return (
    <div className={ styles.searchbar }>
      <input
        type="text"
        name="search"
        id="search"
        placeholder='Ex: "Lemon"'
        value={ searchTerm }
        data-testid="search-input"
        onChange={ (e) => onSearchRecipes(e) }
      />

      <div className={ styles.controls }>
        <label htmlFor="ingredient">
          <input
            type="radio"
            value="ingredient"
            id="ingredient"
            name="filter"
            data-testid="ingredient-search-radio"
            onChange={ (e) => onChangeFilter(e) }
          />
          Ingredient
        </label>

        <label htmlFor="name">
          <input
            type="radio"
            value="name"
            id="name"
            name="filter"
            data-testid="name-search-radio"
            onChange={ (e) => onChangeFilter(e) }
          />
          Name
        </label>

        <label htmlFor="first-letter">
          <input
            type="radio"
            value="first-letter"
            id="first-letter"
            name="filter"
            data-testid="first-letter-search-radio"
            onChange={ (e) => onChangeFilter(e) }
          />
          First Letter
        </label>

        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ () => onSearch() }
        >
          Buscar
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
