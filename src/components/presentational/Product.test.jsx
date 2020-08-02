import React from 'react';

import { render } from '@testing-library/react';

import Product from './Product';

describe('Product', () => {
  const product = {
    title: '청바지',
    region: '인천광역시 미추홀구',
    url: 'https://www.test.com/',
    price: '10,000',
  };

  function renderProduct() {
    return render((
      <Product product={product} />
    ));
  }

  it('renders product', () => {
    const { getByText } = renderProduct();

    expect(getByText('청바지')).not.toBeNull();
    expect(getByText('인천광역시 미추홀구')).not.toBeNull();
    expect(getByText('10,000원')).not.toBeNull();
  });

  it('click to go to the product link', () => {
    const { getByText } = renderProduct();

    expect(getByText('청바지').closest('a')).toHaveAttribute('href', 'https://www.test.com/');
  });
});
