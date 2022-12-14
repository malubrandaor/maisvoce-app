/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../app/slices/filter';

import drinksIcon from '../images/drinks icons/all.png';
import mealsIcon from '../images/meals icons/all.png';
import allIcon from '../images/fast-food.png';

import styles from '../styles/recipes/RecipesFilter.module.scss';
import '../App.css';

function RecipesFilter(props) {
  const { onFilterRecipes } = props;

  const { selectedFilter } = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const onClick = (value) => {
    dispatch(setFilter(value));
    onFilterRecipes(value);
  };

  useEffect(() => {
    dispatch(setFilter('all'));
  }, []);

  return (
    <div className={ styles.recipes_filter }>
      <label
        htmlFor="all"
        className={ selectedFilter === 'all' ? 'selected' : '' }
      >
        <img
          src={ allIcon }
          data-testid="filter-by-all-btn"
          id="all"
          onClick={ () => onClick('all') }
          alt="all icon"
          aria-hidden
        />
        All
      </label>

      <label
        htmlFor="meals"
        className={ selectedFilter === 'meal' ? 'selected' : '' }
      >
        <img
          src={ mealsIcon }
          data-testid="filter-by-meal-btn"
          id="meals"
          onClick={ () => onClick('meal') }
          alt="meals icon"
          aria-hidden
        />
        Meals
      </label>

      <label
        htmlFor="drinks"
        className={ selectedFilter === 'drink' ? 'selected' : '' }
      >
        <img
          src={ drinksIcon }
          data-testid="filter-by-drink-btn"
          id="drinks"
          onClick={ () => onClick('drink') }
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
