import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchMeals } from '../app/slices/meals';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('');
  const dispatch = useDispatch();

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
    if (searchType === 'f') global.alert('Your search must have only 1 (one) character');

    dispatch(fetchMeals({ searchType, searchTerm }));
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
