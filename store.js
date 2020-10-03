import { configureStore } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';
import { combineReducers } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';

import reducer from './src/slice';

const rootReducer = (history) => combineReducers({
  router: connectRouter(history),
  reducer,
});

export const history = createBrowserHistory();

const store = configureStore({
  reducer: rootReducer(history),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(routerMiddleware(history)),
});

export default store;
