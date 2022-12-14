import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import arrowBackIcon from '../images/arrowBack.png';

import styles from '../styles/recipes/RecipeDetails.module.scss';
import findIngredients from '../helpers/findIngredients';
import Loading from './Loading';

const copy = require('clipboard-copy');

function RecipeDetails() {
  const params = useParams();
  const history = useHistory();
  const magic = 6;
  const [recipe, setRecipe] = useState([]);
  const [mealsRecommendation, setMealsRecommendation] = useState([]);
  const [drinksRecommendation, setDrinksRecommendation] = useState([]);
  const [isInProgress, setProgress] = useState(false);
  const [showCoppied, setShowCoppied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
      setIsLoading(false);
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
      setIsLoading(false);
    }
  };

  useEffect(() => {
    requestApi(params.id, history.location.pathname.split('/')[1]);
    const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (inProgress !== null) {
      if (inProgress[history.location.pathname.split('/')[1]][params.id] !== undefined) {
        setProgress(true);
      }
    } else { setProgress(false); }
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favorites !== null) {
      setIsFavorite(favorites.some((fav) => fav.id === params.id));
    }
  }, [isFavorite, history.location.pathname, params.id]);
  function embedVideo(url) {
    return `https://www.youtube.com/embed/${url.split('v=')[1]}`;
  }
  const setInProgress = (id, ingredients, type) => {
    const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (type === 'meals') {
      if (inProgress === null) {
        localStorage.setItem('inProgressRecipes', JSON.stringify({
          meals: { [id]: [...Object.values(ingredients)] },
          drinks: {} }));
      } else {
        localStorage.setItem('inProgressRecipes', JSON.stringify({
          meals: { ...inProgress.meals, [id]: [...Object.values(ingredients)] },
          drinks: { ...inProgress.drinks } }));
      }
    }
    if (type === 'drinks') {
      if (inProgress === null) {
        localStorage.setItem('inProgressRecipes', JSON.stringify({
          meals: { },
          drinks: { [id]: [...Object.values(ingredients)] } }));
      } else {
        localStorage.setItem('inProgressRecipes', JSON.stringify({
          meals: { ...inProgress.meals },
          drinks: { ...inProgress.drinks, [id]: [...Object.values(ingredients)] } }));
      }
    }
    history.push(`/${type}/${params.id}/in-progress`);
  };
  const removeFavorite = (arr, id) => {
    if (isFavorite) {
      localStorage
        .setItem('favoriteRecipes', JSON.stringify(
          arr.filter((a) => a.id !== id),
        ));
      setIsFavorite(false);
    }
  };
  const saveFavorite = () => {
    const favoritesRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const magicNumber = -1;
    const favoriteItems = {
      id: params.id,
      type: history.location.pathname.split('/')[1].slice(0, magicNumber),
      nationality: recipe.strArea || '',
      category: recipe.strCategory,
      alcoholicOrNot: recipe.strAlcoholic || '',
      name: recipe.strMeal || recipe.strDrink,
      image: recipe.strMealThumb
      || recipe.strDrinkThumb,
    };
    if (favoritesRecipes === null) {
      localStorage.setItem('favoriteRecipes', JSON.stringify(
        [favoriteItems],
      ));
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify(
        [...favoritesRecipes, favoriteItems],
      ));
    }
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favorites !== null) {
      setIsFavorite(favorites.some((fav) => fav.id === params.id));
    }
    removeFavorite(favorites, params.id);
  };

  const redirect = (r) => {
    if (r.idMeal) history.push(`/meals/${r.idMeal}`);
    if (r.idDrink) history.push(`/drinks/${r.idDrink}`);
  };

  const TWO_SECONDS = 2000;
  return (
    <div className={ styles.recipe_details }>
      {isLoading && <Loading />}
      {!isLoading && (
        <>
          <header>
            <div className={ styles.background } />
            <img
              data-testid="recipe-photo"
              alt="recipeImage"
              src={ recipe.strMealThumb || recipe.strDrinkThumb }
              className={ styles.recipe_image }
            />
            <h1 data-testid="recipe-title">{recipe.strMeal || recipe.strDrink}</h1>
            <p
              data-testid="recipe-category"
            >
              {`${recipe.strCategory} -  ${recipe.strAlcoholic || recipe.strArea}`}
            </p>
            {showCoppied && <div className={ styles.copy }>Link copied!</div> }
            <div className={ styles.buttons }>
              <img
                data-testid="share-icon"
                onClick={ () => {
                  copy(window.location.href);
                  setShowCoppied(true);
                  setTimeout(() => setShowCoppied(false), TWO_SECONDS);
                } }
                aria-hidden
                alt="share"
                src={ shareIcon }
              />
              <img
                aria-hidden
                onClick={ () => saveFavorite() }
                data-testid="favorite-btn"
                alt="favorite"
                src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
              />
            </div>
            <img
              src={ arrowBackIcon }
              alt="back icon"
              className={ styles.back }
              onClick={ () => history.goBack() }
              aria-hidden
            />
          </header>
          <h3>Ingredients</h3>
          <div className={ styles.ingredients }>
            {findIngredients(recipe).map((ingredient, i) => (
              <p data-testid={ `${i}-ingredient-name-and-measure` } key={ i }>
                {`${ingredient.name} ${ingredient.measure}`}
              </p>))}
          </div>
          <h3>Instructions</h3>
          <p
            data-testid="instructions"
            className={ styles.instructions }
          >
            {recipe.strInstructions?.replaceAll(/(\d+)\./g, '\n')}
          </p>
          {recipe.strYoutube && <iframe
            data-testid="video"
            title={ recipe.strMealThumb }
            src={ embedVideo(recipe.strYoutube) }
            allowFullScreen
          />}
          <div className={ styles.slider }>
            {(recipe.strDrink ? mealsRecommendation : drinksRecommendation)
              .slice(0, magic).map((recomendation, index) => (
                <div
                  data-testid={ `${index}-recommendation-card` }
                  key={ recomendation.strMeal || recomendation.strDrink }
                  onClick={ () => redirect(recomendation) }
                  aria-hidden
                >
                  <img
                    alt="recipeImage"
                    src={ recomendation.strMealThumb || recomendation.strDrinkThumb }
                  />
                  <p data-testid={ `${index}-recommendation-title` }>
                    {recomendation.strMeal || recomendation.strDrink}
                  </p>
                </div>
              ))}
          </div>
          <button
            onClick={ () => setInProgress(
              params.id,
              findIngredients(recipe),
              history.location.pathname.split('/')[1],
            ) }
            className={ styles.start }
            type="button"
            data-testid="start-recipe-btn"
          >
            {isInProgress ? 'Continue Recipe' : 'Start Recipe'}
          </button>
        </>
      )}
    </div>
  );
}
export default RecipeDetails;
