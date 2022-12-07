import React, { useState, useEffect } from 'react';
import FavoriteRecipesFilter from '../components/FavoriteRecipesFilter';
import Header from '../components/Header';

import FavoriteRecipesCard from '../components/FavoriteRecipesCard';

function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  useEffect(() => {
    const recipes = localStorage.getItem('favoriteRecipes');
    setFavoriteRecipes(recipes ? JSON.parse(recipes) : []);
  }, []);

  const onUnfavoriteRecipe = (id) => {
    const newFavoriteRecipes = favoriteRecipes.filter((recipe) => recipe.id !== id);
    setFavoriteRecipes(newFavoriteRecipes);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
  };

  return (
    <>
      <Header title="Favorite Recipes" />

      <section>
        <FavoriteRecipesFilter />

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
