import { configureStore } from '@reduxjs/toolkit';

import drinks from './slices/drinks';
import meals from './slices/meals';

const store = configureStore({
  reducer: {
    meals,
    drinks,
  },
});

export default store;
