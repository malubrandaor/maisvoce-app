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

const initialState = {
  loading: false,
  data: [],
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
      });
  },
});

export default recipesSlice.reducer;
