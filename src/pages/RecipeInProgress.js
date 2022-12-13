import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import findIngredients from '../helpers/findIngredients';
import '../App.css';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import arrowBackIcon from '../images/arrowBack.png';

import styles from '../styles/recipes/RecipeInProgress.module.scss';

const copy = require('clipboard-copy');

function RecipeInProgress() {
  const params = useParams();
  const [recipe, setRecipe] = useState([]);
  const magic = 33;
  const magic2 = 35;
  const [showCoppied, setShowCoppied] = useState(false);
  const [ingredients, setIngredients] = useState([]);

  const [isFavorite, setIsFavorite] = useState(false);

  const [, setNewIngredients] = useState([]);

  const history = useHistory();

  const type = history.location.pathname.split('/')[1];
  const id = history.location.pathname.split('/')[2];

  const removeFavorite = (arr, idRecip) => {
    if (isFavorite) {
      localStorage
        .setItem('favoriteRecipes', JSON.stringify(
          arr.filter((a) => a.id !== idRecip),
        ));
      setIsFavorite(false);
    }
  };

  const saveDoneRecipe = () => {
    const today = new Date();
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
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
      doneDate: today,
      tags: type === 'meals' ? recipe.strTags?.split(',') : [],
    };
    if (doneRecipes === null) {
      localStorage.setItem('doneRecipes', JSON.stringify(
        [favoriteItems],
      ));
    } else {
      localStorage.setItem('doneRecipes', JSON.stringify(
        [...doneRecipes, favoriteItems],
      ));
    }
    history.push('/done-recipes');
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
        setNewIngredients(JSON.parse(localStorage.getItem('inProgressRecipes'))),
      );
    }

    if (recipe.length === 0) {
      requestApi(id, type);
    }
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favorites !== null) {
      setIsFavorite(favorites.some((fav) => fav.id === params.id));
    }
  }, [id, recipe, type, isFavorite, params.id]);

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
  };

  const TWO_SECONDS = 2000;

  return (
    <div className={ styles.recipe_in_progress }>
      <header>
        <div className={ styles.background } />
        <img
          data-testid="recipe-photo"
          alt="recipeImage"
          src={ recipe.strMealThumb || recipe.strDrinkThumb }
          className={ styles.recipe_image }
        />
        <h1 data-testid="recipe-title">{recipe.strMeal || recipe.strDrink}</h1>
        <p data-testid="recipe-category">
          {`${recipe.strCategory} ${recipe.strAlcoholic || ''}`}
        </p>
        {showCoppied && <div className={ styles.copy }>Link copied!</div> }

        <div className={ styles.buttons }>
          <img
            data-testid="share-icon"
            onClick={ () => {
              copy(type === 'meals' ? window.location.href.slice(0, magic)
                : window.location.href.slice(0, magic2));
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
      <ul className={ styles.ingredients }>
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
                <input
                  checked={ ingredient.checked }
                  id={ `${idx}-ingredient` }
                  onClick={ (target) => checkIngredient(target, idx) }
                  type="checkbox"
                />
                {ingredient.name}
                &nbsp;-&nbsp;
                {ingredient.measure}
              </label>
            </li>
          ))}
      </ul>

      <h3>Instructions</h3>
      <p
        data-testid="instructions"
        className={ styles.instructions }
      >
        {recipe.strInstructions?.replaceAll(/(\d+)\./g, '\n')}
      </p>

      <button
        disabled={ ingredients.length !== findIngredients(recipe).length }
        type="button"
        data-testid="finish-recipe-btn"
        onClick={ () => saveDoneRecipe() }
        className={ styles.finish }
      >
        Finish Recipe

      </button>
    </div>

  );
}
export default RecipeInProgress;
