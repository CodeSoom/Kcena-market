import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import MyProductsContainer from './MyProductsContainer';

import myProducts from '../../../fixtures/myProducts';

jest.mock('react-redux');

describe('MyProductsContainer', () => {
  const dispatch = jest.fn();

  function renderMyProductsContainer() {
    return render((
      <MyProductsContainer />
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
    const { getByText } = renderMyProductsContainer();

    myProducts.forEach(({ title }) => {
      expect(getByText(title)).not.toBeNull();
    });
  });

  it('listens click event and then call dispatch', () => {
    const { getAllByText } = renderMyProductsContainer();

    const deleteButton = getAllByText('Delete');

    fireEvent.click(deleteButton[0]);

    expect(dispatch).toBeCalled();
  });
});
