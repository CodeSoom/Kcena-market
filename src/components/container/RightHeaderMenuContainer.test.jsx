import React from 'react';

import { fireEvent, render, waitFor } from '@testing-library/react';

import { useSelector, useDispatch } from 'react-redux';

import { MemoryRouter } from 'react-router-dom';

import RightHeaderMenuContainer from './RightHeaderMenuContainer';

import ConfirmationContext from '../../contexts/ConfirmationContext';

import { logInUser } from '../../../fixtures/user';

jest.mock('react-redux');
describe('RightHeaderMenuContainer', () => {
  const dispatch = jest.fn();
  const setConfirmForm = jest.fn();
  const showConfirmation = jest.fn();

  function renderRightHeaderMenuContainer() {
    return render((
      <ConfirmationContext.Provider value={{
        setConfirmForm,
        showConfirmation,
      }}
      >
        <MemoryRouter>
          <RightHeaderMenuContainer />
        </MemoryRouter>
      </ConfirmationContext.Provider>
    ));
  }

  beforeEach(() => {
    dispatch.mockClear();
    useDispatch.mockImplementation(() => dispatch);
    useSelector.mockImplementation((selector) => selector({
      authReducer: {
        user: given.user,
      },
    }));
    showConfirmation.mockResolvedValue(() => true);
  });

  context('with user', () => {
    given('user', () => logInUser);
    it('render 판매하기, Log out', () => {
      const { getByText } = renderRightHeaderMenuContainer();
      expect(getByText('판매하기')).not.toBeNull();
      expect(getByText('Log out')).not.toBeNull();
    });

    it('listen logout dispatch', async () => {
      const { getByText } = renderRightHeaderMenuContainer();

      fireEvent.click(getByText('Log out'));

      await waitFor(() => expect(dispatch).toBeCalled());
    });
  });
});
