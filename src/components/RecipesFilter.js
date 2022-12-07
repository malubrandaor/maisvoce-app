import React from 'react';
import PropTypes from 'prop-types';

function RecipesFilter(props) {
  const { onFilterRecipes } = props;

  return (
    <div className="filters">
      <button
        data-testid="filter-by-all-btn"
        type="button"
        onClick={ () => onFilterRecipes('all') }
      >
        All
      </button>

      <button
        data-testid="filter-by-meal-btn"
        type="button"
        onClick={ () => onFilterRecipes('meal') }
      >
        Meals
      </button>

      <button
        data-testid="filter-by-drink-btn"
        type="button"
        onClick={ () => onFilterRecipes('drink') }
      >
        Drinks
      </button>
    </div>
  );
}

RecipesFilter.propTypes = {
  onFilterRecipes: PropTypes.func.isRequired,
};

export default RecipesFilter;
