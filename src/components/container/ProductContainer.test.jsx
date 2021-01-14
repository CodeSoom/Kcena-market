import React from 'react';

import { render } from '@testing-library/react';
import { useSelector, useDispatch } from 'react-redux';

import ProductContainer from './ProductContainer';

import product from '../../../fixtures/product';

jest.mock('react-redux');

describe('ProductContainer', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
    useDispatch.mockImplementation(() => dispatch);
    useSelector.mockImplementation((selector) => selector({
      productReducer: {
        product: given.product,
      },
    }));
  });

  function renderProductContainer() {
    return render((
      <ProductContainer productId="1" />
    ));
  }

  context('with product', () => {
    given('product', () => product);

    it('dispatchs called', () => {
      renderProductContainer();

      expect(dispatch).toBeCalled();
    });

    it('renders product', () => {
      const { title, region } = product;
      const { container } = renderProductContainer();

      expect(container).toHaveTextContent(title);
      expect(container).toHaveTextContent(region);
    });
  });
});
