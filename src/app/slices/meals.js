import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const errorMessage = 'Sorry, we haven\'t found any recipes for these filters.';

/**
 * Faz a requisição para a API de comidas.
 * @param {object} param - Objeto com o searchType e searchTerm
 * @returns {object} - Um objeto com as informações da receita.
 */
export const fetchMeals = createAsyncThunk(
  'recipes/fetchMeals',
  async ({ searchType, searchTerm }) => {
    const searchKinds = searchType === 'i';

    const response = await
    fetch(`https://www.themealdb.com/api/json/v1/1/${searchKinds
      ? 'filter'
      : 'search'}.php?${searchType}=${searchTerm}`);

    return response.json();
  },
);

/**
 * Faz a requisição para a API de comidas por categoria.
 */
export const fetchMealsByCategory = createAsyncThunk(
  'recipes/fetchMealsByCategory',
  async (category) => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    return response.json();
  },
);

/**
 * Função que captura as categorias da API
 * @returns {array} Um array com as categorias de comidas.
 */
export const fetchMealsCategories = createAsyncThunk(
  'recipes/fetchMealsCategories',
  async () => {
    const endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
    const maxSize = 5;

    const request = await fetch(endpoint);
    const { meals } = await request.json();

    return meals.splice(0, maxSize);
  },
);

const initialState = {
  loading: false,
  data: [],
  categories: [],
  activeCategory: 'All',
};

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.activeCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMeals.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMeals.fulfilled, (state, action) => {
        if (action.payload.meals === null) {
          global.alert(errorMessage);
          state.loading = false;
          return;
        }

        state.data = action.payload.meals;
        state.loading = false;
      })
      .addCase(fetchMeals.rejected, (state) => {
        state.loading = false;
        state.data = [];
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
      })
      .addCase(fetchMealsByCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMealsByCategory.fulfilled, (state, action) => {
        state.data = action.payload.meals;
        state.loading = false;
      })
      .addCase(fetchMealsByCategory.rejected, (state) => {
        state.loading = false;
        state.data = [];
        global.alert(errorMessage);
      })
      .addCase(fetchMealsCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      });
  },
});

export const { setCategory } = recipesSlice.actions;

export default recipesSlice.reducer;
