import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Product from './Product';

import products from '../../../fixtures/products';

describe('Product', () => {
  const handleClickProduct = jest.fn();

  function renderProduct() {
    return render((
      <Product
        product={products[0]}
        onClickProduct={handleClickProduct}
      />
    ));
  }

  const {
    title, region, price, productImages,
  } = products[0];
  const thumbnailUrl = productImages[0];

  it('renders product', () => {
    const { getByText, getByAltText } = renderProduct();

    expect(getByText(title)).not.toBeNull();
    expect(getByText(region)).not.toBeNull();
    expect(getByText(`${price}원`)).not.toBeNull();
    expect(getByAltText(title)).toHaveAttribute('src', thumbnailUrl);
  });

  it('listens click event', () => {
    const { getByText } = renderProduct();

    fireEvent.click(getByText(title));

    expect(handleClickProduct).toBeCalled();
  });
});
