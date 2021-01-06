import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import ProductDetail from './ProductDetail';

import products from '../../../fixtures/products';
import product from '../../../fixtures/product';

describe('ProductDetail', () => {
  function renderProductDetail({ product }) {
    return render((
      <ProductDetail
        product={product}
      />
    ));
  }

  it('renders product detail', () => {
    const { container } = renderProductDetail({ product });

    expect(container).toHaveTextContent(product.title);
    expect(container).toHaveTextContent(product.region);
  });

  context('without product images', () => {
    it('render placcholder image', () => {
      const { getByAltText } = renderProductDetail({
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

  context('when click next arrow', () => {
    it('renders next image', () => {
      const { productImages } = products[0];

      const { getByTestId, getAllByAltText } = renderProductDetail({ product: products[0] });

      const currentImage = getAllByAltText(productImages[0].name)[0];
      expect(currentImage).toHaveAttribute('src', productImages[0].imageUrl);

      fireEvent.click(getByTestId('nextArrow'));

      const nextImage = getAllByAltText(productImages[1].name)[0];
      expect(nextImage).toHaveAttribute('src', productImages[1].imageUrl);
    });
  });

  context('when click prev arrow', () => {
    it('renders prev image', () => {
      const { productImages } = products[0];

      const { getByTestId, getAllByAltText } = renderProductDetail({ product: products[0] });

      const currentImage = getAllByAltText(productImages[0].name)[0];
      expect(currentImage).toHaveAttribute('src', productImages[0].imageUrl);

      fireEvent.click(getByTestId('prevArrow'));

      const prevImage = getAllByAltText(productImages[2].name)[0];
      expect(prevImage).toHaveAttribute('src', productImages[2].imageUrl);
    });
  });
});
