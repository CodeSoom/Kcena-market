import React from 'react';

import Product from './Product';

import { CardList } from '../../styles/Card';

import { isEmpty } from '../../utils';

export default function Products({ products, onClickProduct }) {
  if (isEmpty(products || [])) {
    return (
      <p>품목이 없습니다!</p>
    );
  }

  return (
    <CardList>
      {products.map((product) => (
        <Product
          key={product.id}
          product={product}
          onClickProduct={onClickProduct}
        />
      ))}
    </CardList>
  );
}
