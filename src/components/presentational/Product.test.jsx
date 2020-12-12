import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Product from './Product';

import products from '../../../fixtures/products';

describe('Product', () => {
  const handleClickProduct = jest.fn();

  function renderProduct({ product }) {
    return render((
      <Product
        product={product}
        onClickProduct={handleClickProduct}
      />
    ));
  }

  context('with productImages', () => {
    it('renders product', () => {
      const { getByText, getByAltText } = renderProduct({
        product: products[0],
      });

      const {
        title, region, price, productImages,
      } = products[0];
      const { name, imageUrl } = productImages[0];

      expect(getByText(title)).not.toBeNull();
      expect(getByText(region)).not.toBeNull();
      expect(getByText(`${price}원`)).not.toBeNull();
      expect(getByAltText(name)).toHaveAttribute('src', imageUrl);
    });

    it('listens click event', () => {
      const { getByText } = renderProduct({
        product: products[0],
      });

      fireEvent.click(getByText(products[0].title));

      expect(handleClickProduct).toBeCalled();
    });
  });

  context('without productImages', () => {
    it('render placeholder image', () => {
      const { getByAltText } = renderProduct({
        product: {
          ...products[0],
          productImages: [],
        },
      });

      const image = getByAltText('placeholder');

      expect(image).toHaveAttribute(
        'src',
        'https://via.placeholder.com/300',
      );
    });
  });
});
