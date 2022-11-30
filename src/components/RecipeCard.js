import PropTypes from 'prop-types';
import React from 'react';

function RecipeCard(props) {
  const { recipe, index } = props;

  return (
    <div
      data-testid={ `${index}-recipe-card` }
    >
      <img
        src={ recipe.strMealThumb || recipe.strDrinkThumb }
        alt={ recipe.strMeal || recipe.strDrink }
        data-testid={ `${index}-card-img` }
      />

      <p data-testid={ `${index}-card-name` }>{ recipe.strMeal || recipe.strDrink }</p>
    </div>
  );
}

RecipeCard.propTypes = {
  recipe: PropTypes.instanceOf(Object).isRequired,
  index: PropTypes.number.isRequired,
};

export default RecipeCard;
