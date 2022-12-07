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
          />
        ))}
      </section>
    </>
  );
}

export default FavoriteRecipes;
