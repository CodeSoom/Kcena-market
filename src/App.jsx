import React from 'react';
import {
  Switch, Route,
} from 'react-router-dom';

import { useDispatch } from 'react-redux';

import CssBaseline from '@material-ui/core/CssBaseline';
import { Container } from '@material-ui/core';
import Header from './components/presentational/Header';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import NotFoundPage from './pages/NotFoundPage';
import ProductPage from './pages/ProductPage';
import AboutMePage from './pages/AboutMePage';
import WritePage from './pages/WritePage';
import EditPage from './pages/EditPage';

import { setUser } from './authSlice';

import { loadItem } from './services/storage';

export default function App() {
  const dispatch = useDispatch();

  const user = loadItem('user');
  if (user) {
    dispatch(setUser(user));
  }

  return (
    <>
      <CssBaseline />
      <Header />
      <Container component="main" maxWidth="lg">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/signup" component={SignupPage} />
          <Route path="/products/:id" component={ProductPage} />
          <Route path="/edit/:id" component={EditPage} />
          <Route path="/newproduct" component={WritePage} />
          <Route path="/aboutme" component={AboutMePage} />
          <Route component={NotFoundPage} />
        </Switch>
      </Container>
    </>
  );
}
