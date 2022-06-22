import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialStateSlice = createSlice({
  name: 'initialState',
  initialState: {},
  reducers: {},
}).reducer;

const renderWithRouterAndRedux = (
  component,
  {
    store = configureStore({
      reducer: { initialStateSlice },
    }),

    initialEntries = ['/'],

    history = createMemoryHistory({ initialEntries }),
  } = {},
) => ({

  ...render(
    <Router history={ history }>
      <Provider store={ store }>
        {component}
      </Provider>
    </Router>,
  ),

  history,

  store,
});

export default renderWithRouterAndRedux;
