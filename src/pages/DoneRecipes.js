import React, { useEffect, useState } from 'react';
import DoneRecipesCard from '../components/DoneRecipesCard';
import Header from '../components/Header';
import RecipesFilter from '../components/RecipesFilter';

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);

  useEffect(() => {
    const recipes = localStorage.getItem('doneRecipes');
    setDoneRecipes(recipes ? JSON.parse(recipes) : []);
  }, []);

  /**
   * Filtra as receitas favoritas de acordo com o tipo
   * @param {string} type - 'all', 'meal' or 'drink'
   */
  const onFilterRecipes = (type) => {
    const recipes = localStorage.getItem('doneRecipes');
    const parsedRecipes = recipes ? JSON.parse(recipes) : [];

    const filteredRecipes = type === 'all'
      ? parsedRecipes
      : parsedRecipes.filter((recipe) => recipe.type === type);

    setDoneRecipes(filteredRecipes);
  };

  return (
    <>
      <Header title="Done Recipes" />

      <RecipesFilter
        onFilterRecipes={ onFilterRecipes }
      />

      {doneRecipes.map((recipe, index) => (
        <DoneRecipesCard
          key={ recipe.id }
          recipe={ recipe }
          index={ index }
        />
      ))}
    </>
  );
}

export default DoneRecipes;
