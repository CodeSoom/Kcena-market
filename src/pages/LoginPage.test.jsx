import React from 'react';

import { MemoryRouter } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import { render } from '@testing-library/react';

import { loadItem } from '../services/storage';

import LoginPage from './LoginPage';

import { logInUser } from '../../fixtures/user';

jest.mock('react-redux');
jest.mock('../services/storage');

describe('LoginPage', () => {
  const dispatch = jest.fn();

  function renderLoginPage() {
    return render((
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    ));
  }

  beforeEach(() => {
    dispatch.mockClear();
    useDispatch.mockImplementation(() => dispatch);
    loadItem.mockImplementation(() => given.user);
  });

  context('with user', () => {
    given('user', () => logInUser);
    it('doesn\'t render login page', () => {
      const { container } = renderLoginPage();

      expect(container).not.toHaveTextContent('Log In');
    });
  });

  context('without user', () => {
    given('user', () => null);
    it('render login page', () => {
      const { container } = renderLoginPage();

      expect(container).toHaveTextContent('Log In');
    });
  });
});
