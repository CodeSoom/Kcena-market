import React from 'react';

import ProductsContainer from './components/container/ProductsContainer';

import Header from './styles/Header';
import Layout from './styles/Layout';

export default function App() {
  return (
    <Layout>
      <Header />
      <Layout.Main>
        <Layout.Title>Kcena Market 인기 매물</Layout.Title>
        <Layout.TextLineDivider />
        <ProductsContainer />
      </Layout.Main>
    </Layout>
  );
}
