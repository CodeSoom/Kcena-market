import React from 'react';

import { render } from '@testing-library/react';

import { useSelector, useDispatch } from 'react-redux';

import { MemoryRouter } from 'react-router-dom';
import ProductPage from './ProductPage';

import product from '../../fixtures/product';

describe('ProductPage', () => {
  const dispatch = jest.fn();
  const { title, region, id } = product;

  beforeEach(() => {
    dispatch.mockClear();
    useDispatch.mockImplementation(() => dispatch);
    useSelector.mockImplementation((selector) => selector({
      productReducer: {
        product,
      },
    }));
  });

  context('with params props', () => {
    it('renders product', () => {
      const params = { productId: id };

      const { container } = render((
        <ProductPage params={params} />
      ));

      expect(container).toHaveTextContent(title);
      expect(container).toHaveTextContent(region);
    });
  });

  context('without params props', () => {
    it('renders product', () => {
      const { container } = render((
        <MemoryRouter initialEntries={[`/products/${id}`]}>
          <ProductPage />
        </MemoryRouter>
      ));

      expect(container).toHaveTextContent(title);
      expect(container).toHaveTextContent(region);
    });
  });
});
