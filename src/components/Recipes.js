import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchDrinks } from '../app/slices/drinks';
import { fetchMeals } from '../app/slices/meals';
import RecipeCard from './RecipeCard';

function Recipes() {
  const { meals, drinks } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [recipes, setRecipes] = useState([]);
  const { location: { pathname } } = useHistory();
  const maxSize = 12;

  const isMeals = pathname === '/meals';
  const isDrinks = pathname === '/drinks';

  useEffect(() => {
    if (isMeals) dispatch(fetchMeals({ searchType: 's', searchTerm: '' }));
    if (isDrinks) dispatch(fetchDrinks({ searchType: 's', searchTerm: '' }));
  }, [dispatch, isMeals, isDrinks]);

  useEffect(() => {
    if (isMeals) setRecipes(meals.data);
    if (isDrinks) setRecipes(drinks.data);
  }, [meals.data, drinks.data, isMeals, isDrinks]);

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
