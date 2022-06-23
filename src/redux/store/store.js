import { configureStore } from '@reduxjs/toolkit';

// Slices
import foods from '../reducers/foodsSlice';
import drinks from '../reducers/drinksSlice';
import searchBar from '../reducers/searchBarSlice';

const store = configureStore({
  reducer: {
    foods,
    drinks,
    searchBar,
  },
});

export default store;
