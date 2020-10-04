import React from 'react';
import {
  Switch, Route,
} from 'react-router-dom';

import { useDispatch } from 'react-redux';

import Header from './components/presentational/Header';
import Layout from './styles/Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import NotFoundPage from './pages/NotFoundPage';
import ProductPage from './pages/ProductPage';

import { setUser } from './authSlice';

import { loadItem } from './services/storage';

export default function App() {
  const dispatch = useDispatch();

  const user = loadItem('user');
  if (user) {
    dispatch(setUser(user));
  }

  return (
    <Layout>
      <Header />
      <Layout.Main>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/signup" component={SignupPage} />
          <Route path="/products/:id" component={ProductPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </Layout.Main>
    </Layout>
  );
}
