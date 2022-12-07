import React from 'react';

function FavoriteRecipesFilter() {
  return (
    <div className="filters">
      <button
        data-testid="filter-by-all-btn"
        type="button"
      >
        All
      </button>

      <button
        data-testid="filter-by-meal-btn"
        type="button"
      >
        Meals
      </button>

      <button
        data-testid="filter-by-drink-btn"
        type="button"
      >
        Drinks
      </button>
    </div>
  );
}

export default FavoriteRecipesFilter;
