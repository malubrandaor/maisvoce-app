import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

function RecipeDetails() {
  const params = useParams();
  const history = useHistory();

  const [recipe, setRecipe] = useState([]);

  const [mealsRecommendation, setMealsRecommendation] = useState([]);
  const [drinksRecommendation, setDrinksRecommendation] = useState([]);

  const requestApi = async (id, type) => {
    if (type === 'meals') {
      const response = await
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const responseJson = await response.json();
      setRecipe(responseJson.meals[0]);

      const responseDrinks = await
      fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const responseDrinksJson = await responseDrinks.json();
      setDrinksRecommendation(responseDrinksJson.drinks);
    }

    if (type === 'drinks') {
      const response = await
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const responseJson = await response.json();
      setRecipe(responseJson.drinks[0]);

      const responseMeals = await
      fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const responseMealsJSON = await responseMeals.json();
      setMealsRecommendation(responseMealsJSON.meals);
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

  useEffect(() => {
    requestApi(params.id, history.location.pathname.split('/')[1]);
  }, []);

  function embedVideo(url) {
    const urlEmbed = `https://www.youtube.com/embed/${url.split('https://www.youtube.com/')}`;
    return urlEmbed;
  }
  console.log(embedVideo('https://www.youtube.com/watch?v=1IszT_guI08'));
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

      {recipe.strYoutube && <iframe
        width="560"
        title={ recipe.strMealThumb }
        height="315"
        src={ embedVideo(recipe.strYoutube) }
        frameBorder="0"
        allowFullScreen
      />}

    </div>
  );
}

export default RecipeDetails;
