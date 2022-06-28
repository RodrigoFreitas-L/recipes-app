import { configureStore } from '@reduxjs/toolkit';

// Slices
import foods from '../reducers/foodsSlice';
import drinks from '../reducers/drinksSlice';
import searchBar from '../reducers/searchBarSlice';
import favoriteDrinks from '../reducers/favoriteDrinksSlice';
import favoriteFoods from '../reducers/favoriteFoodsSlice';

const store = configureStore({
  reducer: {
    foods,
    drinks,
    searchBar,
    favoriteDrinks,
    favoriteFoods,
  },
});

export default store;
