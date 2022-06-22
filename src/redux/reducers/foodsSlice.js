import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  foods: [],
  filter: '',
};

const foodsSlice = createSlice({
  name: 'foods',
  initialState,
  reducers: {
    setFoods(state, actions) {
      state.foods = actions.payload;
    },
    setFilter(state, actions) {
      state.filter = actions.payload;
    },
  },
});

export const { setFoods, setFilter } = foodsSlice.actions;
export default foodsSlice.reducer;
