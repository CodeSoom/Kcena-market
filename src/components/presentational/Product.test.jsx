import React from 'react';

import { render } from '@testing-library/react';

import Product from './Product';

import products from '../../../fixtures/products';

describe('Product', () => {
  it('renders product', () => {
    const { title, region, price } = products[0];

    const { container } = render((
      <Product product={products[0]} />
    ));

    expect(container).toHaveTextContent(title);
    expect(container).toHaveTextContent(region);
    expect(container).toHaveTextContent(price);
  });
});
