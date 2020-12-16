import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import { MemoryRouter } from 'react-router-dom';

import UserProductsContainer from './UserProductsContainer';

import userProducts from '../../../fixtures/userProducts';
import ConfirmationContext from '../../contexts/ConfirmationContext';

jest.mock('react-redux');

describe('UserProductsContainer', () => {
  const dispatch = jest.fn();
  const showConfirmation = jest.fn();
  const setConfirmForm = jest.fn();

  function renderUserProductsContainer() {
    return render((
      <ConfirmationContext.Provider
        value={{
          showConfirmation,
          setConfirmForm,
        }}
      >
        <MemoryRouter>
          <UserProductsContainer />
        </MemoryRouter>
      </ConfirmationContext.Provider>
    ));
  }

  beforeEach(() => {
    dispatch.mockClear();
    useDispatch.mockImplementation(() => dispatch);
    useSelector.mockImplementation((selector) => selector({
      productReducer: {
        userProducts,
      },
    }));
    showConfirmation.mockResolvedValue(() => true);
  });

  it('render products', () => {
    const { getByText } = renderUserProductsContainer();

    userProducts.forEach(({ title }) => {
      expect(getByText(title)).not.toBeNull();
    });
  });

  context('click delete button', () => {
    it('call dispatch', () => {
      const { getAllByText } = renderUserProductsContainer();

      const deleteButton = getAllByText('Delete')[0];

      fireEvent.click(deleteButton);

      expect(dispatch).toBeCalled();
    });
  });
});
