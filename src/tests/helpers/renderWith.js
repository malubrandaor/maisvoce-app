import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import store from '../../app/store';

function withRouter(component, history) {
  return (
    <Router history={ history }>
      { component }
    </Router>
  );
}

function withRedux(component) {
  return (
    <Provider store={ store }>
      { component }
    </Provider>
  );
}

export default function renderWithRouter(
  component,
  {
    initialEntries = ['/'],
    history = createMemoryHistory({ initialEntries }),
  } = {},
) {
  return {
    ...render(withRouter(component, history)),
    history,
  };
}

export function renderWithRedux(component) {
  return {
    ...render(withRedux(component)),
    store,
  };
}

export function renderWithRouterAndRedux(component, options = {}) {
  const {
    initialEntries = ['/'],
    history = createMemoryHistory({ initialEntries }),
  } = options;

  return {
    ...renderWithRedux(withRouter(component, history)),
    history,
  };
}
