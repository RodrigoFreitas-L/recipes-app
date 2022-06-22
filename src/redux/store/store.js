import { configureStore } from '@reduxjs/toolkit';

// Slices
import foods from '../reducers/foodsSlice';

const store = configureStore({
  reducer: {
    foods,
  },
});

export default store;
