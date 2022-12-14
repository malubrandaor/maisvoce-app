import { configureStore } from '@reduxjs/toolkit';

import drinks from './slices/drinks';
import meals from './slices/meals';
import filter from './slices/filter';

const store = configureStore({
  reducer: {
    meals,
    drinks,
    filter,
  },
});

export default store;
