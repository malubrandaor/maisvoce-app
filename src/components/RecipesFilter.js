/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';

import drinksIcon from '../images/drinks icons/all.png';
import mealsIcon from '../images/meals icons/all.png';
import allIcon from '../images/fast-food.png';

import styles from '../styles/recipes/RecipesFilter.module.scss';

function RecipesFilter(props) {
  const { onFilterRecipes } = props;

  return (
    <div className={ styles.recipes_filter }>
      <label htmlFor="all">
        <img
          src={ allIcon }
          data-testid="filter-by-all-btn"
          id="all"
          onClick={ () => onFilterRecipes('all') }
          alt="all icon"
          aria-hidden
        />
        All
      </label>

      <label htmlFor="meals">
        <img
          src={ mealsIcon }
          data-testid="filter-by-meal-btn"
          id="meals"
          onClick={ () => onFilterRecipes('meal') }
          alt="meals icon"
          aria-hidden
        />
        Meals
      </label>

      <label htmlFor="drinks">
        <img
          src={ drinksIcon }
          data-testid="filter-by-drink-btn"
          id="drinks"
          onClick={ () => onFilterRecipes('drink') }
          alt="drinks icon"
          aria-hidden
        />
        Drinks
      </label>
    </div>
  );
}

RecipesFilter.propTypes = {
  onFilterRecipes: PropTypes.func.isRequired,
};

export default RecipesFilter;
