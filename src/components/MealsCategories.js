/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/label-has-associated-control */
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import allIcon from '../images/meals icons/all.png';
import beefIcon from '../images/meals icons/beef.png';
import breakfastIcon from '../images/meals icons/breakfast.png';
import chickenIcon from '../images/meals icons/chicken.png';
import dessertIcon from '../images/meals icons/cake.png';
import goatIcon from '../images/meals icons/goat.png';

import '../App.css';
import { setCategory } from '../app/slices/meals';

function MealsCategories(props) {
  const { fetchByCategory } = props;

  const { activeCategory } = useSelector((state) => state.meals);
  const dispatch = useDispatch();

  const onClick = (value) => {
    dispatch(setCategory(value));
    fetchByCategory(value);
  };

  useEffect(() => {
    dispatch(setCategory('All'));
  }, []);

  return (
    <div>
      <label
        htmlFor="all"
        className={ activeCategory === 'All' ? 'selected' : '' }
      >
        <img
          type="button"
          id="all"
          data-testid="All-category-filter"
          onClick={ () => onClick('All') }
          aria-hidden
          src={ allIcon }
          alt="All"
        />
        All
      </label>

      <label
        htmlFor="breakfast"
        className={ activeCategory === 'Breakfast' ? 'selected' : '' }
      >
        <img
          type="button"
          data-testid="Breakfast-category-filter"
          id="breakfast"
          onClick={ () => onClick('Breakfast') }
          aria-hidden
          src={ breakfastIcon }
          alt="Breakfast"
        />
        Breakfast
      </label>

      <label
        htmlFor="beef"
        className={ activeCategory === 'Beef' ? 'selected' : '' }
      >
        <img
          type="button"
          data-testid="Beef-category-filter"
          id="beef"
          onClick={ () => onClick('Beef') }
          aria-hidden
          src={ beefIcon }
          alt="Beef"
        />
        Beef
      </label>

      <label
        htmlFor="chicken"
        className={ activeCategory === 'Chicken' ? 'selected' : '' }
      >
        <img
          type="button"
          data-testid="Chicken-category-filter"
          id="chicken"
          onClick={ () => onClick('Chicken') }
          aria-hidden
          src={ chickenIcon }
          alt="Chicken"
        />
        Chicken
      </label>

      <label
        htmlFor="goat"
        className={ activeCategory === 'Goat' ? 'selected' : '' }
      >
        <img
          type="button"
          id="goat"
          data-testid="Goat-category-filter"
          onClick={ () => onClick('Goat') }
          aria-hidden
          src={ goatIcon }
          alt="Goat"
        />
        Goat
      </label>

      <label
        htmlFor="dessert"
        className={ activeCategory === 'Dessert' ? 'selected' : '' }
      >
        <img
          type="button"
          data-testid="Dessert-category-filter"
          onClick={ () => onClick('Dessert') }
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
