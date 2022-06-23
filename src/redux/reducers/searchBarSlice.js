import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchBar: false,
};

const searchBarSlice = createSlice({
  name: 'searchBar',
  initialState,
  reducers: {
    setSearchBar(state, actions) {
      state.searchBar = actions.payload;
    },
  },
});

export const { setSearchBar } = searchBarSlice.actions;
export default searchBarSlice.reducer;
