import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  drinks: [],
};

const drinksSlice = createSlice({
  name: 'drinks',
  initialState,
  reducers: {
    setDrinks(state, actions) {
      state.drinks = actions.payload;
    },
  },
});

export const { setDrinks } = drinksSlice.actions;
export default drinksSlice.reducer;
