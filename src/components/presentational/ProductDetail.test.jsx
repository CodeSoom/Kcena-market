import React from 'react';

import { render } from '@testing-library/react';

import ProductDetail from './ProductDetail';

import products from '../../../fixtures/products';

describe('ProductDetail', () => {
  it('renders product detail', () => {
    const { container } = render((
      <ProductDetail
        product={products[0]}
      />
    ));

    expect(container).toHaveTextContent('크리넥스 KF-AD 소형 마스크 팝니다.');
    expect(container).toHaveTextContent('미추홀구 용현5동');
  });
});
