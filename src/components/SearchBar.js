import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchDrinks } from '../app/slices/drinks';
import { fetchMeals } from '../app/slices/meals';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('');
  const dispatch = useDispatch();
  const { location: { pathname } } = useHistory();

  const onSearchRecipes = ({ target: { value } }) => {
    setSearchTerm(value);
  };

  const onChangeFilter = ({ target: { value } }) => {
    let type = '';

    if (value === 'ingredient') type = 'i';
    if (value === 'name') type = 's';
    if (value === 'first-letter') type = 'f';

    setSearchType(type);
  };

  const onSearch = () => {
    if (searchType === 'f' && searchTerm.length > 1) {
      global.alert('Your search must have only 1 (one) character');
      return;
    }

    if (pathname === '/meals') return dispatch(fetchMeals({ searchType, searchTerm }));
    if (pathname === '/drinks') return dispatch(fetchDrinks({ searchType, searchTerm }));
  };

  return (
    <div>
      <input
        type="text"
        name="search"
        id="search"
        value={ searchTerm }
        data-testid="search-input"
        onChange={ (e) => onSearchRecipes(e) }
      />

      <div>
        <input
          type="radio"
          value="ingredient"
          name="filter"
          data-testid="ingredient-search-radio"
          onChange={ (e) => onChangeFilter(e) }
        />

        <input
          type="radio"
          value="name"
          name="filter"
          data-testid="name-search-radio"
          onChange={ (e) => onChangeFilter(e) }
        />

        <input
          type="radio"
          value="first-letter"
          name="filter"
          data-testid="first-letter-search-radio"
          onChange={ (e) => onChangeFilter(e) }
        />
      </div>

      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => onSearch() }
      >
        Buscar
      </button>
    </div>
  );
}

export default SearchBar;
