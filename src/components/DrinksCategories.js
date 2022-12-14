/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/label-has-associated-control */
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import allIcon from '../images/drinks icons/all.png';
import cocktailIcon from '../images/drinks icons/cocktail.png';
import cocoaIcon from '../images/drinks icons/cocoa.png';
import ordinaryIcon from '../images/drinks icons/ordinary.png';
import shakeIcon from '../images/drinks icons/shake.png';
import otherIcon from '../images/drinks icons/other.png';
import { setCategory } from '../app/slices/drinks';

import '../App.css';

function DrinksCategories(props) {
  const { fetchByCategory } = props;

  const { activeCategory } = useSelector((state) => state.drinks);
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
          src={ allIcon }
          alt="All"
          aria-hidden
        />
        All
      </label>

      <label
        htmlFor="ordinary"
        className={ activeCategory === 'Ordinary Drink' ? 'selected' : '' }
      >
        <img
          type="button"
          data-testid="Ordinary Drink-category-filter"
          onClick={ () => onClick('Ordinary Drink') }
          src={ ordinaryIcon }
          alt="Ordinary Drink"
          aria-hidden
          id="ordinary"
        />
        Ordinary
      </label>

      <label
        htmlFor="cocktail"
        className={ activeCategory === 'Cocktail' ? 'selected' : '' }
      >
        <img
          type="button"
          data-testid="Cocktail-category-filter"
          onClick={ () => onClick('Cocktail') }
          src={ cocktailIcon }
          alt="Cocktail"
          aria-hidden
          id="cocktail"
        />
        Cocktail
      </label>

      <label
        htmlFor="shake"
        className={ activeCategory === 'Shake' ? 'selected' : '' }
      >
        <img
          type="button"
          data-testid="Shake-category-filter"
          onClick={ () => onClick('Shake') }
          src={ shakeIcon }
          alt="Shake"
          aria-hidden
          id="shake"
        />
        Shake
      </label>

      <label
        htmlFor="cocoa"
        className={ activeCategory === 'Cocoa' ? 'selected' : '' }
      >
        <img
          type="button"
          data-testid="Cocoa-category-filter"
          onClick={ () => onClick('Cocoa') }
          src={ cocoaIcon }
          alt="Cocoa"
          aria-hidden
          id="cocoa"
        />
        Cocoa
      </label>

      <label
        htmlFor="other"
        className={ activeCategory === 'Other/Unknown' ? 'selected' : '' }
      >
        <img
          type="button"
          data-testid="Other/Unknown-category-filter"
          onClick={ () => onClick('Other/Unknown') }
          src={ otherIcon }
          alt="Other"
          aria-hidden
          id="other"
        />
        Other
      </label>
    </div>
  );
}

DrinksCategories.propTypes = {
  fetchByCategory: PropTypes.func.isRequired,
};

export default DrinksCategories;
