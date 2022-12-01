import PropTypes from 'prop-types';
import React from 'react';

function MealsCategories(props) {
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
        data-testid="Beef-category-filter"
        onClick={ () => fetchByCategory('Beef') }
      >
        Beef
      </button>
      <button
        type="button"
        data-testid="Breakfast-category-filter"
        onClick={ () => fetchByCategory('Breakfast') }
      >
        Breakfast
      </button>
      <button
        type="button"
        data-testid="Chicken-category-filter"
        onClick={ () => fetchByCategory('Chicken') }
      >
        Chicken
      </button>
      <button
        type="button"
        data-testid="Dessert-category-filter"
        onClick={ () => fetchByCategory('Dessert') }
      >
        Dessert
      </button>
      <button
        type="button"
        data-testid="Goat-category-filter"
        onClick={ () => fetchByCategory('Goat') }
      >
        Goat
      </button>
    </div>
  );
}

MealsCategories.propTypes = {
  fetchByCategory: PropTypes.func.isRequired,
};

export default MealsCategories;
