import { configureStore } from '@reduxjs/toolkit';

import meals from './slices/meals';

const store = configureStore({
  reducer: {
    meals,
  },
});

export default store;
