import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { findIngredients } from '../components/RecipeDetails';

function RecipeInProgress() {
  const [recipe, setRecipe] = useState([]);

  const [ingredients, setIngredients] = useState([]);

  const history = useHistory();

  const type = history.location.pathname.split('/')[1];
  const id = history.location.pathname.split('/')[2];

  const requestApi = async (idRecipe, typeRecipe) => {
    if (typeRecipe === 'meals') {
      const response = await
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idRecipe}`);
      const responseJson = await response.json();
      setRecipe(responseJson.meals[0]);
    }

    if (typeRecipe === 'drinks') {
      const response = await
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idRecipe}`);
      const responseJson = await response.json();
      setRecipe(responseJson.drinks[0]);
    }
  };

  useEffect(() => {
    if (Object.keys(recipe).length
        > 0 && localStorage.getItem('inProgressRecipes') === null) {
      localStorage.setItem(
        'inProgressRecipes',
        JSON.stringify({ [type]: { [id]: findIngredients(recipe) } }),

      );
    }

    console.log(JSON.parse(localStorage.getItem('inProgressRecipes')));
    if (recipe.length === 0) {
      requestApi(id, type);
    }
  }, [recipe, ingredients]);

  const checkIngredient = ({ target }, idx) => {
    const localStorageRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (target.checked) {
      setIngredients([...ingredients, idx]);
      localStorageRecipes[type][id][idx].checked = true;
    } else {
      setIngredients(ingredients.filter((ingredient) => ingredient !== idx));
      localStorageRecipes[type][id][idx].checked = false;
    }

    localStorage.setItem('inProgressRecipes', JSON.stringify(localStorageRecipes));

    // console.log(JSON.parse(localStorage.getItem('inProgressRecipes')));
    console.log(JSON.parse(localStorage.getItem('inProgressRecipes'))[type][id]);
  };

  return (
    <div>
      <img
        data-testid="recipe-photo"
        alt="recipeImage"
        src={ recipe.strMealThumb
           || recipe.strDrinkThumb }
      />

      <h1 data-testid="recipe-title">{recipe.strMeal || recipe.strDrink}</h1>

      <p data-testid="recipe-category">
        {`${recipe.strCategory} ${recipe.strAlcoholic}`}
      </p>
      <ul>
        {localStorage.getItem('inProgressRecipes')
        && JSON.parse(localStorage.getItem('inProgressRecipes'))[type][id]
          .map((ingredient, idx) => (
            <li key={ idx }>
              <label
                style={
                  ingredient.checked
                    ? { textDecoration: 'line-through solid rgb(0, 0, 0)' }
                    : {}
                }
                htmlFor={ `${idx}-ingredient` }
                data-testid={ `${idx}-ingredient-step` }
              >
                {ingredient.name}
                {ingredient.measure}
                <input
                  checked={ ingredient.checked }
                  id={ `${idx}-ingredient` }
                  onChange={ (target) => checkIngredient(target, idx) }
                  type="checkbox"
                />
              </label>
            </li>
          ))}
      </ul>

      <p data-testid="instructions">{recipe.strInstructions}</p>

      <button
        style={ { marginBottom: '100px' } }
        type="button"
        data-testid="share-btn"
      >
        Share
      </button>
      <button data-testid="favorite-btn" type="button">Favorite</button>
      <button type="button" data-testid="finish-recipe-btn">Finish Recipe</button>
    </div>

  );
}
export default RecipeInProgress;
