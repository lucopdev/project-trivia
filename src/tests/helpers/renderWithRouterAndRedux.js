import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import {  legacy_createStore as createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../../redux/reducers/index';

export const renderWithRouterAndRedux = (component, initialState, route = '/') => {
  const store = createStore(reducer, initialState, applyMiddleware(thunk));
  const history = createMemoryHistory({ initialEntries: [route] });

  return {
    ...render(
      <Provider store={ store }>
        <Router history={ history }>
          {component}
        </Router>
      </Provider>,
    ),
    history,
    store,
  };
};

export default renderWithRouterAndRedux;

// function withRouter(component, history) {
//   return (
//     <Router history={ history }>
//       { component }
//     </Router>
//   );
// }

// function withRedux(component, store) {
//   return (
//     <Provider store={ store }>
//       { component }
//     </Provider>
//   );
// }

// export function renderWithRouter(
//   component,
//   {
//     initialEntries = ['/'],
//     history = createMemoryHistory({ initialEntries }),
//   } = {},
// ) {
//   return {
//     ...render(withRouter(component, history)),
//     history,
//   };
// }

// export function renderWithRedux(component, options = {}) {
//   const {
//     initialState = {},
//     store = createStore(rootReducer, initialState, applyMiddleware(thunk)),
//   } = options;

//   return {
//     ...render(withRedux(component, store)),
//     store,
//   };
// }

// export function renderWithRouterAndRedux(component, options = {}) {
//   const {
//     initialEntries = ['/'],
//     history = createMemoryHistory({ initialEntries }),
//   } = options;

//   return {
//     ...renderWithRedux(withRouter(component, history), options),
//     history,
//   };
// }
