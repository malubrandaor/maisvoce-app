import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

/**
 * Faz a requisição para a API de bebidas.
 * @param {object} param - Objeto com o searchType e searchTerm
 * @returns {object} - Um objeto com as informações da receita.
 */
export const fetchDrinks = createAsyncThunk(
  'recipes/fetchDrinks',
  async ({ searchType, searchTerm }) => {
    const searchKinds = searchType === 'i';

    const response = await
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/${searchKinds
      ? 'filter'
      : 'search'}.php?${searchType}=${searchTerm}`);

    return response.json();
  },
);

/**
 * Faz a requisição para a API de bebidas por categoria.
 */
export const fetchDrinksByCategory = createAsyncThunk(
  'recipes/fetchDrinksByCategory',
  async (category) => {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
    return response.json();
  },
);

/**
 * Função que captura as categorias da API
 * @returns {array} Um array com as categorias de bebidas.
 */
export const fetchDrinksCategories = createAsyncThunk(
  'recipes/fetchDrinksCategories',
  async () => {
    const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
    const maxSize = 5;

    const request = await fetch(endpoint);
    const { drinks } = await request.json();

    return drinks.splice(0, maxSize);
  },
);

const initialState = {
  loading: false,
  data: [],
  categories: [],
};

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchDrinks.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchDrinks.fulfilled, (state, action) => {
        if (action.payload.drinks === null) {
          global.alert('Sorry, we haven\'t found any recipes for these filters.');
          state.loading = false;
          return;
        }

        state.data = action.payload.drinks;
        state.loading = false;
      })

      .addCase(fetchDrinks.rejected, (state) => {
        state.loading = false;
        state.data = [];
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
      })

      .addCase(fetchDrinksByCategory.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchDrinksByCategory.fulfilled, (state, action) => {
        state.data = action.payload.drinks;
        state.loading = false;
      })

      .addCase(fetchDrinksByCategory.rejected, (state) => {
        state.loading = false;
        state.data = [];
      })

      .addCase(fetchDrinksCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      });
  },
});

export default recipesSlice.reducer;
