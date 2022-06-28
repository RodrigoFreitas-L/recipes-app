import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favoriteDrinks: [],
};

const favoriteDrinksSlice = createSlice({
  name: 'favoriteDrinks',
  initialState,
  reducers: {
    setFavoriteDrinks(state, actions) {
      state.favoriteDrinks += actions.payload;
    },
  },
});

export const { setFavoriteDrinks } = favoriteDrinksSlice.actions;
export default favoriteDrinksSlice.reducer;
