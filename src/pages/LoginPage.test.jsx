import React from 'react';

import { MemoryRouter } from 'react-router-dom';

import { useSelector } from 'react-redux';

import { render } from '@testing-library/react';

import { loadItem } from '../services/storage';

import LoginPage from './LoginPage';

jest.mock('react-redux');
jest.mock('../services/storage');

describe('LoginPage', () => {
  function renderLoginPage() {
    return render((
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    ));
  }

  beforeEach(() => {
    useSelector.mockImplementation((selector) => selector({
      authReducer: {
        loginFields: {
          email: 'test@test',
          password: '1234',
        },
        user: {
          displayName: '',
          uid: '',
        },
      },
    }));
    loadItem.mockImplementation(() => given.mockUser);
  });

  context('with user', () => {
    given('mockUser', () => ({
      displayName: 'tester',
      uid: '1234',
    }));
    it('doesn\'t render login page', () => {
      const { container } = renderLoginPage();

      expect(container).not.toHaveTextContent('Log In');
    });
  });

  context('without user', () => {
    given('mockUser', () => null);
    it('render login page', () => {
      const { container } = renderLoginPage();

      expect(container).toHaveTextContent('Log In');
    });
  });
});
