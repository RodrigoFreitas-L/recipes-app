import { configureStore } from '@reduxjs/toolkit';

// Slices
import foods from '../reducers/foodsSlice';
import drinks from '../reducers/drinksSlice';

const store = configureStore({
  reducer: {
    foods,
    drinks,
  },
});

export default store;
