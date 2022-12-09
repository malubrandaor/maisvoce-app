/* eslint-disable jsx-a11y/label-has-associated-control */
import PropTypes from 'prop-types';
import React from 'react';

import allIcon from '../images/drinks icons/all.png';
import cocktailIcon from '../images/drinks icons/cocktail.png';
import cocoaIcon from '../images/drinks icons/cocoa.png';
import ordinaryIcon from '../images/drinks icons/ordinary.png';
import shakeIcon from '../images/drinks icons/shake.png';
import otherIcon from '../images/drinks icons/other.png';

function DrinksCategories(props) {
  const { fetchByCategory } = props;

  return (
    <div>
      <label htmlFor="all">
        <img
          type="button"
          id="all"
          data-testid="All-category-filter"
          onClick={ () => fetchByCategory('All') }
          src={ allIcon }
          alt="All"
          aria-hidden
        />
        All
      </label>

      <label htmlFor="ordinary">
        <img
          type="button"
          data-testid="Ordinary Drink-category-filter"
          onClick={ () => fetchByCategory('Ordinary Drink') }
          src={ ordinaryIcon }
          alt="Ordinary Drink"
          aria-hidden
          id="ordinary"
        />
        Ordinary
      </label>

      <label htmlFor="cocktail">
        <img
          type="button"
          data-testid="Cocktail-category-filter"
          onClick={ () => fetchByCategory('Cocktail') }
          src={ cocktailIcon }
          alt="Cocktail"
          aria-hidden
          id="cocktail"
        />
        Cocktail
      </label>

      <label htmlFor="shake">
        <img
          type="button"
          data-testid="Shake-category-filter"
          onClick={ () => fetchByCategory('Shake') }
          src={ shakeIcon }
          alt="Shake"
          aria-hidden
          id="shake"
        />
        Shake
      </label>

      <label htmlFor="cocoa">
        <img
          type="button"
          data-testid="Cocoa-category-filter"
          onClick={ () => fetchByCategory('Cocoa') }
          src={ cocoaIcon }
          alt="Cocoa"
          aria-hidden
          id="cocoa"
        />
        Cocoa
      </label>

      <label htmlFor="other">
        <img
          type="button"
          data-testid="Other/Unknown-category-filter"
          onClick={ () => fetchByCategory('Other/Unknown') }
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
