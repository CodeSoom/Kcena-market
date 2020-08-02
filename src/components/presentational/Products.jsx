import React from 'react';
import Product from './Product';

import { CardList } from '../../styles/Card';

export default function Products({ products }) {
  if (!(products || []).length) {
    return (
      <p>품목이 없습니다!</p>
    );
  }

  return (
    <CardList>
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </CardList>
  );
}
