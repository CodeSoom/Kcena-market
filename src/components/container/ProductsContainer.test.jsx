import React from 'react';

import { render } from '@testing-library/react';
import { useSelector, useDispatch } from 'react-redux';

import ProductsContainer from './ProductsContainer';

import products from '../../../fixtures/products';

jest.mock('react-redux');

describe('ProductsContainer', () => {
  const dispatch = jest.fn();

  function renderProductsContainer() {
    return render((
      <ProductsContainer />
    ));
  }

  beforeEach(() => {
    dispatch.mockClear();
    useDispatch.mockImplementation(() => dispatch);
    useSelector.mockImplementation((selector) => selector({
      productReducer: {
        products: given.products,
        isLoading: given.isLoading,
      },
    }));
  });

  describe('when isLoading is true', () => {
    given('isLoading', () => true);

    it('render loading component', () => {
      const { getByText } = renderProductsContainer();

      expect(getByText('Loading...')).toBeInTheDocument();
    });
  });

  describe('when isLoading is false', () => {
    context('with products', () => {
      given('products', () => products);

      it('renders products', () => {
        const { getByText } = renderProductsContainer();

        products.forEach(({ title }) => {
          expect(getByText(title)).toBeInTheDocument();
        });
      });
    });

    context('without products', () => {
      given('products', () => []);

      it('load products', () => {
        renderProductsContainer();

        expect(dispatch).toBeCalledTimes(1);
      });

      it('renders no products message', () => {
        const { getByText } = renderProductsContainer();

        expect(getByText('품목이 없습니다!')).not.toBeNull();
      });
    });
  });
});
