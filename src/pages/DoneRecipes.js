import React, { useEffect, useState } from 'react';
import DoneRecipesCard from '../components/DoneRecipesCard';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesFilter from '../components/RecipesFilter';

import styles from '../styles/recipes/DoneRecipes.module.scss';

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
    <section className={ styles.done_recipes }>
      <Header title="Done Recipes" />

      <section>
        <RecipesFilter onFilterRecipes={ onFilterRecipes } />

        <div className={ styles.cards }>
          {doneRecipes.map((recipe, index) => (
            <DoneRecipesCard
              key={ recipe.id }
              recipe={ recipe }
              index={ index }
            />
          ))}
        </div>
      </section>

      <Footer />
    </section>
  );
}

export default DoneRecipes;
