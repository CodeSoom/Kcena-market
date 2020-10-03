import React from 'react';

import { render } from '@testing-library/react';
import { useSelector, useDispatch } from 'react-redux';

import ProductContainer from './ProductContainer';

import products from '../../../fixtures/products';

jest.mock('react-redux');

describe('ProductContainer', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
    useDispatch.mockImplementation(() => dispatch);
    useSelector.mockImplementation((selector) => selector({
      reducer: {
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
    given('product', () => products[0]);

    it('dispatchs called', () => {
      renderProductContainer();

      expect(dispatch).toBeCalled();
    });

    it('renders product', () => {
      const { container } = renderProductContainer();

      expect(container).toHaveTextContent('크리넥스 KF-AD 소형 마스크 팝니다.');
      expect(container).toHaveTextContent('미추홀구 용현5동');
    });
  });

  context('without product', () => {
    given('empty product', () => {});
    it('renders loading message', () => {
      const { container } = renderProductContainer();

      expect(container).toHaveTextContent('loading...');
    });
  });
});
