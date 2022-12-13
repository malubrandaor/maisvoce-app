import React, { useEffect, useMemo, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchDrinks, fetchDrinksByCategory } from '../app/slices/drinks';
import { fetchMeals, fetchMealsByCategory } from '../app/slices/meals';
import DrinksCategories from './DrinksCategories';
import MealsCategories from './MealsCategories';
import RecipeCard from './RecipeCard';

import styles from '../styles/recipes/Recipes.module.scss';
import Loading from './Loading';

function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const { location: { pathname } } = useHistory();
  const dispatch = useDispatch();
  const { meals, drinks } = useSelector((state) => state);
  const defaultFetchOptions = useMemo(() => ({ searchType: 's', searchTerm: '' }), []);

  const maxSize = 12;
  const isMeals = pathname === '/meals';
  const isDrinks = pathname === '/drinks';

  const fetchByCategory = (category) => {
    if (isMeals) {
      if (category === 'All') return dispatch(fetchMeals(defaultFetchOptions));

      if (selectedCategory === category) {
        return dispatch(fetchMeals(defaultFetchOptions));
      }

      dispatch(fetchMealsByCategory(category));
      setSelectedCategory(category);
    }

    if (isDrinks) {
      if (category === 'All') return dispatch(fetchDrinks(defaultFetchOptions));

      if (selectedCategory === category) {
        return dispatch(fetchDrinks(defaultFetchOptions));
      }

      dispatch(fetchDrinksByCategory(category));
      setSelectedCategory(category);
    }
  };

  useEffect(() => {
    if (isMeals) dispatch(fetchMeals(defaultFetchOptions));
    if (isDrinks) dispatch(fetchDrinks(defaultFetchOptions));
  }, [dispatch, isMeals, isDrinks, defaultFetchOptions]);

  useEffect(() => {
    if (isMeals) {
      setRecipes(meals.data);
    }

    if (isDrinks) {
      setRecipes(drinks.data);
    }
  }, [meals.data, meals.categories, drinks.data, drinks.categories, isMeals, isDrinks]);

  const IS_LOADING = meals.loading || drinks.loading;

  return (
    <main className={ styles.recipes }>
      <section className={ styles.categories }>
        {isMeals && <MealsCategories fetchByCategory={ fetchByCategory } />}
        {isDrinks && <DrinksCategories fetchByCategory={ fetchByCategory } />}
      </section>

      <div className={ styles.meals }>
        {IS_LOADING && <Loading />}

        {!IS_LOADING && recipes.slice(0, maxSize)
          .map((recipe, idx) => (
            <RecipeCard
              key={ recipe.idMeal || recipe.idDrink }
              recipe={ recipe }
              index={ idx }
            />
          ))}
      </div>
    </main>
  );
}

export default Recipes;
