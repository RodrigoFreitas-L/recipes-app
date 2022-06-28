import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favoriteFoods: [],
};

const favoriteFoodsSlice = createSlice({
  name: 'favoriteFoods',
  initialState,
  reducers: {
    setFavoriteFoods(state, actions) {
      state.favoriteFoods += actions.payload;
    },
  },
});

export const { setFavoriteFoods } = favoriteFoodsSlice.actions;
export default favoriteFoodsSlice.reducer;
