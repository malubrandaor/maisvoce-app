import React from 'react';
import PropTypes from 'prop-types';

function FavoriteRecipesFilter(props) {
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

FavoriteRecipesFilter.propTypes = {
  onFilterRecipes: PropTypes.func.isRequired,
};

export default FavoriteRecipesFilter;
