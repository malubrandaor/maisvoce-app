import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import RecipeCard from './RecipeCard';

function Recipes() {
  const { meals, drinks } = useSelector((state) => state);
  const [recipes, setRecipes] = useState([]);
  const { location: { pathname } } = useHistory();
  const maxSize = 12;

  useEffect(() => {
    if (pathname === '/meals') setRecipes(meals.data);
    if (pathname === '/drinks') setRecipes(drinks.data);
  }, [pathname, meals.data, drinks.data, recipes.length]);

  return (
    <main>
      {recipes.slice(0, maxSize)
        .map((recipe, idx) => (
          <RecipeCard
            key={ recipe.idMeal || recipe.idDrink }
            recipe={ recipe }
            index={ idx }
          />
        ))}
    </main>
  );
}

export default Recipes;
