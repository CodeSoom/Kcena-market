import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { useSelector } from 'react-redux';

import Header from './Header';

import { logInUser, logOutUser } from '../../../fixtures/user';

jest.mock('react-redux');

describe('Header', () => {
  beforeEach(() => {
    useSelector.mockImplementation((selector) => selector({
      authReducer: {
        user: given.user,
      },
    }));
  });

  function renderHeader() {
    return render((
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    ));
  }

  context('with user uid', () => {
    given('user', () => logInUser);

    it('render title, Log In and Sign up', () => {
      const controls = ['Kcena Market', '판매하기', 'Log out'];
      const { getByText } = renderHeader();

      controls.forEach((control) => {
        expect(getByText(control)).not.toBeNull();
      });
    });
  });

  context('without user uid', () => {
    given('user', () => logOutUser);

    it('render title, Log In and Sign up', () => {
      const controls = ['Kcena Market', 'Log In', 'Sign up'];
      const { getByText } = renderHeader();

      controls.forEach((control) => {
        expect(getByText(control)).not.toBeNull();
      });
    });

    it('doesn\'t render 판매하기', () => {
      const { container } = renderHeader();

      expect(container).not.toHaveTextContent('판매하기');
    });
  });
});
