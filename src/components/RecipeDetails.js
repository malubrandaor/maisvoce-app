import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

function RecipeDetails() {
  const params = useParams();
  const history = useHistory();

  const [recipe, setRecipe] = useState([]);

  const requestApi = async (id, type) => {
    if (type === 'meals') {
      const response = await
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const responseJson = await response.json();
      console.log(responseJson.meals[0]);
      setRecipe(responseJson.meals[0]);
      return responseJson.meals[0];
    }

    if (type === 'drinks') {
      const response = await
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const responseJson = await response.json();
      console.log(responseJson.drinks[0]);
      setRecipe(responseJson.drinks[0]);
      return responseJson.drinks[0];
    }
  };

  const findIngredients = (obj) => {
    const ingredients = [];
    const ingredientsWithMeasures = [];
    Object.keys(obj)
      .filter((obj1) => obj1.includes('strIngredient')).forEach((obj3) => {
        if (obj[obj3] !== null && obj[obj3] !== '') {
          ingredients.push(obj[obj3]);
        }
      });

    ingredients.forEach((obj4, i) => {
      if (i === 0) { i = 1; }
      ingredientsWithMeasures.push({ name: obj4, measure: obj[`strMeasure${i}`] });
    });
    return ingredientsWithMeasures;
  };

  console.log(findIngredients(recipe));
  useEffect(() => {
    requestApi(params.id, history.location.pathname.split('/')[1]);
  }, []);

  //   console.log(params);
  //   console.log(history.location.pathname.split('/')[1]);

  return (
    <div>
      <img
        data-testid="recipe-photo"
        alt="recipeImage"
        src={ recipe.strMealThumb
         || recipe.strDrinkThumb }
      />
      <h1 data-testid="recipe-title">{recipe.strMeal || recipe.strDrink}</h1>
      <p data-testid="recipe-category">{recipe.strCategory}</p>
      {findIngredients(recipe).map((ingredient, i) => (
        <p data-testid={ `${i}-ingredient-name-and-measure` } key={ i }>
          {`${ingredient.name} ${ingredient.measure}`}
        </p>))}

    </div>
  );
}

export default RecipeDetails;
