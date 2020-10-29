import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';

import RightHeaderMenu from './RightHeaderMenu';

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
    const user = {
      displayName: 'tester',
      uid: 'abc1234',
    };

    it('render 판매하기, Log out', () => {
      const { getByText } = renderRightHeaderMenu({ user });

      expect(getByText('판매하기')).not.toBeNull();
      expect(getByText('Log out')).not.toBeNull();
    });

    it('listen logout event', () => {
      const { getByText } = renderRightHeaderMenu({ user });

      fireEvent.click(getByText('Log out'));

      expect(handleClickLogout).toBeCalled();
    });
  });

  context('without user uid', () => {
    const user = {
      displayName: '',
      uid: '',
    };

    it('render Log In, Sign up', () => {
      const { getByText } = renderRightHeaderMenu({ user });

      expect(getByText('Log In')).not.toBeNull();
      expect(getByText('Sign up')).not.toBeNull();
    });
  });
});
