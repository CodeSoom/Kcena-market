import React from 'react';
import {
  Switch, Route,
} from 'react-router-dom';

import Header from './styles/Header';
import Layout from './styles/Layout';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <Layout>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route component={NotFoundPage} />
      </Switch>
    </Layout>
  );
}
