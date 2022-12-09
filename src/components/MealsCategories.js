/* eslint-disable jsx-a11y/label-has-associated-control */
import PropTypes from 'prop-types';
import React from 'react';

import allIcon from '../images/meals icons/all.png';
import beefIcon from '../images/meals icons/beef.png';
import breakfastIcon from '../images/meals icons/breakfast.png';
import chickenIcon from '../images/meals icons/chicken.png';
import dessertIcon from '../images/meals icons/cake.png';
import goatIcon from '../images/meals icons/goat.png';

function MealsCategories(props) {
  const { fetchByCategory } = props;

  return (
    <div>
      <label htmlFor="all">
        <img
          type="button"
          id="all"
          data-testid="All-category-filter"
          onClick={ () => fetchByCategory('All') }
          aria-hidden
          src={ allIcon }
          alt="All"
        />
        All
      </label>

      <label htmlFor="breakfast">
        <img
          type="button"
          data-testid="Breakfast-category-filter"
          id="breakfast"
          onClick={ () => fetchByCategory('Breakfast') }
          aria-hidden
          src={ breakfastIcon }
          alt="Breakfast"
        />
        Breakfast
      </label>

      <label htmlFor="beef">
        <img
          type="button"
          data-testid="Beef-category-filter"
          id="beef"
          onClick={ () => fetchByCategory('Beef') }
          aria-hidden
          src={ beefIcon }
          alt="Beef"
        />
        Beef
      </label>

      <label htmlFor="chicken">
        <img
          type="button"
          data-testid="Chicken-category-filter"
          id="chicken"
          onClick={ () => fetchByCategory('Chicken') }
          aria-hidden
          src={ chickenIcon }
          alt="Chicken"
        />
        Chicken
      </label>

      <label htmlFor="goat">
        <img
          type="button"
          id="goat"
          data-testid="Goat-category-filter"
          onClick={ () => fetchByCategory('Goat') }
          aria-hidden
          src={ goatIcon }
          alt="Goat"
        />
        Goat
      </label>

      <label htmlFor="dessert">
        <img
          type="button"
          data-testid="Dessert-category-filter"
          onClick={ () => fetchByCategory('Dessert') }
          id="dessert"
          aria-hidden
          src={ dessertIcon }
          alt="Dessert"
        />
        Dessert
      </label>
    </div>
  );
}

MealsCategories.propTypes = {
  fetchByCategory: PropTypes.func.isRequired,
};

export default MealsCategories;
