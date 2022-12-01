import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchDrinks } from '../app/slices/drinks';
import { fetchMeals } from '../app/slices/meals';
import { fetchDrinksCategories, fetchMealsCategories } from './helpers/recipeHelper';
import RecipeCard from './RecipeCard';

function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const { location: { pathname } } = useHistory();
  const dispatch = useDispatch();
  const { meals, drinks } = useSelector((state) => state);

  const maxSize = 12;
  const isMeals = pathname === '/meals';
  const isDrinks = pathname === '/drinks';

  useEffect(() => {
    if (isMeals) dispatch(fetchMeals({ searchType: 's', searchTerm: '' }));
    if (isDrinks) dispatch(fetchDrinks({ searchType: 's', searchTerm: '' }));
  }, [dispatch, isMeals, isDrinks]);

  useEffect(() => {
    if (isMeals) {
      setRecipes(meals.data);
      fetchMealsCategories().then((data) => setCategories(data));
    }

    if (isDrinks) {
      setRecipes(drinks.data);
      fetchDrinksCategories().then((data) => setCategories(data));
    }
  }, [meals.data, drinks.data, isMeals, isDrinks]);

  return (
    <main>
      <section>
        {categories?.map(({ strCategory }) => (
          <button
            type="button"
            key={ strCategory }
            data-testid={ `${strCategory}-category-filter` }
          >
            {strCategory}
          </button>
        ))}
      </section>

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
