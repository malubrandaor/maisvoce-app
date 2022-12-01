import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import '../App.css';

function RecipeDetails() {
  const params = useParams();
  const history = useHistory();
  const magic = 6;
  const [recipe, setRecipe] = useState([]);

  const [mealsRecommendation, setMealsRecommendation] = useState([]);
  const [drinksRecommendation, setDrinksRecommendation] = useState([]);

  const [isInProgress, setProgress] = useState(false);

  /**
   *Request da Api com ID especifico de cada receita
   * @param {*} id
   * @param {*} type
   */
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
      fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const responseMealsJSON = await responseMeals.json();
      setMealsRecommendation(responseMealsJSON.meals);
    }
  };
  /**
 * ingredients array de objetos somente com ingredientes
 * ingredientsWithMeasures array com ingredientes e measurements
 * @param {*} obj
 * @returns INGREDIENTES AND MEASUREMENTS
 */
  const findIngredients = (obj) => {
    const ingredients = [];
    const ingredientsWithMeasures = [];
    Object.keys(obj)
      .filter((obj1) => obj1.includes('strIngredient')).forEach((obj3) => {
        if (obj[obj3] !== null && obj[obj3] !== '') {
          ingredients.push(obj[obj3]);
        }
      });

    let counter = 1;
    ingredients.forEach((obj4, i) => {
      if (i === 0) { counter = 1; }
      ingredientsWithMeasures.push({ name: obj4, measure: obj[`strMeasure${counter}`] });
      counter += 1;
      // console.log(counter);
    });
    return ingredientsWithMeasures;
  };

  useEffect(() => {
    requestApi(params.id, history.location.pathname.split('/')[1]);
  }, []);

  /**
  *
  * @param {*} url
  * @returns Return video embed
  */
  function embedVideo(url) {
    const urlEmbed = `https://www.youtube.com/embed/${url.split('https://www.youtube.com/')}`;
    return urlEmbed;
  }

  const setInProgress = (id, ingredients, type) => {
    const inProgress = localStorage.getItem('inProgressRecipes');
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      meals: { [id]: [Object.values(ingredients)] },
      drinks: {} }));

    // localStorage.setItem('inProgressRecipes', { drinks: { }, meals: { } });
  };

  console.log(mealsRecommendation);
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
      {findIngredients(recipe).map((ingredient, i) => (
        <p data-testid={ `${i}-ingredient-name-and-measure` } key={ i }>
          {`${ingredient.name} ${ingredient.measure}`}
        </p>))}
      <p data-testid="instructions">{recipe.strInstructions}</p>
      {recipe.strYoutube && <iframe
        data-testid="video"
        width="560"
        title={ recipe.strMealThumb }
        height="315"
        src={ embedVideo(recipe.strYoutube) }
        frameBorder="0"
        allowFullScreen
      />}
      <button
        onClick={ () => setInProgress(
          params.id,
          findIngredients(recipe),
          history.location.pathname.split('/')[1],
        ) }
        className="start-recipe"
        type="button"
        data-testid="start-recipe-btn"
      >
        {isInProgress ? 'Continue Recipe' : 'Start Recipe'}

      </button>
      <div className="slider">
        {(recipe.strDrink ? mealsRecommendation : drinksRecommendation)
          .slice(0, magic).map((recomendation, index) => (
            <div
              data-testid={ `${index}-recommendation-card` }
              key={ recomendation.strMeal || recomendation.strDrink }
            >
              <p data-testid={ `${index}-recommendation-title` }>
                {recomendation.strMeal || recomendation.strDrink}

              </p>
              <img
                alt="recipeImage"
                src={ recomendation.strMealThumb || recomendation.strDrinkThumb }
              />
            </div>
          ))}

      </div>

    </div>
  );
}

export default RecipeDetails;
