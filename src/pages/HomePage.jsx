import React from 'react';
import { useHistory } from 'react-router-dom';

import Layout from '../styles/Layout';

import ProductsContainer from '../components/container/ProductsContainer';

export default function HomePage() {
  const history = useHistory();

  function handleClickProduct(product) {
    const url = `/products/${product.id}`;
    history.push(url);
  }

  return (
    <Layout.Main>
      <Layout.Title>Kcena Market 인기 매물</Layout.Title>
      <Layout.TextLineDivider />
      <ProductsContainer onClickProduct={handleClickProduct} />
    </Layout.Main>
  );
}
