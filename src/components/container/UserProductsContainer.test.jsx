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
      commonReducer: {
        isLoading: given.isLoading,
      },
    }));
    showConfirmation.mockResolvedValue(true);
  });

  context('isLoading is true', () => {
    given('isLoading', () => true);
    it('render LinerProgress', () => {
      const { getByTestId } = renderUserProductsContainer();
      const linerProgress = getByTestId('LinerProgress');
      expect(linerProgress).toBeInTheDocument();
    });
  });

  context('isLoading is false', () => {
    given('isLoading', () => false);

    it('doesn\'t render LinerProgress', () => {
      const { queryByTestId } = renderUserProductsContainer();

      expect(queryByTestId('LinerProgress')).toBeNull();
    });

    it('render products', () => {
      const { getByText } = renderUserProductsContainer();

      userProducts.forEach(({ title }) => {
        expect(getByText(title)).not.toBeNull();
      });
    });

    it('listens click event and call dispatch', () => {
      const { getAllByText } = renderUserProductsContainer();

      const deleteButton = getAllByText('Delete')[0];

      fireEvent.click(deleteButton);

      expect(dispatch).toBeCalled();
    });
  });
});
