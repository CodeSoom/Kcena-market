import React from 'react';
import {
  Switch, Route, Link,
} from 'react-router-dom';

import Header from './styles/Header';
import Layout from './styles/Layout';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import ProductPage from './pages/ProductPage';

export default function App() {
  return (
    <Layout>
      <Header>
        <Link to="/">Kcena Market</Link>
      </Header>
      <Layout.Main>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/products/:id" component={ProductPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </Layout.Main>
    </Layout>
  );
}
