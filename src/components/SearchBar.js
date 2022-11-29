import React from 'react';

function SearchBar() {
  return (
    <div>
      <input
        type="text"
        name="search"
        id="search"
        data-testid="search-input"
      />

      <input
        type="radio"
        name="ingrediente"
        data-testid="ingredient-search-radio"
      />

      <input
        type="radio"
        name="nome"
        data-testid="name-search-radio"
      />

      <input
        type="radio"
        name="primeira letra"
        data-testid="first-letter-search-radio"
      />

      <button
        type="button"
        data-testid="exec-search-btn"
      >
        Buscar
      </button>
    </div>
  );
}

export default SearchBar;
