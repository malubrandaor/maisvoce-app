import React, { useState, useEffect } from 'react';
import RecipesFilter from '../components/RecipesFilter';
import Header from '../components/Header';

import FavoriteRecipesCard from '../components/FavoriteRecipesCard';

function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  useEffect(() => {
    const recipes = localStorage.getItem('favoriteRecipes');
    setFavoriteRecipes(recipes ? JSON.parse(recipes) : []);
  }, []);

  /**
   * Filtra as receitas favoritas de acordo com o tipo
   * @param {string} type - 'all', 'meal' or 'drink'
   */
  const onFilterRecipes = (type) => {
    const recipes = localStorage.getItem('favoriteRecipes');
    const parsedRecipes = recipes ? JSON.parse(recipes) : [];

    const filteredRecipes = type === 'all'
      ? parsedRecipes
      : parsedRecipes.filter((recipe) => recipe.type === type);

    setFavoriteRecipes(filteredRecipes);
  };

  /**
   * Desfavorita uma receita
   * @param {number} id - id da receita a ser desfavoritada
   */
  const onUnfavoriteRecipe = (id) => {
    const newFavoriteRecipes = favoriteRecipes.filter((recipe) => recipe.id !== id);
    setFavoriteRecipes(newFavoriteRecipes);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
  };

  return (
    <>
      <Header title="Favorite Recipes" />

      <section>
        <RecipesFilter
          onFilterRecipes={ onFilterRecipes }
        />

        {favoriteRecipes.map((recipe, index) => (
          <FavoriteRecipesCard
            key={ recipe.id }
            recipe={ recipe }
            index={ index }
            onUnfavoriteRecipe={ onUnfavoriteRecipe }
          />
        ))}
      </section>
    </>
  );
}

export default FavoriteRecipes;
