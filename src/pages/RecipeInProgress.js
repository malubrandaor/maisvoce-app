import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { findIngredients } from '../components/RecipeDetails';

function RecipeInProgress() {
  const [recipe, setRecipe] = useState([]);

  const [ingredients, setIngredients] = useState([]);

  const history = useHistory();

  const requestApi = async (id, type) => {
    if (type === 'meals') {
      const response = await
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const responseJson = await response.json();
      setRecipe(responseJson.meals[0]);
    }

    if (type === 'drinks') {
      const response = await
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const responseJson = await response.json();
      setRecipe(responseJson.drinks[0]);
    }
  };

  useEffect(() => {
    const type = history.location.pathname.split('/')[1];
    const id = history.location.pathname.split('/')[2];
    if (recipe.length === 0) {
      requestApi(id, type);
    }
  }, [recipe]);

  const checkIngredient = ({ target }, idx) => {
    if (target.checked) {
      setIngredients([...ingredients, idx]);
    } else {
      setIngredients(ingredients.filter((ingredient) => ingredient !== idx));
    }

    
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
        {findIngredients(recipe).length > 0 && findIngredients(recipe)
          .map((ingredient, idx) => (
            <li key={ idx }>
              <label
                htmlFor={ `${idx}-ingredient` }
                data-testid={ `${idx}-ingredient-step` }
              >
                {ingredient.name}
                {ingredient.measure}
                <input
                  id={ `${idx}-ingredient` }
                  onChange={ (target) => checkIngredient(target, idx) }
                  type="checkbox"
                />
              </label>
            </li>))}
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
