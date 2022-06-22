import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  foods: [],
};

const foodsSlice = createSlice({
  name: 'foods',
  initialState,
  reducers: {
    setFoods(state, actions) {
      state.foods = actions.payload;
    },
  },
});

export const { setFoods } = foodsSlice.actions;
export default foodsSlice.reducer;
