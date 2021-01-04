import React from 'react';

import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, waitFor } from '@testing-library/react';

import RightHeaderMenu from './RightHeaderMenu';
import ConfirmationContext from '../../contexts/ConfirmationContext';

import { logInUser, logOutUser } from '../../../fixtures/user';

describe('RightHeaderMenu', () => {
  const handleClickLogout = jest.fn();
  const showConfirmation = jest.fn();
  const setConfirmForm = jest.fn();

  function renderRightHeaderMenu({ user }) {
    return render((
      <ConfirmationContext.Provider value={{
        showConfirmation,
        setConfirmForm,
      }}
      >
        <MemoryRouter>
          <RightHeaderMenu
            user={user}
            handleClickLogout={handleClickLogout}
          />
        </MemoryRouter>
      </ConfirmationContext.Provider>
    ));
  }

  context('with user uid', () => {
    it('render 판매하기, Log out', () => {
      const { getByText } = renderRightHeaderMenu({ user: logInUser });

      expect(getByText('판매하기')).not.toBeNull();
      expect(getByText('Log out')).not.toBeNull();
    });

    it('listen logout event', async () => {
      showConfirmation.mockResolvedValue(true);

      const { getByText } = renderRightHeaderMenu({ user: logInUser });

      fireEvent.click(getByText('Log out'));

      await waitFor(() => expect(handleClickLogout).toBeCalled());
    });
  });

  context('without user uid', () => {
    it('render Log In, Sign up', () => {
      const { getByText } = renderRightHeaderMenu({ user: logOutUser });

      expect(getByText('Log In')).not.toBeNull();
      expect(getByText('Sign up')).not.toBeNull();
    });
  });
});
