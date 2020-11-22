import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';

import RightHeaderMenu from './RightHeaderMenu';

import { logInUser, logOutUser } from '../../../fixtures/user';

describe('RightHeaderMenu', () => {
  const handleClickLogout = jest.fn();

  function renderRightHeaderMenu({ user }) {
    return render((
      <MemoryRouter>
        <RightHeaderMenu
          user={user}
          handleClickLogout={handleClickLogout}
        />
      </MemoryRouter>
    ));
  }

  context('with user uid', () => {
    it('render 판매하기, Log out', () => {
      const { getByText } = renderRightHeaderMenu({ user: logInUser });

      expect(getByText('판매하기')).not.toBeNull();
      expect(getByText('Log out')).not.toBeNull();
    });

    it('listen logout event', () => {
      const { getByText } = renderRightHeaderMenu({ user: logInUser });

      fireEvent.click(getByText('Log out'));

      expect(handleClickLogout).toBeCalled();
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
