import React from 'react';

import ListContainer from './components/container/ListContainer';

import Header from './styles/Header';
import Layout from './styles/Layout';

export default function App() {
  return (
    <Layout>
      <Header />
      <Layout.Main>
        <Layout.Title>Kcena Market 인기 매물</Layout.Title>
        <Layout.TextLineDivider />
        <ListContainer />
      </Layout.Main>
    </Layout>
  );
}
