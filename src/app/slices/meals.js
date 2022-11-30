import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

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

const initialState = {
  loading: false,
  data: [],
};

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchMeals.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMeals.fulfilled, (state, action) => {
        if (action.payload.meals === null) {
          global.alert('Sorry, we haven\'t found any recipes for these filters.');
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
      });
  },
});

export default recipesSlice.reducer;
