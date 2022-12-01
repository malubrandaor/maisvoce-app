import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';

function RecipeCard(props) {
  const { recipe, index } = props;
  const history = useHistory();

  const redirect = () => {
    history.push('/meals/52771');
  };

  const onRecipeCardClick = () => {
    const isMeals = history.location.pathname.includes('/meals');
    const isDrinks = history.location.pathname.includes('/drinks');

    const meals = isMeals && 'meals';
    const drinks = isDrinks && 'drinks';

    history.push(`/${meals || drinks}/${recipe.idMeal || recipe.idDrink}`);
  };

  return (
    <div
      data-testid={ `${index}-recipe-card` }
      onClick={ onRecipeCardClick }
      aria-hidden
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
