import React from 'react';

import { MemoryRouter } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { render } from '@testing-library/react';

import { loadItem } from '../services/storage';

import SignupPage from './SignupPage';

import { logInUser } from '../../fixtures/user';

jest.mock('react-redux');
jest.mock('../services/storage');

describe('SignupPage', () => {
  const dispatch = jest.fn();

  function renderSignupPage() {
    return render((
      <MemoryRouter>
        <SignupPage />
      </MemoryRouter>
    ));
  }

  beforeEach(() => {
    dispatch.mockClear();
    useDispatch.mockImplementation(() => dispatch);
    useSelector.mockImplementation((selector) => selector({
      authReducer: {
        error: '',
      },
      commonReducer: {
        isLoading: false,
      },
    }));
    loadItem.mockImplementation(() => given.user);
  });

  context('with user', () => {
    given('user', () => logInUser);
    it('doesn\'t render signup page', () => {
      const { container } = renderSignupPage();

      expect(container).not.toHaveTextContent('Sign up');
    });
  });

  context('without user', () => {
    given('user', () => null);
    it('render signup page', () => {
      const { container } = renderSignupPage();

      expect(container).toHaveTextContent('Sign up');
    });
  });
});
