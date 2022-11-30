import PropTypes from 'prop-types';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';

function RecipeCard(props) {
  const { recipe, index } = props;
  const history = useHistory();

  const redirect = () => {
    history.push('/meals/52771');
  };

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
      <button type="button" onClick={ redirect }>CLICK</button>
      {/* <Link to="/meals/1010">Click</Link> */}
    </div>
  );
}

RecipeCard.propTypes = {
  recipe: PropTypes.instanceOf(Object).isRequired,
  index: PropTypes.number.isRequired,
};

export default RecipeCard;
