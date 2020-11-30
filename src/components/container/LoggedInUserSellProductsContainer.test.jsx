import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import LoggedInUserSellProductsContainer from './LoggedInUserSellProductsContainer';

import loggedInUserSellProducts from '../../../fixtures/loggedInUserSellProducts';
import ConfirmationContext from '../../contexts/ConfirmationContext';

jest.mock('react-redux');

describe('LoggedInUserSellProductsContainer', () => {
  const dispatch = jest.fn();
  const showConfirmation = jest.fn();
  const setConfirmForm = jest.fn();

  function renderLoggedInUserSellProductsContainer() {
    return render((
      <ConfirmationContext.Provider
        value={{
          showConfirmation,
          setConfirmForm,
        }}
      >
        <LoggedInUserSellProductsContainer />
      </ConfirmationContext.Provider>
    ));
  }

  beforeEach(() => {
    dispatch.mockClear();
    useDispatch.mockImplementation(() => dispatch);
    useSelector.mockImplementation((selector) => selector({
      productReducer: {
        loggedInUserSellProducts,
      },
    }));
    showConfirmation.mockResolvedValue(() => true);
  });

  it('render products', () => {
    const { getByText } = renderLoggedInUserSellProductsContainer();

    loggedInUserSellProducts.forEach(({ title }) => {
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
