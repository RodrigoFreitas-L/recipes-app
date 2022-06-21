import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

const renderWithRouterAndRedux = (
  component,
  {
    initialState = {},

    store = configureStore({
      reducer: { initialState },
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
