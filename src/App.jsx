import React from 'react';
import {
  Switch, Route,
} from 'react-router-dom';

import Header from './components/presentational/Header';
import Layout from './styles/Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import ProductPage from './pages/ProductPage';

export default function App() {
  return (
    <Layout>
      <Header />
      <Layout.Main>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={LoginPage} />
          <Route path="/products/:id" component={ProductPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </Layout.Main>
    </Layout>
  );
}
