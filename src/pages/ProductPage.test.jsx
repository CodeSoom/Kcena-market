import React from 'react';

import { render } from '@testing-library/react';

import { useSelector, useDispatch } from 'react-redux';

import { MemoryRouter } from 'react-router-dom';
import ProductPage from './ProductPage';

import products from '../../fixtures/products';

describe('ProductPage', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
    useDispatch.mockImplementation(() => dispatch);
    useSelector.mockImplementation((selector) => selector({
      product: products[0],
    }));
  });

  context('with params props', () => {
    it('renders product', () => {
      const params = { productId: 1 };
      const { container } = render((
        <ProductPage params={params} />
      ));

      expect(container).toHaveTextContent('크리넥스 KF-AD 소형 마스크 팝니다.');
      expect(container).toHaveTextContent('미추홀구 용현5동');
    });
  });

  context('without params props', () => {
    it('renders product', () => {
      const { container } = render((
        <MemoryRouter initialEntries={['/products/1']}>
          <ProductPage />
        </MemoryRouter>
      ));

      expect(container).toHaveTextContent('크리넥스 KF-AD 소형 마스크 팝니다.');
      expect(container).toHaveTextContent('미추홀구 용현5동');
    });
  });
});
