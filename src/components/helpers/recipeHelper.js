/**
 * Função que captura as categorias da API
 * @returns {array} Um array com as categorias de comidas.
 */
export const fetchMealsCategories = async () => {
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const maxSize = 5;

  const request = await fetch(endpoint);
  const { meals } = await request.json();

  return meals.splice(0, maxSize);
};

/**
 * Função que captura as categorias da API
 * @returns {array} Um array com as categorias de bebidas.
 */
export const fetchDrinksCategories = async () => {
  const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const maxSize = 5;

  const request = await fetch(endpoint);
  const { drinks } = await request.json();

  return drinks.splice(0, maxSize);
};
