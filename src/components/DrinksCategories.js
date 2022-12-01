import PropTypes from 'prop-types';
import React from 'react';

function DrinksCategories(props) {
  const { fetchByCategory } = props;

  return (
    <div>
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ () => fetchByCategory('All') }
      >
        All
      </button>
      <button
        type="button"
        data-testid="Ordinary Drink-category-filter"
        onClick={ () => fetchByCategory('Ordinary Drink') }
      >
        Ordinary Drink
      </button>
      <button
        type="button"
        data-testid="Cocktail-category-filter"
        onClick={ () => fetchByCategory('Cocktail') }
      >
        Cocktail
      </button>
      <button
        type="button"
        data-testid="Shake-category-filter"
        onClick={ () => fetchByCategory('Shake') }
      >
        Shake
      </button>
      <button
        type="button"
        data-testid="Other/Unknown-category-filter"
        onClick={ () => fetchByCategory('Other/Unknown') }
      >
        Other/Unknown
      </button>
      <button
        type="button"
        data-testid="Cocoa-category-filter"
        onClick={ () => fetchByCategory('Cocoa') }
      >
        Cocoa
      </button>
    </div>
  );
}

DrinksCategories.propTypes = {
  fetchByCategory: PropTypes.func.isRequired,
};

export default DrinksCategories;
