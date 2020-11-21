import React from 'react';

import { render } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import MyProductsContainer from './MyProductsContainer';

import myProducts from '../../../fixtures/myProducts';

jest.mock('react-redux');

describe('MyProductsContainer', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
    useDispatch.mockImplementation(() => dispatch);
    useSelector.mockImplementation((selector) => selector({
      productReducer: {
        myProducts,
      },
    }));
  });

  it('render products', () => {
    const { getByText } = render((
      <MyProductsContainer />
    ));

    myProducts.forEach(({ title }) => {
      expect(getByText(title)).not.toBeNull();
    });
  });
});
