import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Product from './Product';

describe('Product', () => {
  const handleClickProduct = jest.fn();

  const product = {
    title: '청바지',
    region: '인천광역시 미추홀구',
    price: '10,000',
  };

  function renderProduct() {
    return render((
      <Product
        product={product}
        onClickProduct={handleClickProduct}
      />
    ));
  }

  it('renders product', () => {
    const { getByText } = renderProduct();

    expect(getByText(product.title)).not.toBeNull();
    expect(getByText(product.region)).not.toBeNull();
    expect(getByText(`${product.price}원`)).not.toBeNull();
  });

  it('listens click event', () => {
    const { getByText } = renderProduct();

    fireEvent.click(getByText(product.title));

    expect(handleClickProduct).toBeCalled();
  });
});
