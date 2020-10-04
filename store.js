import { configureStore } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';
import { combineReducers } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';

import authReducer from './src/authSlice';
import productReducer from './src/productSlice';

const rootReducer = (history) => combineReducers({
  router: connectRouter(history),
  authReducer,
  productReducer,
});

export const history = createBrowserHistory();

const store = configureStore({
  reducer: rootReducer(history),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(routerMiddleware(history)),
});

export default store;
