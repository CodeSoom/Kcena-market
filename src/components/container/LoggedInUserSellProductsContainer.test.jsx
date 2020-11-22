import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import LoggedInUserSellProductsContainer from './LoggedInUserSellProductsContainer';

import myProducts from '../../../fixtures/myProducts';

jest.mock('react-redux');

describe('LoggedInUserSellProductsContainer', () => {
  const dispatch = jest.fn();

  function renderLoggedInUserSellProductsContainer() {
    return render((
      <LoggedInUserSellProductsContainer />
    ));
  }

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
    const { getByText } = renderLoggedInUserSellProductsContainer();

    myProducts.forEach(({ title }) => {
      expect(getByText(title)).not.toBeNull();
    });
  });

  it('listens click event and then call dispatch', () => {
    const { getAllByText } = renderLoggedInUserSellProductsContainer();

    const deleteButton = getAllByText('Delete');

    fireEvent.click(deleteButton[0]);

    expect(dispatch).toBeCalled();
  });
});
